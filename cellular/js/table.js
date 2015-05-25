(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Weya', function(Base, Weya) {
    var CHARS, CLUSTER_MULTIPLE, ROW_HEIGHT, SCROLLBAR_MARGIN, Table;
    ROW_HEIGHT = 20;
    CLUSTER_MULTIPLE = 4;
    CHARS = 500;
    SCROLLBAR_MARGIN = 20;
    Table = (function(superClass) {
      extend(Table, superClass);

      function Table() {
        return Table.__super__.constructor.apply(this, arguments);
      }

      Table.extend();

      Table.get('id', function() {
        return 'SINGLETON';
      });

      Table.initialize(function(options) {
        this._onClick = options.onClick;
        this.elems = {};
        this.dims = {
          bodyHeight: 0,
          rowHeight: ROW_HEIGHT
        };
        return this.clear();
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
        this.size = 0;
        return this.clearHighlight();
      };

      Table.prototype.clearHighlight = function() {
        return this.highlight = {
          rows: {},
          columns: {},
          cells: {}
        };
      };

      Table.get('scroll', function() {
        return this.elems.tableBodyWrapper.scrollTop;
      });

      Table.listen('scroll', function(e) {
        e.stopPropagation();
        return this.generate();
      });

      Table.listen('click', function(e) {
        var n, results;
        n = e.target;
        results = [];
        while (n != null) {
          if ((n._row != null) && (n._col != null)) {
            this._onClick(n._row, n._col, this);
          }
          results.push(n = n.parentNode);
        }
        return results;
      });

      Table.prototype.render = function(elem) {
        var i, j, ref, s;
        this.elems.container = elem;
        this.elems.container.innerHTML = '';
        this.elems.tbodyCols = [];
        this.elems.theadCols = [];
        this._currentCluster = -1;
        s = '';
        for (i = j = 0, ref = CHARS; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          s += 'A';
        }
        Weya({
          elem: this.elems.container,
          context: this
        }, function() {
          this.$.elems.tableHeader = this.table(".table-header", function() {
            return this.$.elems.thead = this.thead('');
          });
          return this.$.elems.tableBodyWrapper = this.div('.table-body-wrapper', function() {
            return this.$.elems.tableBody = this.table(".table-body", function() {
              return this.$.elems.tbody = this.tbody(function() {
                return this.tr(function() {
                  return this.td(function() {
                    return this.$.elems.singleChar = this.span(s);
                  });
                });
              });
            });
          });
        });
        this.elems.container.addEventListener('click', this.on.click);
        this.elems.tableBodyWrapper.addEventListener('scroll', this.on.scroll);
        return window.requestAnimationFrame(this.on.getDimensions);
      };

      Table.listen('getDimensions', function() {
        var col, d, i, j, k, len, len1, ref, ref1, width;
        this.dims.bodyHeight = this.elems.container.offsetHeight - this.elems.tableHeader.offsetHeight - SCROLLBAR_MARGIN;
        this.dims.containerWidth = this.elems.container.offsetWidth;
        this.elems.tableBodyWrapper.style.height = this.dims.bodyHeight + "px";
        this.dims.visibleRows = Math.ceil(this.dims.bodyHeight / this.dims.rowHeight);
        this.dims.clusterRows = this.dims.visibleRows * CLUSTER_MULTIPLE;
        this.dims.visibleHeight = this.dims.visibleRows * this.dims.rowHeight;
        this.dims.clusterHeight = this.dims.clusterRows * this.dims.rowHeight;
        this.dims.tableWidth = 0;
        this.dims.charWidth = this.elems.singleChar.offsetWidth / CHARS;
        console.log(this.dims.charWidth);
        this.elems.tbody.innerHTML = '';
        ref = this.columns;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          col = ref[i];
          width = 0;
          ref1 = this.data[col.id];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            d = ref1[k];
            d = d || col["default"];
            width = Math.max(width, d.length * this.dims.charWidth);
          }
          col.width = 5 + Math.ceil(width);
          this.dims.tableWidth += col.width;
        }
        return this.refresh();
      });

      Table.prototype.refresh = function() {
        this._renderHeader();
        return this.generate(true);
      };

      Table.prototype._renderHeader = function() {
        var c, col, j, k, l, len, len1, len2, ref, ref1, ref2;
        this.elems.thead.innerHTML = '';
        ref = this.elems.theadCols;
        for (j = 0, len = ref.length; j < len; j++) {
          col = ref[j];
          this.elems.tableHeader.removeChild(col);
        }
        ref1 = this.elems.tbodyCols;
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          col = ref1[k];
          this.elems.tableBody.removeChild(col);
        }
        this.elems.theadCols = [];
        this.elems.tbodyCols = [];
        ref2 = this.columns;
        for (l = 0, len2 = ref2.length; l < len2; l++) {
          c = ref2[l];
          col = Weya({}, function() {
            return this.col({
              style: {
                width: c.width + "px"
              }
            });
          });
          this.elems.theadCols.push(col);
          this.elems.tableHeader.insertBefore(col, this.elems.thead);
          col = Weya({}, function() {
            return this.col({
              style: {
                width: c.width + "px"
              }
            });
          });
          this.elems.tbodyCols.push(col);
          this.elems.tableBody.insertBefore(col, this.elems.tbody);
        }
        Weya({
          elem: this.elems.thead,
          context: this
        }, function() {
          return this.tr(function() {
            var cssClass, i, len3, m, ref3, results, th;
            ref3 = this.$.columns;
            results = [];
            for (i = m = 0, len3 = ref3.length; m < len3; i = ++m) {
              col = ref3[i];
              cssClass = '.th';
              if (this.$.highlight.columns[i] === true) {
                cssClass += '.hgc';
              }
              th = this.th(cssClass, col.name);
              th._row = -1;
              results.push(th._col = i);
            }
            return results;
          });
        });
        this.elems.tableHeader.style.width = this.dims.tableWidth + "px";
        this.elems.tableBodyWrapper.style.width = (this.dims.tableWidth + SCROLLBAR_MARGIN) + "px";
        return this.elems.tableBody.style.width = this.dims.tableWidth + "px";
      };

      Table.prototype.generate = function(force) {
        var bottomSpace, cluster, from, i, rows, scroll, to, topSpace;
        scroll = this.scroll;
        cluster = Math.floor(scroll / (this.dims.clusterHeight - this.dims.visibleHeight));
        if (!force && this._currentCluster === cluster) {
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
        Weya({
          elem: this.elems.tbody,
          context: this
        }, function() {
          var j, len, r, rowCssClass;
          this.tr('.top-space', {
            style: {
              height: topSpace + "px"
            }
          });
          for (j = 0, len = rows.length; j < len; j++) {
            r = rows[j];
            rowCssClass = '.tr';
            if (this.$.highlight.rows[r] === true) {
              rowCssClass += '.hgr';
            }
            this.tr(rowCssClass, function() {
              var c, cssClass, d, k, len1, ref, results, td;
              ref = this.$.columns;
              results = [];
              for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
                c = ref[i];
                cssClass = '.td';
                if (this.$.highlight.columns[i] === true) {
                  cssClass += '.hgc';
                }
                if (this.$.highlight.cells[r + "_" + i] === true) {
                  cssClass += '.hg';
                }
                d = this.$.data[c.id][r] || c["default"];
                td = this.td(cssClass, d);
                td._row = r;
                results.push(td._col = i);
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
