(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'YAML', 'Models', 'Util', function(Base, YAML, MODELS, UTIL) {
    var Parser;
    Parser = (function(superClass) {
      extend(Parser, superClass);

      function Parser() {
        return Parser.__super__.constructor.apply(this, arguments);
      }

      Parser.extend();

      Parser.initialize(function(options) {});

      Parser.prototype.setText = function(text) {
        return this.text = text;
      };

      Parser.prototype.getText = function() {
        var json;
        json = this.model.toJSON();
        return YAML.stringify(json, 10);
      };

      Parser.prototype.parse = function() {
        var e, i, len, model, ref, res;
        this.data = YAML.parse(this.text);
        model = new (MODELS.get('Resume'));
        res = model.parse(this.data);
        console.log(res.score);
        console.log(res.value);
        ref = res.errors;
        for (i = 0, len = ref.length; i < len; i++) {
          e = ref[i];
          console.error(e);
        }
        return this.model = res.value;
      };

      Parser.prototype.render = function(elem) {
        console.log(this.model.html());
        return this.model.render(elem);
      };

      Parser.prototype.edit = function(elem, changed) {
        this.model.edit(elem, this.on.change);
        return this.onChanged = changed;
      };

      Parser.listen('change', function(value, changed) {
        if (changed != null) {
          this.model = value;
        }
        return this.onChanged();
      });

      return Parser;

    })(Base);
    return Mod.set('Parser', Parser);
  });

}).call(this);
