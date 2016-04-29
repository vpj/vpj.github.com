(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Weya', 'Models.Editor', function(Base, Weya, Editor) {
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
        return this.editor = new Editor({
          model: 'Resume'
        });
      });

      App.listen('error', function(e) {
        return console.error(e);
      });

      App.prototype.render = function() {
        return this.editor.render(document.body, {
          height: window.innerHeight,
          width: window.innerWidth
        }, this.on.rendered);
      };

      App.listen('rendered', function() {
        window.addEventListener('resize', this.on.resize);
        this.editor.structured();
        return this.editor.setJSON({
          name: 'Batman',
          role: 'Vigilante',
          mobile: 'Bat Signal',
          email: 'darkknight@batcomputer.com',
          timeline: [
            {
              from: 1997,
              to: 1999,
              institute: 'Leage of Shadows',
              course: 'Stealth and Reconnaissance'
            }, {
              from: 2003,
              to: 2007,
              company: 'The Outsiders',
              role: 'Team Leader'
            }, {
              from: 2004,
              to: 2016,
              company: 'Batman, Inc.',
              role: 'Crime Fighter'
            }, {
              from: 2007,
              to: 2016,
              company: 'Justice League',
              role: 'Team Member'
            }
          ],
          skills: [
            {
              skill: 'Detective'
            }, {
              skill: 'Martial arts'
            }, {
              level: 8,
              skill: 'Chemistry'
            }, {
              skill: 'Criminology'
            }, {
              skill: 'Forensics'
            }
          ]
        });
      });

      App.listen('resize', function() {
        return this.editor.resize({
          height: window.innerHeight,
          width: window.innerWidth
        });
      });

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
