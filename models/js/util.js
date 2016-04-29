(function() {
  Mod.require(function() {
    var Util;
    Util = {
      extend: function() {
        var i, j, k, o, obj, ref, v;
        if (arguments.length === 0) {
          return null;
        }
        obj = arguments[0];
        if ((typeof obj) !== 'object') {
          throw new Error("Cannot extend " + (typeof obj));
        }
        for (i = j = 1, ref = arguments.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
          o = arguments[i];
          if ((typeof o) !== 'object') {
            throw new Error("Cannot extend " + (typeof o));
          }
          for (k in o) {
            v = o[k];
            obj[k] = v;
          }
        }
        return obj;
      }
    };
    return Mod.set('Models.Util', Util);
  });

}).call(this);
