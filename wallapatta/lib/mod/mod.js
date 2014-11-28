(function() {
  var Mod, callbacks, loaded, modules, _self;

  Mod = {};

  _self = null;

  if (typeof GLOBAL !== "undefined" && GLOBAL !== null) {
    GLOBAL.Mod = Mod;
    _self = GLOBAL;
  } else {
    this.Mod = Mod;
    _self = this;
  }

  modules = {};

  callbacks = [];

  loaded = [];

  Mod.set = function(name, module) {
    if (modules[name] != null) {
      throw new Error("Module " + name + " already registered");
    }
    return modules[name] = module;
  };

  Mod.onLoad = function(callback) {
    return loaded.push(callback);
  };

  Mod.require = function() {
    var callback, i, l, list, _i, _j, _len, _ref;
    if (arguments.length < 1) {
      throw new Error('Mod.require needs at least on argument');
    } else if (arguments.length === 2 && Array.isArray(arguments[0])) {
      list = arguments[0];
      callback = arguments[1];
    } else {
      callback = arguments[arguments.length - 1];
      list = [];
      for (i = _i = 0, _ref = arguments.length - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        list.push(arguments[i]);
      }
    }
    if ((typeof callback) !== 'function') {
      throw new Error('Last argument of Mod.require should be a function');
    }
    for (_j = 0, _len = list.length; _j < _len; _j++) {
      l = list[_j];
      if ((typeof l) !== 'string') {
        throw new Error('Required namespaces should be strings');
      }
    }
    return callbacks.push({
      callback: callback,
      list: list,
      called: false
    });
  };

  Mod.initialize = function() {
    var cb, first, k, list, n, nC, name, s, satis, todo, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _results;
    while (true) {
      n = 0;
      nC = 0;
      for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
        cb = callbacks[_i];
        if (!(cb.called === false)) {
          continue;
        }
        n++;
        k = parseInt(k);
        list = [];
        satis = true;
        _ref = cb.list;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          name = _ref[_j];
          if (modules[name] != null) {
            list.push(modules[name]);
          } else {
            satis = false;
            break;
          }
        }
        if (satis === true) {
          cb.called = true;
          cb.callback.apply(_self, list);
          nC++;
        }
      }
      if (n === 0) {
        break;
      }
      if (n !== 0 && nC === 0) {
        todo = {};
        s = "Cyclic dependancy: ";
        for (_k = 0, _len2 = callbacks.length; _k < _len2; _k++) {
          cb = callbacks[_k];
          if (cb.called === false) {
            _ref1 = cb.list;
            for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
              name = _ref1[_l];
              if (modules[name] == null) {
                todo[name] = true;
              }
            }
          }
        }
        first = "";
        for (name in todo) {
          s += "" + first + name;
          first = ", ";
        }
        throw new Error(s);
      }
    }
    console.log("Initialized");
    _results = [];
    for (_m = 0, _len4 = loaded.length; _m < _len4; _m++) {
      cb = loaded[_m];
      _results.push(cb());
    }
    return _results;
  };

}).call(this);
