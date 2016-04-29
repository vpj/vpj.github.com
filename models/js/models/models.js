(function() {
  Mod.require('Models.Util', function(Util) {
    var MODELS, Models;
    Models = (function() {
      function Models() {
        this.models = {};
      }

      Models.prototype.register = function(name, model) {
        return this.models[name] = model;
      };

      Models.prototype.get = function(name) {
        if (this.models[name] == null) {
          throw new Error("Unknown model: " + name);
        }
        return this.models[name];
      };

      return Models;

    })();
    MODELS = new Models;
    return Mod.set('Models.Models', MODELS);
  });

}).call(this);
