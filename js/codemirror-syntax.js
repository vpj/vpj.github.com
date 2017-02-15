(function() {
  var BREAK_WORD_CHAR, Mode, OPERATOR, OPERATOR_INLINE, c, j, len, ref;

  OPERATOR = "tag strong";

  OPERATOR_INLINE = "tag strong";

  BREAK_WORD_CHAR = {};

  ref = ' \t\n\r$#@!%^&*()_+-=~`1234567890[]{}\\|;:\'\",.<>/?';
  for (j = 0, len = ref.length; j < len; j++) {
    c = ref[j];
    BREAK_WORD_CHAR[c] = true;
  }

  window.CHECK_SPELLING = false;

  Mode = (function() {
    function Mode(CodeMirror) {
      this.CodeMirror = CodeMirror;
      this.CodeMirror.defineMode("wallapatta", this.defineMode.bind(this), "xml");
      this.CodeMirror.defineMIME("text/x-wallapatta", "wallapatta");
    }

    Mode.prototype.defineMode = function(cmCfg, modeCfg) {
      this.htmlMode = this.CodeMirror.getMode(cmCfg, {
        name: "xml",
        htmlMode: true
      });
      this.javascriptMode = this.CodeMirror.getMode(cmCfg, {
        name: "javascript",
        javascriptMode: true
      });
      this.coffeescriptMode = this.CodeMirror.getMode(cmCfg, {
        name: "coffeescript",
        coffeescriptMode: true
      });
      return this.getMode();
    };

    Mode.prototype.matchBlock = function(stream, state) {
      var match, stack;
      stack = state.stack;
      match = stream.match(/^<<<weya/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'coffeescript'
        });
        stream.skipToEnd();
        state.coffeescriptState = this.CodeMirror.startState(this.coffeescriptMode);
        return OPERATOR;
      }
      match = stream.match(/^<<<coffee/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'coffeescript'
        });
        stream.skipToEnd();
        state.coffeescriptState = this.CodeMirror.startState(this.coffeescriptMode);
        return OPERATOR;
      }
      match = stream.match(/^<<<js/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'javascript'
        });
        stream.skipToEnd();
        state.javascriptState = this.CodeMirror.startState(this.javascriptMode);
        return OPERATOR;
      }
      match = stream.match(/^<<</);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'html'
        });
        stream.skipToEnd();
        state.htmlState = this.CodeMirror.startState(this.htmlMode);
        return OPERATOR;
      }
      match = stream.match(/^\|\|\|/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'table'
        });
        stream.skipToEnd();
        return OPERATOR;
      }
      match = stream.match(/^\+\+\+/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'special'
        });
        stream.skipToEnd();
        return OPERATOR;
      }
      match = stream.match(/^<\!>/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'full'
        });
        stream.skipToEnd();
        return OPERATOR;
      }
      match = stream.match(/^>>>/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'sidenote'
        });
        stream.skipToEnd();
        return OPERATOR;
      }
      match = stream.match(/^```/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'code'
        });
        stream.skipToEnd();
        return OPERATOR;
      }
      match = stream.match(/^<<<wallapatta/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'code'
        });
        stream.skipToEnd();
        return OPERATOR;
      }
      return null;
    };

    Mode.prototype.matchStart = function(stream, state) {
      var match;
      match = stream.match(/^\!/);
      if (match) {
        state.media = true;
        return OPERATOR;
      }
      match = stream.match(/^\/\/\//);
      if (match) {
        state.comment = true;
        return OPERATOR;
      }
      match = stream.match(/^\* /);
      if (match) {
        this.clearState(state);
        return OPERATOR;
      }
      match = stream.match(/^- /);
      if (match) {
        this.clearState(state);
        return OPERATOR;
      }
      match = stream.match(/^#/);
      if (match) {
        stream.eatWhile('#');
        this.clearState(state);
        state.heading = true;
        return OPERATOR + " header";
      }
    };

    Mode.prototype.matchInline = function(stream, state) {
      var k, len1, match, ref1, t;
      match = stream.match(/^``/);
      if (match) {
        state.code = !state.code;
        return OPERATOR_INLINE;
      }
      if (state.code) {
        return null;
      }
      match = stream.match(/^\*\*/);
      if (match) {
        state.bold = !state.bold;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^--/);
      if (match) {
        state.italics = !state.italics;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^__/);
      if (match) {
        state.subscript = !state.subscript;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^\^\^/);
      if (match) {
        state.superscript = !state.superscript;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^<</);
      if (match) {
        state.link = true;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^<-/);
      if (match) {
        state.inlineHtml = true;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^->/);
      if (match) {
        state.inlineHtml = false;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^>>/);
      if (match) {
        state.link = false;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^\[\[/);
      if (match) {
        state.inlineMedia = true;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^\]\]/);
      if (match) {
        state.inlineMedia = false;
        return OPERATOR_INLINE;
      }
      match = stream.match(/^\|/);
      if (match) {
        ref1 = state.stack;
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          t = ref1[k];
          if (t.type === 'table') {
            return OPERATOR_INLINE;
          }
        }
      }
      return null;
    };

    Mode.prototype.checkSpelling = function(stream, state) {
      var i, word;
      i = stream.pos;
      while (i < stream.string.length) {
        if (BREAK_WORD_CHAR[stream.string[i]]) {
          break;
        }
        ++i;
      }
      if (i === stream.pos) {
        stream.next();
        return null;
      }
      word = stream.string.substring(stream.pos, i);
      word = word.toLowerCase();
      stream.pos = i;
      if (GOOGLE_10000_WORDS[word] == null) {
        return "invalid_spelling";
      } else {
        return "word_level_" + (Math.floor(GOOGLE_10000_WORDS[word] / 1000));
      }
      return null;
    };

    Mode.prototype.clearState = function(state) {
      state.bold = false;
      state.italics = false;
      state.subscript = false;
      state.superscript = false;
      state.code = false;
      state.link = false;
      state.inlineMedia = false;
      state.inlineHtml = false;
      return state.comment = false;
    };

    Mode.prototype.startState = function() {
      return {
        stack: [],
        htmlState: null,
        coffeescriptState: null,
        javascriptState: null,
        start: true,
        bold: false,
        italics: false,
        subscript: false,
        superscript: false,
        code: false,
        link: false,
        inlineMedia: false,
        heading: false,
        media: false,
        comment: false
      };
    };

    Mode.prototype.blankLine = function(state) {
      return this.clearState(state);
    };

    Mode.prototype.token = function(stream, state) {
      var k, l, len1, len2, m, match, s, stack, t, types;
      if (state.media) {
        stream.skipToEnd();
        state.media = false;
        return "media";
      }
      if (stream.sol()) {
        state.start = true;
        if (state.heading) {
          state.heading = false;
          this.clearState(state);
        }
        s = stream.eatSpace();
        if (stream.eol()) {
          this.clearState(state);
        }
        if (s) {
          return "";
        }
      }
      stack = state.stack;
      if (state.start) {
        while (stack.length > 0) {
          if (stack[stack.length - 1].indentation >= stream.indentation()) {
            stack.pop();
          } else {
            break;
          }
        }
        types = {
          sidenote: false,
          html: false,
          coffeescript: false,
          javascript: false,
          special: false,
          full: false,
          code: false,
          table: false
        };
        for (k = 0, len1 = stack.length; k < len1; k++) {
          t = stack[k];
          types[t.type] = true;
        }
        if (types.table) {
          this.clearState(state);
        }
        if (!types.code && !types.html && !types.coffeescript && !types.javascript) {
          match = this.matchBlock(stream, state);
          if (match != null) {
            return match;
          }
        }
      }
      types = {
        sidenote: false,
        html: false,
        coffeescript: false,
        javascript: false,
        special: false,
        full: false,
        code: false,
        table: false
      };
      for (m = 0, len2 = stack.length; m < len2; m++) {
        t = stack[m];
        types[t.type] = true;
      }
      l = "";
      if (types.coffeescript) {
        l = this.coffeescriptMode.token(stream, state.coffeescriptState);
        l = "" + l;
      } else if (types.javascript) {
        l = this.javascriptMode.token(stream, state.javascriptState);
        l = "" + l;
      } else if (types.html) {
        l = this.htmlMode.token(stream, state.htmlState);
        l = "" + l;
      } else if (types.code) {
        stream.skipToEnd();
        l = "meta";
      } else {
        if (state.start) {
          match = this.matchStart(stream, state);
          if (match) {
            return match;
          }
        }
        state.start = false;
        match = this.matchInline(stream, state);
        if (match != null) {
          return match;
        }
        if (CHECK_SPELLING) {
          match = this.checkSpelling(stream, state);
          if (match != null) {
            l += " " + match;
          }
        } else {
          stream.next();
        }
        if (state.heading) {
          l += " header";
        }
        if (state.comment) {
          l += " comment";
        }
        if (state.bold) {
          l += " strong";
        }
        if (state.italics) {
          l += " em";
        }
        if (state.link) {
          l += " link";
        }
        if (state.inlineMedia) {
          l += " media";
        }
        if (state.inlineHtml) {
          l += " inline-html";
        }
        if (state.code) {
          l += " meta";
        }
      }
      return l;
    };

    Mode.prototype.getMode = function() {
      var mode, self;
      self = this;
      mode = {
        fold: "indent",
        startState: this.startState,
        blankLine: function(state) {
          return self.blankLine(state);
        },
        token: function(stream, state) {
          return self.token(stream, state);
        }
      };
      return mode;
    };

    return Mode;

  })();

  if ((typeof define !== "undefined" && define !== null) && (typeof brackets !== "undefined" && brackets !== null)) {
    define(function(require, exports, module) {
      "use strict";
      var CodeMirror, LanguageManager, lang;
      LanguageManager = brackets.getModule("language/LanguageManager");
      CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
      new Mode(CodeMirror);
      lang = LanguageManager.defineLanguage("wallapatta", {
        name: "Wallapatta",
        mode: "wallapatta",
        fileExtensions: [".ds"],
        lineComment: ["\/\/"]
      });
      return lang.done(function() {
        return console.log("[Wallapatta] Module loaded.");
      });
    });
  } else if (typeof CodeMirror !== "undefined" && CodeMirror !== null) {
    new Mode(CodeMirror);
  }

}).call(this);
