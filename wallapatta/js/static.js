(function() {
  Mod.require('Wallapatta.Parser', function(Parser) {
    var PAGE_HEIGHT, PAGE_WIDTH, PRINT, RATIO, doc, docs, process, processAll, renderPrint, renderWeb, _i, _len;
    RATIO = 0;
    PAGE_HEIGHT = PAGE_WIDTH = 0;
    if ((window.location.href.indexOf('print')) !== -1) {
      PRINT = true;
    } else {
      PRINT = false;
    }
    renderWeb = function(render) {
      return render.mediaLoaded(function() {
        var int, n;
        render.setFills();
        n = 0;
        return int = setInterval(function() {
          render.setFills();
          n++;
          if (n === 10) {
            return clearInterval(int);
          }
        }, 1000);
      });
    };
    renderPrint = function(render) {
      return render.mediaLoaded(function() {
        return setTimeout(function() {
          return render.setPages(PAGE_HEIGHT);
        }, 5000);
      });
    };
    process = function(n, doc) {
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
      parser = new Parser({
        text: code.textContent,
        id: n * 10000
      });
      parser.parse();
      render = parser.getRender();
      render.collectElements({
        main: main,
        sidebar: sidebar
      });
      return window.requestAnimationFrame(function() {
        if (PRINT) {
          return renderPrint(render);
        } else {
          return renderWeb(render);
        }
      });
    };
    processAll = function() {
      var doc, docs, i, _i, _len, _results;
      docs = document.getElementsByClassName('wallapatta');
      _results = [];
      for (i = _i = 0, _len = docs.length; _i < _len; i = ++_i) {
        doc = docs[i];
        _results.push(process(i, doc));
      }
      return _results;
    };
    if (PRINT) {
      docs = document.getElementsByClassName('wallapatta-container');
      for (_i = 0, _len = docs.length; _i < _len; _i++) {
        doc = docs[_i];
        doc.classList.add('wallapatta-print');
      }
      return window.requestAnimationFrame(function() {
        RATIO = docs[0].offsetWidth / 170;
        PAGE_WIDTH = RATIO * 170;
        PAGE_HEIGHT = RATIO * 225;
        return processAll();
      });
    } else {
      return processAll();
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    Mod.set('Weya', Weya);
    Mod.set('Weya.Base', Weya.Base);
    return Mod.initialize();
  });

}).call(this);
