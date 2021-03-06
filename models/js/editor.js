(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'CodeMirror', 'YAML', 'Models.Models', function(Base, CodeMirror, YAML, MODELS) {
    var Editor;
    Editor = (function(superClass) {
      extend(Editor, superClass);

      function Editor() {
        return Editor.__super__.constructor.apply(this, arguments);
      }

      Editor.extend();

      Editor.prototype.template = function() {
        return this.$.elems.editorContainer = this.div(".model-editor", function() {
          this.div(".model-editor-container", function() {
            this.div(".toolbar", function() {
              var tools;
              tools = this.$.elems.toolbar = {};
              tools.yaml = this.i(".fa.fa-lg.fa-pencil", {
                on: {
                  click: this.$.on.yaml
                }
              });
              tools.structured = this.i(".fa.fa-lg.fa-table", {
                on: {
                  click: this.$.on.structured
                }
              });
              tools.indent = this.i(".fa.fa-indent", {
                on: {
                  click: this.$.on.indent
                }
              });
              return tools.outdent = this.i(".fa.fa-outdent", {
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
            return this.$.elems.structured = this.div('.structured-editor', '');
          });
          return this.$.elems.preview = this.div(".model-preview-container", function() {
            this.$.elems.errors = this.div(".error", null);
            return this.$.elems.previewMain = this.div(".model-preview", '');
          });
        });
      };

      Editor.initialize(function(options) {
        this.elems = {};
        this.options = options;
        return this._editMode = 'yaml';
      });

      Editor.prototype.yaml = function() {
        var json, text;
        this._editMode = 'yaml';
        this.elems.yaml.style.display = 'block';
        this.elems.toolbar.yaml.style.display = 'none';
        this.elems.toolbar.structured.style.display = 'inline-block';
        this.elems.toolbar.indent.style.display = 'inline-block';
        this.elems.toolbar.outdent.style.display = 'inline-block';
        this.elems.structured.style.display = 'none';
        json = this.model.toJSON();
        text = YAML.stringify(json, 10);
        return this.editor.setValue(text);
      };

      Editor.prototype.structured = function() {
        this._editMode = 'structured';
        this.elems.yaml.style.display = 'none';
        this.elems.toolbar.yaml.style.display = 'inline-block';
        this.elems.toolbar.structured.style.display = 'none';
        this.elems.toolbar.indent.style.display = 'none';
        this.elems.toolbar.outdent.style.display = 'none';
        this.elems.structured.style.display = 'block';
        this.elems.structured.innerHTML = '';
        return this.model.edit(this.elems.structured, this.on.structuredChange);
      };

      Editor.prototype.getModel = function() {
        return this.model;
      };

      Editor.prototype.setJSON = function(json) {
        var text;
        this._loadJSON(json);
        if (this._editMode === 'yaml') {
          text = YAML.stringify(json, 10);
          return this.editor.setValue(text);
        } else {
          this.elems.structured.innerHTML = '';
          return this.model.edit(this.elems.structured, this.on.structuredChange);
        }
      };

      Editor.listen('yaml', function() {
        return this.yaml();
      });

      Editor.listen('structured', function() {
        return this.structured();
      });

      Editor.listen('yamlChange', function() {
        var e, error, json;
        this.elems.previewMain.innerHTML = '';
        try {
          json = YAML.parse(this.editor.getValue());
        } catch (error) {
          e = error;
          this.elems.errors.textContent = e.message;
          return;
        }
        return this._loadJSON(json);
      });

      Editor.listen('structuredChange', function(value, changed) {
        this.elems.previewMain.innerHTML = '';
        if (changed != null) {
          this.model = value;
        }
        return this.model.render(this.elems.previewMain);
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

      Editor.prototype._loadJSON = function(json) {
        var e, error, res;
        this.model = new (MODELS.get(this.options.model));
        try {
          res = this.model.parse(json);
        } catch (error) {
          e = error;
          this.elems.errors.textContent = e.message;
          return;
        }
        this.elems.errors.textContent = '';
        return this.model.render(this.elems.previewMain);
      };

      Editor.listen('setupEditor', function() {
        this.editor = CodeMirror.fromTextArea(this.elems.textarea, {
          mode: "yaml",
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 1,
          indentUnit: 1,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        this.editor.on('change', this.on.yamlChange);
        this.resize(this.size);
        this.editor.setValue('{}');
        return this.onRendered();
      });

      Editor.prototype.resize = function(size) {
        var height;
        this.size = size;
        height = this.size.height;
        this.editor.setSize(null, (height - 100) + "px");
        this.elems.structured.style.height = (height - 100) + "px";
        return this.elems.preview.style.maxHeight = (height - 50) + "px";
      };

      Editor.prototype.render = function(elem, size, rendered) {
        this.elems.container = elem;
        this.size = size;
        this.onRendered = rendered;
        Weya({
          elem: this.elems.container,
          context: this
        }, this.template);
        this.elems.structured.style.display = 'none';
        this.elems.toolbar.yaml.style.display = 'none';
        return window.requestAnimationFrame(this.on.setupEditor);
      };

      return Editor;

    })(Base);
    return Mod.set('Models.Editor', Editor);
  });

}).call(this);
