(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var Append;
    Append = (function(superClass) {
      extend(Append, superClass);

      function Append() {
        return Append.__super__.constructor.apply(this, arguments);
      }

      Append.extend();

      Append.prototype.operationName = 'Append Data';

      Append.operationName = 'Append Data';

      Append.prototype.type = 'appendData';

      Append.type = 'appendData';

      Append.prototype.json = function() {
        return {
          column: this.column,
          data: this.data,
          table: this.table.id
        };
      };

      Append.prototype.setJson = function(json) {
        this.data = json.data;
        this.column = json.column;
        return this.table = this.editor.getTable(json.table);
      };

      Append.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.$.elems.status = this.p('Select a column');
          return this.button({
            on: {
              click: this.$.on.cancel
            }
          }, 'Cancel');
        });
        if (this.column != null) {
          return this.renderLoad();
        }
      };

      Append.prototype.renderLoad = function() {
        this.elems.content.innerHTML = '';
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.$.elems.file = this.input(".input-file", 'Open', {
            style: {
              display: "none"
            },
            type: "file",
            on: {
              change: this.$.on.changeFile
            }
          });
          this.button({
            on: {
              click: this.$.on.openFile
            }
          }, 'Open file');
          this.button({
            on: {
              click: this.$.on.cancel
            }
          }, 'Cancel');
          return this.button('.button-primary', {
            on: {
              click: this.$.on.loadData
            }
          }, 'Load');
        });
        Weya({
          elem: this.elems.content,
          context: this
        }, function() {
          return this.$.elems.textArea = this.textarea(".textarea-data", '', {
            autocomplete: "off",
            spellcheck: "false"
          });
        });
        return window.requestAnimationFrame(this.on.setupEditor);
      };

      Append.listen('setupEditor', function() {
        this.textEditor = CodeMirror.fromTextArea(this.elems.textArea, {
          mode: "text",
          lineNumbers: true,
          value: "Paste your data here",
          tabSize: 12
        });
        this.textEditor.setSize('100%', '100%');
        if (this.data != null) {
          return this._setData();
        }
      });

      Append.prototype._setData = function() {
        return this.textEditor.setValue(this.data);
      };

      Append.listen('openFile', function(e) {
        e.preventDefault();
        return this.elems.file.click();
      });

      Append.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      Append.listen('loadData', function(e) {
        e.preventDefault();
        this.data = this.textEditor.getValue();
        return this.callbacks.apply();
      });

      Append.listen('tableSelect', function(r, c, table) {
        this.table = table;
        this.column = table.columns[c].id;
        return this.renderLoad();
      });

      Append.prototype.apply = function() {
        var c, d, data, i, j, k, l, len, len1, ref, ref1;
        data = this.data.split('\n');
        ref = this.table.columns;
        for (j = 0, len = ref.length; j < len; j++) {
          c = ref[j];
          if (c.id === this.column) {
            for (i = k = 0, len1 = data.length; k < len1; i = ++k) {
              d = data[i];
              this.table.data[c.id].push(d);
            }
          }
          for (i = l = 0, ref1 = data.length; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
            this.table.data[c.id].push(c["default"]);
          }
        }
        return this.table.size += data.length;
      };

      Append.listen('changeFile', function(e) {
        var file, files, reader;
        files = this.elems.file.files;
        if (files.length > 0) {
          file = files[0];
          reader = new FileReader();
          console.time("readFile");
          reader.onload = (function(_this) {
            return function(e) {
              _this.skipChangeText = true;
              _this.textEditor.setValue(reader.result);
              return reader.result = null;
            };
          })(this);
          return reader.readAsText(file);
        }
      });

      return Append;

    })(Base);
    return OPERATIONS.set(Append.type, Append);
  });

}).call(this);
