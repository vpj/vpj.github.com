(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var SearchDeleteRows;
    SearchDeleteRows = (function(superClass) {
      extend(SearchDeleteRows, superClass);

      function SearchDeleteRows() {
        return SearchDeleteRows.__super__.constructor.apply(this, arguments);
      }

      SearchDeleteRows.extend();

      SearchDeleteRows.initialize(function() {
        return this.elems.inputs = {};
      });

      SearchDeleteRows.prototype.operationName = 'Search and Delete Rows';

      SearchDeleteRows.operationName = 'Search and Delete Rows';

      SearchDeleteRows.prototype.type = 'searchDeleteRows';

      SearchDeleteRows.type = 'searchDeleteRows';

      SearchDeleteRows.prototype.json = function() {
        return {
          table: this.table.id,
          search: this.search
        };
      };

      SearchDeleteRows.prototype.setJson = function(json) {
        this.search = json.search;
        return this.table = this.editor.getTable(json.table);
      };

      SearchDeleteRows.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.$.elems.inputsDiv = this.div({
            on: {
              click: this.$.on.removeClick
            }
          });
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
          return this._setData();
        }
      };

      SearchDeleteRows.prototype._setData = function() {
        var col, id, j, len, name, ref, ref1, value;
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

      SearchDeleteRows.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      SearchDeleteRows.listen('apply', function(e) {
        var elems, id, ref;
        e.preventDefault();
        this.search = {};
        ref = this.elems.inputs;
        for (id in ref) {
          elems = ref[id];
          this.search[id] = elems.input.value;
        }
        return this.callbacks.apply();
      });

      SearchDeleteRows.listen('tableSelect', function(r, c, table) {
        var id;
        this.table = table;
        id = table.columns[c].id;
        this.addInputs(id, table.columns[c].name, table.data[id][r]);
        return this.refresh();
      });

      SearchDeleteRows.listen('change', function() {
        return this.refresh();
      });

      SearchDeleteRows.listen('removeClick', function(e) {
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

      SearchDeleteRows.prototype.addInputs = function(id, name, search) {
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
            }, function() {
              this.span(name);
              return elems.remove = this.span('.remove', 'X');
            });
            return elems.input = this.input("#search-" + id + ".u-full-width", {
              value: search,
              type: 'text',
              on: {
                change: this.$.on.change
              }
            });
          });
          elems.remove._id = id;
          return this.$.elems.inputs[id] = elems;
        });
      };

      SearchDeleteRows.prototype.refresh = function() {
        var d, elems, highlight, i, id, j, k, len, len1, n, r, ref, ref1, ref2, regex, s;
        this.search = {};
        n = 0;
        ref = this.elems.inputs;
        for (id in ref) {
          elems = ref[id];
          this.search[id] = elems.input.value;
          n++;
        }
        if (n > 0) {
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

      SearchDeleteRows.prototype.apply = function() {
        var d, data, highlight, i, id, j, len, r, ref, ref1, ref2, regex, results, s;
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
        ref2 = this.table.data;
        results = [];
        for (id in ref2) {
          data = ref2[id];
          this.table.data[id] = (function() {
            var k, len1, results1;
            results1 = [];
            for (r = k = 0, len1 = highlight.length; k < len1; r = ++k) {
              d = highlight[r];
              if (!d) {
                results1.push(data[r]);
              }
            }
            return results1;
          })();
          results.push(this.table.size = this.table.data[id].length);
        }
        return results;
      };

      return SearchDeleteRows;

    })(Base);
    return OPERATIONS.set(SearchDeleteRows.type, SearchDeleteRows);
  });

}).call(this);
