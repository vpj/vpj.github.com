(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var Trim;
    Trim = (function(superClass) {
      extend(Trim, superClass);

      function Trim() {
        return Trim.__super__.constructor.apply(this, arguments);
      }

      Trim.extend();

      Trim.initialize(function() {
        return this.columns = {};
      });

      Trim.prototype.operationName = 'Trim';

      Trim.operationName = 'Trim';

      Trim.prototype.type = 'trim';

      Trim.type = 'trim';

      Trim.prototype.json = function() {
        return {
          columns: this.columns,
          table: this.table.id
        };
      };

      Trim.prototype.setJson = function(json) {
        this.columns = json.columns;
        return this.table = this.editor.getTable(json.table);
      };

      Trim.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.$.elems.status = this.p('Select columns');
          this.$.elems.btn = this.button('.u-full-width.button-primary', 'Trim', {
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
          return this._setData();
        }
      };

      Trim.prototype._setData = function() {
        var c, col, j, len, ref;
        this.table.clearHighlight();
        ref = this.table.columns;
        for (c = j = 0, len = ref.length; j < len; c = ++j) {
          col = ref[c];
          if (this.columns[col.id]) {
            this.table.highlight.columns[c] = true;
          }
        }
        this.table.refresh();
        return this.refresh();
      };

      Trim.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      Trim.listen('tableSelect', function(r, c, table) {
        if ((this.table != null) && this.table.id !== table.id) {
          return;
        }
        this.table = table;
        if (this.columns[table.columns[c].id] === true) {
          delete this.columns[table.columns[c].id];
          this.table.highlight.columns[c] = false;
        } else {
          this.columns[table.columns[c].id] = true;
          this.table.highlight.columns[c] = true;
        }
        this.table.refresh();
        return this.refresh();
      });

      Trim.prototype.refresh = function() {
        if (this.table) {
          return this.elems.btn.style.display = 'block';
        } else {
          return this.elems.btn.style.display = 'none';
        }
      };

      Trim.listen('apply', function(e) {
        e.preventDefault();
        return this.callbacks.apply();
      });

      Trim.prototype.apply = function() {
        var i, id, results;
        results = [];
        for (id in this.columns) {
          results.push((function() {
            var j, ref, results1;
            results1 = [];
            for (i = j = 0, ref = this.table.size; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              if (this.table.data[id][i] != null) {
                results1.push(this.table.data[id][i] = ("" + this.table.data[id][i]).trim());
              }
            }
            return results1;
          }).call(this));
        }
        return results;
      };

      return Trim;

    })(Base);
    return OPERATIONS.set(Trim.type, Trim);
  });

}).call(this);
