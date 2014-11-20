(function() {
  Mod.require('Docscript.Parser', function(Parser) {
    var code, container, main, parser, sidebar;
    code = document.getElementById('code');
    main = document.getElementById('main');
    sidebar = document.getElementById('sidebar');
    container = document.getElementById('docscript-container');
    parser = new Parser({
      text: code.textContent
    });
    parser.parse();
    parser.collectElements({
      main: main,
      sidebar: sidebar
    });
    return window.requestAnimationFrame(function() {
      return parser.mediaLoaded(function() {
        return parser.setFills();
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    Mod.set('Weya', Weya);
    Mod.set('Weya.Base', Weya.Base);
    return Mod.initialize();
  });

}).call(this);
