(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Weya', function(Base, Weya) {
    var CLUSTER_MULTIPLE, ROW_HEIGHT, Table;
    ROW_HEIGHT = 20;
    CLUSTER_MULTIPLE = 4;
    Table = (function(superClass) {
      extend(Table, superClass);

      function Table() {
        return Table.__super__.constructor.apply(this, arguments);
      }

      Table.extend();

      Table.initialize(function() {
        this.elems = {};
        this.dims = {
          bodyHeight: 0,
          rowHeight: ROW_HEIGHT
        };
        this.clear();
        return this.testData();
      });

      Table.prototype.testData = function() {
        var i;
        this.size = 1000000;
        this.data.number = (function() {
          var j, ref, results;
          results = [];
          for (i = j = 0, ref = this.size; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            results.push("" + i);
          }
          return results;
        }).call(this);
        this.data.id = (function() {
          var j, ref, results;
          results = [];
          for (i = j = 0, ref = this.size; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            results.push("" + (parseInt(Math.random() * 1000)));
          }
          return results;
        }).call(this);
        this.columns.push({
          id: 'number',
          name: 'Number',
          type: 'number',
          "default": 0
        });
        this.columns.push({
          id: 'id',
          name: 'Id',
          type: 'number',
          "default": 0
        });
        return this.filteredRows = (function() {
          var j, ref, results;
          results = [];
          for (i = j = 0, ref = this.size; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            results.push(i);
          }
          return results;
        }).call(this);
      };

      Table.prototype.clear = function() {
        this.data = {};
        this.columns = [];
        this.filteredRows = [];
        return this.highlight = {
          rows: [],
          columns: [],
          cells: []
        };
      };

      Table.get('scroll', function() {
        return this.elems.tableBodyWrapper.scrollTop;
      });

      Table.listen('scroll', function() {
        return this.generate();
      });

      Table.prototype.render = function(elem) {
        this.elems.container = elem;
        this.elems.container.innerHTML = '';
        this._currentCluster = -1;
        Weya({
          elem: this.elems.container,
          context: this
        }, function() {
          this.$.elems.tableHeader = this.table(".table-header", function() {
            return this.$.elems.thead = this.thead(function() {
              return this.tr(function() {
                var col, j, len, ref, results;
                ref = this.$.columns;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                  col = ref[j];
                  results.push(this.th(col.name));
                }
                return results;
              });
            });
          });
          return this.$.elems.tableBodyWrapper = this.div('.table-body-wrapper', function() {
            return this.$.elems.tableBody = this.table(".table-body", function() {
              return this.$.elems.tbody = this.tbody('');
            });
          });
        });
        this.elems.tableBodyWrapper.addEventListener('scroll', this.on.scroll);
        return window.requestAnimationFrame(this.on.getDimensions);
      };

      Table.listen('getDimensions', function() {
        this.dims.bodyHeight = this.elems.container.offsetHeight - this.elems.tableHeader.offsetHeight;
        this.elems.tableBodyWrapper.style.height = this.dims.bodyHeight + "px";
        this.dims.visibleRows = Math.ceil(this.dims.bodyHeight / this.dims.rowHeight);
        this.dims.clusterRows = this.dims.visibleRows * CLUSTER_MULTIPLE;
        this.dims.visibleHeight = this.dims.visibleRows * this.dims.rowHeight;
        this.dims.clusterHeight = this.dims.clusterRows * this.dims.rowHeight;
        return this.generate();
      });

      Table.prototype.generate = function() {
        var bottomSpace, cluster, from, i, rows, scroll, to, topSpace;
        scroll = this.scroll;
        cluster = Math.floor(scroll / (this.dims.clusterHeight - this.dims.visibleHeight));
        if (this._currentCluster === cluster) {
          return;
        }
        this._currentCluster = cluster;
        from = cluster * (this.dims.clusterRows - this.dims.visibleRows);
        to = Math.min(from + this.dims.clusterRows, this.size);
        rows = (function() {
          var j, ref, ref1, results;
          results = [];
          for (i = j = ref = from, ref1 = to; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
            results.push(i);
          }
          return results;
        })();
        topSpace = from * this.dims.rowHeight;
        bottomSpace = (this.size - to) * this.dims.rowHeight;
        this.elems.tbody.innerHTML = '';
        return Weya({
          elem: this.elems.tbody,
          context: this
        }, function() {
          var j, len, r;
          this.tr('.top-space', {
            style: {
              height: topSpace + "px"
            }
          });
          for (j = 0, len = rows.length; j < len; j++) {
            r = rows[j];
            this.tr(function() {
              var c, d, k, len1, ref, results;
              ref = this.$.columns;
              results = [];
              for (k = 0, len1 = ref.length; k < len1; k++) {
                c = ref[k];
                d = this.$.data[c.id][r];
                results.push(this.td(d));
              }
              return results;
            });
          }
          return this.tr('.bottom-space', {
            style: {
              height: bottomSpace + "px"
            }
          });
        });
      };

      return Table;

    })(Base);
    return Mod.set('Table', Table);
  });

}).call(this);
