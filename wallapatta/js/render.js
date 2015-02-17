(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mod.require('Weya.Base', 'Wallapatta.TYPES', function(Base, TYPES) {
    var BREAK_COST, EMPTY_PAGE_COST, INF, PAGE_COST, PAGE_MARGIN, PREFIX, Render, START;
    PREFIX = 'wallapatta_';
    INF = 1e10;
    PAGE_COST = 100;
    BREAK_COST = {
      codeBlock: 1000,
      special: 2000,
      html: 1000,
      heading: 2000,
      list: 1000,
      listItem: 1500,
      block: 1500,
      media: 1000,
      article: 0,
      table: 1500
    };
    PAGE_MARGIN = '1000px';
    START = 1;
    EMPTY_PAGE_COST = function(filled, height) {
      var p;
      p = filled / height;
      return 1500 / p - 1500;
    };
    Render = (function(_super) {
      __extends(Render, _super);

      function Render() {
        return Render.__super__.constructor.apply(this, arguments);
      }

      Render.initialize(function(options) {
        this.map = options.map;
        this.root = options.root;
        return this.sidenotes = options.sidenotes;
      });

      Render.prototype.getBreakCost = function(node) {
        var cost;
        if (this.breakCostMap[node.id] != null) {
          return this.breakCostMap[node.id];
        }
        if (node.parent() != null) {
          cost = this.getBreakCost(node.parent(), true);
        } else {
          if (node.type !== 'article') {
            throw new Error('oops');
          }
          cost = 0;
        }
        if (BREAK_COST[node.type] != null) {
          this.breakCostMap[node.id] = cost + BREAK_COST[node.type];
        } else if (node.type === 'section') {
          this.breakCostMap[node.id] = cost + 100 * (node.level - 3);
        } else {
          throw new Error('Unknown type');
        }
        return this.breakCostMap[node.id];
      };

      Render.prototype.getOffsetTop = function(elem, parent) {
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

      Render.prototype.getMainNodes = function() {
        var e, elem, f, i, main, nodes, _i;
        f = this.map.start;
        e = this.map.N;
        nodes = [];
        for (i = _i = f; f <= e ? _i < e : _i > e; i = f <= e ? ++_i : --_i) {
          elem = this.map.nodes[i].elem;
          main = false;
          while (elem != null) {
            if (elem === this.elems.main) {
              main = true;
              break;
            }
            elem = elem.parentNode;
          }
          if (main) {
            nodes.push(i);
          }
        }
        return nodes;
      };

      Render.prototype.getSidenoteMap = function() {
        var map, sidenote, _i, _len, _ref;
        map = {};
        _ref = this.sidenotes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sidenote = _ref[_i];
          map[sidenote.link] = sidenote.id;
        }
        return map;
      };

      Render.prototype.calculateNextBreak = function(n) {
        var H, c, elem, i, ielem, inode, j, m, node, p, padding, pos, sidenote;
        m = this.mainNodes[n];
        node = this.map.nodes[m];
        elem = node.elem;
        H = this.pageHeight;
        if (n === 1) {
          H -= this.getOffsetTop(elem, null);
        }
        i = n + 1;
        sidenote = 0;
        padding = 0;
        if (this.sidenoteMap[m] != null) {
          sidenote = this.map.nodes[this.sidenoteMap[m]].elem.offsetHeight;
        }
        while (i < this.mainNodes.length) {
          j = this.mainNodes[i];
          inode = this.map.nodes[j];
          ielem = inode.elem;
          pos = padding + (this.getOffsetTop(ielem, this.elems.main)) - (this.getOffsetTop(elem, this.elems.main));
          if (pos > H) {
            break;
          }
          c = this.broken[i] + this.breakCost[i] + PAGE_COST + EMPTY_PAGE_COST(pos, H);
          if (this.broken[n] >= c) {
            this.broken[n] = c;
            this.nextBreak[n] = i;
          }
          if (this.sidenoteMap[j] != null) {
            p = Math.max(0, sidenote - pos);
            padding += p;
            pos += p;
            sidenote = pos + this.map.nodes[this.sidenoteMap[j]].elem.offsetHeight;
          }
          if (sidenote > H) {
            break;
          }
          ++i;
        }
        if (i >= this.mainNodes.length) {
          this.broken[n] = 0;
          return this.nextBreak[n] = null;
        }
      };

      Render.prototype.calculatePageBreaks = function() {
        var i, n, _i, _j, _len, _len1, _ref, _ref1, _results;
        INF = 1e10;
        this.broken = [];
        this.nextBreak = [];
        _ref = this.mainNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          this.broken.push(INF);
          this.nextBreak.push(null);
        }
        this.breakCostMap = {};
        this.breakCost = [];
        _ref1 = this.mainNodes;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          i = _ref1[_j];
          this.breakCost.push(this.getBreakCost(this.map.nodes[i]));
        }
        n = this.mainNodes.length - 1;
        _results = [];
        while (n >= 1) {
          this.calculateNextBreak(n);
          _results.push(--n);
        }
        return _results;
      };

      Render.prototype.adjust = function(elemSidenote, elemContent) {
        var fill, topContent, topSidenote;
        topSidenote = this.getOffsetTop(elemSidenote, this.elems.sidebar);
        topContent = this.getOffsetTop(elemContent, this.elems.main);
        if (topContent > topSidenote) {
          fill = Weya({}, function() {
            return this.div(".fill", {
              style: {
                height: "1px"
              }
            });
          });
          elemSidenote.parentNode.insertBefore(fill, elemSidenote);
        } else if (topContent < topSidenote) {
          fill = Weya({}, function() {
            return this.div(".fill", {
              style: {
                height: "1px"
              }
            });
          });
          elemContent.parentNode.insertBefore(fill, elemContent);
        }
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
          return elemSidenote.parentNode.insertBefore(fill, elemSidenote);
        } else if (topContent < topSidenote) {
          fill = Weya({}, function() {
            return this.div(".fill", {
              style: {
                height: "" + (topSidenote - topContent) + "px"
              }
            });
          });
          return elemContent.parentNode.insertBefore(fill, elemContent);
        }
      };

      Render.prototype.setPages = function(H) {
        var elem, emptyPages, found, i, m, n, node, pos, _results;
        this.pageHeight = H;
        this.mainNodes = this.getMainNodes();
        this.sidenoteMap = this.getSidenoteMap();
        this.calculatePageBreaks();
        n = START;
        pos = 0;
        emptyPages = [];
        _results = [];
        while (n < this.mainNodes.length) {
          i = this.nextBreak[n];
          if (n > START) {
            m = this.mainNodes[n];
            node = this.map.nodes[m];
            elem = node.elem;
            elem.style.marginTop = PAGE_MARGIN;
          }
          if (i == null) {
            i = this.mainNodes.length;
          }
          found = this.setPageFill(n, i, pos, emptyPages);
          if (!found) {
            emptyPages.push({
              pos: pos,
              f: n
            });
          } else {
            emptyPages = [];
          }
          elem = this.map.nodes[this.mainNodes[i - 1]].elem;
          pos = this.getOffsetTop(elem, this.elems.main);
          pos += elem.offsetHeight;
          _results.push(n = i);
        }
        return _results;
      };

      Render.prototype.setPageFill = function(f, t, pos, emptyPages) {
        var elemContent, elemSidenote, fill, first, found, m, margin, n, p, s, topContent, topSidenote, _i, _len;
        margin = f > START;
        first = true;
        n = f;
        found = false;
        while (n < t) {
          m = this.mainNodes[n];
          s = this.sidenoteMap[m];
          ++n;
          if (s == null) {
            continue;
          }
          found = true;
          elemSidenote = this.map.nodes[s].elem;
          elemContent = this.map.nodes[m].elem;
          if (first && margin) {
            for (_i = 0, _len = emptyPages.length; _i < _len; _i++) {
              p = emptyPages[_i];
              topSidenote = this.getOffsetTop(elemSidenote, this.elems.sidebar);
              if (topSidenote < p) {
                fill = Weya({}, function() {
                  return this.div(".fill", {
                    style: {
                      height: "" + (p.pos - topSidenote) + "px"
                    }
                  });
                });
                elemSidenote.parentNode.insertBefore(fill, elemSidenote);
              }
              topContent = this.getOffsetTop(this.map.nodes[this.mainNodes[p.f]].elem, this.elems.main);
              topSidenote = this.getOffsetTop(elemSidenote, this.elems.sidebar);
              fill = Weya({}, function() {
                return this.div(".fill", {
                  style: {
                    height: "16px"
                  }
                });
              });
              fill.style.marginTop = "" + (topContent - topSidenote) + "px";
              elemSidenote.parentNode.insertBefore(fill, elemSidenote);
            }
            topSidenote = this.getOffsetTop(elemSidenote, this.elems.sidebar);
            if (topSidenote < pos) {
              fill = Weya({}, function() {
                return this.div(".fill", {
                  style: {
                    height: "" + (pos - topSidenote) + "px"
                  }
                });
              });
              elemSidenote.parentNode.insertBefore(fill, elemSidenote);
            }
            topContent = this.getOffsetTop(this.map.nodes[this.mainNodes[f]].elem, this.elems.main);
            topSidenote = this.getOffsetTop(elemSidenote, this.elems.sidebar);
            fill = Weya({}, function() {
              return this.div(".fill", {
                style: {
                  height: "1px"
                }
              });
            });
            fill.style.marginTop = "" + (topContent - topSidenote - 1) + "px";
            elemSidenote.parentNode.insertBefore(fill, elemSidenote);
          }
          this.adjust(elemSidenote, elemContent);
          first = false;
        }
        return found;
      };

      Render.prototype.setFills = function() {
        var elemContent, elemSidenote, sidenote, _i, _len, _ref, _results;
        _ref = this.sidenotes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sidenote = _ref[_i];
          elemSidenote = sidenote.elem;
          elemContent = this.map.nodes[sidenote.link].elem;
          _results.push(this.adjust(elemSidenote, elemContent));
        }
        return _results;
      };

      Render.prototype.render = function(main, sidebar) {
        var sidenote, _i, _len, _ref, _results;
        this.elems = {
          main: main,
          sidebar: sidebar
        };
        this.root.render({
          elem: main
        });
        _ref = this.sidenotes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sidenote = _ref[_i];
          _results.push(sidenote.render({
            elem: sidebar
          }));
        }
        return _results;
      };

      Render.prototype.collectElements = function(options) {
        var id, node, _ref, _results;
        this.elems = {
          main: options.main,
          sidebar: options.sidebar
        };
        _ref = this.map.nodes;
        _results = [];
        for (id in _ref) {
          node = _ref[id];
          node.elem = document.getElementById("" + PREFIX + id);
          if (node.elem == null) {
            throw new Error("Element " + id + " not found");
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Render.prototype.mediaLoaded = function(callback) {
        var a, check, i, img, loaded, mainImg, n, sidebarImg, _i, _j, _k, _len, _len1, _len2;
        mainImg = this.elems.main.getElementsByTagName('img');
        sidebarImg = this.elems.sidebar.getElementsByTagName('img');
        a = [];
        for (_i = 0, _len = mainImg.length; _i < _len; _i++) {
          i = mainImg[_i];
          a.push(i);
        }
        for (_j = 0, _len1 = sidebarImg.length; _j < _len1; _j++) {
          i = sidebarImg[_j];
          a.push(i);
        }
        n = 0;
        check = (function(_this) {
          return function() {
            if (n === a.length) {
              return callback();
            }
          };
        })(this);
        loaded = function() {
          n++;
          return check();
        };
        for (_k = 0, _len2 = a.length; _k < _len2; _k++) {
          img = a[_k];
          if (!img.complete) {
            img.addEventListener('load', loaded);
          } else {
            n++;
          }
        }
        return check();
      };

      Render.prototype.processLine = function() {
        var id, indent, line, n, _results, _results1;
        line = this.reader.get();
        if (line.empty) {
          if (this.node.type === TYPES.block) {
            this.prevNode = this.node;
            this.node = this.node.parent();
          }
          if (this.node.type === TYPES.codeBlock || this.node.type === TYPES.html) {
            this.node.addText(line.line.substr(this.node.indentation));
          }
          return;
        }
        while (line.indentation < this.node.indentation) {
          this.prevNode = this.node;
          this.node = this.node.parent();
          if (this.node == null) {
            if (this.main) {
              throw new Error('Invalid indentation');
            }
            this.main = true;
            this.node = this.mainNode;
          }
        }
        if (this.prevNode == null) {
          this.prevNode = this.node;
        }
        switch (this.node.type) {
          case TYPES.list:
            if (line.type !== TYPES.list) {
              this.node = this.node.parent();
            }
            break;
          case TYPES.codeBlock:
          case TYPES.html:
            this.node.addText(line.line.substr(this.node.indentation));
            return;
        }
        switch (line.type) {
          case TYPES.codeBlock:
            indent = line.indentation + 1;
            this.addNode(new CodeBlock({
              map: this.map,
              indentation: line.indentation + 1
            }));
            _results = [];
            while (false) {
              this.reader.next();
              if (!this.reader.has()) {
                break;
              }
              line = this.reader.get();
              if (!line.empty && line.indentation < indent) {
                indent = line.indentation;
              }
              if (line.type === TYPES.codeBlock) {
                break;
              }
              _results.push(this.node.addText(line.line.substr(indent)));
            }
            return _results;
            break;
          case TYPES.html:
            indent = line.indentation + 1;
            this.addNode(new Html({
              map: this.map,
              indentation: line.indentation + 1
            }));
            _results1 = [];
            while (false) {
              this.reader.next();
              if (!this.reader.has()) {
                break;
              }
              line = this.reader.get();
              if (!line.empty && line.indentation < indent) {
                indent = line.indentation;
              }
              if (line.type === TYPES.html) {
                break;
              }
              _results1.push(this.node.addText(line.line.substr(indent)));
            }
            return _results1;
            break;
          case TYPES.special:
            return this.addNode(new Special({
              map: this.map,
              indentation: line.indentation + 1
            }));
          case TYPES.list:
            if (this.node.type !== TYPES.list) {
              this.addNode(new List({
                map: this.map,
                ordered: line.ordered,
                indentation: line.indentation
              }));
            }
            this.addNode(new ListItem({
              map: this.map,
              ordered: line.ordered,
              indentation: line.indentation + 1
            }));
            if (line.text !== '') {
              this.addNode(new Block({
                map: this.map,
                indentation: line.indentation + 1,
                paragraph: false
              }));
              return this.node.addText(line.text);
            }
            break;
          case TYPES.heading:
            this.addNode(new Section({
              map: this.map,
              indentation: line.indentation + 1,
              level: line.level
            }));
            this.node.heading.addText(line.text);
            return this.blocks.push(this.node.heading);
          case TYPES.sidenote:
            if (!this.main) {
              throw new Error('Cannot have a sidenote inside a sidenote');
            }
            this.main = false;
            id = this.node.id;
            if (this.prevNode != null) {
              id = this.prevNode.id;
            }
            n = new Sidenote({
              map: this.map,
              indentation: line.indentation + 1,
              link: id
            });
            this.mainNode = this.node;
            this.node = n;
            return this.sidenotes.push(n);
          case TYPES.block:
            if (this.node.type !== TYPES.block) {
              this.addNode(new Block({
                map: this.map,
                indentation: line.indentation,
                paragraph: true
              }));
            }
            return this.node.addText(line.text);
          case TYPES.media:
            this.addNode(new Media({
              map: this.map,
              indentation: line.indentation + 1,
              media: this.parseMedia(line.text)
            }));
            this.prevNode = this.node;
            break;
          default:
            throw new Error('Unknown syntax');
        }
      };

      Render.prototype.parseLink = function(text) {
        var link, parts;
        text = text.replace(/\)/g, '');
        parts = text.split('(');
        link = {};
        if (parts.length <= 0 || parts[0] === '') {
          throw new Error('Invalid media syntax');
        }
        link.link = parts[0].trim();
        if (parts.length <= 1) {
          return link;
        }
        link.text = parts[1].trim();
        return link;
      };

      Render.prototype.parseMedia = function(text) {
        var media, parts;
        text = text.replace(/\)/g, '');
        parts = text.split('(');
        media = {};
        if (parts.length <= 0 || parts[0] === '') {
          throw new Error('Invalid media syntax');
        }
        media.src = parts[0].trim();
        if (parts.length <= 1) {
          return media;
        }
        media.alt = parts[1].trim();
        return media;
      };

      return Render;

    })(Base);
    return Mod.set('Wallapatta.Render', Render);
  });

}).call(this);
