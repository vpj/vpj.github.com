(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var AAString, AddColumn, CHARS;
    CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    AAString = function(n) {
      var i, j, ref, rev, s;
      if (n === 0) {
        return 'A';
      }
      s = '';
      while (n > 0) {
        s += CHARS[n % CHARS.length];
        n = Math.floor(n / CHARS.length);
      }
      rev = '';
      for (i = j = 1, ref = s.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        rev += s[s.length - i];
      }
      return rev;
    };
    AddColumn = (function(superClass) {
      extend(AddColumn, superClass);

      function AddColumn() {
        return AddColumn.__super__.constructor.apply(this, arguments);
      }

      AddColumn.extend();

      AddColumn.prototype.operationName = 'Add Column';

      AddColumn.operationName = 'Add Column';

      AddColumn.prototype.type = 'addColumn';

      AddColumn.type = 'addColumn';

      AddColumn.prototype.json = function() {
        return {
          data: this.data,
          table: this.table.id
        };
      };

      AddColumn.prototype.setJson = function(json) {
        this.data = json.data;
        return this.table = this.editor.getTable(json.table);
      };

      AddColumn.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        this.elems.content.innerHTML = '';
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
          this.button(".u-full-width", {
            on: {
              click: this.$.on.openFile
            }
          }, 'Open file');
          this.button(".u-full-width.button-primary", {
            on: {
              click: this.$.on.apply
            }
          }, 'Load');
          return this.button(".u-full-width", {
            on: {
              click: this.$.on.cancel
            }
          }, 'Cancel');
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

      AddColumn.listen('setupEditor', function() {
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

      AddColumn.prototype._setData = function() {
        return this.textEditor.setValue(this.data);
      };

      AddColumn.listen('openFile', function(e) {
        e.preventDefault();
        return this.elems.file.click();
      });

      AddColumn.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      AddColumn.listen('apply', function(e) {
        e.preventDefault();
        this.data = this.textEditor.getValue();
        this.table = this.editor.getTable();
        return this.callbacks.apply();
      });

      AddColumn.prototype.apply = function() {
        var c, column, data, i, id, ids, j, k, l, len, len1, m, o, ref, ref1, ref2, ref3, ref4;
        data = this.data.split('\n');
        if (data.length < this.table.size) {
          for (i = j = 0, ref = this.table.size - data.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            data.push('');
          }
        } else if (data.length > this.table.size) {
          ref1 = this.table.columns;
          for (k = 0, len = ref1.length; k < len; k++) {
            c = ref1[k];
            for (i = l = 0, ref2 = data.length - this.table.size; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
              this.table.data[c.id].push(c["default"]);
            }
          }
        }
        ids = {};
        ref3 = this.table.columns;
        for (m = 0, len1 = ref3.length; m < len1; m++) {
          c = ref3[m];
          ids[c.id] = true;
        }
        id = 'A';
        for (i = o = 0, ref4 = this.table.columns.length; 0 <= ref4 ? o < ref4 : o > ref4; i = 0 <= ref4 ? ++o : --o) {
          id = AAString(i);
          if (ids[id] == null) {
            break;
          }
        }
        column = id;
        this.table.columns.push({
          id: id,
          name: id,
          type: 'string',
          "default": ''
        });
        this.table.data[id] = data;
        return this.table.size = data.length;
      };

      AddColumn.listen('changeFile', function(e) {
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

      return AddColumn;

    })(Base);
    return OPERATIONS.set(AddColumn.type, AddColumn);
  });

}).call(this);
