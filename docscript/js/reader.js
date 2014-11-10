(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mod.require('Weya.Base', 'Docscript.TYPES', function(Base, TYPES) {
    var Reader;
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

      Reader.prototype.parseLine = function(s) {
        var i, line;
        line = {
          indentation: 0,
          empty: true
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
        switch (s[i]) {
          case '#':
            line.type = TYPES.heading;
            line.level = 0;
            while (i < s.length) {
              if (s[i] !== '#') {
                break;
              }
              ++i;
              ++line.level;
            }
            break;
          case '-':
            ++i;
            if (i < s.length && s[i] === ' ') {
              line.type = TYPES.list;
              line.ordered = true;
            } else if (s.substr(i, 2) === '--') {
              line.type = TYPES.sidenote;
              i += 2;
            } else {
              throw new Error('Unknown syntax');
            }
            break;
          case '*':
            ++i;
            if (i < s.length && s[i] === ' ') {
              line.type = TYPES.list;
              line.ordered = false;
            } else {
              throw new Error('Unknown syntax');
            }
            break;
          case '!':
            ++i;
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
    return Mod.set('Docscript.Reader', Reader);
  });

}).call(this);
