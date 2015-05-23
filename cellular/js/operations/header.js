(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var Header;
    Header = (function(superClass) {
      extend(Header, superClass);

      function Header() {
        return Header.__super__.constructor.apply(this, arguments);
      }

      Header.extend();

      Header.initialize(function() {
        return this.elems.inputs = {};
      });

      Header.prototype.operationName = 'Header';

      Header.operationName = 'Header';

      Header.prototype.type = 'header';

      Header.type = 'header';

      Header.prototype.json = function() {
        return {
          table: this.table.id,
          top: this.top,
          bottom: this.bottom,
          search: this.search
        };
      };

      Header.prototype.setJson = function(json) {
        this.top = json.top;
        this.bottom = json.bottom;
        this.search = json.search;
        return this.table = this.editor.getTable(json.table);
      };

      Header.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.label({
            "for": 'toprows-input'
          }, 'Top rows');
          this.$.elems.topRows = this.input('#toprows-input.u-full-width', {
            value: '0',
            type: 'number',
            on: {
              change: this.$.on.change
            }
          });
          this.label({
            "for": 'bottomrows-input'
          }, 'Bottom rows');
          this.$.elems.bottomRows = this.input('#bottomrows-input.u-full-width', {
            value: '0',
            type: 'number',
            on: {
              change: this.$.on.change
            }
          });
          this.$.elems.inputsDiv = this.div({
            on: {
              click: this.$.on.removeClick
            }
          });
          this.button({
            on: {
              click: this.$.on.cancel
            }
          }, 'Cancel');
          return this.$.elems.btn = this.button('.button-primary', 'Header', {
            on: {
              click: this.$.on.apply
            },
            style: {
              display: 'none'
            }
          });
        });
        if (this.table != null) {
          return this._setData();
        }
      };

      Header.prototype._setData = function() {
        var col, id, j, len, name, ref, ref1, value;
        this.elems.topRows.value = "" + this.top;
        this.elems.bottomRows.value = "" + this.bottom;
        ref = this.search;
        for (id in ref) {
          value = ref[id];
          name = id;
          ref1 = this.table.columns;
          for (j = 0, len = ref1.length; j < len; j++) {
            col = ref1[j];
            if (col.id === id) {
              name = col.name;
            }
          }
          this.addInputs(id, name, value);
        }
        return this.refresh();
      };

      Header.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      Header.listen('apply', function(e) {
        var bottom, elems, id, ref, top;
        e.preventDefault();
        this.search = {};
        ref = this.elems.inputs;
        for (id in ref) {
          elems = ref[id];
          this.search[id] = elems.input.value;
        }
        top = parseInt(this.elems.topRows.value);
        if (isNaN(top)) {
          top = -1;
        }
        bottom = parseInt(this.elems.bottomRows.value);
        if (isNaN(bottom)) {
          bottom = -1;
        }
        this.top = top;
        this.bottom = bottom;
        return this.callbacks.apply();
      });

      Header.listen('tableSelect', function(r, c, table) {
        var id;
        this.table = table;
        id = table.columns[c].id;
        this.addInputs(id, table.columns[c].name, table.data[id][r]);
        return this.refresh();
      });

      Header.listen('change', function() {
        return this.refresh();
      });

      Header.listen('removeClick', function(e) {
        var n, results;
        n = e.target;
        results = [];
        while (n != null) {
          if (n._id != null) {
            this.elems.inputsDiv.removeChild(this.elems.inputs[n._id].div);
            delete this.elems.inputs[n._id];
            this.refresh();
          }
          results.push(n = n.parentNode);
        }
        return results;
      });

      Header.prototype.addInputs = function(id, name, search) {
        if (this.elems.inputs[id] != null) {
          this.elems.inputsDiv.removeChild(this.elems.inputs[id].div);
        }
        return Weya({
          elem: this.elems.inputsDiv,
          context: this
        }, function() {
          var elems;
          elems = {};
          elems.div = this.div(function() {
            elems.label = this.label({
              "for": "search-" + id
            }, name);
            elems.input = this.input("#search-" + id, {
              value: search,
              type: 'text',
              on: {
                change: this.$.on.change
              }
            });
            return elems.remove = this.button('Remove');
          });
          elems.remove._id = id;
          return this.$.elems.inputs[id] = elems;
        });
      };

      Header.prototype.refresh = function() {
        var bottom, d, elems, highlight, i, id, j, k, len, len1, n, r, ref, ref1, ref2, regex, s, top;
        this.search = {};
        n = 0;
        ref = this.elems.inputs;
        for (id in ref) {
          elems = ref[id];
          this.search[id] = elems.input.value;
          n++;
        }
        top = parseInt(this.elems.topRows.value);
        if (isNaN(top)) {
          top = -1;
        }
        bottom = parseInt(this.elems.bottomRows.value);
        if (isNaN(bottom)) {
          bottom = -1;
        }
        this.top = top;
        this.bottom = bottom;
        if (n > 0 && bottom >= 0 && top >= 0) {
          this.elems.btn.style.display = 'block';
        } else {
          this.elems.btn.style.display = 'none';
        }
        this.table.highlight.rows = {};
        highlight = (function() {
          var j, ref1, results;
          results = [];
          for (i = j = 0, ref1 = this.table.size; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
            results.push(true);
          }
          return results;
        }).call(this);
        ref1 = this.search;
        for (id in ref1) {
          s = ref1[id];
          regex = new RegExp(s, '');
          ref2 = this.table.data[id];
          for (r = j = 0, len = ref2.length; j < len; r = ++j) {
            d = ref2[r];
            if (!regex.test(d)) {
              highlight[r] = false;
            }
          }
        }
        for (r = k = 0, len1 = highlight.length; k < len1; r = ++k) {
          d = highlight[r];
          if (d) {
            this.table.highlight.rows[r] = true;
          }
        }
        return this.table.refresh();
      };

      Header.prototype.apply = function() {
        var col, columns, d, data, detail, highlight, hr, i, id, j, k, l, len, len1, len2, m, r, ref, ref1, ref2, ref3, regex, s, table, values;
        highlight = (function() {
          var j, ref, results;
          results = [];
          for (i = j = 0, ref = this.table.size; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            results.push(true);
          }
          return results;
        }).call(this);
        ref = this.search;
        for (id in ref) {
          s = ref[id];
          regex = new RegExp(s, '');
          ref1 = this.table.data[id];
          for (r = j = 0, len = ref1.length; j < len; r = ++j) {
            d = ref1[r];
            if (!regex.test(d)) {
              highlight[r] = false;
            }
          }
        }
        columns = [];
        table = {};
        ref2 = this.table.columns;
        for (k = 0, len1 = ref2.length; k < len1; k++) {
          col = ref2[k];
          data = this.table.data[col.id];
          for (i = l = 1, ref3 = this.top + this.bottom + 1; 1 <= ref3 ? l <= ref3 : l >= ref3; i = 1 <= ref3 ? ++l : --l) {
            columns.push({
              id: col.id + "_" + i,
              name: col.id + "_" + i,
              type: col.type,
              "default": col["default"]
            });
            table[col.id + "_" + i] = [];
          }
          i = 0;
          columns.push({
            id: col.id + "_" + i,
            name: col.id + "_" + i,
            type: col.type,
            "default": col["default"]
          });
          table[col.id + "_" + i] = [];
          values = (function() {
            var m, ref4, results;
            results = [];
            for (m = 0, ref4 = this.top + this.bottom; 0 <= ref4 ? m <= ref4 : m >= ref4; 0 <= ref4 ? m++ : m--) {
              results.push(void 0);
            }
            return results;
          }).call(this);
          detail = 0;
          for (r = m = 0, len2 = highlight.length; m < len2; r = ++m) {
            d = highlight[r];
            if (!(d)) {
              continue;
            }
            this._addRows(table, col.id, values, detail, r);
            values = (function() {
              var o, ref4, ref5, results;
              results = [];
              for (hr = o = ref4 = r - this.top, ref5 = r + this.bottom; ref4 <= ref5 ? o <= ref5 : o >= ref5; hr = ref4 <= ref5 ? ++o : --o) {
                if (hr < 0 || hr >= this.table.size) {
                  results.push(void 0);
                } else {
                  results.push(this.table.data[col.id][hr]);
                }
              }
              return results;
            }).call(this);
            detail = r + this.bottom + 1;
          }
          this._addRows(table, col.id, values, detail, this.table.size + this.top);
          this.table.size = table[col.id + "_0"].length;
        }
        this.table.data = table;
        return this.table.columns = columns;
      };

      Header.prototype._addRows = function(table, id, values, detail, header) {
        var c, i, j, k, l, r, ref, ref1, ref2, ref3, ref4, results;
        if (detail >= header - this.top) {
          return;
        }
        for (i = j = 0, ref = this.top + this.bottom; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          c = id + "_" + (i + 1);
          for (r = k = ref1 = detail, ref2 = header - this.top; ref1 <= ref2 ? k < ref2 : k > ref2; r = ref1 <= ref2 ? ++k : --k) {
            table[c].push(values[i]);
          }
        }
        c = id + "_0";
        results = [];
        for (r = l = ref3 = detail, ref4 = header - this.top; ref3 <= ref4 ? l < ref4 : l > ref4; r = ref3 <= ref4 ? ++l : --l) {
          results.push(table[c].push(this.table.data[id][r]));
        }
        return results;
      };

      return Header;

    })(Base);
    return OPERATIONS.set(Header.type, Header);
  });

}).call(this);
