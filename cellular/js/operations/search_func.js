(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var SearchRows;
    SearchRows = (function(superClass) {
      extend(SearchRows, superClass);

      function SearchRows() {
        return SearchRows.__super__.constructor.apply(this, arguments);
      }

      SearchRows.extend();

      SearchRows.initialize(function() {
        return this.elems.inputs = {};
      });

      SearchRows.prototype.operationName = 'Search & Process';

      SearchRows.operationName = 'Search & Process';

      SearchRows.prototype.type = 'searchRows';

      SearchRows.type = 'searchRows';

      SearchRows.prototype.json = function() {
        return {
          table: this.table.id,
          search: this.search,
          func: this.func
        };
      };

      SearchRows.prototype.setJson = function(json) {
        this.search = json.search;
        this.func = json.func;
        return this.table = this.editor.getTable(json.table);
      };

      SearchRows.prototype.render = function() {
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
          this.div(function() {
            return this.$.elems.func = this.textarea("#search-func.u-full-width", {
              value: '-> false',
              on: {
                change: this.$.on.change
              }
            });
          });
          this.$.elems.btn = this.button('.u-full-width.button-primary', 'Apply', {
            on: {
              click: this.$.on.apply
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

      SearchRows.prototype._setData = function() {
        var col, id, j, len, name, ref;
        for (id in this.search) {
          name = id;
          ref = this.table.columns;
          for (j = 0, len = ref.length; j < len; j++) {
            col = ref[j];
            if (col.id === id) {
              name = col.name;
            }
          }
          this.addInputs(id, name);
        }
        this.elems.func.value = this.func;
        return this.refresh();
      };

      SearchRows.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      SearchRows.listen('tableSelect', function(r, c, table) {
        var id;
        this.table = table;
        id = table.columns[c].id;
        this.addInputs(id, table.columns[c].name);
        return this.refresh();
      });

      SearchRows.listen('change', function() {
        return this.refresh();
      });

      SearchRows.listen('removeClick', function(e) {
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

      SearchRows.prototype.addInputs = function(id, name) {
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
            return elems.label = this.label({
              "for": "search-" + id
            }, function() {
              this.span(name);
              return elems.remove = this.span('.remove', 'X');
            });
          });
          elems.remove._id = id;
          return this.$.elems.inputs[id] = elems;
        });
      };

      SearchRows.listen('apply', function(e) {
        var id;
        e.preventDefault();
        this.search = {};
        for (id in this.elems.inputs) {
          this.search[id] = true;
        }
        this.func = this.elems.func.value;
        return this.callbacks.apply();
      });

      SearchRows.prototype.refresh = function() {
        var args, coffee, d, e, error, func, highlight, i, id, j, k, len, r, ref, result, text;
        this.search = {};
        for (id in this.elems.inputs) {
          this.search[id] = true;
        }
        this.func = this.elems.func.value;
        try {
          text = this.func;
          coffee = CoffeeScript.compile("return (" + text + ")");
          console.log(coffee);
          func = new Function("return " + coffee);
          func = func();
          this.elems.func.style.background = "white";
        } catch (error) {
          e = error;
          console.error(e.message);
          this.elems.func.style.background = "red";
          func = function() {
            return false;
          };
        }
        this.table.highlight.rows = {};
        this.table.highlight.onlyHighlightedRows = true;
        highlight = (function() {
          var j, ref, results;
          results = [];
          for (i = j = 0, ref = this.table.size; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            results.push(true);
          }
          return results;
        }).call(this);
        for (r = j = 0, ref = this.table.size; 0 <= ref ? j < ref : j > ref; r = 0 <= ref ? ++j : --j) {
          args = (function() {
            var results;
            results = [];
            for (id in this.search) {
              results.push(this.table.data[id][r]);
            }
            return results;
          }).call(this);
          result = func.apply(null, args);
          if ((result != null) && result !== false) {
            highlight[r] = true;
          } else {
            highlight[r] = false;
          }
        }
        for (r = k = 0, len = highlight.length; k < len; r = ++k) {
          d = highlight[r];
          if (d) {
            this.table.highlight.rows[r] = true;
          }
        }
        return this.table.refresh();
      };

      SearchRows.prototype.apply = function() {
        var args, c, coffee, d, data, deleteRows, e, error, func, id, j, r, ref, ref1, result, results, text;
        try {
          text = this.func;
          coffee = CoffeeScript.compile("return (" + text + ")");
          func = new Function("return " + coffee);
          func = func();
        } catch (error) {
          e = error;
          func = function() {
            return false;
          };
        }
        deleteRows = {};
        for (r = j = 0, ref = this.table.size; 0 <= ref ? j < ref : j > ref; r = 0 <= ref ? ++j : --j) {
          args = (function() {
            var results;
            results = [];
            for (id in this.search) {
              results.push(this.table.data[id][r]);
            }
            return results;
          }).call(this);
          result = func.apply(null, args);
          if ((result != null) && result !== false) {
            if (result["delete"]) {
              deleteRows[r] = true;
            } else if (result.replace != null) {
              c = 0;
              for (id in this.search) {
                this.table.data[id][r] = result.replace[c];
                ++c;
              }
            }
          }
        }
        ref1 = this.table.data;
        results = [];
        for (id in ref1) {
          data = ref1[id];
          this.table.data[id] = (function() {
            var k, len, results1;
            results1 = [];
            for (r = k = 0, len = data.length; k < len; r = ++k) {
              d = data[r];
              if (!deleteRows[r]) {
                results1.push(d);
              }
            }
            return results1;
          })();
          results.push(this.table.size = this.table.data[id].length);
        }
        return results;
      };

      return SearchRows;

    })(Base);
    return OPERATIONS.set(SearchRows.type, SearchRows);
  });

}).call(this);
