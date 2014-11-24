(function() {
  CodeMirror.defineMode("docscript", (function(cmCfg, modeCfg) {
    var clearState, htmlMode, matchBlock, matchInline, matchStart, mode, operator, operatorInline;
    operator = "tag strong";
    operatorInline = "string";
    htmlMode = CodeMirror.getMode(cmCfg, {
      name: "xml",
      htmlMode: true
    });
    matchBlock = function(stream, state) {
      var match, stack;
      stack = state.stack;
      match = stream.match(/^<<</);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'html'
        });
        stream.skipToEnd();
        state.htmlState = CodeMirror.startState(htmlMode);
        return operator;
      }
      match = stream.match(/^\+\+\+/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'special'
        });
        stream.skipToEnd();
        return operator;
      }
      match = stream.match(/^>>>/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'sidenote'
        });
        stream.skipToEnd();
        return operator;
      }
      match = stream.match(/^```/);
      if (match) {
        stack.push({
          indentation: stream.indentation(),
          type: 'code'
        });
        stream.skipToEnd();
        return operator;
      }
      return null;
    };
    matchStart = function(stream, state) {
      var match;
      match = stream.match(/^\!/);
      if (match) {
        state.media = true;
        return operator;
      }
      match = stream.match(/^\* /);
      if (match) {
        clearState(state);
        return operator;
      }
      match = stream.match(/^- /);
      if (match) {
        clearState(state);
        return operator;
      }
      match = stream.match(/^#/);
      if (match) {
        stream.eatWhile('#');
        clearState(state);
        state.heading = true;
        return "" + operator + " header";
      }
    };
    matchInline = function(stream, state) {
      var match;
      match = stream.match(/^``/);
      if (match) {
        state.code = !state.code;
        return operatorInline;
      }
      if (state.code) {
        return null;
      }
      match = stream.match(/^\*\*/);
      if (match) {
        state.bold = !state.bold;
        return operatorInline;
      }
      match = stream.match(/^--/);
      if (match) {
        state.italics = !state.italics;
        return operatorInline;
      }
      match = stream.match(/^__/);
      if (match) {
        state.subscript = !state.subscript;
        return operatorInline;
      }
      match = stream.match(/^\^\^/);
      if (match) {
        state.superscript = !state.superscript;
        return operatorInline;
      }
      match = stream.match(/^<</);
      if (match) {
        state.link = true;
        return operatorInline;
      }
      match = stream.match(/^>>/);
      if (match) {
        state.link = false;
        return operatorInline;
      }
      return null;
    };
    clearState = function(state) {
      state.bold = false;
      state.italics = false;
      state.subscript = false;
      state.superscript = false;
      state.code = false;
      return state.link = false;
    };
    mode = {
      startState: function() {
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
          heading: false,
          media: false
        };
      },
      blankLine: function(state) {
        return clearState(state);
      },
      token: function(stream, state) {
        var l, match, s, stack, t, types, _i, _j, _len, _len1;
        if (state.media) {
          stream.skipToEnd();
          state.media = false;
          return "link";
        }
        if (stream.sol()) {
          state.start = true;
          if (state.heading) {
            state.heading = false;
            clearState(state);
          }
          s = stream.eatSpace();
          if (stream.eol()) {
            clearState(state);
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
            code: false
          };
          for (_i = 0, _len = stack.length; _i < _len; _i++) {
            t = stack[_i];
            types[t.type] = true;
          }
          if (!types.code && !types.html) {
            match = matchBlock(stream, state);
            if (match != null) {
              return match;
            }
          }
        }
        types = {
          sidenote: false,
          html: false,
          special: false,
          code: false
        };
        for (_j = 0, _len1 = stack.length; _j < _len1; _j++) {
          t = stack[_j];
          types[t.type] = true;
        }
        l = "";
        if (types.html) {
          l = htmlMode.token(stream, state.htmlState);
          l = "" + l;
        } else if (types.code) {
          stream.skipToEnd();
          l = "meta";
        } else {
          if (state.start) {
            match = matchStart(stream, state);
            if (match) {
              return match;
            }
          }
          match = matchInline(stream, state);
          if (match != null) {
            return match;
          }
          stream.next();
          state.start = false;
          if (state.heading) {
            l += " header";
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
          if (state.code) {
            l += " meta";
          }
        }
        return l;
      }
    };
    return mode;
  }), "xml");

  CodeMirror.defineMIME("text/x-docscript", "docscript");

}).call(this);
