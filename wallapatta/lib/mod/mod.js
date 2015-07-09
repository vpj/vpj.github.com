(function() {
  var LOG, Mod, ModError, _self, callbacks, everythingLoaded, initializeCalled, loaded, modules, run, running,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod = {};

  _self = null;

  if ((typeof console !== "undefined" && console !== null ? console.log : void 0) != null) {
    LOG = console.log.bind(console);
  } else {
    LOG = function() {
      return null;
    };
  }

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

  initializeCalled = false;

  everythingLoaded = false;

  running = false;

  ModError = (function(superClass) {
    extend(ModError, superClass);

    function ModError(message) {
      ModError.__super__.constructor.call(this, message);
      this.message = message;
    }

    return ModError;

  })(Error);

  Mod.set = function(name, module) {
    var cb, e, j, len, results;
    if (modules[name] != null) {
      throw new ModError("Module " + name + " already registered");
    }
    modules[name] = module;
    if (initializeCalled && !running) {
      try {
        running = true;
        run();
      } catch (_error) {
        e = _error;
        running = false;
        LOG("MOD: Set - " + name);
        if (e instanceof ModError) {
          LOG("MOD: Error - " + e.message);
        } else {
          throw e;
        }
      }
    }
    if (everythingLoaded) {
      LOG("MOD: All dependencies are met");
      results = [];
      for (j = 0, len = loaded.length; j < len; j++) {
        cb = loaded[j];
        results.push(cb());
      }
      return results;
    }
  };

  Mod.onLoad = function(callback) {
    return loaded.push(callback);
  };

  Mod.require = function() {
    var callback, i, j, l, len, list, m, ref;
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
    for (m = 0, len = list.length; m < len; m++) {
      l = list[m];
      if ((typeof l) !== 'string') {
        throw new ModError('Required namespaces should be strings');
      }
    }
    return callbacks.push({
      callback: callback,
      list: list,
      called: false
    });
  };

  run = function() {
    var cb, first, j, k, len, len1, len2, len3, list, m, n, nC, name, o, p, ref, ref1, s, satis, todo;
    everythingLoaded = false;
    while (true) {
      n = 0;
      nC = 0;
      for (j = 0, len = callbacks.length; j < len; j++) {
        cb = callbacks[j];
        if (!(cb.called === false)) {
          continue;
        }
        n++;
        k = parseInt(k);
        list = [];
        satis = true;
        ref = cb.list;
        for (m = 0, len1 = ref.length; m < len1; m++) {
          name = ref[m];
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
        for (o = 0, len2 = callbacks.length; o < len2; o++) {
          cb = callbacks[o];
          if (cb.called === false) {
            ref1 = cb.list;
            for (p = 0, len3 = ref1.length; p < len3; p++) {
              name = ref1[p];
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
        throw new ModError(s);
      }
    }
    return everythingLoaded = true;
  };

  Mod.initialize = function() {
    var cb, e, j, len, results;
    initializeCalled = true;
    try {
      running = true;
      run();
    } catch (_error) {
      e = _error;
      if (e instanceof ModError) {
        LOG("MOD: Error - " + e.message);
      } else {
        throw e;
      }
    }
    running = false;
    if (everythingLoaded) {
      LOG("MOD: All dependencies are met");
      results = [];
      for (j = 0, len = loaded.length; j < len; j++) {
        cb = loaded[j];
        results.push(cb());
      }
      return results;
    }
  };

}).call(this);
