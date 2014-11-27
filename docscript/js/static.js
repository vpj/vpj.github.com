(function() {
  Mod.require('Docscript.Parser', function(Parser) {
    var doc, docs, i, process, _i, _len, _results;
    process = function(n, doc) {
      var code, main, parser, sidebar;
      code = doc.getElementsByClassName('docscript-code');
      if (code.length !== 1) {
        throw new Error('No code element');
      }
      code = code[0];
      main = doc.getElementsByClassName('docscript-main');
      if (main.length !== 1) {
        throw new Error('No main element');
      }
      main = main[0];
      sidebar = doc.getElementsByClassName('docscript-sidebar');
      if (sidebar.length !== 1) {
        throw new Error('No sidebar element');
      }
      sidebar = sidebar[0];
      parser = new Parser({
        text: code.textContent,
        id: n * 10000
      });
      parser.parse();
      parser.collectElements({
        main: main,
        sidebar: sidebar
      });
      return window.requestAnimationFrame(function() {
        return parser.mediaLoaded(function() {
          var int;
          parser.setFills();
          n = 0;
          return int = setInterval(function() {
            parser.setFills();
            n++;
            if (n === 10) {
              return clearInterval(int);
            }
          }, 1000);
        });
      });
    };
    docs = document.getElementsByClassName('docscript');
    _results = [];
    for (i = _i = 0, _len = docs.length; _i < _len; i = ++_i) {
      doc = docs[i];
      _results.push(process(i, doc));
    }
    return _results;
  });

  document.addEventListener('DOMContentLoaded', function() {
    Mod.set('Weya', Weya);
    Mod.set('Weya.Base', Weya.Base);
    return Mod.initialize();
  });

}).call(this);
