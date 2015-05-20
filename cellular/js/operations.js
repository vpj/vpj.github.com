(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Weya', 'Table', function(Base, Weya, Table) {
    var OPERATIONS, Operation, Operations;
    Operations = (function(superClass) {
      extend(Operations, superClass);

      function Operations() {
        return Operations.__super__.constructor.apply(this, arguments);
      }

      Operations.extend();

      Operations.initialize(function() {
        return this._operations = {};
      });

      Operations.prototype.each = function(callback) {
        var op, ref, results, type;
        ref = this._operations;
        results = [];
        for (type in ref) {
          op = ref[type];
          results.push(callback(type, op));
        }
        return results;
      };

      Operations.prototype.get = function(type) {
        return this._operations[type];
      };

      Operations.prototype.set = function(type, op) {
        return this._operations[type] = op;
      };

      return Operations;

    })(Base);
    OPERATIONS = new Operations;
    Mod.set('OPERATIONS', OPERATIONS);
    Operation = (function(superClass) {
      extend(Operation, superClass);

      function Operation() {
        return Operation.__super__.constructor.apply(this, arguments);
      }

      Operation.extend();

      Operation.initialize(function(options) {
        this.elems = {
          sidebar: options.sidebar,
          content: options.content
        };
        this.callbacks = {
          cancel: options.onCancel,
          apply: options.onApply
        };
        return this.editor = options.editor;
      });

      Operation.listen('tableSelect', function(r, c, table) {});

      Operation.prototype.json = function() {
        return {};
      };

      return Operation;

    })(Base);
    return Mod.set('Operation', Operation);
  });

}).call(this);
