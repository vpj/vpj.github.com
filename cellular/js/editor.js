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
        this.table = new Table();
        this.operation = null;
        return this.history = [];
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

      Editor.listen('applyOperation', function() {
        this.history.push({
          type: this.operation.type,
          data: this.operation.json()
        });
        this.operation.apply();
        this.renderTable();
        this.renderOperations();
        return this.operation = null;
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

      Editor.listen('tableSelect', function(r, c) {
        if (this.operation == null) {
          return;
        }
        return this.operation.tableSelect(r, c);
      });

      Editor.prototype.renderTable = function() {
        this.table.render(this.elems.content);
        return this.table.generate();
      };

      Editor.prototype.renderOperations = function() {
        this.elems.sidebar.innerHTML = '';
        return Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          return this.div({
            on: {
              click: this.$.on.selectOperation
            }
          }, function() {
            return OPERATIONS.each((function(_this) {
              return function(type, op) {
                var btn;
                btn = _this.button(op.name);
                return btn._type = type;
              };
            })(this));
          });
        });
      };

      Editor.listen('undo', function() {});

      Editor.listen('redo', function() {});

      return Editor;

    })(Base);
    return Mod.onLoad(function() {
      var EDITOR;
      EDITOR = new Editor();
      return EDITOR.render(document.body);
    });
  });

}).call(this);
