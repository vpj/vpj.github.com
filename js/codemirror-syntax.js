(function() {
  var Mode, OPERATOR, OPERATOR_INLINE;

  OPERATOR = "tag strong";

  OPERATOR_INLINE = "tag strong";

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
      return this.getMode();
    };

    Mode.prototype.matchBlock = function(stream, state) {
      var match, stack;
      stack = state.stack;
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
      var i, len, match, ref, t;
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
        ref = state.stack;
        for (i = 0, len = ref.length; i < len; i++) {
          t = ref[i];
          if (t.type === 'table') {
            return OPERATOR_INLINE;
          }
        }
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
      return state.comment = false;
    };

    Mode.prototype.startState = function() {
      return {
        stack: [],
        htmlState: null,
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
      var i, j, l, len, len1, match, s, stack, t, types;
      if (state.media) {
        stream.skipToEnd();
        state.media = false;
        return "link";
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
          special: false,
          code: false,
          table: false
        };
        for (i = 0, len = stack.length; i < len; i++) {
          t = stack[i];
          types[t.type] = true;
        }
        if (types.table) {
          this.clearState(state);
        }
        if (!types.code && !types.html) {
          match = this.matchBlock(stream, state);
          if (match != null) {
            return match;
          }
        }
      }
      types = {
        sidenote: false,
        html: false,
        special: false,
        code: false,
        table: false
      };
      for (j = 0, len1 = stack.length; j < len1; j++) {
        t = stack[j];
        types[t.type] = true;
      }
      l = "";
      if (types.html) {
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
        stream.next();
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
          l += " link";
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
