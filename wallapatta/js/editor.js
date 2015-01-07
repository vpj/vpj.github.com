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
              this.$.elems.textarea = this.textarea(".editor", {
                autocomplete: "off",
                spellcheck: "false"
              });
              return this.$.elems.parse = this.button(".button-primary", {
                on: {
                  click: this.$.on.parse
                }
              }, "Render");
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
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        this.editor.on('change', this.on.change);
        height = window.innerHeight;
        console.log(height);
        this.editor.setSize(null, "" + (height - 120) + "px");
        this.elems.preview.style.maxHeight = "" + (height - 120) + "px";
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
