(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mod.require('Weya.Base', 'Docscript.TYPES', 'Docscript.Text', 'Docscript.Bold', 'Docscript.Italics', 'Docscript.SuperScript', 'Docscript.SubScript', 'Docscript.Code', 'Docscript.Link', 'Docscript.Block', 'Docscript.Section', 'Docscript.List', 'Docscript.ListItem', 'Docscript.Sidenote', 'Docscript.Article', 'Docscript.Media', 'Docscript.CodeBlock', 'Docscript.Special', 'Docscript.Html', 'Docscript.NODES', 'Docscript.Reader', function(Base, TYPES, Text, Bold, Italics, SuperScript, SubScript, Code, Link, Block, Section, List, ListItem, Sidenote, Article, Media, CodeBlock, Special, Html, NODES, Reader) {
    var Parser, TOKENS, TOKEN_MATCHES;
    TOKENS = {
      bold: Bold,
      italics: Italics,
      superScript: SuperScript,
      subScript: SubScript
    };
    TOKEN_MATCHES = {
      bold: '**',
      italics: '--',
      subScript: '__',
      superScript: '^^',
      code: '``',
      linkBegin: '<<',
      linkEnd: '>>'
    };
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
        this.prevBlock = null;
        return this.blocks = [];
      });

      Parser.prototype.parse = function() {
        var block, e, _i, _len, _ref, _results;
        while (this.reader.has()) {
          try {
            this.processLine();
          } catch (_error) {
            e = _error;
            throw e;
          }
          this.reader.next();
        }
        _ref = this.blocks;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          block = _ref[_i];
          try {
            _results.push(this.parseText(block.text, block));
          } catch (_error) {
            e = _error;
            throw new Error("" + e.message + ": \"" + block.text + "\"");
          }
        }
        return _results;
      };

      Parser.prototype.getToken = function(text, n) {
        var match, token;
        for (token in TOKEN_MATCHES) {
          match = TOKEN_MATCHES[token];
          if ((text.substr(n, match.length)) === match) {
            return {
              type: token,
              length: match.length
            };
          }
        }
        return null;
      };

      Parser.prototype.parseText = function(text, node) {
        var L, add, cur, i, last, token;
        this.node = node;
        L = text.length;
        last = i = 0;
        cur = 0;
        add = (function(_this) {
          return function() {
            if (cur > last) {
              _this.addNode(new Text({
                text: text.substr(last, cur - last)
              }));
              return _this.node = _this.node.parent();
            }
          };
        })(this);
        while (i < L) {
          token = this.getToken(text, i);
          if (token != null) {
            cur = i;
            i += token.length;
          } else {
            ++i;
            continue;
          }
          if (TOKENS[token.type] != null) {
            if (this.node.type === token.type) {
              add();
              this.node = this.node.parent();
            } else {
              add();
              this.addNode(new TOKENS[token.type]({}));
            }
          } else {
            switch (token.type) {
              case 'linkBegin':
                add();
                this.addNode(new Link({}));
                break;
              case 'linkEnd':
                if (this.node.type !== TYPES.link) {
                  throw new Error('Unexpected link terminator');
                } else {
                  this.node.setLink(this.parseLink(text.substr(last, cur - last)));
                  this.node = this.node.parent();
                }
                break;
              case 'code':
                add();
                this.addNode(new Code({}));
                last = i;
                cur = i = text.indexOf(TOKEN_MATCHES.code, i);
                add();
                this.node = this.node.parent();
                i += TOKEN_MATCHES.code.length;
            }
          }
          last = i;
        }
        cur = i;
        return add();
      };

      Parser.prototype.addNode = function(node) {
        this.node.add(node);
        if (node.type === TYPES.block) {
          this.blocks.push(node);
        }
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
          elemContent = NODES[sidenote.link].elem;
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

      Parser.prototype.positionSidenotes = function() {
        return window.requestAnimationFrame(this.on.rendered);
      };

      Parser.listen('rendered', function() {
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
              return _this.setFills();
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
      });

      Parser.prototype.processLine = function() {
        var id, line, n, prev;
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
          case TYPES.codeBlock:
            prev = this.node;
            this.addNode(new CodeBlock({
              indentation: 0
            }));
            while (true) {
              this.reader.next();
              if (!this.reader.has()) {
                break;
              }
              line = this.reader.get();
              if (line.type === TYPES.codeBlock) {
                break;
              }
              this.node.addText(line.line);
            }
            this.node = prev;
            break;
          case TYPES.html:
            prev = this.node;
            this.addNode(new Html({
              indentation: 0
            }));
            while (true) {
              this.reader.next();
              if (!this.reader.has()) {
                break;
              }
              line = this.reader.get();
              if (line.type === TYPES.html) {
                break;
              }
              this.node.addText(line.line);
            }
            this.node = prev;
            break;
          case TYPES.special:
            this.addNode(new Special({
              indentation: line.indentation + 1
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
            this.blocks.push(this.node.heading);
            break;
          case TYPES.sidenote:
            if (this.main) {
              this.main = false;
              id = this.node.id;
              console.log('sidenote', id);
              if (this.prevBlock != null) {
                id = this.prevBlock.id;
              }
              console.log('sidenote', id);
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
            this.prevBlock = this.node;
            return;
          default:
            throw new Error('Unknown syntax');
        }
        return this.prevBlock = null;
      };

      Parser.prototype.parseLink = function(text) {
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

      Parser.prototype.parseMedia = function(text) {
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

      return Parser;

    })(Base);
    return Mod.set('Docscript.Parser', Parser);
  });

}).call(this);
