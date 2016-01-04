(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'CodeMirror', 'Parser', function(Base, CodeMirror, Parser) {
    var EDITOR, Editor;
    Editor = (function(superClass) {
      extend(Editor, superClass);

      function Editor() {
        return Editor.__super__.constructor.apply(this, arguments);
      }

      Editor.extend();

      Editor.prototype.template = function() {
        return this.$.elems.editorContainer = this.div(".container.wallapatta-editor", function() {
          return this.div(".row", function() {
            this.div(".five.columns", function() {
              this.div(".toolbar", function() {
                this.i(".fa.fa-pencil", {
                  on: {
                    click: this.$.on.yaml
                  }
                });
                this.i(".fa.fa-table", {
                  on: {
                    click: this.$.on.structured
                  }
                });
                this.i(".fa.fa-indent", {
                  on: {
                    click: this.$.on.indent
                  }
                });
                return this.i(".fa.fa-outdent", {
                  on: {
                    click: this.$.on.outdent
                  }
                });
              });
              this.$.elems.yaml = this.div(function() {
                return this.$.elems.textarea = this.textarea(".editor", {
                  autocomplete: "off",
                  spellcheck: "false"
                });
              });
              return this.$.elems.structured = this.div('.model-editor', '');
            });
            return this.$.elems.preview = this.div(".preview.seven.columns", function() {
              this.$.elems.errors = this.div(".row.error", null);
              return this.div(".row.wallapatta", function() {
                return this.$.elems.previewMain = this.div(".twelve.columns", null);
              });
            });
          });
        });
      };

      Editor.initialize(function() {
        this.elems = {};
        return this.parser = new Parser;
      });

      Editor.listen('change', function() {
        return this.previewYAML();
      });

      Editor.listen('yaml', function() {
        this.elems.yaml.style.display = 'block';
        this.elems.structured.style.display = 'none';
        return this.setText(this.parser.getText());
      });

      Editor.listen('structured', function() {
        this.elems.yaml.style.display = 'none';
        this.elems.structured.style.display = 'block';
        this.elems.structured.innerHTML = '';
        return this.parser.edit(this.elems.structured, this.on.structuredChange);
      });

      Editor.listen('structuredChange', function() {
        return this.previewStructured();
      });

      Editor.listen('indent', function() {
        var i, j, len, results, sel, sels;
        sels = this.editor.listSelections();
        results = [];
        for (j = 0, len = sels.length; j < len; j++) {
          sel = sels[j];
          results.push((function() {
            var k, ref, ref1, results1;
            results1 = [];
            for (i = k = ref = sel.anchor.line, ref1 = sel.head.line; ref <= ref1 ? k <= ref1 : k >= ref1; i = ref <= ref1 ? ++k : --k) {
              results1.push(this.editor.indentLine(i, 'add'));
            }
            return results1;
          }).call(this));
        }
        return results;
      });

      Editor.listen('outdent', function() {
        var i, j, len, results, sel, sels;
        sels = this.editor.listSelections();
        results = [];
        for (j = 0, len = sels.length; j < len; j++) {
          sel = sels[j];
          results.push((function() {
            var k, ref, ref1, results1;
            results1 = [];
            for (i = k = ref = sel.anchor.line, ref1 = sel.head.line; ref <= ref1 ? k <= ref1 : k >= ref1; i = ref <= ref1 ? ++k : --k) {
              results1.push(this.editor.indentLine(i, 'subtract'));
            }
            return results1;
          }).call(this));
        }
        return results;
      });

      Editor.prototype.setText = function(text) {
        return this.editor.setValue(text);
      };

      Editor.prototype.getText = function() {
        return this.editor.getValue();
      };

      Editor.prototype.previewYAML = function() {
        var e, error;
        this.elems.previewMain.innerHTML = '';
        this.parser.setText(this.getText());
        try {
          this.parser.parse();
        } catch (error) {
          e = error;
          this.elems.errors.textContent = e.message;
          return;
        }
        this.elems.errors.textContent = '';
        return this.parser.render(this.elems.previewMain);
      };

      Editor.prototype.previewStructured = function() {
        this.elems.previewMain.innerHTML = '';
        return this.parser.render(this.elems.previewMain);
      };

      Editor.listen('setupEditor', function() {
        var height;
        this.editor = CodeMirror.fromTextArea(this.elems.textarea, {
          mode: "yaml",
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 1,
          indentUnit: 1,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        this.editor.on('change', this.on.change);
        height = window.innerHeight;
        this.editor.setSize(null, (height - 100) + "px");
        this.elems.structured.style.height = (height - 100) + "px";
        this.elems.preview.style.maxHeight = (height - 50) + "px";
        this.editor.setValue('{}');
        return window.addEventListener('resize', this.on.resize);
      });

      Editor.listen('resize', function() {
        var height;
        height = window.innerHeight;
        this.editor.setSize(null, (height - 100) + "px");
        this.elems.structured.style.height = (height - 100) + "px";
        return this.elems.preview.style.maxHeight = (height - 50) + "px";
      });

      Editor.prototype.render = function(elem) {
        this.elems.container = elem;
        Weya({
          elem: this.elems.container,
          context: this
        }, this.template);
        this.elems.structured.style.display = 'none';
        return window.requestAnimationFrame(this.on.setupEditor);
      };

      return Editor;

    })(Base);
    EDITOR = new Editor;
    return Mod.set('Editor', EDITOR);
  });

}).call(this);
