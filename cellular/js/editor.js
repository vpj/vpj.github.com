(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Weya', 'Table', 'OPERATIONS', function(Base, Weya, Table, OPERATIONS) {
    var Editor, SIDEBAR_WIDTH;
    SIDEBAR_WIDTH = 300;
    Editor = (function(superClass) {
      extend(Editor, superClass);

      function Editor() {
        return Editor.__super__.constructor.apply(this, arguments);
      }

      Editor.extend();

      Editor.initialize(function(options) {
        this.elems = {
          sidebar: null,
          content: null
        };
        this.table = new Table({
          onClick: this.on.tableClick
        });
        this.operation = null;
        this.history = [];
        return this.nHistory = -1;
      });

      Editor.prototype.getTable = function() {
        return this.table;
      };

      Editor.prototype.render = function(elem) {
        var height, width;
        this.elems.container = elem;
        height = window.innerHeight;
        width = window.innerWidth;
        this.elems.container.innerHTML = '';
        Weya({
          elem: this.elems.container,
          context: this
        }, function() {
          this.$.elems.content = this.div(".content", null);
          return this.$.elems.sidebar = this.div(".sidebar", null);
        });
        this.renderTable();
        return this.renderOperations();
      };

      Editor.prototype.selectOperation = function(operation) {
        this.operation = new operation({
          sidebar: this.elems.sidebar,
          content: this.elems.content,
          onCancel: this.on.cancelOperation,
          onApply: this.on.applyOperation,
          editor: this
        });
        return this.operation.render();
      };

      Editor.prototype.selectHistory = function(n) {
        var h, i, j, op, ref;
        this.nHistory = n - 1;
        this.table.clear();
        for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          h = this.history[i];
          op = new (OPERATIONS.get(h.type))({
            editor: this
          });
          op.setJson(h.data);
          op.apply();
        }
        h = this.history[n];
        this.operation = new (OPERATIONS.get(h.type))({
          sidebar: this.elems.sidebar,
          content: this.elems.content,
          onCancel: this.on.cancelOperation,
          onApply: this.on.applyOperation,
          editor: this
        });
        this.operation.setJson(h.data);
        this.renderTable();
        this.renderOperations();
        return window.requestAnimationFrame((function(_this) {
          return function() {
            return _this.operation.render();
          };
        })(this));
      };

      Editor.listen('applyOperation', function() {
        this.nHistory++;
        if (this.nHistory < this.history.length) {
          this.history = this.history.slice(0, this.nHistory);
        }
        this.history.push({
          title: this.operation.title(),
          type: this.operation.type,
          data: this.operation.json()
        });
        this.nHistory = this.history.length - 1;
        this.operation.apply();
        this.renderTable();
        this.renderOperations();
        return this.operation = null;
      });

      Editor.listen('tableClick', function(r, c, table) {
        if (!this.operation) {
          return;
        }
        return this.operation.on.tableSelect(r, c, table);
      });

      Editor.listen('cancelOperation', function() {
        this.renderTable();
        this.renderOperations();
        return this.operation = null;
      });

      Editor.listen('selectOperation', function(e) {
        var n, op;
        n = e.target;
        while (n != null) {
          if (n._type != null) {
            op = OPERATIONS.get(n._type);
            this.selectOperation(op);
            return;
          }
          n = n.parentNode;
        }
      });

      Editor.listen('selectHistory', function(e) {
        var n;
        n = e.target;
        while (n != null) {
          if (n._history != null) {
            this.selectHistory(n._history);
            return;
          }
          n = n.parentNode;
        }
      });

      Editor.listen('tableSelect', function(r, c) {
        if (this.operation == null) {
          return;
        }
        return this.operation.tableSelect(r, c);
      });

      Editor.prototype.renderTable = function() {
        this.table.clearHighlight();
        return this.table.render(this.elems.content);
      };

      Editor.prototype.renderOperations = function() {
        this.elems.sidebar.innerHTML = '';
        return Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          this.div('.operations-list', {
            on: {
              click: this.$.on.selectOperation
            }
          }, function() {
            var first;
            this.h3('Operations:');
            first = true;
            return OPERATIONS.each((function(_this) {
              return function(type, op) {
                var btn;
                if (first) {
                  btn = _this.div(".first", op.operationName);
                  first = false;
                } else {
                  btn = _this.div(op.operationName);
                }
                return btn._type = type;
              };
            })(this));
          });
          return this.div('.history-list', {
            on: {
              click: this.$.on.selectHistory
            }
          }, function() {
            var btn, first, h, i, j, len, ref, results;
            this.h3('History:');
            first = true;
            ref = this.$.history;
            results = [];
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              h = ref[i];
              if (first) {
                btn = this.div(".first", h.title);
                first = false;
              } else {
                btn = this.div(h.title);
              }
              results.push(btn._history = i);
            }
            return results;
          });
        });
      };

      return Editor;

    })(Base);
    return Mod.onLoad(function() {
      var EDITOR;
      EDITOR = new Editor();
      return EDITOR.render(document.body);
    });
  });

}).call(this);
