(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Models', 'Model.Base', function(MODELS, Base) {
    var Null;
    Null = (function(superClass) {
      extend(Null, superClass);

      function Null() {
        return Null.__super__.constructor.apply(this, arguments);
      }

      Null.extend();

      Null.prototype.type = 'Null';

      Null.prototype.template = function(self) {};

      Null.check();

      return Null;

    })(Base);
    return MODELS.register('Null', Null);
  });

}).call(this);
