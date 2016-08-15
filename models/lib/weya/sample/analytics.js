(function() {
  var Student, student,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Weya.Base.weyaDebug();

  Student = (function(superClass) {
    extend(Student, superClass);

    function Student() {
      return Student.__super__.constructor.apply(this, arguments);
    }

    Student.initialize(function(name, age) {
      this.name = name;
      this.age = age;
      return this.exams = [];
    });

    Student.prototype.addExam = function(name, score) {
      return this.exams.push({
        name: name,
        score: score
      });
    };

    Student.prototype.getTotal = function() {
      var exam, i, len, ref, sum;
      sum = 0;
      ref = this.exams;
      for (i = 0, len = ref.length; i < len; i++) {
        exam = ref[i];
        sum += exam.score;
      }
      return sum;
    };

    Student.prototype.getAverage = function() {
      return this.getTotal() / this.exams.length;
    };

    Student.weyaAnalytics('Student');

    return Student;

  })(Weya.Base);

  student = new Student("Varuna", 26);

  student.addExam('asdf', 21);

  student.addExam(21, 23);

  console.log(student.getTotal(student));

  console.log(student.getAverage());

  console.log(Weya.ANALYTICS);

}).call(this);
