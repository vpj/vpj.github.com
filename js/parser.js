(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Wallapatta.TYPES', 'Wallapatta.Text', 'Wallapatta.Bold', 'Wallapatta.Italics', 'Wallapatta.SuperScript', 'Wallapatta.SubScript', 'Wallapatta.Code', 'Wallapatta.Link', 'Wallapatta.MediaInline', 'Wallapatta.Block', 'Wallapatta.Section', 'Wallapatta.List', 'Wallapatta.ListItem', 'Wallapatta.Sidenote', 'Wallapatta.Article', 'Wallapatta.Media', 'Wallapatta.CodeBlock', 'Wallapatta.FormattedCode', 'Wallapatta.Table', 'Wallapatta.Special', 'Wallapatta.Html', 'Wallapatta.Full', 'Wallapatta.HtmlInline', 'Wallapatta.Map', 'Wallapatta.Reader', 'Wallapatta.Render', function(Base, TYPES, Text, Bold, Italics, SuperScript, SubScript, Code, Link, MediaInline, Block, Section, List, ListItem, Sidenote, Article, Media, CodeBlock, FormattedCode, Table, Special, Html, Full, HtmlInline, Map, Reader, Render) {
    var BLOCK_LEVEL, Parser, TOKENS, TOKEN_MATCHES;
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
      linkEnd: '>>',
      htmlBegin: '<-',
      htmlEnd: '->',
      mediaBegin: '[[',
      mediaEnd: ']]'
    };
    BLOCK_LEVEL = 10;
    Parser = (function(superClass) {
      extend(Parser, superClass);

      function Parser() {
        return Parser.__super__.constructor.apply(this, arguments);
      }

      Parser.extend();

      Parser.initialize(function(options) {
        this.map = new Map(options);
        this.reader = new Reader(options.text);
        delete options.text;
        this.root = new Article({
          map: this.map,
          indentation: 0
        });
        this.node = this.root;
        this.main = true;
        this.sidenotes = [];
        this.prevNode = null;
        this.blocks = [];
        return this.fullNode = false;
      });

      Parser.prototype.getRender = function() {
        return new Render({
          map: this.map,
          root: this.root,
          sidenotes: this.sidenotes
        });
      };

      Parser.prototype.parse = function() {
        var block, e, j, len, ref;
        this._lineNumber = null;
        while (this.reader.has()) {
          try {
            this.processLine();
          } catch (error) {
            e = error;
            throw new Error("Line " + (this.reader.n + 1) + ": " + e.message);
          }
          this.reader.next();
        }
        this.map.smallElements();
        this._lineNumber = null;
        ref = this.blocks;
        for (j = 0, len = ref.length; j < len; j++) {
          block = ref[j];
          try {
            this.parseText(block.text, block);
          } catch (error) {
            e = error;
            throw new Error(e.message + ": \"" + block.text + "\"");
          }
        }
        return this.map.mapLineNumbers();
      };

      Parser.prototype.addNode = function(node) {
        node.lineNumber = this._lineNumber;
        this.node.add(node);
        if (node.type === TYPES.block) {
          this.blocks.push(node);
        }
        if (node.type === TYPES.formattedCode) {
          this.blocks.push(node);
        }
        return this.prevNode = this.node = node;
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
                map: _this.map,
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
              this.addNode(new TOKENS[token.type]({
                map: this.map
              }));
            }
          } else {
            switch (token.type) {
              case 'linkBegin':
                add();
                this.addNode(new Link({
                  map: this.map
                }));
                break;
              case 'linkEnd':
                if (this.node.type !== TYPES.link) {
                  throw new Error('Unexpected link terminator');
                } else {
                  this.node.setLink(this.parseLink(text.substr(last, cur - last)));
                  this.node = this.node.parent();
                }
                break;
              case 'htmlBegin':
                add();
                this.addNode(new HtmlInline({
                  map: this.map
                }));
                break;
              case 'htmlEnd':
                if (this.node.type !== TYPES.htmlInline) {
                  throw new Error('Unexpected inline html terminator');
                } else {
                  this.node.addText(text.substr(last, cur - last));
                  this.node = this.node.parent();
                }
                break;
              case 'mediaBegin':
                add();
                this.addNode(new MediaInline({
                  map: this.map
                }));
                break;
              case 'mediaEnd':
                if (this.node.type !== TYPES.mediaInline) {
                  throw new Error('Unexpected media terminator');
                } else {
                  this.node.setMedia(this.parseMedia(text.substr(last, cur - last)));
                  this.node = this.node.parent();
                }
                break;
              case 'code':
                add();
                this.addNode(new Code({
                  map: this.map
                }));
                last = i;
                cur = i = text.indexOf(TOKEN_MATCHES.code, i);
                if (i === -1) {
                  cur = i = L;
                }
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

      Parser.prototype.processLine = function() {
        var id, j, len, line, n, node, nodes, ref;
        line = this.reader.get();
        this._lineNumber = this.reader.n;
        if (line.empty) {
          if (this.node.type === TYPES.block) {
            this.prevNode = this.node;
            this.node = this.node.parent();
          }
          if ((ref = this.node.type) === TYPES.codeBlock || ref === TYPES.html || ref === TYPES.formattedCode) {
            this.node.addText(line.line.substr(this.node.indentation));
          }
          return;
        }
        while (line.indentation < this.node.indentation) {
          this.prevNode = this.node;
          if (this.node.type === TYPES.full) {
            if (!this.fullNode) {
              throw new Error('Full width node Invalid indentation');
            }
            this.fullNode = false;
          }
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
          case TYPES.formattedCode:
            this.node.addText(line.line.substr(this.node.indentation));
            return;
          case TYPES.table:
            nodes = this.node.addText(line.line.substr(this.node.indentation), {
              map: this.map
            });
            for (j = 0, len = nodes.length; j < len; j++) {
              node = nodes[j];
              if (node.type === TYPES.block) {
                this.blocks.push(node);
              }
            }
            return;
        }
        switch (line.type) {
          case TYPES.table:
            return this.addNode(new Table({
              map: this.map,
              indentation: line.indentation + 1
            }));
          case TYPES.codeBlock:
            return this.addNode(new CodeBlock({
              map: this.map,
              indentation: line.indentation + 1,
              lang: line.text
            }));
          case TYPES.formattedCode:
            return this.addNode(new FormattedCode({
              map: this.map,
              indentation: line.indentation + 1
            }));
          case TYPES.html:
            return this.addNode(new Html({
              map: this.map,
              indentation: line.indentation + 1,
              lang: line.text
            }));
          case TYPES.full:
            if (!this.main) {
              throw new Error('Cannot have a full width inside a sidenote');
            }
            if (this.fullNode) {
              throw new Error('Cannot have a full width inside a full width');
            }
            this.fullNode = true;
            this.addNode(new Full({
              map: this.map,
              indentation: line.indentation + 1
            }));
            id = this.node.id;
            n = new Sidenote({
              map: this.map,
              indentation: line.indentation + 1,
              link: id
            });
            return this.sidenotes.push(n);
          case TYPES.special:
            return this.addNode(new Special({
              map: this.map,
              indentation: line.indentation + 1
            }));
          case TYPES.list:
            if (this.node.type !== TYPES.list) {
              if (this.node.type === TYPES.block && this.node.paragraph === false && this.node.parent().type === TYPES.listItem) {
                this.prevNode = this.node;
                this.node = this.node.parent();
              }
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
            this.node.setHeading({
              map: this.map,
              indentation: line.indentation + 1,
              text: line.text
            });
            return this.blocks.push(this.node.heading);
          case TYPES.sidenote:
            if (!this.main) {
              throw new Error('Cannot have a sidenote inside a sidenote');
            }
            if (this.fullNode) {
              throw new Error('Cannot have a sidenote inside a full width');
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
              this.addNode(new Section({
                map: this.map,
                indentation: line.indentation + 1,
                level: BLOCK_LEVEL
              }));
              this.addNode(new Block({
                map: this.map,
                indentation: line.indentation,
                paragraph: true
              }));
            }
            return this.node.addText(line.text);
          case TYPES.media:
            return this.addNode(new Media({
              map: this.map,
              indentation: line.indentation + 1,
              media: this.parseMedia(line.text)
            }));
          case TYPES.comment:
            break;
          default:
            throw new Error('Unknown syntax');
        }
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
        if (parts.length <= 2) {
          return media;
        }
        media.width = parts[2].trim();
        if (parts.length <= 3) {
          return media;
        }
        media.float = parts[3].trim();
        return media;
      };

      return Parser;

    })(Base);
    return Mod.set('Wallapatta.Parser', Parser);
  });

}).call(this);
