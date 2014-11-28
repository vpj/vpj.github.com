(function() {
  document.addEventListener('DOMContentLoaded', function() {
    Mod.set('Weya', Weya);
    Mod.set('Weya.Base', Weya.Base);
    Mod.set('CodeMirror', CodeMirror);
    return Mod.initialize();
  });

}).call(this);
