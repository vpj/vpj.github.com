(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mod.require('Weya.Base', 'CodeMirror', 'Docscript.Parser', function(Base, CodeMirror, Parser) {
    var Editor, editor;
    Editor = (function(_super) {
      __extends(Editor, _super);

      function Editor() {
        return Editor.__super__.constructor.apply(this, arguments);
      }

      Editor.extend();

      Editor.prototype.template = function() {
        return this.div(".container", function() {
          this.div(".row", function() {
            return this.div(".col-md-12", function() {
              return this.$.elems.textarea = this.textarea(".editor", {
                autocomplete: "off",
                spellcheck: "false"
              });
            });
          });
          this.div(".row", function() {
            return this.div(".col-md-12", function() {
              return this.$.elems.parse = this.button(".btn.btn-default.btn-block", {
                on: {
                  click: this.$.on.parse
                }
              }, "Render");
            });
          });
          return this.div(".row.docscript", function() {
            this.$.elems.previewMain = this.div(".col-md-9", null);
            return this.$.elems.previewSidebar = this.div(".col-md-3", null);
          });
        });
      };

      Editor.initialize(function() {
        return this.elems = {};
      });

      Editor.listen('parse', function(e) {
        var parser, text;
        e.preventDefault();
        text = this.editor.getValue();
        console.log("Parse", text);
        parser = new Parser({
          text: text
        });
        parser.parse();
        this.elems.previewMain.innerHTML = '';
        this.elems.previewSidebar.innerHTML = '';
        parser.render(this.elems.previewMain, this.elems.previewSidebar);
        return console.log(parser.root);
      });

      Editor.listen('setupEditor', function() {
        return this.editor = CodeMirror.fromTextArea(this.elems.textarea, {
          mode: "text",
          lineNumbers: true,
          tabSize: 1
        });
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
