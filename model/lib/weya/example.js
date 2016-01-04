(function() {
  var Student, student;

  Student = (function() {
    function Student(name, age) {
      this.name = name;
      this.age = age;
    }

    Student.prototype.template = function() {
      this.div("#name.col-md-6", function() {
        this.span("Name");
        return this.span(this.$.name);
      });
      return this.div("#age.col-md-6", {
        style: {
          background: "red"
        }
      }, function() {
        this.span("Age");
        this.span("" + this.$.age);
        return this.input("#ageInput", {
          type: "text"
        }, null);
      });
    };

    Student.prototype.render = function() {
      console.log(Weya.markup({
        context: this
      }, this.template));
      return Weya({
        elem: document.body,
        context: this
      }, this.template);
    };

    return Student;

  })();

  student = new Student("Varuna", 26);

  student.render();

}).call(this);
