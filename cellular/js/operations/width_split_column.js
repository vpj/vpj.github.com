(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var PADDING, WidthSplitColumn;
    PADDING = 2;
    WidthSplitColumn = (function(superClass) {
      extend(WidthSplitColumn, superClass);

      function WidthSplitColumn() {
        return WidthSplitColumn.__super__.constructor.apply(this, arguments);
      }

      WidthSplitColumn.extend();

      WidthSplitColumn.initialize(function() {
        this.elems.inputs = [];
        return this.elems.lines = [];
      });

      WidthSplitColumn.prototype.operationName = 'Width Split Column';

      WidthSplitColumn.operationName = 'Width Split Column';

      WidthSplitColumn.prototype.type = 'widthSplitColumn';

      WidthSplitColumn.type = 'widthSplitColumn';

      WidthSplitColumn.prototype.json = function() {
        return {
          column: this.column,
          table: this.table.id,
          offsets: this.offsets
        };
      };

      WidthSplitColumn.prototype.setJson = function(json) {
        this.offsets = json.offsets;
        this.column = json.column;
        return this.table = this.editor.getTable(json.table);
      };

      WidthSplitColumn.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.$.elems.status = this.p('Select a column');
          this.$.elems.inputsDiv = this.div('');
          this.$.elems.btn = this.button('.u-full-width.button-primary', 'Split', {
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

      WidthSplitColumn.prototype._setData = function() {
        var i, j, n, ref, split;
        n = this.offsets.length;
        for (i = j = 1, ref = n; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
          split = this.offsets[i] - this.offsets[i - 1];
          this._addInput(split);
        }
        return this.refresh();
      };

      WidthSplitColumn.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      WidthSplitColumn.listen('apply', function(e) {
        var elems, j, len, offset, ref, v;
        e.preventDefault();
        offset = 0;
        this.offsets = [0];
        ref = this.elems.inputs;
        for (j = 0, len = ref.length; j < len; j++) {
          elems = ref[j];
          v = parseInt(elems.input.value);
          if (isNaN(v)) {
            continue;
          }
          if (v === 0) {
            continue;
          }
          offset += v;
          this.offsets.push(offset);
        }
        return this.callbacks.apply();
      });

      WidthSplitColumn.listen('tableSelect', function(r, c, table) {
        this.table = table;
        this.column = table.columns[c].id;
        this.table.clearHighlight();
        this.table.highlight.columns[c] = true;
        this.table.refresh();
        return this.refresh();
      });

      WidthSplitColumn.listen('change', function() {
        return this.refresh();
      });

      WidthSplitColumn.prototype._addInput = function(split) {
        var n;
        if (split == null) {
          split = 0;
        }
        n = this.elems.inputs.length;
        return Weya({
          elem: this.elems.inputsDiv,
          context: this
        }, function() {
          var elems;
          elems = {};
          elems.div = this.div(function() {
            this.label({
              "for": "split-" + n
            }, "Split " + (n + 1));
            return elems.input = this.input("#split-" + n + ".u-full-width", {
              value: "" + split,
              type: 'number',
              on: {
                change: this.$.on.change
              }
            });
          });
          return this.$.elems.inputs.push(elems);
        });
      };

      WidthSplitColumn.prototype._removeLines = function() {
        var elem, j, len, line, ref;
        elem = this.table.elems.container;
        ref = this.elems.lines;
        for (j = 0, len = ref.length; j < len; j++) {
          line = ref[j];
          elem.removeChild(line);
        }
        return this.elems.lines = [];
      };

      WidthSplitColumn.prototype._addLine = function(offset) {
        var col, j, len, ref;
        ref = this.table.columns;
        for (j = 0, len = ref.length; j < len; j++) {
          col = ref[j];
          if (col.id === this.column) {
            break;
          }
          offset += col.width;
        }
        offset += PADDING;
        return Weya({
          elem: this.table.elems.container,
          context: this
        }, function() {
          return this.$.elems.lines.push(this.div('.split-line', {
            style: {
              left: offset + "px"
            }
          }));
        });
      };

      WidthSplitColumn.prototype.refresh = function() {
        var elems, j, len, offset, ref, v, zero;
        if (this.table == null) {
          this.elems.btn.style.display = 'none';
          return;
        }
        this._removeLines();
        zero = false;
        offset = 0;
        ref = this.elems.inputs;
        for (j = 0, len = ref.length; j < len; j++) {
          elems = ref[j];
          v = parseInt(elems.input.value);
          if (isNaN(v)) {
            continue;
          }
          zero = v === 0;
          if (v === 0) {
            continue;
          }
          offset += v * this.table.dims.charWidth;
          this._addLine(offset);
        }
        if (!zero) {
          this._addInput();
        }
        if (offset > 0) {
          return this.elems.btn.style.display = 'block';
        } else {
          return this.elems.btn.style.display = 'none';
        }
      };

      WidthSplitColumn.prototype.apply = function() {
        var args, c, cidx, col, d, data, i, j, k, l, len, len1, m, nColumns, o, r, ref, ref1, ref2, ref3, results, v;
        cidx = -1;
        ref = this.table.columns;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          c = ref[i];
          if (c.id === this.column) {
            cidx = i;
          }
        }
        nColumns = this.offsets.length;
        col = this.table.columns[cidx];
        args = [cidx, 1];
        for (i = k = 1, ref1 = nColumns; 1 <= ref1 ? k <= ref1 : k >= ref1; i = 1 <= ref1 ? ++k : --k) {
          args.push({
            id: col.id + "_" + i,
            name: col.name + "_" + i,
            type: 'string',
            "default": ''
          });
        }
        this.table.columns.splice.apply(this.table.columns, args);
        data = (function() {
          var l, ref2, results;
          results = [];
          for (i = l = 0, ref2 = nColumns; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
            results.push([]);
          }
          return results;
        })();
        for (r = l = 0, ref2 = this.table.size; 0 <= ref2 ? l < ref2 : l > ref2; r = 0 <= ref2 ? ++l : --l) {
          v = "" + (this.table.data[col.id][r] || col["default"]);
          for (i = m = 0, ref3 = nColumns; 0 <= ref3 ? m < ref3 : m > ref3; i = 0 <= ref3 ? ++m : --m) {
            data[i].push(v.substring(this.offsets[i], this.offsets[i + 1]));
          }
        }
        delete this.table.data[col.id];
        results = [];
        for (i = o = 0, len1 = data.length; o < len1; i = ++o) {
          d = data[i];
          results.push(this.table.data[col.id + "_" + (i + 1)] = d);
        }
        return results;
      };

      return WidthSplitColumn;

    })(Base);
    return OPERATIONS.set(WidthSplitColumn.type, WidthSplitColumn);
  });

}).call(this);
