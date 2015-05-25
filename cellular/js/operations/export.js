(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Operation', 'OPERATIONS', function(Base, OPERATIONS) {
    var Export;
    Export = (function(superClass) {
      extend(Export, superClass);

      function Export() {
        return Export.__super__.constructor.apply(this, arguments);
      }

      Export.extend();

      Export.prototype.operationName = 'Export';

      Export.operationName = 'Export';

      Export.prototype.type = 'export';

      Export.type = 'export';

      Export.prototype.json = function() {
        return {
          column: this.column,
          data: this.data
        };
      };

      Export.prototype.render = function() {
        this.elems.sidebar.innerHTML = '';
        this.elems.content.innerHTML = '';
        Weya({
          elem: this.elems.sidebar,
          context: this
        }, function() {
          return this.button('.u-full-width', {
            on: {
              click: this.$.on.cancel
            }
          }, 'OK');
        });
        Weya({
          elem: this.elems.content,
          context: this
        }, function() {
          return this.$.elems.textArea = this.textarea(".textarea-data", '', {
            autocomplete: "off",
            spellcheck: "false"
          });
        });
        return window.requestAnimationFrame(this.on.setupEditor);
      };

      Export.listen('setupEditor', function() {
        this.textEditor = CodeMirror.fromTextArea(this.elems.textArea, {
          mode: "text",
          lineNumbers: true,
          value: "",
          tabSize: 12
        });
        this.textEditor.setSize('100%', '100%');
        return this["export"]();
      });

      Export.listen('cancel', function(e) {
        e.preventDefault();
        return this.callbacks.cancel();
      });

      Export.prototype["export"] = function() {
        var c, d, data, header, i, j, k, len, len1, line, r, ref, ref1, ref2, table;
        table = this.editor.getTable();
        header = '';
        ref = table.columns;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          if (header !== '') {
            header += ',';
          }
          header += "\"" + (c.name.replace(/\"/g, '""')) + "\"";
        }
        data = header + "\n";
        for (r = j = 0, ref1 = table.size; 0 <= ref1 ? j < ref1 : j > ref1; r = 0 <= ref1 ? ++j : --j) {
          line = '';
          ref2 = table.columns;
          for (k = 0, len1 = ref2.length; k < len1; k++) {
            c = ref2[k];
            d = "" + (table.data[c.id][r] || c["default"]);
            if (line !== '') {
              line += ',';
            }
            line += "\"" + (d.replace(/\"/g, '""')) + "\"";
          }
          data += line + "\n";
        }
        return this.textEditor.setValue(data);
      };

      return Export;

    })(Base);
    return OPERATIONS.set(Export.type, Export);
  });

}).call(this);
