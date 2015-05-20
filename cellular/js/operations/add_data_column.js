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

      AddColumn.prototype.name = 'Add Column';

      AddColumn.name = 'Add Column';

      AddColumn.prototype.type = 'addColumn';

      AddColumn.type = 'addColumn';

      AddColumn.prototype.json = function() {
        return {
          columns: this.columns
        };
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
          this.button({
            on: {
              click: this.$.on.openFile
            }
          }, 'Open file');
          this.button('.button-primary', {
            on: {
              click: this.$.on.loadData
            }
          }, 'Load');
          return this.button({
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
        return this.textEditor.setSize('100%', '100%');
      });

      AddColumn.listen('openFile', function(e) {
        e.preventDefault();
        return this.elems.file.click();
      });

      AddColumn.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      AddColumn.listen('loadData', function(e) {
        var text;
        e.preventDefault();
        text = this.textEditor.getValue();
        this.data = text.split('\n');
        this.table = this.editor.getTable();
        return this.callbacks.apply();
      });

      AddColumn.prototype.apply = function() {
        var c, i, id, ids, j, k, l, len, len1, m, o, ref, ref1, ref2, ref3, ref4;
        if (this.data.length < this.table.size) {
          for (i = j = 0, ref = this.table.size - this.data.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            this.data.push('');
          }
        } else if (this.data.length > this.table.size) {
          ref1 = this.table.columns;
          for (k = 0, len = ref1.length; k < len; k++) {
            c = ref1[k];
            for (i = l = 0, ref2 = this.data.length - this.table.size; 0 <= ref2 ? l <= ref2 : l >= ref2; i = 0 <= ref2 ? ++l : --l) {
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
        this.table.columns.push({
          id: id,
          name: id,
          type: 'string',
          "default": ''
        });
        return this.table.data[id] = this.data;
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
