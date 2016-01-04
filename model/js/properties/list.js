(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Properties', 'Property.Base', 'Weya.Base', function(PROPERTIES, Base, WeyaBase) {
    var Edit, List;
    List = (function(superClass) {
      extend(List, superClass);

      List.extend();

      List["default"]('list', {});

      List["default"]('default', function() {
        return [];
      });

      List["default"]('isDefault', function(value) {
        if (value == null) {
          return true;
        }
        if (value.length === 0) {
          return true;
        }
        return false;
      });

      function List(schema) {
        var list;
        List.__super__.constructor.call(this, schema);
        list = this.schema.list;
        this.item = PROPERTIES.create(list);
      }

      List.isValidSchema = function(schema) {
        if (!List.__super__.constructor.isValidSchema.call(this, schema)) {
          return false;
        }
        if (schema.list == null) {
          return false;
        }
        return PROPERTIES.isValidSchema(schema.list);
      };

      List.prototype.toJSON = function(value) {
        var data, j, len, v;
        if (!value) {
          return null;
        }
        if (value.length === 0) {
          return null;
        }
        data = [];
        for (j = 0, len = value.length; j < len; j++) {
          v = value[j];
          data.push(this.item.toJSON(v));
        }
        return data;
      };

      List.prototype.parse = function(data) {
        var d, e, j, k, len, len1, r, ref, res;
        r = List.__super__.parse.call(this, data);
        if (r !== true) {
          return r;
        }
        if (!Array.isArray(data)) {
          return this.error('array expected');
        }
        res = {
          score: 0,
          errors: [],
          value: []
        };
        for (j = 0, len = data.length; j < len; j++) {
          d = data[j];
          r = this.item.parse(d);
          res.score += r.score;
          ref = r.errors;
          for (k = 0, len1 = ref.length; k < len1; k++) {
            e = ref[k];
            res.errors.push(e);
          }
          res.value.push(r.value);
        }
        res.score /= res.value.length;
        return res;
      };

      List.prototype.edit = function(elem, value, changed) {
        return new Edit(this, elem, value, changed);
      };

      return List;

    })(Base);
    Edit = (function(superClass) {
      extend(Edit, superClass);

      function Edit() {
        return Edit.__super__.constructor.apply(this, arguments);
      }

      Edit.extend();

      Edit.initialize(function(property, elem, value, changed) {
        this.property = property;
        this.elems = {
          parent: elem
        };
        this.list = value;
        this.onChanged = changed;
        return this.render();
      });

      Edit.prototype.render = function() {
        Weya({
          elem: this.elems.parent,
          context: this
        }, function() {
          this.div(".list-controls", function() {
            return this.$.elems.add = this.i(".fa.fa-plus", null);
          });
          return this.$.elems.list = this.div(".list", null);
        });
        this.elems.add.addEventListener('click', this.on.addClick);
        return this.renderList();
      };

      Edit.listen('addClick', function(e) {
        this.list.push((this.property.item.parse(null)).value);
        this.renderList();
        return this.onChanged(this.list);
      });

      Edit.listen('listClick', function(e) {
        var action, i, idx, j, n, ref, ref1, temp;
        n = e.target;
        idx = null;
        action = null;
        while (n != null) {
          if (n.listIdx != null) {
            idx = n.listIdx;
          }
          if (n.listAction != null) {
            action = n.listAction;
          }
          n = n.parentNode;
        }
        if (idx == null) {
          return;
        }
        if (action == null) {
          return;
        }
        switch (action) {
          case 'down':
            if (idx >= this.list.length - 1) {
              return;
            }
            temp = this.list[idx];
            this.list[idx] = this.list[idx + 1];
            this.list[idx + 1] = temp;
            break;
          case 'up':
            if (idx <= 0) {
              return;
            }
            temp = this.list[idx];
            this.list[idx] = this.list[idx - 1];
            this.list[idx - 1] = temp;
            break;
          case 'delete':
            for (i = j = ref = idx, ref1 = this.list.length - 1; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
              this.list[i] = this.list[i + 1];
            }
            this.list.pop();
        }
        this.renderList();
        return this.onChanged(this.list, false);
      });

      Edit.prototype.renderList = function() {
        var i, j, len, ref, results, v;
        this.elems.list.innerHTML = '';
        this.elems.items = [];
        Weya({
          elem: this.elems.list,
          context: this
        }, function() {
          var i, j, len, ref, results, v;
          ref = this.$.list;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            v = ref[i];
            results.push(this.div(".list-item", function() {
              this.div(".list-item-controls-hover", function() {
                this.i(".fa.fa-cog", null);
                return this.div(".list-item-controls", {
                  on: {
                    click: this.$.on.listClick
                  }
                }, function() {
                  var icon;
                  icon = this.i(".fa.fa-lg.fa-arrow-up", null);
                  icon.listIdx = i;
                  icon.listAction = 'up';
                  icon = this.i(".fa.fa-lg.fa-arrow-down", null);
                  icon.listIdx = i;
                  icon.listAction = 'down';
                  icon = this.i(".fa.fa-lg.fa-trash", null);
                  icon.listIdx = i;
                  return icon.listAction = 'delete';
                });
              });
              return this.$.elems.items.push(this.div(".list-item-content", null));
            }));
          }
          return results;
        });
        ref = this.list;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          v = ref[i];
          results.push(this.property.item.edit(this.elems.items[i], v, this.itemChanged.bind({
            self: this,
            idx: i
          })));
        }
        return results;
      };

      Edit.prototype.itemChanged = function(value, changed) {
        if (changed) {
          this.self.list[this.idx] = value;
        }
        return this.self.onChanged(this.self.list, false);
      };

      return Edit;

    })(WeyaBase);
    return PROPERTIES.register('list', List);
  });

}).call(this);
