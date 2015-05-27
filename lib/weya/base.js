(function() {
  var Base, Weya;

  if (this.Weya == null) {
    this.Weya = {};
  }

  Weya = this.Weya;

  Base = (function() {
    Base.prototype._initialize = [];

    Base.prototype.on = {};

    Base.extend = function() {
      var events, k, results, v;
      events = this.prototype.on;
      this.prototype.on = {};
      results = [];
      for (k in events) {
        v = events[k];
        results.push(this.prototype.on[k] = v);
      }
      return results;
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
      this.prototype._initialize = this.prototype._initialize.slice();
      return this.prototype._initialize.push(func);
    };

    Base.prototype._init = function() {
      var i, init, len, ref;
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
