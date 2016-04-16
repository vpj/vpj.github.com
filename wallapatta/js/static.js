(function() {
  Mod.require('Wallapatta.Parser', function(Parser) {
    var process, processAll, renderWeb;
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
        return renderWeb(render);
      });
    };
    processAll = function() {
      var doc, docs, i, j, len, results;
      docs = document.getElementsByClassName('wallapatta');
      results = [];
      for (i = j = 0, len = docs.length; j < len; i = ++j) {
        doc = docs[i];
        results.push(process(i, doc));
      }
      return results;
    };
    return processAll();
  });

  document.addEventListener('DOMContentLoaded', function() {
    Mod.set('Weya', Weya);
    Mod.set('Weya.Base', Weya.Base);
    Mod.set('HLJS', hljs);
    Mod.set('CoffeeScript', 'CoffeeScript');
    return Mod.initialize();
  });

}).call(this);
