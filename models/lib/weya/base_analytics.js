(function() {
  var Base, WRAP, Weya;

  if (this.Weya == null) {
    this.Weya = {};
  }

  Weya = this.Weya;

  Weya.ANALYTICS = {};

  WRAP = function(className, methodName, func) {
    var wrap;
    return wrap = function() {
      var arg, args, base, c, ret, signature;
      args = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = arguments.length; i < len; i++) {
          arg = arguments[i];
          results.push(typeof arg);
        }
        return results;
      }).apply(this, arguments);
      args = args.join(',');
      c = (base = Weya.ANALYTICS)[className] != null ? base[className] : base[className] = {};
      c = c[methodName] != null ? c[methodName] : c[methodName] = {};
      ret = func.apply(this, arguments);
      signature = "(" + args + ") -> " + (typeof ret);
      if (c[signature] == null) {
        c[signature] = 0;
      }
      c[signature]++;
      return ret;
    };
  };

  Base = (function() {
    Base.prototype._initialize = [];

    Base.prototype.on = {};

    Base.prototype._extended = true;

    Base.prototype._debug = false;

    Base.prototype._analytics = true;

    Base.weyaDebug = function() {
      return this.prototype._debug = true;
    };

    Base.weyaAnalytics = function(name) {
      var k, ref, results, v;
      this.prototype._analytics = true;
      if (!this.prototype._debug) {
        return;
      }
      ref = this.prototype;
      results = [];
      for (k in ref) {
        v = ref[k];
        if ((typeof v) !== 'function') {
          continue;
        }
        results.push(this.prototype[k] = WRAP(name, k, v));
      }
      return results;
    };

    Base.extend = function() {
      var events, k, v;
      events = this.prototype.on;
      this.prototype.on = {};
      for (k in events) {
        v = events[k];
        this.prototype.on[k] = v;
      }
      this.prototype._extended = true;
      return this.prototype._analytics = false;
    };

    Base.listen = function(name, func) {
      return this.prototype.on[name] = func;
    };

    Base.get = function(name, func) {
      return this.prototype.__defineGetter__(name, func);
    };

    Base.set = function(name, func) {
      return this.prototype.__defineSetter__(name, func);
    };

    function Base() {
      this._init.apply(this, arguments);
    }

    Base.initialize = function(func) {
      this.prototype._extended = false;
      this.prototype._initialize = this.prototype._initialize.slice();
      return this.prototype._initialize.push(func);
    };

    Base.prototype._init = function() {
      var i, init, len, ref;
      if (!this._analytics) {
        throw new Error('Class analytics not called');
      }
      ref = this._initialize;
      for (i = 0, len = ref.length; i < len; i++) {
        init = ref[i];
        init.apply(this, arguments);
      }
    };

    Base.include = function(obj) {
      var event, k, listener, results, v;
      results = [];
      for (k in obj) {
        v = obj[k];
        switch (k) {
          case 'initialize':
            results.push(this.prototype._initialize.push(v));
            break;
          case 'on':
            results.push((function() {
              var results1;
              results1 = [];
              for (event in v) {
                listener = v[event];
                results1.push(this.prototype.on[event] = listener);
              }
              return results1;
            }).call(this));
            break;
          default:
            results.push(this.prototype[k] = v);
        }
      }
      return results;
    };

    Base.initialize(function() {
      var events, k, results, v;
      events = this.on;
      this.on = {};
      results = [];
      for (k in events) {
        v = events[k];
        results.push(this.on[k] = v.bind(this));
      }
      return results;
    });

    return Base;

  })();

  Weya.Base = Base;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Weya.Base;
  }

}).call(this);
