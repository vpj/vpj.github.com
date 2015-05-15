(function() {
  var Mod, _self, callbacks, loaded, modules;

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
    var callback, i, j, l, len, list, m, ref;
    if (arguments.length < 1) {
      throw new Error('Mod.require needs at least on argument');
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
      throw new Error('Last argument of Mod.require should be a function');
    }
    for (m = 0, len = list.length; m < len; m++) {
      l = list[m];
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
    var cb, first, j, k, len, len1, len2, len3, len4, list, m, n, nC, name, o, p, q, ref, ref1, results, s, satis, todo;
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
        throw new Error(s);
      }
    }
    console.log("Initialized");
    results = [];
    for (q = 0, len4 = loaded.length; q < len4; q++) {
      cb = loaded[q];
      results.push(cb());
    }
    return results;
  };

}).call(this);
