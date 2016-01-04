(function() {
  Mod.require('Weya', 'Properties', 'Util', function(Weya, PROPERTIES, UTIL) {
    var Model;
    Model = (function() {
      Model.prototype._initialize = [];

      Model.prototype._properties = {};

      Model.prototype._requiredFunctions = {};

      Model.prototype.on = {};

      Model.extend = function() {
        this.prototype._initialize = this.prototype._initialize.slice();
        this.prototype._properties = UTIL.extend({}, this.prototype._properties);
        this.prototype._requiredFunctions = UTIL.extend({}, this.prototype._requiredFunctions);
        return this.prototype.on = UTIL.extend({}, this.prototype.on);
      };

      Model.include = function(obj) {
        var desc, event, k, listener, name, v;
        if (obj == null) {
          throw new Error('Cannot include a null object');
        }
        for (k in obj) {
          v = obj[k];
          switch (k) {
            case 'initialize':
              this.prototype._initialize.push(v);
              break;
            case 'property':
              for (name in v) {
                obj = v[name];
                this._addProperty(name, obj);
              }
              break;
            case 'requireFunction':
              for (name in v) {
                desc = v[name];
                this.prototype._requiredFunctions[name] = desc;
              }
              break;
            case 'on':
              for (event in v) {
                listener = v[event];
                if (this.prototype.on[event] == null) {
                  this.prototype.on[event] = listener;
                }
              }
              break;
            default:
              this.prototype[k] = v;
          }
        }
        return null;
      };

      Model.initialize = function(func) {
        return this.prototype._initialize.push(func);
      };

      Model.listen = function(name, func) {
        return this.prototype.on[name] = func;
      };

      Model.property = function(name, obj) {
        var objs, results;
        if ((typeof name) === 'string') {
          return this._addProperty(name, obj);
        } else {
          objs = name;
          results = [];
          for (name in objs) {
            obj = objs[name];
            results.push(this._addProperty(name, obj));
          }
          return results;
        }
      };

      Model._addProperty = function(name, obj) {
        if ((typeof name) !== 'string') {
          throw new Error("Property name not a string: " + name);
        }
        if ((typeof obj) !== 'object') {
          throw new Error("Property not an object: " + name);
        }
        return this.prototype._properties[name] = PROPERTIES.create(obj);
      };

      Model.requireFunction = function(name, desc) {
        var obj, results;
        if ((typeof name) === 'string') {
          return this.prototype._requiredFunctions[name] = desc;
        } else {
          obj = name;
          results = [];
          for (name in obj) {
            desc = obj[name];
            results.push(this.prototype._requiredFunctions[name] = desc);
          }
          return results;
        }
      };

      Model.check = function() {
        var desc, extra, func, k, mentioned, ref, type;
        if (this.prototype.type == null) {
          throw new Error("Object type not defined");
        }
        type = this.prototype.type;
        mentioned = {
          type: true
        };
        ref = this.prototype._requiredFunctions;
        for (func in ref) {
          desc = ref[func];
          mentioned[func] = true;
          if (this.prototype[func] == null) {
            throw new Error(type + ": Function not defined: " + func + " - " + desc);
          }
          if ((typeof this.prototype[func]) !== 'function') {
            throw new Error(type + ": Not a function: " + func + " - " + desc);
          }
        }
        extra = [];
        for (k in this.prototype) {
          if (k === 'on') {
            continue;
          }
          if (mentioned[k] == null) {
            if (k[0] !== '_') {
              extra.push(k);
            }
          }
        }
        if (extra.length > 0) {
          console.error(type, extra);
        }
        return this.prototype._checked = true;
      };

      function Model() {
        this.initialize.apply(this, arguments);
      }

      Model.prototype.initialize = function(options) {
        var i, init, len, ref, results;
        if (this._checked !== true) {
          throw new Error("Object " + this.type + " wasnt checked");
        }
        this._bindEvents();
        ref = this._initialize;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          init = ref[i];
          results.push(init.call(this));
        }
        return results;
      };

      Model.requireFunction({
        'initialize': 'Initialize',
        'parse': 'Parse',
        'render': 'Render element',
        'weya': 'Render weya template',
        'html': 'Render html',
        'template': 'Render template',
        'toJSON': 'To JSON',
        'edit': 'Render editor'
      });

      Model.prototype.parse = function(data) {
        var e, excess, fields, i, len, name, prop, r, ref, ref1;
        excess = 0;
        this._errors = [];
        fields = 0;
        this._score = 0;
        this._values = {};
        for (name in data) {
          if (!(this._properties[name] == null)) {
            continue;
          }
          this._errors.push(": " + name + " excess");
          excess++;
        }
        ref = this._properties;
        for (name in ref) {
          prop = ref[name];
          fields++;
          r = prop.parse(data[name]);
          this._values[name] = r.value;
          if (!prop.isDefault(r.value)) {
            this._score += r.score;
          }
          ref1 = r.errors;
          for (i = 0, len = ref1.length; i < len; i++) {
            e = ref1[i];
            this._errors.push(name + "(" + this.type + ")/" + e);
          }
        }
        if (fields === 0) {
          this._score = (excess > 0 ? 0 : 1);
        } else {
          this._score = (this._score - excess) / fields;
        }
        if (this._score < 0) {
          this._score = 0;
        }
        if (this._score > 1) {
          throw new Error("Score greater than 1: " + score);
        }
        return {
          score: this._score,
          value: this,
          errors: this._errors
        };
      };

      Model.prototype.weya = function(weya) {
        return this.template.call(weya, this);
      };

      Model.prototype.render = function(elem) {
        var self;
        self = this;
        return Weya({
          elem: elem
        }, function() {
          return self.weya(this);
        });
      };

      Model.prototype.html = function() {
        var self;
        self = this;
        return Weya.markup({}, function() {
          return self.weya(this);
        });
      };

      Model.prototype.toJSON = function() {
        var data, name, prop, ref, v;
        data = {};
        ref = this._properties;
        for (name in ref) {
          prop = ref[name];
          v = prop.toJSON(this._values[name]);
          if (!prop.isDefault(v)) {
            data[name] = v;
          }
        }
        return data;
      };

      Model.prototype.edit = function(elem, changed) {
        var name, prop, ref, results;
        this.onChanged = changed;
        this._editElems = {};
        Weya({
          elem: elem,
          context: this
        }, function() {
          var name, prop, ref, results;
          ref = this.$._properties;
          results = [];
          for (name in ref) {
            prop = ref[name];
            results.push(this.div(".property", function() {
              this.span(".property-name", name);
              return this.$._editElems[name] = this.div(".property-value", "");
            }));
          }
          return results;
        });
        ref = this._properties;
        results = [];
        for (name in ref) {
          prop = ref[name];
          results.push(prop.edit(this._editElems[name], this._values[name], this.valueChanged.bind({
            self: this,
            name: name
          })));
        }
        return results;
      };

      Model.prototype.valueChanged = function(value, changed) {
        this.self._values[this.name] = value;
        return this.self.onChanged(this.self, false);
      };

      Model.prototype._bindEvents = function() {
        var events, k, results, v;
        events = this.on;
        this.on = {};
        results = [];
        for (k in events) {
          v = events[k];
          results.push(this.on[k] = v.bind(this));
        }
        return results;
      };

      return Model;

    })();
    return Mod.set('Model.Base', Model);
  });

}).call(this);
