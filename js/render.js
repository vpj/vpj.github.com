(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Wallapatta.TYPES', function(Base, TYPES) {
    var BLOCK_LEVEL, BREAK_COST, EMPTY_PAGE_COST, INF, PAGE_COST, PAGE_MARGIN, PARENT_POSITION_COST, PREFIX, Render, SECTION_BREAK_COST, START, obj;
    PREFIX = 'wallapatta_';
    BLOCK_LEVEL = 10;
    INF = 1e10;
    PAGE_COST = 100;
    BREAK_COST = {
      codeBlock: 1000,
      special: 2000,
      full: 2000,
      html: 1000,
      heading: 2000,
      list: 1000,
      listItem: 1500,
      block: 1500,
      media: 1000,
      article: 0,
      table: 1500
    };
    SECTION_BREAK_COST = (
      obj = {
        1: 25,
        2: 36,
        3: 52,
        4: 75,
        5: 108,
        6: 155
      },
      obj["" + BLOCK_LEVEL] = 1000,
      obj
    );
    PARENT_POSITION_COST = 500;
    EMPTY_PAGE_COST = 200;
    PAGE_MARGIN = '1000px';
    START = 1;
    Render = (function(superClass) {
      extend(Render, superClass);

      function Render() {
        return Render.__super__.constructor.apply(this, arguments);
      }

      Render.initialize(function(options) {
        this.map = options.map;
        this.root = options.root;
        return this.sidenotes = options.sidenotes;
      });

      Render.prototype._emptyPageCost = function(filled, height) {
        var p;
        p = filled / height;
        p = Math.max(p, 0.01);
        p = Math.min(1, p);
        return EMPTY_PAGE_COST * (1 / p - 1);
      };

      Render.prototype._parentPositionCost = function(pos) {
        var p;
        p = pos / this.pageHeight;
        p = Math.max(p, 0.01);
        p = Math.min(1, p);
        return PARENT_POSITION_COST * (1 / p - 1);
      };

      Render.prototype.getNodeBreakCost = function(node) {
        if (BREAK_COST[node.type] != null) {
          return BREAK_COST[node.type];
        } else if (node.type === 'section' && (SECTION_BREAK_COST[node.level] != null)) {
          return SECTION_BREAK_COST[node.level];
        } else {
          throw new Error("Unknown type " + node.type + " - " + node.level);
        }
      };

      Render.prototype._sidebarAligned = function() {
        var diff, main, mainHeight, sidebar;
        sidebar = this.getOffsetTop(this.elems.sidebar, document.body);
        main = this.getOffsetTop(this.elems.main, document.body);
        mainHeight = this.elems.main.offsetHeight;
        diff = Math.abs(main - sidebar);
        if (diff < mainHeight / 4) {
          return true;
        } else {
          return false;
        }
      };

      Render.prototype.getBreakCost = function(node) {
        var cost, parent, pos;
        parent = node.parent();
        cost = 0;
        while (parent != null) {
          cost += this.getNodeBreakCost(parent);
          pos = (this.getOffsetTop(node.elem, this.elems.main)) - (this.getOffsetTop(parent.elem, this.elems.main));
          cost += this._parentPositionCost(pos);
          parent = parent.parent();
        }
        return cost;
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

      Render.prototype.getNodeFromElem = function(elem) {
        var id, node;
        id = elem.id;
        if (id == null) {
          return null;
        }
        id = id.split('_');
        if (id.length < 1) {
          return null;
        }
        id = id[id.length - 1];
        node = this.map.nodes[id];
        return node;
      };

      Render.prototype.getNodeFromLine = function(line) {
        var id;
        id = this.map.lineNumbers[line];
        if (id == null) {
          return null;
        }
        return this.map.nodes[id];
      };

      Render.prototype.getMainNodes = function() {
        var e, elem, f, i, k, main, nodes, ref, ref1;
        f = this.map.start;
        e = this.map.N;
        nodes = [];
        for (i = k = ref = f, ref1 = e; ref <= ref1 ? k < ref1 : k > ref1; i = ref <= ref1 ? ++k : --k) {
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
        var k, len, map, ref, sidenote;
        map = {};
        ref = this.sidenotes;
        for (k = 0, len = ref.length; k < len; k++) {
          sidenote = ref[k];
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
          if (H <= this.pageHeight / 2) {
            H = this.pageHeight;
          }
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
          c = this.broken[i] + this.breakCost[i] + PAGE_COST + this._emptyPageCost(pos, H);
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
          if ((ielem == null) || pos + ielem.offsetHeight <= H) {
            this.broken[n] = 0;
            return this.nextBreak[n] = null;
          }
        }
      };

      Render.prototype.calculatePageBreaks = function() {
        var i, k, l, len, len1, n, ref, ref1, results;
        INF = 1e10;
        this.broken = [];
        this.nextBreak = [];
        ref = this.mainNodes;
        for (k = 0, len = ref.length; k < len; k++) {
          i = ref[k];
          this.broken.push(INF);
          this.nextBreak.push(null);
        }
        this.breakCost = [];
        ref1 = this.mainNodes;
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          i = ref1[l];
          this.breakCost.push(this.getBreakCost(this.map.nodes[i]));
        }
        n = this.mainNodes.length - 1;
        results = [];
        while (n >= 1) {
          this.calculateNextBreak(n);
          results.push(--n);
        }
        return results;
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
                height: (topContent - topSidenote) + "px"
              }
            });
          });
          return elemSidenote.parentNode.insertBefore(fill, elemSidenote);
        } else if (topContent < topSidenote) {
          fill = Weya({}, function() {
            return this.div(".fill", {
              style: {
                height: (topSidenote - topContent) + "px"
              }
            });
          });
          return elemContent.parentNode.insertBefore(fill, elemContent);
        }
      };

      Render.prototype.addPageBackground = function(H, W, elem) {
        var pg, y, y2;
        y = this.getOffsetTop(elem, document.body);
        pg = null;
        Weya({
          elem: this.elems.pageBackgrounds
        }, function() {
          return pg = this.div(".page-background", "", {
            style: {
              'margin-top': "0",
              height: H + "px",
              width: W + "px"
            }
          });
        });
        y2 = this.getOffsetTop(pg, document.body);
        return pg.style.marginTop = (y - y2) + "px";
      };

      Render.prototype.setPageBackgrounds = function(elem) {
        return this.elems.pageBackgrounds = elem;
      };

      Render.prototype.setPages = function(H, W) {
        var elem, emptyPages, found, i, m, n, node, pageNo, pos, results;
        if (!this._sidebarAligned()) {
          return;
        }
        this.pageHeight = H;
        this.mainNodes = this.getMainNodes();
        this.sidenoteMap = this.getSidenoteMap();
        this.calculatePageBreaks();
        if (this.elems.pageBackgrounds == null) {
          Weya({
            elem: document.body,
            context: this
          }, function() {
            return this.$.elems.pageBackgrounds = this.div(".page-backgrounds", '');
          });
        }
        this.elems.pageBackgrounds.innerHTML = '';
        n = START;
        pos = 0;
        emptyPages = [];
        this.pageNumbers = [];
        pageNo = 0;
        results = [];
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
          found = this.setPageFill(n, i, pos, emptyPages, pageNo);
          this.collectPageNumbers(n, i, pageNo);
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
          this.addPageBackground(H, W, this.map.nodes[this.mainNodes[n]].elem);
          n = i;
          results.push(pageNo++);
        }
        return results;
      };

      Render.prototype.collectPageNumbers = function(f, t, pageNo) {
        var k, m, n, ref, ref1, results;
        results = [];
        for (n = k = ref = f, ref1 = t; ref <= ref1 ? k < ref1 : k > ref1; n = ref <= ref1 ? ++k : --k) {
          m = this.mainNodes[n];
          if (m == null) {
            continue;
          }
          results.push(this.pageNumbers.push({
            page: pageNo,
            node: this.map.nodes[m]
          }));
        }
        return results;
      };

      Render.prototype.setPageFill = function(f, t, pos, emptyPages, pageNo) {
        var elemContent, elemSidenote, fill, first, found, k, len, m, margin, n, p, s, topContent, topSidenote;
        margin = f > START;
        first = true;
        n = f;
        found = false;
        while (n < t) {
          m = this.mainNodes[n];
          ++n;
          if (m == null) {
            continue;
          }
          s = this.sidenoteMap[m];
          if (s == null) {
            continue;
          }
          found = true;
          elemSidenote = this.map.nodes[s].elem;
          elemContent = this.map.nodes[m].elem;
          if (first && margin) {
            for (k = 0, len = emptyPages.length; k < len; k++) {
              p = emptyPages[k];
              topSidenote = this.getOffsetTop(elemSidenote, this.elems.sidebar);
              if (topSidenote < p.pos) {
                fill = Weya({}, function() {
                  return this.div(".fill", {
                    style: {
                      height: (p.pos - topSidenote) + "px"
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
              fill.style.marginTop = (topContent - topSidenote) + "px";
              elemSidenote.parentNode.insertBefore(fill, elemSidenote);
            }
            topSidenote = this.getOffsetTop(elemSidenote, this.elems.sidebar);
            if (topSidenote < pos) {
              fill = Weya({}, function() {
                return this.div(".fill", {
                  style: {
                    height: (pos - topSidenote) + "px"
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
            fill.style.marginTop = (topContent - topSidenote - 1) + "px";
            elemSidenote.parentNode.insertBefore(fill, elemSidenote);
          }
          this.adjust(elemSidenote, elemContent);
          first = false;
        }
        return found;
      };

      Render.prototype.setFills = function() {
        var elemContent, elemSidenote, k, len, ref, results, sidenote;
        if (!this._sidebarAligned()) {
          return;
        }
        ref = this.sidenotes;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          sidenote = ref[k];
          elemSidenote = sidenote.elem;
          elemContent = this.map.nodes[sidenote.link].elem;
          results.push(this.adjust(elemSidenote, elemContent));
        }
        return results;
      };

      Render.prototype.render = function(main, sidebar) {
        var k, len, ref, results, sidenote;
        this.elems = {
          main: main,
          sidebar: sidebar
        };
        this.root.render({
          elem: main
        });
        ref = this.sidenotes;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          sidenote = ref[k];
          results.push(sidenote.render({
            elem: sidebar
          }));
        }
        return results;
      };

      Render.prototype.collectElements = function(options) {
        var id, node, ref, results;
        this.elems = {
          main: options.main,
          sidebar: options.sidebar
        };
        ref = this.map.nodes;
        results = [];
        for (id in ref) {
          node = ref[id];
          node.elem = document.getElementById("" + PREFIX + id);
          if (node.elem == null) {
            throw new Error("Element " + id + " not found");
          } else {
            results.push(void 0);
          }
        }
        return results;
      };

      Render.prototype.mediaLoaded = function(callback) {
        var a, check, i, img, k, l, len, len1, len2, loaded, mainImg, n, o, sidebarImg;
        mainImg = this.elems.main.getElementsByTagName('img');
        sidebarImg = this.elems.sidebar.getElementsByTagName('img');
        a = [];
        for (k = 0, len = mainImg.length; k < len; k++) {
          i = mainImg[k];
          a.push(i);
        }
        for (l = 0, len1 = sidebarImg.length; l < len1; l++) {
          i = sidebarImg[l];
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
        for (o = 0, len2 = a.length; o < len2; o++) {
          img = a[o];
          if (!img.complete) {
            img.addEventListener('load', loaded);
          } else {
            n++;
          }
        }
        return check();
      };

      return Render;

    })(Base);
    return Mod.set('Wallapatta.Render', Render);
  });

}).call(this);
