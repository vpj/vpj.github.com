(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Models.Properties', 'Models.Property.Base', 'Weya.Base', 'Weya', function(PROPERTIES, Base, WeyaBase, Weya) {
    var Edit, Value;
    Value = (function(superClass) {
      extend(Value, superClass);

      function Value() {
        return Value.__super__.constructor.apply(this, arguments);
      }

      Value.extend();

      Value.prototype.propertyType = 'value';

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
        return null;
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

      Value.prototype.toJSONFull = function(value) {
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
        var schema, width;
        schema = this.property.schema;
        width = 2 + Math.round(schema.columns * 7.25);
        Weya({
          elem: this.elems.parent,
          context: this
        }, function() {
          if (schema.rows === 1) {
            this.$.elems.input = this.input('.value', {
              type: 'text',
              placeholder: this.$.property._name,
              style: {
                width: width + "px"
              }
            });
          } else {
            this.$.elems.input = this.textarea('.value', {
              rows: schema.rows,
              columns: schema.columns,
              style: {
                width: width + "px",
                height: (Math.round(schema.rows * 18)) + "px"
              }
            });
          }
          return this.$.elems.search = this.div('.search', {
            style: {
              display: 'none',
              width: width + "px"
            }
          });
        });
        this.elems.input.value = this.value;
        this.elems.input.addEventListener("input", this.on.change);
        this.elems.input.addEventListener("focus", this.on.focus);
        this.elems.input.addEventListener("blur", this.on.blur);
        this.elems.search.addEventListener('click', this.on.searchClick);
        return this.change();
      };

      Edit.prototype.search = function() {
        var results, value;
        value = this.elems.input.value;
        results = this.property.schema.search.call(this.property, value);
        if (results == null) {
          return;
        }
        if (!Array.isArray(results)) {
          return;
        }
        if (results.length === 0) {
          this.elems.search.style.display = 'none';
          return;
        }
        this.elems.search.style.display = 'block';
        this.elems.search.innerHTML = '';
        return Weya({
          elem: this.elems.search
        }, function() {
          var e, i, j, len, r, results1;
          results1 = [];
          for (i = j = 0, len = results.length; j < len; i = ++j) {
            r = results[i];
            if (i > 10) {
              break;
            }
            e = this.div(r);
            results1.push(e._result = r);
          }
          return results1;
        });
      };

      Edit.listen('searchClick', function(e) {
        var n, result;
        n = e.target;
        result = null;
        while ((n != null) && n !== this.elems.search) {
          if (n._result) {
            result = n._result;
            break;
          }
          n = n.parentNode;
        }
        if (result == null) {
          return;
        }
        this.elems.input.value = result;
        this.elems.search.style.display = 'none';
        return this.change();
      });

      Edit.listen('focus', function(e) {
        return this.search();
      });

      Edit.listen('blur', function(e) {
        return setTimeout((function(_this) {
          return function() {
            return _this.elems.search.style.display = 'none';
          };
        })(this), 400);
      });

      Edit.listen('change', function(e) {
        this.search();
        return this.change();
      });

      Edit.prototype.change = function() {
        var value;
        value = this.elems.input.value;
        if (!this.property.schema.valid.call(this.property, value)) {
          return this.elems.input.classList.add('invalid');
        } else {
          this.elems.input.classList.remove('invalid');
          value = this.property.schema.value.call(this, value);
          return this.onChanged(value, true);
        }
      };

      return Edit;

    })(WeyaBase);
    return PROPERTIES.register('value', Value);
  });

}).call(this);
