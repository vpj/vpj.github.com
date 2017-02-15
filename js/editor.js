(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'CodeMirror', 'Wallapatta.Parser', 'Wallapatta.Sample', 'HLJS', function(Base, CodeMirror, Parser, Sample, HLJS) {
    var Editor;
    Editor = (function(superClass) {
      extend(Editor, superClass);

      function Editor() {
        return Editor.__super__.constructor.apply(this, arguments);
      }

      Editor.extend();

      Editor.prototype.template = function() {
        this.$.elems.editorContainer = this.div(".container.wallapatta-editor", function() {
          return this.div(".row", function() {
            this.div(".five.columns", function() {
              this.div(".toolbar", function() {
                this.div("#toolbar", function() {
                  return this.i(".fa.fa-print", {
                    on: {
                      click: this.$.on.print
                    }
                  });
                });
                this.div(function() {
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
                  this.i(".fa.fa-columns", {
                    on: {
                      click: this.$.on.sidenote
                    }
                  });
                  return this.i(".fa.fa-check", {
                    on: {
                      click: this.$.on.checkSpelling
                    }
                  });
                });
                return this.$.elems.pickMediaDialog = this.div(".pick-media-dialog", {
                  on: {
                    click: this.$.on.pickMediaClick
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
                this.$.elems.previewMain = this.div(".nine.columns", {
                  on: {
                    click: this.$.on.previewClick,
                    dblclick: this.$.on.previewDbClick
                  }
                });
                return this.$.elems.previewSidebar = this.div(".three.columns", {
                  on: {
                    click: this.$.on.previewClick,
                    dblclick: this.$.on.previewDbClick
                  }
                });
              });
            });
          });
        });
        this.$.elems.printForm = this.div(".container.print-form", {
          style: {
            display: 'none'
          }
        }, function() {
          return this.form(function() {
            this.button("Edit", {
              on: {
                click: this.$.on.closePrint
              }
            });
            return this.div(".row", function() {
              return this.div(".six.columns", function() {
                this.label({
                  "for": "width-input"
                }, "Width (mm)");
                this.$.elems.widthInput = this.input("#width-input.u-full-width", {
                  type: "number",
                  value: "170"
                });
                this.label({
                  "for": "height-input"
                }, "Height (mm)");
                this.$.elems.heightInput = this.input("#height-input.u-full-width", {
                  type: "number",
                  value: "225"
                });
                return this.button(".button-primary", "Print", {
                  on: {
                    click: this.$.on.renderPrint
                  }
                });
              });
            });
          });
        });
        return this.$.elems.printContainer = this.div(".container.wallapatta-container.wallapatta-print", function() {
          return this.$.elems.printDoc = this.div(".row.wallapatta", function() {
            this.$.elems.printMain = this.div(".nine.columns", null);
            return this.$.elems.printSidebar = this.div(".three.columns", null);
          });
        });
      };

      Editor.initialize(function(options) {
        var ref, ref1;
        this.openUrl = (ref = options.openUrl) != null ? ref : (function() {});
        this.onChangeListener = (ref1 = options.onChanged) != null ? ref1 : (function() {});
        this.elems = {};
        return this._isPrint = false;
      });

      Editor.listen('previewClick', function(e) {
        var n, node, results;
        if (this.renderer == null) {
          return;
        }
        node = e.target;
        results = [];
        while ((node != null) && node !== document.body) {
          n = this.renderer.getNodeFromElem(node);
          if ((n != null) && n.lineNumber) {
            this.editor.setCursor({
              line: n.lineNumber
            });
            break;
          }
          results.push(node = node.parentNode);
        }
        return results;
      });

      Editor.listen('previewDbClick', function(e) {
        var href, node, results;
        e.preventDefault();
        node = e.target;
        results = [];
        while ((node != null) && node !== document.body) {
          href = node.getAttribute('href');
          if (href != null) {
            this.openUrl(href);
            break;
          }
          results.push(node = node.parentNode);
        }
        return results;
      });

      Editor.listen('gutterClick', function(cm, line, where, e) {
        var elem, node, top;
        node = this.renderer.getNodeFromLine(line);
        if (node == null) {
          return;
        }
        elem = node.elem;
        if (elem == null) {
          return;
        }
        top = this.renderer.getOffsetTop(elem, this.elems.preview);
        return this.elems.preview.scrollTop = top;
      });

      Editor.listen('change', function() {
        this.preview();
        return this.onChangeListener();
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
        return this.pickMediaDialog();
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

      Editor.listen('checkSpelling', function() {
        return window.CHECK_SPELLING = !window.CHECK_SPELLING;
      });

      Editor.listen('print', function() {
        this.elems.editorContainer.classList.add('wallapatta-editor-print');
        this.elems.printContainer.style.display = 'block';
        return this.elems.printForm.style.display = 'block';
      });

      Editor.listen('renderPrint', function(e) {
        var HEIGHT, WIDTH, error, render, text;
        e.preventDefault();
        WIDTH = parseInt(this.elems.widthInput.value);
        if (isNaN(WIDTH)) {
          WIDTH = 170;
        }
        HEIGHT = parseInt(this.elems.heightInput.value);
        if (isNaN(HEIGHT)) {
          HEIGHT = 225;
        }
        text = this.editor.getValue();
        this.elems.printMain.innerHTML = '';
        this.elems.printSidebar.innerHTML = '';
        this.parser = new Parser({
          text: text
        });
        try {
          this.parser.parse();
        } catch (error) {
          e = error;
          this.elems.errors.textContent = e.message;
          return;
        }
        this.elems.errors.textContent = '';
        render = this.renderer = this.parser.getRender();
        render.render(this.elems.printMain, this.elems.printSidebar);
        this.elems.printContainer.style.width = WIDTH + "mm";
        return window.requestAnimationFrame((function(_this) {
          return function() {
            var height, ratio, width;
            ratio = _this.elems.printDoc.offsetWidth / WIDTH;
            width = ratio * WIDTH;
            height = ratio * HEIGHT;
            return render.mediaLoaded(function() {
              return setTimeout(function() {
                render.setPages(height, width);
                return window.requestAnimationFrame(function() {
                  return window.print();
                });
              }, 500);
            });
          };
        })(this));
      });

      Editor.listen('closePrint', function() {
        this.elems.editorContainer.classList.remove('wallapatta-editor-print');
        this.elems.printContainer.style.display = 'none';
        return this.elems.printForm.style.display = 'none';
      });

      Editor.prototype.setText = function(text) {
        return this.editor.setValue(text);
      };

      Editor.prototype.getText = function() {
        return this.editor.getValue();
      };

      Editor.prototype.preview = function() {
        var e, error, render, text;
        text = this.editor.getValue();
        this.elems.previewMain.innerHTML = '';
        this.elems.previewSidebar.innerHTML = '';
        this.parser = new Parser({
          text: text
        });
        try {
          this.parser.parse();
        } catch (error) {
          e = error;
          this.elems.errors.textContent = e.message;
          return;
        }
        this.elems.errors.textContent = '';
        render = this.renderer = this.parser.getRender();
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
          styleActiveLine: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        this.editor.on('change', this.on.change);
        height = window.innerHeight;
        this.editor.setSize(null, (height - 100) + "px");
        this.elems.preview.style.maxHeight = (height - 50) + "px";
        this.editor.setValue(Sample);
        this.editor.on('gutterClick', this.on.gutterClick);
        window.addEventListener('resize', this.on.resize);
        return window.requestAnimationFrame(this._onRendered);
      });

      Editor.listen('resize', function() {
        var height;
        height = window.innerHeight;
        this.editor.setSize(null, (height - 100) + "px");
        return this.elems.preview.style.maxHeight = (height - 50) + "px";
      });

      Editor.prototype.render = function(callback) {
        this._onRendered = callback;
        this.elems.container = document.body;
        Weya({
          elem: this.elems.container,
          context: this
        }, this.template);
        return window.requestAnimationFrame(this.on.setupEditor);
      };

      Editor.prototype.setResources = function(resources) {
        return this._resources = resources;
      };

      Editor.listen('pickMediaClick', function(e) {
        var n, path;
        this.elems.pickMediaDialog.style.display = 'none';
        n = e.target;
        path = null;
        while (n) {
          if (n._path != null) {
            path = n._path;
            break;
          }
          n = e.parentNode;
        }
        if (path == null) {
          return this.wrapSelection('[[', ']]');
        }
        return this.wrapSelection("[[" + path + "]]", '');
      });

      Editor.prototype.pickMediaDialog = function() {
        var resources, s;
        s = this.editor.getSelection();
        if (s.trim() !== '') {
          return this.wrapSelection('[[', ']]');
        }
        this.elems.pickMediaDialog.style.display = 'block';
        this.elems.pickMediaDialog.innerHTML = '';
        resources = this._resources;
        return Weya({
          elem: this.elems.pickMediaDialog
        }, function() {
          var d, j, len, path, results;
          this.div('Blank');
          results = [];
          for (j = 0, len = resources.length; j < len; j++) {
            path = resources[j];
            d = this.div(path);
            results.push(d._path = path);
          }
          return results;
        });
      };

      return Editor;

    })(Base);
    return Mod.set('Editor', Editor);
  });

}).call(this);
