exports.providers = {
    HtmlTemplate: {
      regexes: [],
      extensions: ['*.html'],
      dependencies: ['JavaScript', 'CoffeeScript', 'TypeScript', 'PHP'],
    },

    JavaScriptTemplate: {
      regexes: [],
      extensions: ['*.jsx', '*.vue', '*.jade', '*.tsx'],
      dependencies: ['JavaScript', 'CoffeeScript', 'TypeScript'],
    },

    JavaScript: {
      regexes: [
        /(^|\s|\.){word}\s*[:=]\s*function\s*\(/,
        /(^|\s)function\s+{word}\s*\(/,
        /(^|\s)class\s+{word}(\s|$)/,
        /(^|\s){word}\s*\([^(]*?\)\s*\{/,
      ],
      extensions: ['*.js'],
      dependencies: ['CoffeeScript', 'TypeScript'],
    },

    CoffeeScript: {
      regexes: [
        /(^|\s)class\s+{word}(\s|$)/,
        /(^|\s|\.|@){word}\s*[:=]\s*(\([^(]*?\))?\s*[=-]>/,
      ],
      extensions: ['*.coffee'],
      dependencies: ['JavaScript', 'TypeScript'],
    },

    TypeScript: {
      regexes: [
        /(^|\s|\.){word}\s*[:=]\s*function\s*\(/,
        /(^|\s)function\s+{word}\s*\(/,
        /(^|\s)interface\s+{word}(\s|$)/,
        /(^|\s)class\s+{word}(\s|$)/,
        /(^|\s){word}\([^(]*?\)\s*\{/,
        /(^|\s|\.|@){word}\s*[:=]\s*(\([^(]*?\))?\s*[=-]>/,
      ],
      extensions: ['*.ts'],
      dependencies: ['JavaScript', 'CoffeeScript'],
    },

    Python: {
      regexes: [
        /(^|\s)class\s+{word}\s*\(/,
        /(^|\s)def\s+{word}\s*\(/,
      ],
      extensions: ['*.py'],
    },

    PHP: {
      regexes: [
        /(^|\s)class\s+{word}(\s|\{|$)/,
        /(^|\s)interface\s+{word}(\s|\{|$)/,
        /(^|\s)trait\s+{word}(\s|\{|$)/,
        /(^|\s)(static\s+)?((public|private|protected)\s+)?(static\s+)?function\s+{word}\s*\(/,
        /(^|\s)const\s+{word}(\s|=|;|$)/,
      ],
      extensions: ['*.php', '*.php3', '*.phtml'],
    },

    ASP: {
      regexes: [
        /(^|\s)(function|sub)\s+{word}\s*\(/,
      ],
      extensions: ['*.asp'],
    },

    Hack: {
      regexes: [
        /(^|\s)class\s+{word}(\s|\{|$)/,
        /(^|\s)interface\s+{word}(\s|\{|$)/,
        /(^|\s)(static\s+)?((public|private|protected)\s+)?(static\s+)?function\s+{word}\s*\(/,
      ],
      extensions: ['*.hh'],
    },

    Ruby: {
      regexes: [
        /(^|\s)class\s+{word}(\s|$)/,
        /(^|\s)module\s+{word}(\s|$)/,
        /(^|\s)def\s+(?:self\.)?{word}\s*\(?/,
        /(^|\s)scope\s+:{word}\s*\(?/,
        /(^|\s)attr_accessor\s+:{word}(\s|$)/,
        /(^|\s)attr_reader\s+:{word}(\s|$)/,
        /(^|\s)attr_writer\s+:{word}(\s|$)/,
        /(^|\s)define_method\s+:?{word}\s*\(?/,
        /(^|\s){word}\s*=(\s|$)/,
      ],
      extensions: ['*.rb', '*.ru', '*.haml', '*.erb', '*.rake'],
    },

    Puppet: {
      regexes: [
        /(^|\s)class\s+{word}(\s|$)/,
      ],
      extensions: ['*.pp'],
    },

    KRL: {
      regexes: [
        /(^|\s)DEF\s+{word}\s*\(/,
        /(^|\s)DECL\s+\w*?{word}\s*=?/,
        /(^|\s)(SIGNAL|INT|BOOL|REAL|STRUC|CHAR|ENUM|EXT|\s)\s*\w*{word}.*/,
      ],
      extensions: ['*.src', '*.dat'],
    },

    Perl: {
      regexes: [
        /(^|\s)sub\s+{word}\s*\{/,
        /(^|\s)package\s+(\w+::)*{word}\s*;/,
      ],
      extensions: ['*.pm', '*.pl'],
    },

    'C/C++': {
      regexes: [
        /(^|\s)class\s+{word}(\s|:)/,
        /(^|\s)struct\s+{word}(\s|\{|$)/,
        /(^|\s)enum\s+{word}(\s|\{|$)/,
        /(^|\s)#define\s+{word}(\s|\(|$)/,
        /(^|\s)filesdef\s.*(\s|\*|\(){word}(\s|;|\)|$)/,
        /(^|\s|\*|:|&){word}\s*\(.*\)(\s*|\s*const\s*)(\{|$)/,
      ],
      extensions: ['*.c', '*.cc', '*.cpp', '*.cxx', '*.h', '*.hh', '*.hpp', '*.inc'],
    },

    Java: {
      regexes: [
        /(^|\s)class\s+{word}(\s|:)/,
        /(^|\s)interface\s+{word}(\s|\{|$)/,
        /(^|\s)enum\s+{word}(\s|\{|$)/,
        /(^|\s){word}\s*\(.*\)(\s*)(\{|$)/,
      ],
      extensions: ['*.java'],
    },

    Shell: {
      regexes: [
        /(^|\s){word}\s*\(\)\s*\{/,
      ],
      extensions: ['*.sh'],
    },
  };
