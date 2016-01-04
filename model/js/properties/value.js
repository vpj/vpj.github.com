(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Properties', 'Property.Base', 'Weya.Base', function(PROPERTIES, Base, WeyaBase) {
    var Edit, Value;
    Value = (function(superClass) {
      extend(Value, superClass);

      function Value() {
        return Value.__super__.constructor.apply(this, arguments);
      }

      Value.extend();

      Value["default"]('value', function(str) {
        if ((typeof str) !== 'string') {
          throw new Error("Exected string: " + (typeof str) + ", " + str);
        }
        return str;
      });

      Value["default"]('string', function(value) {
        return "" + str;
      });

      Value["default"]('rows', 1);

      Value["default"]('columns', 20);

      Value["default"]('valid', function(str) {
        if ((typeof str) !== 'string') {
          return false;
        } else {
          return true;
        }
      });

      Value["default"]('search', function(str) {
        if ((typeof str) !== 'string') {
          throw new Error("Exected string: " + (typeof str) + ", " + str);
        }
        return str;
      });

      Value["default"]('default', function() {
        return '';
      });

      Value["default"]('isDefault', function(value) {
        return value === this.schema["default"]();
      });

      Value.prototype.parse = function(data) {
        var r, res;
        r = Value.__super__.parse.call(this, data);
        if (r !== true) {
          return r;
        }
        if (!this.schema.valid(data)) {
          return this.error('invalid');
        }
        res = {
          score: 1,
          errors: [],
          value: this.schema.value(data)
        };
        return res;
      };

      Value.prototype.toJSON = function(value) {
        return value;
      };

      Value.prototype.edit = function(elem, value, changed) {
        return new Edit(this, elem, value, changed);
      };

      return Value;

    })(Base);
    Edit = (function(superClass) {
      extend(Edit, superClass);

      function Edit() {
        return Edit.__super__.constructor.apply(this, arguments);
      }

      Edit.extend();

      Edit.initialize(function(property, elem, value, changed) {
        this.property = property;
        this.elems = {
          parent: elem
        };
        this.value = value;
        this.onChanged = changed;
        return this.render();
      });

      Edit.prototype.render = function() {
        var schema;
        schema = this.property.schema;
        Weya({
          elem: this.elems.parent,
          context: this
        }, function() {
          if (schema.rows === 1) {
            return this.$.elems.input = this.input('.value', {
              type: 'text',
              style: {
                width: (2 + Math.round(schema.columns * 7.25)) + "px"
              }
            });
          } else {
            return this.$.elems.input = this.textarea('.value', {
              rows: schema.rows,
              columns: schema.columns,
              style: {
                width: (2 + Math.round(schema.columns * 7.25)) + "px",
                height: (Math.round(schema.rows * 18)) + "px"
              }
            });
          }
        });
        this.elems.input.value = this.value;
        return this.elems.input.addEventListener("input", this.on.change);
      };

      Edit.listen('change', function(e) {
        var value;
        value = this.elems.input.value;
        if (!this.property.schema.valid.call(this.property, value)) {
          return this.elems.input.classList.add('invalid');
        } else {
          this.elems.input.classList.remove('invalid');
          value = this.property.schema.value.call(this, value);
          return this.onChanged(value, true);
        }
      });

      return Edit;

    })(WeyaBase);
    return PROPERTIES.register('value', Value);
  });

}).call(this);
