(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mod.require('Weya.Base', 'CodeMirror', 'Docscript.Parser', 'Docscript.Sample', function(Base, CodeMirror, Parser, Sample) {
    var Editor, editor;
    Editor = (function(_super) {
      __extends(Editor, _super);

      function Editor() {
        return Editor.__super__.constructor.apply(this, arguments);
      }

      Editor.extend();

      Editor.prototype.template = function() {
        return this.div(".container-fluid", function() {
          return this.div(".row-fluid", function() {
            this.div(".col-md-5", function() {
              this.$.elems.textarea = this.textarea(".editor", {
                autocomplete: "off",
                spellcheck: "false"
              });
              return this.$.elems.parse = this.button(".btn.btn-default.btn-block", {
                on: {
                  click: this.$.on.parse
                }
              }, "Render");
            });
            return this.$.elems.preview = this.div(".preview.col-md-7", function() {
              this.div(".row.error", function() {
                return this.$.elems.errors = this.div(".col-md-12", null);
              });
              return this.div(".row.docscript", function() {
                this.$.elems.previewMain = this.div(".col-md-9", null);
                return this.$.elems.previewSidebar = this.div(".col-md-3", null);
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

      Editor.prototype.preview = function() {
        var e, parser, text;
        text = this.editor.getValue();
        this.elems.previewMain.innerHTML = '';
        this.elems.previewSidebar.innerHTML = '';
        parser = new Parser({
          text: text
        });
        parser.parse();
        try {
          parser.parse();
        } catch (_error) {
          e = _error;
          this.elems.errors.textContent = e.message;
          return;
        }
        this.elems.errors.textContent = '';
        parser.render(this.elems.previewMain, this.elems.previewSidebar);
        return window.requestAnimationFrame(function() {
          return parser.mediaLoaded(function() {
            return parser.setFills();
          });
        });
      };

      Editor.listen('setupEditor', function() {
        var height;
        this.editor = CodeMirror.fromTextArea(this.elems.textarea, {
          mode: "docscript",
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 1,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        this.editor.on('change', this.on.change);
        height = window.innerHeight;
        console.log(height);
        this.editor.setSize(null, "" + (height - 100) + "px");
        this.elems.preview.style.maxHeight = "" + (height - 100) + "px";
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
