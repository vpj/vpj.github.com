(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Models', 'Model.Base', function(MODELS, Base) {
    var Person;
    Person = (function(superClass) {
      extend(Person, superClass);

      function Person() {
        return Person.__super__.constructor.apply(this, arguments);
      }

      Person.extend();

      Person.prototype.type = 'Person';

      Person.property('name', {});

      Person.property('age', {
        valid: function(str) {
          return ("" + (parseInt(str))) === ("" + str);
        },
        value: function(str) {
          return parseInt(str);
        },
        "default": function() {
          return 0;
        }
      });

      Person.property('family', {
        list: {}
      });

      Person.property('friends', {
        list: {
          oneof: ['Person'],
          defaultValues: function() {
            return {
              name: 'Your name',
              age: 24
            };
          }
        }
      });

      Person.prototype.template = function(self) {
        var values;
        values = self._values;
        this.p("Name: " + values.name);
        this.p("Age: " + values.age);
        if (values.family.length > 0) {
          this.div(function() {
            this.h4("Family");
            return this.ul(function() {
              var f, i, len, ref, results;
              ref = values.family;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                f = ref[i];
                results.push(this.li("" + f));
              }
              return results;
            });
          });
        }
        if (values.friends.length > 0) {
          return this.div(function() {
            var f, i, len, ref, results;
            this.h4("Friends");
            ref = values.friends;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              f = ref[i];
              results.push(this.div(function() {
                return f.weya(this);
              }));
            }
            return results;
          });
        }
      };

      Person.check();

      return Person;

    })(Base);
    return MODELS.register('Person', Person);
  });

}).call(this);
