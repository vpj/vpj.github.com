(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mod.require('Weya.Base', 'Wallapatta.TYPES', function(Base, TYPES) {
    var BLOCK_TOKENS, Reader;
    BLOCK_TOKENS = {
      sidenote: '>>>',
      code: '```',
      special: '+++',
      html: '<<<',
      heading: '#',
      orderedList: '- ',
      unorderedList: '* ',
      media: '!'
    };
    Reader = (function(_super) {
      __extends(Reader, _super);

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
        var n, s, _i, _len, _ref, _results;
        _ref = this.lines;
        _results = [];
        for (n = _i = 0, _len = _ref.length; _i < _len; n = ++_i) {
          s = _ref[n];
          _results.push(this.lines[n] = this.parseLine(s));
        }
        return _results;
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
          case BLOCK_TOKENS.special:
            line.type = TYPES.special;
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
