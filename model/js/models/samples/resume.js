(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Models', 'Model.Base', function(MODELS, Base) {
    var Address, Education, Experience, Recognition, Resume, Skill;
    Resume = (function(superClass) {
      extend(Resume, superClass);

      function Resume() {
        return Resume.__super__.constructor.apply(this, arguments);
      }

      Resume.extend();

      Resume.prototype.type = 'Resume';

      Resume.property('name', {});

      Resume.property('role', {});

      Resume.property('website', {});

      Resume.property('mobile', {});

      Resume.property('email', {});

      Resume.property('address', {
        oneof: ['Null', 'Address']
      });

      Resume.property('statement', {
        list: {
          rows: 3,
          columns: 50
        }
      });

      Resume.property('age', {
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

      Resume.property('timeline', {
        list: {
          oneof: ['Experience', 'Education', 'Recognition'],
          defaultValues: function() {
            return {
              from: '2010',
              to: '2020'
            };
          }
        }
      });

      Resume.property('skills', {
        list: {
          oneof: ['Skill']
        }
      });

      Resume.prototype._education = function() {
        var e, j, len, ref, res;
        res = [];
        ref = this._values.timeline;
        for (j = 0, len = ref.length; j < len; j++) {
          e = ref[j];
          if (e.type === 'Education') {
            res.push(e);
          }
        }
        res.sort(function(x, y) {
          return y._values.from - x._values.from;
        });
        return res;
      };

      Resume.prototype._experience = function() {
        var e, j, len, ref, res;
        res = [];
        ref = this._values.timeline;
        for (j = 0, len = ref.length; j < len; j++) {
          e = ref[j];
          if (e.type === 'Experience') {
            res.push(e);
          }
        }
        res.sort(function(x, y) {
          return y._values.from - x._values.from;
        });
        return res;
      };

      Resume.prototype._recognitions = function() {
        var e, j, len, ref, res;
        res = [];
        ref = this._values.timeline;
        for (j = 0, len = ref.length; j < len; j++) {
          e = ref[j];
          if (e.type === 'Recognition') {
            res.push(e);
          }
        }
        res.sort(function(x, y) {
          return y._values.year - x._values.year;
        });
        return res;
      };

      Resume.prototype.template = function(self) {
        var education, experience, recognitions, values;
        values = self._values;
        education = self._education();
        experience = self._experience();
        recognitions = self._recognitions();
        return this.div(".resume", function() {
          this.div(".row", function() {
            this.div(".six.columns", function() {
              this.div(".name", "" + values.name);
              this.div(".role", "" + values.role);
              if (values.website !== '') {
                return this.div(".website", function() {
                  return this.a({
                    href: "" + values.website
                  }, "" + values.website);
                });
              }
            });
            if (values.address.type !== 'Null') {
              this.div(".three.columns.address", function() {
                return values.address.weya(this);
              });
            }
            return this.div(".three.columns.contact", function() {
              if (values.mobile !== '') {
                this.div("" + values.mobile);
              }
              if (values.email !== '') {
                return this.div(".email", "" + values.email);
              }
            });
          });
          this.div(".row.content", function() {
            this.div(".six.columns", function() {
              if (values.statement.length > 0) {
                this.div(".statement", function() {
                  var j, len, p, ref, results;
                  this.h2("Personal Statement");
                  ref = values.statement;
                  results = [];
                  for (j = 0, len = ref.length; j < len; j++) {
                    p = ref[j];
                    results.push(this.p(p));
                  }
                  return results;
                });
              }
              if (education.length > 0) {
                this.div(".education", function() {
                  var e, j, len, results;
                  this.h2("Education");
                  results = [];
                  for (j = 0, len = education.length; j < len; j++) {
                    e = education[j];
                    results.push(e.weya(this));
                  }
                  return results;
                });
              }
              if (values.skills.length > 0) {
                return this.div(".skills", function() {
                  var e, j, len, ref, results;
                  this.h2("Skills");
                  ref = values.skills;
                  results = [];
                  for (j = 0, len = ref.length; j < len; j++) {
                    e = ref[j];
                    results.push(e.weya(this));
                  }
                  return results;
                });
              }
            });
            return this.div(".six.columns", function() {
              if (experience.length > 0) {
                this.div(".experience", function() {
                  var e, j, len, results;
                  this.h2("Experience");
                  results = [];
                  for (j = 0, len = experience.length; j < len; j++) {
                    e = experience[j];
                    results.push(e.weya(this));
                  }
                  return results;
                });
              }
              if (recognitions.length > 0) {
                return this.div(".recognition", function() {
                  var e, j, len, results;
                  this.h2("Recognitions");
                  results = [];
                  for (j = 0, len = recognitions.length; j < len; j++) {
                    e = recognitions[j];
                    results.push(e.weya(this));
                  }
                  return results;
                });
              }
            });
          });
          if (false) {
            return this.div(function() {
              var f, j, len, ref, results;
              ref = values.timeline;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                f = ref[j];
                results.push(this.div(function() {
                  return f.weya(this);
                }));
              }
              return results;
            });
          }
        });
      };

      Resume.check();

      return Resume;

    })(Base);
    MODELS.register('Resume', Resume);
    Address = (function(superClass) {
      extend(Address, superClass);

      function Address() {
        return Address.__super__.constructor.apply(this, arguments);
      }

      Address.extend();

      Address.prototype.type = 'Address';

      Address.property('street1', {});

      Address.property('street2', {});

      Address.property('city', {});

      Address.property('country', {});

      Address.prototype.template = function(self) {
        var values;
        values = self._values;
        if (values.street1 !== '') {
          this.div("" + values.street1);
        }
        if (values.street2 !== '') {
          this.div("" + values.street2);
        }
        if (values.city !== '') {
          this.div("" + values.city);
        }
        if (values.country !== '') {
          return this.div("" + values.country);
        }
      };

      Address.check();

      return Address;

    })(Base);
    MODELS.register('Address', Address);
    Experience = (function(superClass) {
      extend(Experience, superClass);

      function Experience() {
        return Experience.__super__.constructor.apply(this, arguments);
      }

      Experience.extend();

      Experience.prototype.type = 'Experience';

      Experience.property('from', {
        columns: 5,
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

      Experience.property('to', {
        columns: 5,
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

      Experience.property('company', {});

      Experience.property('role', {});

      Experience.prototype.template = function(self) {
        var values;
        values = self._values;
        return this.div(".experience", function() {
          this.div(".period", "From " + values.from + " To " + values.to);
          this.div(".role", "" + values.role);
          return this.div(".company", "" + values.company);
        });
      };

      Experience.check();

      return Experience;

    })(Base);
    MODELS.register('Experience', Experience);
    Education = (function(superClass) {
      extend(Education, superClass);

      function Education() {
        return Education.__super__.constructor.apply(this, arguments);
      }

      Education.extend();

      Education.prototype.type = 'Education';

      Education.property('from', {
        columns: 5,
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

      Education.property('to', {
        columns: 5,
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

      Education.property('institute', {});

      Education.property('course', {});

      Education.prototype.template = function(self) {
        var values;
        values = self._values;
        return this.div(".education", function() {
          this.div(".period", "From " + values.from + " To " + values.to);
          this.div(".course", "" + values.course);
          return this.div(".institute", "" + values.institute);
        });
      };

      Education.check();

      return Education;

    })(Base);
    MODELS.register('Education', Education);
    Recognition = (function(superClass) {
      extend(Recognition, superClass);

      function Recognition() {
        return Recognition.__super__.constructor.apply(this, arguments);
      }

      Recognition.extend();

      Recognition.prototype.type = 'Recognition';

      Recognition.property('year', {
        columns: 5,
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

      Recognition.property('recognition', {});

      Recognition.property('detail', {});

      Recognition.prototype.template = function(self) {
        var values;
        values = self._values;
        return this.div(".recognition", function() {
          this.div(".icon", function() {
            return this.i(".fa.fa-4x.fa-trophy", null);
          });
          return this.div(function() {
            this.div(".period", "" + values.year);
            this.div(".recognition-info", "" + values.recognition);
            if (values.detail !== '') {
              return this.div(".detail", "" + values.detail);
            }
          });
        });
      };

      Recognition.check();

      return Recognition;

    })(Base);
    MODELS.register('Recognition', Recognition);
    Skill = (function(superClass) {
      extend(Skill, superClass);

      function Skill() {
        return Skill.__super__.constructor.apply(this, arguments);
      }

      Skill.extend();

      Skill.prototype.type = 'Skill';

      Skill.property('level', {
        columns: 5,
        valid: function(str) {
          var n;
          n = parseInt(str);
          if (("" + n) !== ("" + str)) {
            return false;
          }
          if ((0 <= n && n <= 10)) {
            return true;
          } else {
            return false;
          }
        },
        value: function(str) {
          return parseInt(str);
        },
        "default": function() {
          return 10;
        }
      });

      Skill.property('skill', {});

      Skill.prototype.template = function(self) {
        var values;
        values = self._values;
        return this.div(".skill.row", function() {
          this.div(".columns.six.skill-name", "" + values.skill);
          return this.div(".columns.six.skill-level", function() {
            var i, j, k, ref, ref1, results;
            for (i = j = 0, ref = values.level; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              this.i(".fa.fa-circle.filled", null);
            }
            results = [];
            for (i = k = 0, ref1 = 10 - values.level; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
              results.push(this.i(".fa.fa-circle.unfilled", null));
            }
            return results;
          });
        });
      };

      Skill.check();

      return Skill;

    })(Base);
    return MODELS.register('Skill', Skill);
  });

}).call(this);
