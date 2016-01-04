(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Properties', 'Property.Base', 'Models', 'Weya.Base', function(PROPERTIES, Base, MODELS, WeyaBase) {
    var Edit, OneOf;
    OneOf = (function(superClass) {
      extend(OneOf, superClass);

      function OneOf() {
        return OneOf.__super__.constructor.apply(this, arguments);
      }

      OneOf.extend();

      OneOf["default"]('oneof', ['Null']);

      OneOf["default"]('default', function() {
        var model, r;
        if (this.schema.oneof.length === 0) {
          return null;
        }
        model = new (MODELS.get(this.schema.oneof[0]));
        r = model.parse(this.schema.defaultValues.call(this));
        return r.value;
      });

      OneOf["default"]('defaultValues', function() {
        return {};
      });

      OneOf.isValidSchema = function(schema) {
        if (!OneOf.__super__.constructor.isValidSchema.call(this, schema)) {
          return false;
        }
        if (schema.oneof == null) {
          return false;
        }
        return true;
      };

      OneOf.prototype.parse = function(data) {
        var i, len, m, r, ref, res, type;
        r = OneOf.__super__.parse.call(this, data);
        if (r !== true) {
          return r;
        }
        res = {
          score: 0,
          errors: ['invalid'],
          value: this.schema["default"].call(this)
        };
        ref = this.schema.oneof;
        for (i = 0, len = ref.length; i < len; i++) {
          type = ref[i];
          m = new (MODELS.get(type));
          r = m.parse(data);
          if (res.score < r.score) {
            res = r;
          }
        }
        return res;
      };

      OneOf.prototype.toJSON = function(value) {
        return value.toJSON();
      };

      OneOf.prototype.edit = function(elem, value, changed) {
        return new Edit(this, elem, value, changed);
      };

      return OneOf;

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
        this.model = value;
        this.onChanged = changed;
        return this.render();
      });

      Edit.prototype.render = function() {
        Weya({
          elem: this.elems.parent,
          context: this
        }, function() {
          this.div(".oneof-controls", function() {
            return this.$.elems.type = this.select({
              on: {
                change: this.$.on.typeChange
              }
            }, function() {
              var i, len, ref, results, type;
              ref = this.$.property.schema.oneof;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                type = ref[i];
                results.push(this.option({
                  value: type
                }, type));
              }
              return results;
            });
          });
          return this.$.elems.model = this.div(".model", null);
        });
        return this.renderModel();
      };

      Edit.listen('typeChange', function(e) {
        var json, r, type;
        type = this.elems.type.value;
        if (type === this.model.type) {
          return;
        }
        json = this.model.toJSON();
        this.model = new (MODELS.get(type));
        r = this.model.parse(json);
        this.onChanged(this.model, true);
        return this.renderModel();
      });

      Edit.prototype.renderModel = function() {
        this.elems.model.innerHTML = '';
        this.elems.type.value = this.model.type;
        return this.model.edit(this.elems.model, this.modelChanged.bind(this));
      };

      Edit.prototype.modelChanged = function(value) {
        return this.onChanged(value, false);
      };

      return Edit;

    })(WeyaBase);
    return PROPERTIES.register('oneof', OneOf);
  });

}).call(this);
