(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var DeleteColumns;
    DeleteColumns = (function(superClass) {
      extend(DeleteColumns, superClass);

      function DeleteColumns() {
        return DeleteColumns.__super__.constructor.apply(this, arguments);
      }

      DeleteColumns.extend();

      DeleteColumns.initialize(function(options) {
        this.elems.inputs = {};
        return this.columns = {};
      });

      DeleteColumns.prototype.operationName = 'Delete Columns';

      DeleteColumns.operationName = 'Delete Columns';

      DeleteColumns.prototype.type = 'deleteColumns';

      DeleteColumns.type = 'deleteColumns';

      DeleteColumns.prototype.json = function() {
        return {
          table: this.table.id,
          columns: this.columns
        };
      };

      DeleteColumns.prototype.setJson = function(json) {
        this.table = this.editor.getTable(json.table);
        return this.columns = json.columns;
      };

      DeleteColumns.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.$.elems.btn = this.button('.u-full-width.button-primary', 'Delete', {
            on: {
              click: this.$.on.apply
            },
            style: {
              display: 'none'
            }
          });
          return this.button('.u-full-width', {
            on: {
              click: this.$.on.cancel
            }
          }, 'Cancel');
        });
        if (this.table != null) {
          return this.refresh();
        }
      };

      DeleteColumns.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      DeleteColumns.listen('apply', function(e) {
        e.preventDefault();
        return this.callbacks.apply();
      });

      DeleteColumns.listen('tableSelect', function(r, c, table) {
        this.table = table;
        if (this.columns[c]) {
          delete this.columns[c];
        } else {
          this.columns[c] = true;
        }
        return this.refresh();
      });

      DeleteColumns.prototype.refresh = function() {
        var c, n;
        n = 0;
        for (c in this.columns) {
          n++;
        }
        if (n > 0) {
          this.elems.btn.style.display = 'block';
        } else {
          this.elems.btn.style.display = 'none';
        }
        this.table.highlight.columns = {};
        for (c in this.columns) {
          this.table.highlight.columns[c] = true;
        }
        return this.table.refresh();
      };

      DeleteColumns.prototype.apply = function() {
        var col, columns, i, j, len, ref;
        columns = [];
        ref = this.table.columns;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          col = ref[i];
          if (this.columns[i]) {
            delete this.table.data[col.id];
          } else {
            columns.push(col);
          }
        }
        return this.table.columns = columns;
      };

      return DeleteColumns;

    })(Base);
    return OPERATIONS.set(DeleteColumns.type, DeleteColumns);
  });

}).call(this);
