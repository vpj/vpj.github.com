(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var DelimiterSeparateColumn;
    DelimiterSeparateColumn = (function(superClass) {
      extend(DelimiterSeparateColumn, superClass);

      function DelimiterSeparateColumn() {
        return DelimiterSeparateColumn.__super__.constructor.apply(this, arguments);
      }

      DelimiterSeparateColumn.extend();

      DelimiterSeparateColumn.prototype.operationName = 'Delimiter Separate';

      DelimiterSeparateColumn.operationName = 'Delimiter Separate';

      DelimiterSeparateColumn.prototype.type = 'delimiterSeparate';

      DelimiterSeparateColumn.type = 'delimiterSeparate';

      DelimiterSeparateColumn.prototype.json = function() {
        return {
          column: this.column,
          delimiter: this.delimiter,
          quote: this.quote,
          table: this.table.id
        };
      };

      DelimiterSeparateColumn.prototype.setJson = function(json) {
        this.column = json.column;
        this.delimiter = json.delimiter;
        this.quote = json.quote;
        return this.table = this.editor.getTable(json.table);
      };

      DelimiterSeparateColumn.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.$.elems.status = this.p('Select a column');
          this.label({
            "for": 'delimiter-input'
          }, 'Delimiter');
          this.$.elems.delimiter = this.input('#delimiter-input.u-full-width', {
            value: ',',
            type: 'text',
            on: {
              change: this.$.on.change
            }
          });
          this.label({
            "for": 'quote-input'
          }, 'Quote');
          this.$.elems.quote = this.input('#quote-input.u-full-width', {
            value: '"',
            type: 'text',
            on: {
              change: this.$.on.change
            }
          });
          this.$.elems.btn = this.button('.u-full-width.button-primary', 'Separate', {
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
        if (this.column != null) {
          return this._setData();
        }
      };

      DelimiterSeparateColumn.prototype._setData = function() {
        var c, col, delimiter, k, len, ref;
        delimiter = this.delimiter;
        if (delimiter === ' ') {
          delimiter = 'SPACE';
        } else if (delimiter === '\t') {
          delimiter = 'TAB';
        }
        this.elems.delimiter.value = delimiter;
        this.elems.quote.value = this.quote;
        this.table.clearHighlight();
        ref = this.table.columns;
        for (c = k = 0, len = ref.length; k < len; c = ++k) {
          col = ref[c];
          if (col.id === this.column) {
            this.table.highlight.columns[c] = true;
          }
        }
        this.table.refresh();
        return this.refresh();
      };

      DelimiterSeparateColumn.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      DelimiterSeparateColumn.listen('tableSelect', function(r, c, table) {
        this.table = table;
        this.column = table.columns[c].id;
        this.table.clearHighlight();
        this.table.highlight.columns[c] = true;
        this.table.refresh();
        return this.refresh();
      });

      DelimiterSeparateColumn.listen('change', function() {
        return this.refresh();
      });

      DelimiterSeparateColumn.prototype.refresh = function() {
        if (this.table && this.elems.delimiter.value.trim() !== '') {
          return this.elems.btn.style.display = 'block';
        } else {
          return this.elems.btn.style.display = 'none';
        }
      };

      DelimiterSeparateColumn.listen('apply', function(e) {
        var i, k, l, n, ref, ref1;
        e.preventDefault();
        this.delimiter = this.elems.delimiter.value.trim();
        this.quote = this.elems.quote.value.trim();
        if ((this.delimiter.substr(0, 3)) === 'TAB') {
          n = parseInt(this.delimiter.substr(3));
          if (isNaN(n)) {
            n = 1;
          }
          this.delimiter = '';
          for (i = k = 0, ref = n; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
            this.delimiter += '\t';
          }
        }
        if (this.delimiter === 'SPACE') {
          n = parseInt(this.delimiter.substr(5));
          if (isNaN(n)) {
            n = 1;
          }
          this.delimiter = '';
          for (i = l = 0, ref1 = n; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
            this.delimiter += ' ';
          }
        }
        return this.callbacks.apply();
      });

      DelimiterSeparateColumn.prototype.apply = function() {
        var a, args, c, cidx, col, column, d, data, i, j, k, l, len, len1, len2, len3, m, nColumns, o, p, q, r, ref, ref1, ref2, results, t;
        cidx = -1;
        ref = this.table.columns;
        for (i = k = 0, len = ref.length; k < len; i = ++k) {
          c = ref[i];
          if (c.id === this.column) {
            cidx = i;
          }
        }
        column = this.table.data[this.column];
        data = [];
        for (r = l = 0, len1 = column.length; l < len1; r = ++l) {
          d = column[r];
          if (d == null) {
            d = '';
          }
          d = dsv({
            separator: this.delimiter,
            quote: this.quote,
            text: d
          });
          while (d.length < data.length) {
            d.push(['']);
          }
          for (i = m = 0, len2 = d.length; m < len2; i = ++m) {
            t = d[i];
            if (data.length <= i) {
              a = new Array(r);
              for (j = o = 0, ref1 = r; 0 <= ref1 ? o < ref1 : o > ref1; j = 0 <= ref1 ? ++o : --o) {
                a[j] = '';
              }
              data.push(a);
            }
            data[i].push(t[0]);
          }
        }
        nColumns = data.length;
        col = this.table.columns[cidx];
        args = [cidx, 1];
        for (i = p = 1, ref2 = nColumns; 1 <= ref2 ? p <= ref2 : p >= ref2; i = 1 <= ref2 ? ++p : --p) {
          args.push({
            id: col.id + "_" + i,
            name: col.name + "_" + i,
            type: 'string',
            "default": ''
          });
        }
        delete this.table.data[col.id];
        this.table.columns.splice.apply(this.table.columns, args);
        results = [];
        for (i = q = 0, len3 = data.length; q < len3; i = ++q) {
          d = data[i];
          results.push(this.table.data[col.id + "_" + (i + 1)] = d);
        }
        return results;
      };

      return DelimiterSeparateColumn;

    })(Base);
    return OPERATIONS.set(DelimiterSeparateColumn.type, DelimiterSeparateColumn);
  });

}).call(this);
