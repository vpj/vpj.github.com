(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Mod.require('Weya.Base', 'Weya', 'HLJS', function(Base, Weya, HLJS) {
    var Article, Block, Bold, Code, CodeBlock, Html, Italics, Link, List, ListItem, Map, Media, MediaInline, Node, PREFIX, Section, Sidenote, Special, SubScript, SuperScript, TYPES, Table, Text, decodeURL;
    decodeURL = function(url) {
      if (window.wallapattaDecodeURL != null) {
        return window.wallapattaDecodeURL(url);
      } else {
        return url;
      }
    };
    TYPES = {
      article: 'article',
      sidenote: 'sidenote',
      codeBlock: 'codeBlock',
      special: 'special',
      html: 'html',
      table: 'table',
      section: 'section',
      heading: 'heading',
      list: 'list',
      listItem: 'listItem',
      block: 'block',
      media: 'media',
      bold: 'bold',
      italics: 'italics',
      superScript: 'superScript',
      subScript: 'subScript',
      code: 'code',
      link: 'link',
      mediaInline: 'mediaInline',
      comment: '///'
    };
    PREFIX = 'wallapatta_';
    Map = (function(superClass) {
      extend(Map, superClass);

      function Map() {
        return Map.__super__.constructor.apply(this, arguments);
      }

      Map.initialize(function(options) {
        this.nodes = {};
        this.id = 0;
        if (options.id) {
          this.id = options.id;
        }
        this.start = this.id;
        return this.N = 0;
      });

      Map.prototype.smallElements = function() {
        return this.N = this.id;
      };

      Map.prototype.add = function(node) {
        node.id = this.id;
        this.nodes[this.id] = node;
        return this.id++;
      };

      return Map;

    })(Base);
    Node = (function(superClass) {
      extend(Node, superClass);

      function Node() {
        return Node.__super__.constructor.apply(this, arguments);
      }

      Node.extend();

      Node.initialize(function(options) {
        this.indentation = options.indentation;
        this._parent = null;
        this.children = [];
        options.map.add(this);
        return this.elems = {};
      });

      Node.prototype.setParent = function(parent) {
        return this._parent = parent;
      };

      Node.prototype.parent = function() {
        return this._parent;
      };

      Node.prototype.isFirstChild = function(node) {
        if (this.children.length === 0) {
          return false;
        }
        if (node.id === this.children[0].id) {
          return true;
        } else {
          return false;
        }
      };

      Node.prototype._add = function(node) {
        node.setParent(this);
        this.children.push(node);
        return node;
      };

      Node.prototype.add = function(node) {
        return this._add(node);
      };

      Node.prototype.template = function() {
        return this.$.elem = this.div("#" + PREFIX + this.$.id + ".node", null);
      };

      Node.prototype.render = function(options) {
        Weya({
          elem: options.elem,
          context: this
        }, this.template);
        return this.renderChildren(this.elem, options);
      };

      Node.prototype.renderChildren = function(elem, options) {
        var child, k, len, ref, results;
        ref = this.children;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          child = ref[k];
          results.push(child.render({
            elem: elem
          }));
        }
        return results;
      };

      return Node;

    })(Base);
    Text = (function(superClass) {
      extend(Text, superClass);

      function Text() {
        return Text.__super__.constructor.apply(this, arguments);
      }

      Text.extend();

      Text.prototype.type = TYPES.text;

      Text.initialize(function(options) {
        return this.text = options.text;
      });

      Text.prototype.template = function() {
        return this.$.elem = this.span("#" + PREFIX + this.$.id + ".text", this.$.text);
      };

      return Text;

    })(Node);
    Bold = (function(superClass) {
      extend(Bold, superClass);

      function Bold() {
        return Bold.__super__.constructor.apply(this, arguments);
      }

      Bold.extend();

      Bold.prototype.type = TYPES.bold;

      Bold.prototype.template = function() {
        return this.$.elem = this.strong("#" + PREFIX + this.$.id + ".bold", null);
      };

      return Bold;

    })(Node);
    Italics = (function(superClass) {
      extend(Italics, superClass);

      function Italics() {
        return Italics.__super__.constructor.apply(this, arguments);
      }

      Italics.extend();

      Italics.prototype.type = TYPES.italics;

      Italics.prototype.template = function() {
        return this.$.elem = this.em("#" + PREFIX + this.$.id + ".italics", null);
      };

      return Italics;

    })(Node);
    SuperScript = (function(superClass) {
      extend(SuperScript, superClass);

      function SuperScript() {
        return SuperScript.__super__.constructor.apply(this, arguments);
      }

      SuperScript.extend();

      SuperScript.prototype.type = TYPES.superScript;

      SuperScript.prototype.template = function() {
        return this.$.elem = this.sup("#" + PREFIX + this.$.id + ".superScript", null);
      };

      return SuperScript;

    })(Node);
    SubScript = (function(superClass) {
      extend(SubScript, superClass);

      function SubScript() {
        return SubScript.__super__.constructor.apply(this, arguments);
      }

      SubScript.extend();

      SubScript.prototype.type = TYPES.subScript;

      SubScript.prototype.template = function() {
        return this.$.elem = this.sub("#" + PREFIX + this.$.id + ".subScript", null);
      };

      return SubScript;

    })(Node);
    Code = (function(superClass) {
      extend(Code, superClass);

      function Code() {
        return Code.__super__.constructor.apply(this, arguments);
      }

      Code.extend();

      Code.prototype.type = TYPES.code;

      Code.prototype.template = function() {
        return this.$.elem = this.code("#" + PREFIX + this.$.id + ".code", null);
      };

      return Code;

    })(Node);
    Link = (function(superClass) {
      extend(Link, superClass);

      function Link() {
        return Link.__super__.constructor.apply(this, arguments);
      }

      Link.extend();

      Link.prototype.setLink = function(options) {
        this.link = options.link;
        this.text = options.text;
        return this.text != null ? this.text : this.text = this.link;
      };

      Link.prototype.type = TYPES.link;

      Link.prototype.template = function() {
        return this.$.elem = this.a("#" + PREFIX + this.$.id + ".link", {
          href: this.$.link
        }, this.$.text);
      };

      return Link;

    })(Node);
    MediaInline = (function(superClass) {
      extend(MediaInline, superClass);

      function MediaInline() {
        return MediaInline.__super__.constructor.apply(this, arguments);
      }

      MediaInline.extend();

      MediaInline.prototype.type = TYPES.mediaInline;

      MediaInline.prototype.setMedia = function(options) {
        this.src = options.src;
        this.alt = options.alt;
        return this.alt != null ? this.alt : this.alt = options.src;
      };

      MediaInline.prototype.template = function() {
        return this.$.elem = this.img("#" + PREFIX + this.$.id + ".image-inline", {
          src: decodeURL(this.$.src),
          alt: this.$.alt
        });
      };

      MediaInline.prototype.render = function(options) {
        return Weya({
          elem: options.elem,
          context: this
        }, this.template);
      };

      return MediaInline;

    })(Node);
    Block = (function(superClass) {
      extend(Block, superClass);

      function Block() {
        return Block.__super__.constructor.apply(this, arguments);
      }

      Block.extend();

      Block.prototype.type = TYPES.block;

      Block.initialize(function(options) {
        this.paragraph = options.paragraph;
        return this.text = '';
      });

      Block.prototype.addText = function(text) {
        if (this.text !== '') {
          this.text += ' ';
        }
        return this.text += text;
      };

      Block.prototype.template = function() {
        if (this.$.paragraph) {
          return this.$.elem = this.p("#" + PREFIX + this.$.id + ".paragraph", null);
        } else {
          return this.$.elem = this.span("#" + PREFIX + this.$.id + ".block", null);
        }
      };

      return Block;

    })(Node);
    CodeBlock = (function(superClass) {
      extend(CodeBlock, superClass);

      function CodeBlock() {
        return CodeBlock.__super__.constructor.apply(this, arguments);
      }

      CodeBlock.extend();

      CodeBlock.prototype.type = TYPES.codeBlock;

      CodeBlock.initialize(function(options) {
        this.text = '';
        this.lang = options.lang.trim();
        this.cssClass = ".nohighlight";
        if (this.lang !== '') {
          return this.cssClass = "." + this.lang;
        }
      });

      CodeBlock.prototype.addText = function(text) {
        if (this.text !== '') {
          this.text += '\n';
        }
        return this.text += text;
      };

      CodeBlock.prototype.render = function(options) {
        var code, codeElem, html;
        code = this.text.trimRight();
        html = false;
        if (this.lang !== '' && (HLJS != null) && ((HLJS.getLanguage(this.lang)) != null)) {
          code = HLJS.highlight(this.lang, code, true);
          code = code.value;
          html = true;
        }
        codeElem = null;
        Weya({
          elem: options.elem,
          context: this
        }, function() {
          return this.$.elem = this.pre("#" + PREFIX + this.$.id + ".codeBlock", function() {
            return codeElem = this.code(this.$.cssClass, "");
          });
        });
        if (html) {
          return codeElem.innerHTML = code;
        } else {
          return codeElem.textContent = code;
        }
      };

      return CodeBlock;

    })(Node);
    Table = (function(superClass) {
      extend(Table, superClass);

      function Table() {
        return Table.__super__.constructor.apply(this, arguments);
      }

      Table.extend();

      Table.prototype.type = TYPES.table;

      Table.initialize(function(options) {
        this.table = [];
        return this.header = 0;
      });

      Table.prototype.addText = function(text, options) {
        var cell, k, len, node, nodes, row;
        if ((text.trim().substr(0, 3)) === '===') {
          this.header = this.table.length;
          return [];
        }
        text = text.split('|');
        row = [];
        nodes = [];
        for (k = 0, len = text.length; k < len; k++) {
          cell = text[k];
          if (cell === '') {
            if (row.length > 0) {
              row[row.length - 1].span++;
            }
            continue;
          }
          node = new Block({
            map: options.map,
            indentation: this.indentation
          });
          node.setParent(this);
          node.addText(cell.trim());
          row.push({
            span: 1,
            node: node
          });
          nodes.push(node);
        }
        this.table.push(row);
        return nodes;
      };

      Table.prototype.render = function(options) {
        var cell, codeElem, elems, i, j, k, len, results, row;
        codeElem = null;
        elems = [];
        Weya({
          elem: options.elem,
          context: this
        }, function() {
          return this.$.elem = this.table("#" + PREFIX + this.$.id + ".table", function() {
            this.thead(function() {
              var cells, i, k, ref, results, row;
              results = [];
              for (i = k = 0, ref = this.$.header; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
                row = this.$.table[i];
                cells = [];
                this.tr(function() {
                  var cell, l, len, results1;
                  results1 = [];
                  for (l = 0, len = row.length; l < len; l++) {
                    cell = row[l];
                    results1.push(cells.push(this.th({
                      colspan: cell.span
                    })));
                  }
                  return results1;
                });
                results.push(elems.push(cells));
              }
              return results;
            });
            return this.tbody(function() {
              var cells, i, k, ref, ref1, results, row;
              results = [];
              for (i = k = ref = this.$.header, ref1 = this.$.table.length; ref <= ref1 ? k < ref1 : k > ref1; i = ref <= ref1 ? ++k : --k) {
                row = this.$.table[i];
                cells = [];
                this.tr(function() {
                  var cell, l, len, results1;
                  results1 = [];
                  for (l = 0, len = row.length; l < len; l++) {
                    cell = row[l];
                    results1.push(cells.push(this.td({
                      colspan: cell.span
                    })));
                  }
                  return results1;
                });
                results.push(elems.push(cells));
              }
              return results;
            });
          });
        });
        results = [];
        for (i = k = 0, len = elems.length; k < len; i = ++k) {
          row = elems[i];
          results.push((function() {
            var l, len1, results1;
            results1 = [];
            for (j = l = 0, len1 = row.length; l < len1; j = ++l) {
              cell = row[j];
              results1.push(this.table[i][j].node.render({
                elem: cell
              }));
            }
            return results1;
          }).call(this));
        }
        return results;
      };

      return Table;

    })(Node);
    Special = (function(superClass) {
      extend(Special, superClass);

      function Special() {
        return Special.__super__.constructor.apply(this, arguments);
      }

      Special.extend();

      Special.prototype.type = TYPES.special;

      Special.prototype.template = function() {
        return this.$.elem = this.div("#" + PREFIX + this.$.id + ".special", null);
      };

      return Special;

    })(Node);
    Html = (function(superClass) {
      extend(Html, superClass);

      function Html() {
        return Html.__super__.constructor.apply(this, arguments);
      }

      Html.extend();

      Html.prototype.type = TYPES.html;

      Html.initialize(function() {
        return this.text = '';
      });

      Html.prototype.addText = function(text) {
        if (this.text !== '') {
          this.text += '\n';
        }
        return this.text += text;
      };

      Html.prototype.render = function(options) {
        Weya({
          elem: options.elem,
          context: this
        }, function() {
          return this.$.elem = this.div("#" + PREFIX + this.$.id + ".html", null);
        });
        return this.elem.innerHTML = this.text;
      };

      return Html;

    })(Node);
    Article = (function(superClass) {
      extend(Article, superClass);

      function Article() {
        return Article.__super__.constructor.apply(this, arguments);
      }

      Article.extend();

      Article.prototype.type = TYPES.article;

      Article.initialize(function(options) {});

      Article.prototype.template = function() {
        return this.$.elem = this.div("#" + PREFIX + this.$.id + ".article", null);
      };

      return Article;

    })(Node);
    Section = (function(superClass) {
      extend(Section, superClass);

      function Section() {
        return Section.__super__.constructor.apply(this, arguments);
      }

      Section.extend();

      Section.prototype.type = TYPES.section;

      Section.initialize(function(options) {
        return this.level = options.level;
      });

      Section.prototype.setHeading = function(options) {
        this.heading = new Block({
          map: options.map,
          indentation: options.indentation
        });
        this.heading.setParent(this);
        return this.heading.addText(options.text);
      };

      Section.prototype.template = function() {
        return this.$.elem = this.div("#" + PREFIX + this.$.id + ".section", function() {
          var h;
          h = (function() {
            switch (this.$.level) {
              case 1:
                return this.h1;
              case 2:
                return this.h2;
              case 3:
                return this.h3;
              case 4:
                return this.h4;
              case 5:
                return this.h5;
              case 6:
                return this.h6;
              default:
                return null;
            }
          }).call(this);
          if (h != null) {
            this.$.elems.heading = h.call(this, ".heading", null);
          }
          return this.$.elems.content = this.div(".content", null);
        });
      };

      Section.prototype.render = function(options) {
        Weya({
          elem: options.elem,
          context: this
        }, this.template);
        if (this.elems.heading != null) {
          this.heading.render({
            elem: this.elems.heading
          });
        }
        return this.renderChildren(this.elems.content, options);
      };

      return Section;

    })(Node);
    List = (function(superClass) {
      extend(List, superClass);

      function List() {
        return List.__super__.constructor.apply(this, arguments);
      }

      List.extend();

      List.prototype.type = TYPES.list;

      List.initialize(function(options) {
        return this.ordered = options.ordered;
      });

      List.prototype.add = function(node) {
        if (node.type !== TYPES.listItem) {
          throw new Error('List item expected');
        }
        if (node.ordered !== this.ordered) {
          throw new Error('List item type mismatch');
        }
        return this._add(node);
      };

      List.prototype.template = function() {
        if (this.$.ordered) {
          return this.$.elem = this.ol("#" + PREFIX + this.$.id + ".list", null);
        } else {
          return this.$.elem = this.ul("#" + PREFIX + this.$.id + ".list", null);
        }
      };

      return List;

    })(Node);
    ListItem = (function(superClass) {
      extend(ListItem, superClass);

      function ListItem() {
        return ListItem.__super__.constructor.apply(this, arguments);
      }

      ListItem.extend();

      ListItem.prototype.type = TYPES.listItem;

      ListItem.initialize(function(options) {
        return this.ordered = options.ordered;
      });

      ListItem.prototype.template = function() {
        return this.$.elem = this.li("#" + PREFIX + this.$.id + ".list-item", null);
      };

      return ListItem;

    })(Node);
    Sidenote = (function(superClass) {
      extend(Sidenote, superClass);

      function Sidenote() {
        return Sidenote.__super__.constructor.apply(this, arguments);
      }

      Sidenote.extend();

      Sidenote.initialize(function(options) {
        return this.link = options.link;
      });

      Sidenote.prototype.type = TYPES.sidenote;

      Sidenote.prototype.template = function() {
        return this.$.elem = this.div("#" + PREFIX + this.$.id + ".sidenote", null);
      };

      return Sidenote;

    })(Node);
    Media = (function(superClass) {
      extend(Media, superClass);

      function Media() {
        return Media.__super__.constructor.apply(this, arguments);
      }

      Media.extend();

      Media.initialize(function(options) {
        this.src = options.media.src;
        this.alt = options.media.alt;
        return this.alt != null ? this.alt : this.alt = options.media.src;
      });

      Media.prototype.type = TYPES.media;

      Media.prototype.add = function(node) {
        throw new Error('Invalid indentation');
      };

      Media.prototype.template = function() {
        return this.$.elem = this.div("#" + PREFIX + this.$.id + ".image-container", function() {
          return this.$.elems.img = this.img(".image", {
            src: decodeURL(this.$.src),
            alt: this.$.alt
          });
        });
      };

      Media.prototype.render = function(options) {
        return Weya({
          elem: options.elem,
          context: this
        }, this.template);
      };

      return Media;

    })(Node);
    Mod.set('Wallapatta.Text', Text);
    Mod.set('Wallapatta.Bold', Bold);
    Mod.set('Wallapatta.Italics', Italics);
    Mod.set('Wallapatta.SuperScript', SuperScript);
    Mod.set('Wallapatta.SubScript', SubScript);
    Mod.set('Wallapatta.Code', Code);
    Mod.set('Wallapatta.Link', Link);
    Mod.set('Wallapatta.MediaInline', MediaInline);
    Mod.set('Wallapatta.Block', Block);
    Mod.set('Wallapatta.Section', Section);
    Mod.set('Wallapatta.List', List);
    Mod.set('Wallapatta.ListItem', ListItem);
    Mod.set('Wallapatta.Sidenote', Sidenote);
    Mod.set('Wallapatta.Article', Article);
    Mod.set('Wallapatta.Media', Media);
    Mod.set('Wallapatta.CodeBlock', CodeBlock);
    Mod.set('Wallapatta.Table', Table);
    Mod.set('Wallapatta.Special', Special);
    Mod.set('Wallapatta.Html', Html);
    Mod.set('Wallapatta.Map', Map);
    return Mod.set('Wallapatta.TYPES', TYPES);
  });

}).call(this);
