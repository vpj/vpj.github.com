(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Wallapatta.TYPES', function(Base, TYPES) {
    var BLOCK_TOKENS, Reader;
    BLOCK_TOKENS = {
      sidenote: '>>>',
      code: '```',
      formattedCode: '<<<wallapatta',
      special: '+++',
      html: '<<<',
      full: '<!>',
      table: '|||',
      heading: '#',
      orderedList: '- ',
      unorderedList: '* ',
      media: '!',
      comment: '///'
    };
    Reader = (function(superClass) {
      extend(Reader, superClass);

      function Reader() {
        return Reader.__super__.constructor.apply(this, arguments);
      }

      Reader.extend();

      Reader.initialize(function(text) {
        text = text.replace(/\r\n?/g, "\n");
        this.lines = text.split('\n');
        this.n = 0;
        return this.parse();
      });

      Reader.prototype.has = function() {
        return this.n < this.lines.length;
      };

      Reader.prototype.get = function() {
        return this.lines[this.n];
      };

      Reader.prototype.next = function() {
        return this.n++;
      };

      Reader.prototype.parse = function() {
        var j, len, n, ref, results, s;
        ref = this.lines;
        results = [];
        for (n = j = 0, len = ref.length; j < len; n = ++j) {
          s = ref[n];
          results.push(this.lines[n] = this.parseLine(s));
        }
        return results;
      };

      Reader.prototype.getToken = function(line, start) {
        var k, v;
        for (k in BLOCK_TOKENS) {
          v = BLOCK_TOKENS[k];
          if (v === line.substr(start, v.length)) {
            return v;
          }
        }
        return null;
      };

      Reader.prototype.parseLine = function(s) {
        var i, line, token;
        line = {
          indentation: 0,
          empty: true,
          line: s
        };
        i = 0;
        while (i < s.length) {
          if (s[i] !== ' ') {
            break;
          }
          ++i;
        }
        line.indentation = i;
        if (i === s.length) {
          return line;
        }
        line.empty = false;
        token = this.getToken(s, i);
        if (token != null) {
          i += token.length;
        }
        switch (token) {
          case BLOCK_TOKENS.sidenote:
            line.type = TYPES.sidenote;
            break;
          case BLOCK_TOKENS.code:
            line.type = TYPES.codeBlock;
            break;
          case BLOCK_TOKENS.formattedCode:
            line.type = TYPES.formattedCode;
            break;
          case BLOCK_TOKENS.table:
            line.type = TYPES.table;
            break;
          case BLOCK_TOKENS.special:
            line.type = TYPES.special;
            break;
          case BLOCK_TOKENS.full:
            line.type = TYPES.full;
            break;
          case BLOCK_TOKENS.html:
            line.type = TYPES.html;
            break;
          case BLOCK_TOKENS.heading:
            line.type = TYPES.heading;
            line.level = 1;
            while (i < s.length && s[i] === '#') {
              ++i;
              ++line.level;
            }
            break;
          case BLOCK_TOKENS.orderedList:
            line.type = TYPES.list;
            line.ordered = true;
            break;
          case BLOCK_TOKENS.unorderedList:
            line.type = TYPES.list;
            line.ordered = false;
            break;
          case BLOCK_TOKENS.media:
            line.type = TYPES.media;
            break;
          case BLOCK_TOKENS.comment:
            line.type = TYPES.comment;
            break;
          default:
            line.type = TYPES.block;
        }
        line.text = (s.substr(i)).trim();
        return line;
      };

      return Reader;

    })(Base);
    return Mod.set('Wallapatta.Reader', Reader);
  });

}).call(this);
