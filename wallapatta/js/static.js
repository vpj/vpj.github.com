(function() {
  Mod.require('Wallapatta.Parser', function(Parser) {
    var PAGE_HEIGHT, PAGE_WIDTH, PRINT, PRINT_HEIGHT, PRINT_WIDTH, RATIO, doc, docs, i, j, len, p, process, processAll, renderPrint, renderWeb;
    RATIO = 0;
    PAGE_HEIGHT = PAGE_WIDTH = 0;
    PRINT_HEIGHT = PAGE_WIDTH = NaN;
    if ((window.location.href.indexOf('print')) !== -1) {
      PRINT = true;
      i = window.location.href.indexOf('print');
      p = window.location.href.substr(i + 'print='.length);
      p = p.split('x');
      if (p.length === 2) {
        PRINT_WIDTH = parseInt(p[0]);
        PRINT_HEIGHT = parseInt(p[1]);
      }
      if (isNaN(PRINT_WIDTH)) {
        PRINT_WIDTH = 178;
      }
      if (isNaN(PRINT_HEIGHT)) {
        PRINT_HEIGHT = 225;
      }
    } else {
      PRINT = false;
    }
    renderWeb = function(render) {
      var _count, _imagesLoaded, _interval, _render;
      _imagesLoaded = false;
      _count = 0;
      _interval = null;
      _render = function() {
        render.setFills();
        if (_imagesLoaded) {
          _count++;
          if (_count === 10) {
            return clearInterval(_interval);
          }
        }
      };
      render.mediaLoaded(function() {
        _imagesLoaded = true;
        return _render();
      });
      return _interval = setInterval(_render, 1000);
    };
    renderPrint = function(render) {
      return render.mediaLoaded(function() {
        return setTimeout(function() {
          return render.setPages(PAGE_HEIGHT, PAGE_WIDTH);
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
      var doc, docs, j, len, results;
      docs = document.getElementsByClassName('wallapatta');
      results = [];
      for (i = j = 0, len = docs.length; j < len; i = ++j) {
        doc = docs[i];
        results.push(process(i, doc));
      }
      return results;
    };
    if (PRINT) {
      docs = document.getElementsByClassName('wallapatta-container');
      for (j = 0, len = docs.length; j < len; j++) {
        doc = docs[j];
        doc.classList.add('wallapatta-print');
        doc.style.width = PRINT_WIDTH + "mm";
      }
      return window.requestAnimationFrame(function() {
        RATIO = docs[0].offsetWidth / PRINT_WIDTH;
        PAGE_WIDTH = RATIO * PRINT_WIDTH;
        PAGE_HEIGHT = RATIO * PRINT_HEIGHT;
        return processAll();
      });
    } else {
      return processAll();
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    Mod.set('Weya', Weya);
    Mod.set('Weya.Base', Weya.Base);
    Mod.set('HLJS', hljs);
    Mod.set('CoffeeScript', 'CoffeeScript');
    return Mod.initialize();
  });

}).call(this);
