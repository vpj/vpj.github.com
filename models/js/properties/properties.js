(function() {
  Mod.require('Models.Util', function(Util) {
    var PROPERTIES, Properties;
    Properties = (function() {
      function Properties() {
        this.properties = {};
      }

      Properties.prototype.register = function(name, property) {
        return this.properties[name] = property;
      };

      Properties.prototype.isValidSchema = function(schema) {
        var property, ref, type;
        ref = this.properties;
        for (type in ref) {
          property = ref[type];
          if (property.isValidSchema(schema)) {
            return true;
          }
        }
        return false;
      };

      Properties.prototype.create = function(schema, name) {
        var property, ref, type;
        ref = this.properties;
        for (type in ref) {
          property = ref[type];
          if (property.isValidSchema(schema)) {
            return new property(schema, name);
          }
        }
        throw new Error("Unknown schema");
      };

      return Properties;

    })();
    PROPERTIES = new Properties;
    return Mod.set('Models.Properties', PROPERTIES);
  });

}).call(this);
