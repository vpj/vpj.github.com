(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Weya', 'Editor', function(Base, Weya, Editor) {
    var APP, App;
    App = (function(superClass) {
      extend(App, superClass);

      function App() {
        return App.__super__.constructor.apply(this, arguments);
      }

      App.initialize(function() {
        this.elems = {};
        this._changed = false;
        this.content = '';
        return Editor.onChangeListener = this.on.change;
      });

      App.listen('error', function(e) {
        return console.error(e);
      });

      App.listen('change', function() {});

      App.prototype.render = function() {
        return Editor.render(document.body);
      };

      return App;

    })(Base);
    APP = new App();
    return APP.render();
  });

  document.addEventListener('DOMContentLoaded', function() {
    Mod.set('Weya', Weya);
    Mod.set('Weya.Base', Weya.Base);
    Mod.set('CodeMirror', CodeMirror);
    Mod.set('YAML', YAML);
    Mod.debug(true);
    return Mod.initialize();
  });

}).call(this);
