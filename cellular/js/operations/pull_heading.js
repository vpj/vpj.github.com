(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var PullHeadings;
    PullHeadings = (function(superClass) {
      extend(PullHeadings, superClass);

      function PullHeadings() {
        return PullHeadings.__super__.constructor.apply(this, arguments);
      }

      PullHeadings.extend();

      PullHeadings.initialize(function() {
        return this.elems.inputs = {};
      });

      PullHeadings.prototype.operationName = 'Pull Headings';

      PullHeadings.operationName = 'Pull Headings';

      PullHeadings.prototype.type = 'pullHeadings';

      PullHeadings.type = 'pullHeadings';

      PullHeadings.prototype.json = function() {
        return {
          table: this.table.id,
          row: this.row
        };
      };

      PullHeadings.prototype.setJson = function(json) {
        this.row = json.row;
        return this.table = this.editor.getTable(json.table);
      };

      PullHeadings.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.$.elems.btn = this.button('.u-full-width.button-primary', 'Pull', {
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

      PullHeadings.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      PullHeadings.listen('apply', function(e) {
        e.preventDefault();
        return this.callbacks.apply();
      });

      PullHeadings.listen('tableSelect', function(r, c, table) {
        this.table = table;
        this.row = r;
        return this.refresh();
      });

      PullHeadings.prototype.refresh = function() {
        this.table.highlight.rows = {};
        if (this.row != null) {
          this.table.highlight.rows[this.row] = true;
          this.elems.btn.style.display = 'block';
        } else {
          this.elems.btn.style.display = 'none';
        }
        return this.table.refresh();
      };

      PullHeadings.prototype.apply = function() {
        var col, data, i, id, j, len, name, r, ref, ref1, results, temp, v;
        if (this.row == null) {
          return;
        }
        ref = this.table.columns;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          col = ref[i];
          name = this.table.data[col.id][this.row];
          name = name.trim();
          if (name === '') {
            continue;
          }
          if (this.table.data[name] != null) {
            continue;
          }
          temp = this.table.data[col.id];
          delete this.table.data[col.id];
          this.table.data[name] = temp;
          col.id = col.name = name;
        }
        ref1 = this.table.data;
        results = [];
        for (id in ref1) {
          data = ref1[id];
          this.table.data[id] = (function() {
            var k, len1, results1;
            results1 = [];
            for (r = k = 0, len1 = data.length; k < len1; r = ++k) {
              v = data[r];
              if (r !== this.row) {
                results1.push(v);
              }
            }
            return results1;
          }).call(this);
          results.push(this.table.size = this.table.data[id].length);
        }
        return results;
      };

      return PullHeadings;

    })(Base);
    return OPERATIONS.set(PullHeadings.type, PullHeadings);
  });

}).call(this);
