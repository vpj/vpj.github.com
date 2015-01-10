(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mod.require('Weya.Base', 'CodeMirror', 'Wallapatta.Parser', 'Wallapatta.Sample', 'HLJS', function(Base, CodeMirror, Parser, Sample, HLJS) {
    var Editor, editor;
    Editor = (function(_super) {
      __extends(Editor, _super);

      function Editor() {
        return Editor.__super__.constructor.apply(this, arguments);
      }

      Editor.extend();

      Editor.prototype.template = function() {
        return this.div(".container.wallapatta-editor", function() {
          return this.div(".row", function() {
            this.div(".five.columns", function() {
              this.div(".toolbar", function() {
                this.i(".fa.fa-header", {
                  on: {
                    click: this.$.on.header
                  }
                });
                this.i(".fa.fa-bold", {
                  on: {
                    click: this.$.on.bold
                  }
                });
                this.i(".fa.fa-italic", {
                  on: {
                    click: this.$.on.italic
                  }
                });
                this.i(".fa.fa-link", {
                  on: {
                    click: this.$.on.link
                  }
                });
                this.i(".fa.fa-code", {
                  on: {
                    click: this.$.on.inlineCode
                  }
                });
                this.i(".fa.fa-camera", {
                  on: {
                    click: this.$.on.inlineMedia
                  }
                });
                this.i(".fa.fa-superscript", {
                  on: {
                    click: this.$.on.superscript
                  }
                });
                this.i(".fa.fa-subscript", {
                  on: {
                    click: this.$.on.subscript
                  }
                });
                this.i(".fa.fa-table", {
                  on: {
                    click: this.$.on.table
                  }
                });
                this.i(".fa.fa-list-ol", {
                  on: {
                    click: this.$.on.listOl
                  }
                });
                this.i(".fa.fa-list-ul", {
                  on: {
                    click: this.$.on.listUl
                  }
                });
                this.i(".fa.fa-indent", {
                  on: {
                    click: this.$.on.indent
                  }
                });
                this.i(".fa.fa-outdent", {
                  on: {
                    click: this.$.on.outdent
                  }
                });
                return this.i(".fa.fa-columns", {
                  on: {
                    click: this.$.on.sidenote
                  }
                });
              });
              return this.$.elems.textarea = this.textarea(".editor", {
                autocomplete: "off",
                spellcheck: "false"
              });
            });
            return this.$.elems.preview = this.div(".preview.seven.columns", function() {
              this.$.elems.errors = this.div(".row.error", null);
              return this.div(".row.wallapatta", function() {
                this.$.elems.previewMain = this.div(".nine.columns", null);
                return this.$.elems.previewSidebar = this.div(".three.columns", null);
              });
            });
          });
        });
      };

      Editor.initialize(function() {
        return this.elems = {};
      });

      Editor.listen('change', function() {
        return this.preview();
      });

      Editor.listen('parse', function(e) {
        e.preventDefault();
        return this.preview();
      });

      Editor.prototype.wrapSelection = function(b, e) {
        var s;
        s = this.editor.getSelection();
        this.editor.replaceSelection("" + b + s + e);
        return this.editor.focus();
      };

      Editor.prototype.addSegment = function(b) {
        var line, s;
        s = this.editor.getSelection();
        this.editor.replaceSelection("\n" + b + s + "\n");
        line = this.editor.getCursor().line;
        this.editor.indentLine(line - 1, 'prev');
        this.editor.indentLine(line, 'prev');
        this.editor.indentLine(line, 'add');
        return this.editor.focus();
      };

      Editor.listen('header', function() {
        return this.addSegment('#');
      });

      Editor.listen('bold', function() {
        return this.wrapSelection('**', '**');
      });

      Editor.listen('italic', function() {
        return this.wrapSelection('--', '--');
      });

      Editor.listen('inlineCode', function() {
        return this.wrapSelection('``', '``');
      });

      Editor.listen('link', function() {
        return this.wrapSelection('<<', '>>');
      });

      Editor.listen('inlineMedia', function() {
        return this.wrapSelection('[[', ']]');
      });

      Editor.listen('superscript', function() {
        return this.wrapSelection('^^', '^^');
      });

      Editor.listen('subscript', function() {
        return this.wrapSelection('__', '__');
      });

      Editor.listen('table', function() {
        var line, s;
        s = this.editor.getSelection();
        this.editor.replaceSelection("\n|||\ncol1|col2\n===\n1,1|1,2\n2,1|2,2\n" + s);
        line = this.editor.getCursor().line;
        this.editor.indentLine(line - 5, 'prev');
        this.editor.indentLine(line - 4, 'prev');
        this.editor.indentLine(line - 4, 'add');
        this.editor.indentLine(line - 3, 'prev');
        this.editor.indentLine(line - 2, 'prev');
        this.editor.indentLine(line - 1, 'prev');
        this.editor.indentLine(line, 'prev');
        this.editor.indentLine(line, 'subtract');
        return this.editor.focus();
      });

      Editor.listen('indent', function() {
        var i, sel, sels, _i, _len, _results;
        sels = this.editor.listSelections();
        _results = [];
        for (_i = 0, _len = sels.length; _i < _len; _i++) {
          sel = sels[_i];
          _results.push((function() {
            var _j, _ref, _ref1, _results1;
            _results1 = [];
            for (i = _j = _ref = sel.anchor.line, _ref1 = sel.head.line; _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = _ref <= _ref1 ? ++_j : --_j) {
              _results1.push(this.editor.indentLine(i, 'add'));
            }
            return _results1;
          }).call(this));
        }
        return _results;
      });

      Editor.listen('outdent', function() {
        var i, sel, sels, _i, _len, _results;
        sels = this.editor.listSelections();
        _results = [];
        for (_i = 0, _len = sels.length; _i < _len; _i++) {
          sel = sels[_i];
          _results.push((function() {
            var _j, _ref, _ref1, _results1;
            _results1 = [];
            for (i = _j = _ref = sel.anchor.line, _ref1 = sel.head.line; _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = _ref <= _ref1 ? ++_j : --_j) {
              _results1.push(this.editor.indentLine(i, 'subtract'));
            }
            return _results1;
          }).call(this));
        }
        return _results;
      });

      Editor.listen('listOl', function() {
        return this.addSegment('- ');
      });

      Editor.listen('listUl', function() {
        return this.addSegment('* ');
      });

      Editor.listen('sidenote', function() {
        var line, s;
        s = this.editor.getSelection();
        this.editor.replaceSelection("\n>>>\n" + s);
        line = this.editor.getCursor().line;
        this.editor.indentLine(line - 1, 'prev');
        this.editor.indentLine(line, 'prev');
        this.editor.indentLine(line, 'add');
        return this.editor.focus();
      });

      Editor.prototype.preview = function() {
        var e, parser, render, text;
        text = this.editor.getValue();
        this.elems.previewMain.innerHTML = '';
        this.elems.previewSidebar.innerHTML = '';
        parser = new Parser({
          text: text
        });
        try {
          parser.parse();
        } catch (_error) {
          e = _error;
          this.elems.errors.textContent = e.message;
          return;
        }
        this.elems.errors.textContent = '';
        render = parser.getRender();
        render.render(this.elems.previewMain, this.elems.previewSidebar);
        return window.requestAnimationFrame(function() {
          return render.mediaLoaded(function() {
            return render.setFills();
          });
        });
      };

      Editor.listen('setupEditor', function() {
        var height;
        this.editor = CodeMirror.fromTextArea(this.elems.textarea, {
          mode: "wallapatta",
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 1,
          indentUnit: 1,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        this.editor.on('change', this.on.change);
        height = window.innerHeight;
        console.log(height);
        this.editor.setSize(null, "" + (height - 100) + "px");
        this.elems.preview.style.maxHeight = "" + (height - 50) + "px";
        return this.editor.setValue(Sample);
      });

      Editor.prototype.render = function() {
        this.elems.container = document.body;
        Weya({
          elem: this.elems.container,
          context: this
        }, this.template);
        return window.requestAnimationFrame(this.on.setupEditor);
      };

      return Editor;

    })(Base);
    editor = new Editor;
    return editor.render();
  });

}).call(this);
