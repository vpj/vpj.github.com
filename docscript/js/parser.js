(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mod.require('Weya.Base', 'Docscript.TYPES', 'Docscript.Text', 'Docscript.Block', 'Docscript.Section', 'Docscript.List', 'Docscript.ListItem', 'Docscript.Sidenote', 'Docscript.Article', 'Docscript.Media', 'Docscript.Reader', function(Base, TYPES, Text, Block, Section, List, ListItem, Sidenote, Article, Media, Reader) {
    var Parser;
    Parser = (function(_super) {
      __extends(Parser, _super);

      function Parser() {
        return Parser.__super__.constructor.apply(this, arguments);
      }

      Parser.extend();

      Parser.initialize(function(options) {
        this.reader = new Reader(options.text);
        delete options.text;
        this.root = new Article({
          indentation: 0
        });
        this.node = this.root;
        this.main = true;
        this.sidenotes = [];
        return this.prevBlock = null;
      });

      Parser.prototype.parse = function() {
        var _results;
        _results = [];
        while (this.reader.has()) {
          this.process();
          _results.push(this.reader.next());
        }
        return _results;
      };

      Parser.prototype.addNode = function(node) {
        this.node.add(node);
        return this.node = node;
      };

      Parser.prototype.getOffsetTop = function(elem, parent) {
        var top;
        top = 0;
        while (elem != null) {
          if (elem === parent) {
            break;
          }
          top += elem.offsetTop;
          elem = elem.offsetParent;
        }
        return top;
      };

      Parser.prototype.setFills = function() {
        var elemContent, elemSidenote, fill, sidenote, topContent, topSidenote, _i, _len, _ref, _results;
        _ref = this.sidenotes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sidenote = _ref[_i];
          elemSidenote = sidenote.elem;
          elemContent = this.nodes[sidenote.link].elem;
          topSidenote = this.getOffsetTop(elemSidenote, this.elems.sidebar);
          topContent = this.getOffsetTop(elemContent, this.elems.main);
          if (topContent > topSidenote) {
            fill = Weya({}, function() {
              return this.div(".fill", {
                style: {
                  height: "" + (topContent - topSidenote) + "px"
                }
              });
            });
            _results.push(elemSidenote.parentNode.insertBefore(fill, elemSidenote));
          } else if (topContent < topSidenote) {
            fill = Weya({}, function() {
              return this.div(".fill", {
                style: {
                  height: "" + (topSidenote - topContent) + "px"
                }
              });
            });
            _results.push(elemContent.parentNode.insertBefore(fill, elemContent));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Parser.prototype.render = function(main, sidebar) {
        var sidenote, _i, _len, _ref;
        this.elems = {
          main: main,
          sidebar: sidebar
        };
        this.nodes = {};
        this.root.render({
          elem: main,
          nodes: this.nodes
        });
        _ref = this.sidenotes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sidenote = _ref[_i];
          sidenote.render({
            elem: sidebar,
            nodes: this.nodes
          });
        }
        return window.requestAnimationFrame(this.on.rendered);
      };

      Parser.listen('rendered', function() {
        var id, loaded, n, node, _ref, _results;
        n = 0;
        loaded = (function(_this) {
          return function() {
            n--;
            if (n === 0) {
              return _this.setFills();
            }
          };
        })(this);
        for (id in this.nodes) {
          n++;
        }
        _ref = this.nodes;
        _results = [];
        for (id in _ref) {
          node = _ref[id];
          _results.push(node.onLoaded(loaded));
        }
        return _results;
      });

      Parser.prototype.process = function() {
        var id, line, n;
        line = this.reader.get();
        if (line.empty) {
          if (this.node.type === TYPES.block) {
            this.prevBlock = this.node;
            this.node = this.node.parent();
          }
          return;
        }
        while (line.indentation < this.node.indentation) {
          this.node = this.node.parent();
          if (this.node == null) {
            throw new Error('Invalid indentation');
          }
        }
        switch (line.type) {
          case TYPES.code:
            this.addNode(new Code({
              indentation: 0
            }));
            break;
          case TYPES.list:
            if (this.node.type !== TYPES.list) {
              this.addNode(new List({
                ordered: line.ordered,
                indentation: line.indentation
              }));
            }
            this.addNode(new ListItem({
              ordered: line.ordered,
              indentation: line.indentation + 1
            }));
            if (line.text !== '') {
              this.addNode(new Block({
                indentation: line.indentation + 1,
                paragraph: false
              }));
              this.node.addText(line.text);
            }
            break;
          case TYPES.heading:
            this.addNode(new Section({
              indentation: line.indentation + 1,
              level: line.level
            }));
            this.node.heading.addText(line.text);
            break;
          case TYPES.sidenote:
            if (this.main) {
              this.main = false;
              id = this.node.id;
              if (this.prevBlock != null) {
                id = this.prevBlock.id;
              }
              n = new Sidenote({
                indentation: line.indentation,
                link: id
              });
              this.mainNode = this.node;
              this.node = n;
              this.sidenotes.push(n);
            } else {
              this.main = true;
              this.node = this.mainNode;
            }
            break;
          case TYPES.block:
            if (this.node.type !== TYPES.block) {
              this.addNode(new Block({
                indentation: line.indentation,
                paragraph: true
              }));
            }
            this.node.addText(line.text);
            break;
          case TYPES.media:
            this.addNode(new Media({
              indentation: line.indentation + 1,
              media: this.parseMedia(line.text)
            }));
            break;
          default:
            throw new Error('Unknown syntax');
        }
        return this.prevBlock = null;
      };

      Parser.prototype.parseMedia = function(text) {
        var media, parts;
        text = text.replace(/\)/g, '');
        parts = text.split('(');
        media = {};
        if (parts.length <= 0) {
          throw new Error('Invalid media syntax');
        }
        media.src = parts[0];
        if (parts.length <= 1) {
          return media;
        }
        media.alt = parts[1];
        return media;
      };

      return Parser;

    })(Base);
    return Mod.set('Docscript.Parser', Parser);
  });

}).call(this);
