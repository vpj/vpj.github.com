(function() {
  var CALLBACKS, INITIALIZED, LOADING, LOADING_COMPLETED, LOG, MODULES, Mod, ModError, ON_LOADED, SELF, _loadCallback, _onLoaded, _run,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod = {};

  SELF = null;

  if ((typeof console !== "undefined" && console !== null ? console.log : void 0) != null) {
    LOG = console.log.bind(console);
  } else {
    LOG = function() {
      return null;
    };
  }

  if (typeof GLOBAL !== "undefined" && GLOBAL !== null) {
    GLOBAL.Mod = Mod;
    SELF = GLOBAL;
  } else {
    this.Mod = Mod;
    SELF = this;
  }

  MODULES = {};

  CALLBACKS = [];

  ON_LOADED = [];

  INITIALIZED = false;

  LOADING_COMPLETED = false;

  LOADING = 0;

  ModError = (function(superClass) {
    extend(ModError, superClass);

    function ModError(message) {
      ModError.__super__.constructor.call(this, message);
      this.message = message;
    }

    return ModError;

  })(Error);

  Mod.set = function(name, module) {
    var e, error;
    if (MODULES[name] != null) {
      throw new ModError("Module " + name + " already registered");
    }
    MODULES[name] = module;
    if (!INITIALIZED) {
      return;
    }
    try {
      _run();
    } catch (error) {
      e = error;
      LOG("MOD: Set - " + name);
      if (e instanceof ModError) {
        LOG("MOD: Error - " + e.message);
      } else {
        throw e;
      }
    }
    return _onLoaded();
  };

  Mod.onLoad = function(callback) {
    return ON_LOADED.push(callback);
  };

  Mod.require = function() {
    var callback, i, j, k, l, len, list, ref;
    if (arguments.length < 1) {
      throw new ModError('Mod.require needs at least on argument');
    } else if (arguments.length === 2 && Array.isArray(arguments[0])) {
      list = arguments[0];
      callback = arguments[1];
    } else {
      callback = arguments[arguments.length - 1];
      list = [];
      for (i = j = 0, ref = arguments.length - 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        list.push(arguments[i]);
      }
    }
    if ((typeof callback) !== 'function') {
      throw new ModError('Last argument of Mod.require should be a function');
    }
    for (k = 0, len = list.length; k < len; k++) {
      l = list[k];
      if ((typeof l) !== 'string') {
        throw new ModError('Required namespaces should be strings');
      }
    }
    return CALLBACKS.push({
      callback: callback,
      list: list,
      called: false
    });
  };

  _onLoaded = function() {
    var cb, j, len, results;
    if (!(LOADING_COMPLETED && LOADING === 0)) {
      return;
    }
    LOG("MOD: All dependencies are met");
    results = [];
    for (j = 0, len = ON_LOADED.length; j < len; j++) {
      cb = ON_LOADED[j];
      results.push(cb());
    }
    return results;
  };

  _loadCallback = function(callback, modules) {
    callback.called = true;
    LOADING++;
    return setTimeout(function() {
      callback.callback.apply(SELF, modules);
      LOADING--;
      return _onLoaded();
    }, 0);
  };

  _run = function() {
    var cb, first, j, k, len, len1, len2, len3, list, m, n, nCall, nUncalled, name, ref, ref1, s, satis, todo;
    LOADING_COMPLETED = false;
    nUncalled = 0;
    nCall = 0;
    for (j = 0, len = CALLBACKS.length; j < len; j++) {
      cb = CALLBACKS[j];
      if (!(cb.called === false)) {
        continue;
      }
      nUncalled++;
      list = [];
      satis = true;
      ref = cb.list;
      for (k = 0, len1 = ref.length; k < len1; k++) {
        name = ref[k];
        if (MODULES[name] != null) {
          list.push(MODULES[name]);
        } else {
          satis = false;
          break;
        }
      }
      if (satis === true) {
        _loadCallback(cb, list);
        nCall++;
      }
    }
    if (nUncalled !== 0 && nCall === 0) {
      todo = {};
      s = "Cyclic dependancy: ";
      for (m = 0, len2 = CALLBACKS.length; m < len2; m++) {
        cb = CALLBACKS[m];
        if (cb.called === false) {
          ref1 = cb.list;
          for (n = 0, len3 = ref1.length; n < len3; n++) {
            name = ref1[n];
            if (MODULES[name] == null) {
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
      throw new ModError(s);
    }
    if (nUncalled === nCall) {
      return LOADING_COMPLETED = true;
    }
  };

  Mod.initialize = function() {
    var e, error;
    INITIALIZED = true;
    try {
      _run();
    } catch (error) {
      e = error;
      if (e instanceof ModError) {
        LOG("MOD: Error - " + e.message);
      } else {
        throw e;
      }
    }
    return _onLoaded();
  };

}).call(this);
