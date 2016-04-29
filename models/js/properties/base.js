(function() {
  Mod.require('Models.Util', function(UTIL) {
    var Base;
    Base = (function() {
      Base.prototype._defaults = {};

      Base.extend = function() {
        return this.prototype._defaults = UTIL.extend({}, this.prototype._defaults);
      };

      Base["default"] = function(name, value) {
        return this.prototype._defaults[name] = value;
      };

      Base.isValidSchema = function(schema) {
        var k;
        for (k in schema) {
          if (this.prototype._defaults[k] == null) {
            return false;
          }
        }
        return true;
      };

      function Base(schema) {
        var k, ref, v;
        this.schema = {};
        ref = this._defaults;
        for (k in ref) {
          v = ref[k];
          if (schema[k] != null) {
            this.schema[k] = schema[k];
          } else {
            this.schema[k] = v;
          }
        }
      }

      Base.prototype.error = function(error) {
        return {
          score: 0,
          value: this.schema["default"].call(this),
          errors: [error]
        };
      };

      Base.prototype.parse = function(data) {
        if (data == null) {
          if (this.schema.required) {
            return this.error('required');
          } else {
            return {
              score: 1,
              value: this.schema["default"].call(this),
              errors: []
            };
          }
        }
        return true;
      };

      Base["default"]('required', false);

      Base["default"]('default', function() {
        return null;
      });

      Base["default"]('isDefault', function(value) {
        if (value == null) {
          return true;
        }
        return false;
      });

      Base.prototype.isDefault = function(value) {
        return this.schema.isDefault.call(this, value);
      };

      return Base;

    })();
    return Mod.set('Models.Property.Base', Base);
  });

}).call(this);
