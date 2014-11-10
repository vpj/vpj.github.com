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
      var events, k, v, _results;
      events = this.prototype.on;
      this.prototype.on = {};
      _results = [];
      for (k in events) {
        v = events[k];
        _results.push(this.prototype.on[k] = v);
      }
      return _results;
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
      var init, _i, _len, _ref;
      _ref = this._initialize;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        init = _ref[_i];
        init.apply(this, arguments);
      }
    };

    Base.include = function(obj) {
      var event, k, listener, v, _results;
      _results = [];
      for (k in obj) {
        v = obj[k];
        switch (k) {
          case 'initialize':
            _results.push(this.prototype._initialize.push(v));
            break;
          case 'on':
            _results.push((function() {
              var _results1;
              _results1 = [];
              for (event in v) {
                listener = v[event];
                _results1.push(this.prototype.on[event] = listener);
              }
              return _results1;
            }).call(this));
            break;
          default:
            _results.push(this.prototype[k] = v);
        }
      }
      return _results;
    };

    Base.initialize(function() {
      var events, k, v, _results;
      events = this.on;
      this.on = {};
      _results = [];
      for (k in events) {
        v = events[k];
        _results.push(this.on[k] = v.bind(this));
      }
      return _results;
    });

    return Base;

  })();

  Weya.Base = Base;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Weya.Base;
  }

}).call(this);
