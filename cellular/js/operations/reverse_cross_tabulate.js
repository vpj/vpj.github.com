(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var ReverseCrossTabulate;
    ReverseCrossTabulate = (function(superClass) {
      extend(ReverseCrossTabulate, superClass);

      function ReverseCrossTabulate() {
        return ReverseCrossTabulate.__super__.constructor.apply(this, arguments);
      }

      ReverseCrossTabulate.extend();

      ReverseCrossTabulate.initialize(function() {
        this.elems.inputs = {};
        return this.columns = {};
      });

      ReverseCrossTabulate.prototype.operationName = 'Reverse Cross Tabulate';

      ReverseCrossTabulate.operationName = 'Reverse Cross Tabulate';

      ReverseCrossTabulate.prototype.type = 'reverseCrossTabulate';

      ReverseCrossTabulate.type = 'reverseCrossTabulate';

      ReverseCrossTabulate.prototype.json = function() {
        return {
          table: this.table.id,
          columns: this.columns
        };
      };

      ReverseCrossTabulate.prototype.setJson = function(json) {
        this.table = this.editor.getTable(json.table);
        return this.columns = json.columns;
      };

      ReverseCrossTabulate.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.$.elems.btn = this.button('.u-full-width.button-primary', 'Convert to rows', {
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

      ReverseCrossTabulate.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      ReverseCrossTabulate.listen('apply', function(e) {
        e.preventDefault();
        return this.callbacks.apply();
      });

      ReverseCrossTabulate.listen('tableSelect', function(r, c, table, event) {
        var i, k, l, ref, ref1;
        this.table = table;
        if (event.shiftKey) {
          if (this.columns[c]) {
            for (i = k = ref = c; ref <= 0 ? k <= 0 : k >= 0; i = ref <= 0 ? ++k : --k) {
              if (!this.columns[i]) {
                break;
              }
              delete this.columns[i];
            }
          } else {
            for (i = l = ref1 = c; ref1 <= 0 ? l <= 0 : l >= 0; i = ref1 <= 0 ? ++l : --l) {
              if (this.columns[i]) {
                break;
              }
              this.columns[i] = true;
            }
          }
        } else {
          if (this.columns[c]) {
            delete this.columns[c];
          } else {
            this.columns[c] = true;
          }
        }
        return this.refresh();
      });

      ReverseCrossTabulate.prototype.refresh = function() {
        var c, n;
        n = 0;
        for (c in this.columns) {
          n++;
        }
        if (n > 1) {
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

      ReverseCrossTabulate.prototype.apply = function() {
        var col, columns, d, data, i, id, idHead, j, k, l, len, len1, len2, len3, m, n, o, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, s, sampleCol, size, t;
        n = 0;
        ref = this.table.columns;
        for (i = k = 0, len = ref.length; k < len; i = ++k) {
          col = ref[i];
          if (!this.columns[i]) {
            continue;
          }
          id = col.id;
          sampleCol = col;
          n++;
        }
        idHead = id + "_0";
        id = id + "_1";
        data = {};
        size = this.table.size;
        ref1 = this.table.columns;
        for (i = l = 0, len1 = ref1.length; l < len1; i = ++l) {
          col = ref1[i];
          if (!(!this.columns[i])) {
            continue;
          }
          data[col.id] = [];
          for (r = o = 0, ref2 = size; 0 <= ref2 ? o < ref2 : o > ref2; r = 0 <= ref2 ? ++o : --o) {
            d = this.table.data[col.id][r];
            for (j = p = 0, ref3 = n; 0 <= ref3 ? p < ref3 : p > ref3; j = 0 <= ref3 ? ++p : --p) {
              data[col.id].push(d);
            }
          }
        }
        this.table.size *= n;
        data[id] = new Array(this.table.size);
        data[idHead] = new Array(this.table.size);
        m = 0;
        ref4 = this.table.columns;
        for (i = q = 0, len2 = ref4.length; q < len2; i = ++q) {
          col = ref4[i];
          if (!this.columns[i]) {
            continue;
          }
          for (j = s = 0, ref5 = size; 0 <= ref5 ? s < ref5 : s > ref5; j = 0 <= ref5 ? ++s : --s) {
            d = this.table.data[col.id][j];
            data[id][m + j * n] = d;
            data[idHead][m + j * n] = col.name;
          }
          m++;
        }
        columns = [];
        ref6 = this.table.columns;
        for (i = t = 0, len3 = ref6.length; t < len3; i = ++t) {
          col = ref6[i];
          if (!this.columns[i]) {
            columns.push(col);
          }
        }
        columns.push({
          id: idHead,
          name: idHead,
          type: sampleCol.type,
          "default": sampleCol["default"]
        });
        columns.push({
          id: id,
          name: id,
          type: sampleCol.type,
          "default": sampleCol["default"]
        });
        this.table.columns = columns;
        return this.table.data = data;
      };

      return ReverseCrossTabulate;

    })(Base);
    return OPERATIONS.set(ReverseCrossTabulate.type, ReverseCrossTabulate);
  });

}).call(this);
