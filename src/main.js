"use strict";

const path = require("path");
const vscode = require("vscode");
const ChildProcess = require('child_process');
const { providers } = require('./providers');

function ripGrepResultToCodeLocation(result) {
    const data = result.split(':');

    let filePath = data[0];
    let line = parseInt(data[1], 10) - 1;
    let lineEnd = line;
    let column = parseInt(data[2], 10) - 1;
    let columnEnd = column;

    return new vscode.Location(
        vscode.Uri.file(filePath),
        new vscode.Range(line, column, lineEnd, columnEnd)
    );
}

function openLocation(location) {
    return vscode.workspace.openTextDocument(location.uri).then(function (doc) {
        return vscode.window.showTextDocument(doc).then(function (editor) {
            editor.selection = new vscode.Selection(
                location.range.start,
                location.range.end
            );
            editor.revealRange(location.range);
        });
    });
}

function openLocations(locations) {
    if (locations.length === 1) {
        return openLocation(locations[0]);
    }

    var picks = locations.map(function (l) { return ({
        label: path.basename(l.uri.fsPath), //vscode.workspace.asRelativePath(l.uri) + ":" + (l.range.start.line + 1),
        description: vscode.workspace.asRelativePath(l.uri) + ":" + (l.range.start.line + 1), // l.uri.fsPath,
        location: l
    }); });
    return vscode.window.showQuickPick(picks).then(function (pick) {
        return pick && openLocation(pick.location);
    });
}

function getSearchOptions(word, fileExt) {
    const providersToUse = [];

    let scanRegexes = [];
    let scanFiles = [];

    for (let providerName in providers) {
        let provider = providers[providerName];
        if (provider.extensions.includes("*" + fileExt)) {
            providersToUse.push(providerName);
            if (provider.dependencies) {
                provider.dependencies.map(x => providersToUse.push(x));
            }
        }
    }

    for (let i = 0; i < providersToUse.length; i++) {
        let provider = providers[providersToUse[i]];

        scanRegexes.push(...provider.regexes.map(x => x.source));
        scanFiles.push(...provider.extensions);
    }

    return {
        regex: scanRegexes.join('|').replace(/{word}/g, word),
        fileTypes: scanFiles,
    }
}

function ripGrepSearch(scanPaths, word, fileExt) {
    const { regex, fileTypes } = getSearchOptions(word, fileExt)

    const args = fileTypes.map(x => `--glob=${x}`);
    // args.push(...openedFiles.map(x => `--glob=!${x}`));
    // '--no-ignore-vcs', '--ignore-case'
    args.push(...[
        '--line-number', '--column', regex,
    ]);

    args.push(scanPaths);

    const runRipgrep = ChildProcess.spawn('rg', args);

    runRipgrep.stdout.setEncoding('utf8');
    runRipgrep.stderr.setEncoding('utf8');

    let results = "";

    runRipgrep.stdout.on('data', (data) => {
        results += data.toString();
    });

    runRipgrep.on('close', function(code) {
        console.log(results);

        let locations = results.split("\n").filter((el) => {return !!el}).map(ripGrepResultToCodeLocation);
        if (locations.length > 0) {
            openLocations(locations);
        }
    });

      runRipgrep.on('error', (error) => {
        if (error.code === 'ENOENT') {
            vscode.window.showErrorMessage(
                `[vscode-dumb-jump] "ripgrep" is not found in $PATH.`
              )
        } else {
            throw error;
        }
      });
}

function jump(editor) {
    var document = editor.document, selection = editor.selection;
    var range = document.getWordRangeAtPosition(selection.active);
    var word = document.getText(range);

    if (range) {
        ripGrepSearch(vscode.workspace.rootPath, word, path.extname(document.fileName));
    }
}

function activate(context) {
    vscode.commands.registerTextEditorCommand('vscode-dumb-jump.jump', jump);
}

exports.activate = activate;