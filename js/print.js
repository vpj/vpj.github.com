(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Weya', 'Wallapatta.Parser', function(Base, Weya, Parser) {
    var STATIC, Static;
    Static = (function(superClass) {
      extend(Static, superClass);

      function Static() {
        return Static.__super__.constructor.apply(this, arguments);
      }

      Static.initialize(function() {
        this.elems = {
          controls: (document.getElementsByClassName('static-controls'))[0],
          containers: document.getElementsByClassName('wallapatta-container'),
          docs: document.getElementsByClassName('wallapatta'),
          pageBackgrounds: (document.getElementsByClassName('page-backgrounds'))[0]
        };
        this.width = 170;
        return this.height = 225;
      });

      Static.prototype.render = function() {
        return Weya({
          elem: this.elems.controls,
          context: this
        }, function() {
          return this.$.elems.printForm = this.div(".container.print-form", function() {
            return this.form(function() {
              this.label({
                "for": "width-input"
              }, "Width (mm)");
              this.$.elems.widthInput = this.input("#width-input.u-full-width", {
                type: "number",
                value: "170"
              });
              this.label({
                "for": "height-input"
              }, "Height (mm)");
              this.$.elems.heightInput = this.input("#height-input.u-full-width", {
                type: "number",
                value: "225"
              });
              this.div(function() {
                return this.button(".button-primary", "Preview", {
                  on: {
                    click: this.$.on.previewClick
                  }
                });
              });
              return this.div(function() {
                return this.button(".button", "Print", {
                  on: {
                    click: this.$.on.printClick
                  }
                });
              });
            });
          });
        });
      };

      Static.listen('previewClick', function(e) {
        e.preventDefault();
        this.width = parseInt(this.elems.widthInput.value);
        this.height = parseInt(this.elems.heightInput.value);
        return this.preview();
      });

      Static.listen('printClick', function(e) {
        e.preventDefault();
        return window.requestAnimationFrame(function() {
          return window.print();
        });
      });

      Static.prototype._processDocument = function(n, doc) {
        var code, main, parser, render, sidebar;
        code = doc.getElementsByClassName('wallapatta-code');
        if (code.length !== 1) {
          throw new Error('No code element');
        }
        code = code[0];
        main = doc.getElementsByClassName('wallapatta-main');
        if (main.length !== 1) {
          throw new Error('No main element');
        }
        main = main[0];
        sidebar = doc.getElementsByClassName('wallapatta-sidebar');
        if (sidebar.length !== 1) {
          throw new Error('No sidebar element');
        }
        sidebar = sidebar[0];
        this._parsers[n] = parser = new Parser({
          text: code.textContent,
          id: n * 10000
        });
        parser.parse();
        main.innerHTML = '';
        sidebar.innerHTML = '';
        this._renderers[n] = render = parser.getRender();
        render.render(main, sidebar);
        return window.requestAnimationFrame((function(_this) {
          return function() {
            return render.mediaLoaded(_this.on.documentLoaded);
          };
        })(this));
      };

      Static.listen('documentLoaded', function() {
        this._documentsLoaded++;
        if (this._documentsLoaded < this._parsers.length) {
          return;
        }
        return setTimeout(this.on.readyToSetPages, 1000);
      });

      Static.listen('readyToSetPages', function() {
        var j, len, pg, ref, render;
        this.elems.pageBackgrounds.innerHTML = '';
        ref = this._renderers;
        for (j = 0, len = ref.length; j < len; j++) {
          render = ref[j];
          pg = null;
          Weya({
            elem: this.elems.pageBackgrounds
          }, function() {
            return pg = this.div("");
          });
          render.setPageBackgrounds(pg);
          render.setPages(this.pageHeight, this.pageWidth);
        }
        return window.requestAnimationFrame(this.on.pagesSet);
      });

      Static.listen('pagesSet', function() {
        var i, j, k, l, last, len, len1, len2, p, page, pages, pn, ref, ref1, render, toc, topMargin;
        toc = [];
        last = 1;
        ref = this._renderers;
        for (j = 0, len = ref.length; j < len; j++) {
          render = ref[j];
          p = 0;
          ref1 = render.pageNumbers;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            pn = ref1[k];
            p = pn.page;
            if (!pn.node.type === 'section') {
              continue;
            }
            if (pn.node.heading == null) {
              continue;
            }
            toc.push({
              page: pn.page + last,
              level: pn.node.level,
              heading: pn.node.heading.text
            });
            console.log(pn.page, pn.node.level, pn.node.heading.text);
          }
          last = last + p + 1;
        }
        pages = document.getElementsByClassName('page-background');
        topMargin = this.pageHeight + 10;
        for (i = l = 0, len2 = pages.length; l < len2; i = ++l) {
          page = pages[i];
          Weya({
            elem: page
          }, function() {
            return this.div(".page-number", {
              style: {
                top: topMargin + "px"
              }
            }, "" + (i + 1));
          });
        }
        if (window.RENDER_TOC != null) {
          return window.RENDER_TOC(toc, this.width);
        }
      });

      Static.prototype.preview = function() {
        var container, j, len, ref;
        ref = this.elems.containers;
        for (j = 0, len = ref.length; j < len; j++) {
          container = ref[j];
          container.classList.add('wallapatta-print');
          container.style.width = this.width + "mm";
        }
        this._documentsLoaded = 0;
        this._parsers = new Array(this.elems.docs.length);
        this._renderers = new Array(this.elems.docs.length);
        return window.requestAnimationFrame((function(_this) {
          return function() {
            var doc, i, k, len1, ratio, ref1, results;
            ratio = _this.elems.containers[0].offsetWidth / _this.width;
            _this.pageWidth = ratio * _this.width;
            _this.pageHeight = ratio * _this.height;
            ref1 = _this.elems.docs;
            results = [];
            for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
              doc = ref1[i];
              results.push(_this._processDocument(i, doc));
            }
            return results;
          };
        })(this));
      };

      return Static;

    })(Base);
    STATIC = new Static();
    return STATIC.render();
  });

  document.addEventListener('DOMContentLoaded', function() {
    Mod.set('Weya', Weya);
    Mod.set('Weya.Base', Weya.Base);
    Mod.set('HLJS', hljs);
    Mod.set('CoffeeScript', 'CoffeeScript');
    return Mod.initialize();
  });

}).call(this);
