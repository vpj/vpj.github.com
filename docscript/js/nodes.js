(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mod.require('Weya.Base', 'Weya', function(Base, Weya) {
    var Article, Block, Bold, Code, CodeBlock, Html, Italics, Link, List, ListItem, Media, NODES, NODE_ID, Node, PREFIX, Section, Sidenote, Special, SubScript, SuperScript, TYPES, Text;
    TYPES = {
      sidenote: 'sidenote',
      codeBlock: 'codeBlock',
      special: 'special',
      html: 'html',
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
      mediaInline: 'mediaInline'
    };
    NODES = {};
    NODE_ID = 0;
    PREFIX = 'docscript_';
    Node = (function(_super) {
      __extends(Node, _super);

      function Node() {
        return Node.__super__.constructor.apply(this, arguments);
      }

      Node.extend();

      Node.initialize(function(options) {
        this.indentation = options.indentation;
        this._parent = null;
        this.children = [];
        this.id = NODE_ID;
        this.elems = {};
        NODE_ID++;
        return NODES[this.id] = this;
      });

      Node.prototype.setParent = function(parent) {
        return this._parent = parent;
      };

      Node.prototype.parent = function() {
        return this._parent;
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
        var child, _i, _len, _ref, _results;
        _ref = this.children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          _results.push(child.render({
            elem: elem
          }));
        }
        return _results;
      };

      return Node;

    })(Base);
    Text = (function(_super) {
      __extends(Text, _super);

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
    Bold = (function(_super) {
      __extends(Bold, _super);

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
    Italics = (function(_super) {
      __extends(Italics, _super);

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
    SuperScript = (function(_super) {
      __extends(SuperScript, _super);

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
    SubScript = (function(_super) {
      __extends(SubScript, _super);

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
    Code = (function(_super) {
      __extends(Code, _super);

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
    Link = (function(_super) {
      __extends(Link, _super);

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
    Block = (function(_super) {
      __extends(Block, _super);

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
    CodeBlock = (function(_super) {
      __extends(CodeBlock, _super);

      function CodeBlock() {
        return CodeBlock.__super__.constructor.apply(this, arguments);
      }

      CodeBlock.extend();

      CodeBlock.prototype.type = TYPES.codeBlock;

      CodeBlock.initialize(function() {
        return this.text = '';
      });

      CodeBlock.prototype.addText = function(text) {
        if (this.text !== '') {
          this.text += '\n';
        }
        return this.text += text;
      };

      CodeBlock.prototype.template = function() {
        return this.$.elem = this.pre("#" + PREFIX + this.$.id + ".codeBlock", this.$.text);
      };

      return CodeBlock;

    })(Node);
    Special = (function(_super) {
      __extends(Special, _super);

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
    Html = (function(_super) {
      __extends(Html, _super);

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
    Article = (function(_super) {
      __extends(Article, _super);

      function Article() {
        return Article.__super__.constructor.apply(this, arguments);
      }

      Article.extend();

      Article.prototype.type = TYPES.document;

      Article.initialize(function(options) {});

      Article.prototype.template = function() {
        return this.$.elem = this.div("#" + PREFIX + this.$.id + ".article", null);
      };

      return Article;

    })(Node);
    Section = (function(_super) {
      __extends(Section, _super);

      function Section() {
        return Section.__super__.constructor.apply(this, arguments);
      }

      Section.extend();

      Section.prototype.type = TYPES.section;

      Section.initialize(function(options) {
        this.heading = new Block({
          indentation: options.indentation
        });
        this.heading.setParent(this);
        return this.level = options.level;
      });

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
            }
          }).call(this);
          this.$.elems.heading = h.call(this, ".heading", null);
          return this.$.elems.content = this.div(".content", null);
        });
      };

      Section.prototype.render = function(options) {
        Weya({
          elem: options.elem,
          context: this
        }, this.template);
        this.heading.render({
          elem: this.elems.heading
        });
        return this.renderChildren(this.elems.content, options);
      };

      return Section;

    })(Node);
    List = (function(_super) {
      __extends(List, _super);

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
    ListItem = (function(_super) {
      __extends(ListItem, _super);

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
    Sidenote = (function(_super) {
      __extends(Sidenote, _super);

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
    Media = (function(_super) {
      __extends(Media, _super);

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
            src: this.$.src,
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
    Mod.set('Docscript.Text', Text);
    Mod.set('Docscript.Bold', Bold);
    Mod.set('Docscript.Italics', Italics);
    Mod.set('Docscript.SuperScript', SuperScript);
    Mod.set('Docscript.SubScript', SubScript);
    Mod.set('Docscript.Code', Code);
    Mod.set('Docscript.Link', Link);
    Mod.set('Docscript.Block', Block);
    Mod.set('Docscript.Section', Section);
    Mod.set('Docscript.List', List);
    Mod.set('Docscript.ListItem', ListItem);
    Mod.set('Docscript.Sidenote', Sidenote);
    Mod.set('Docscript.Article', Article);
    Mod.set('Docscript.Media', Media);
    Mod.set('Docscript.CodeBlock', CodeBlock);
    Mod.set('Docscript.Special', Special);
    Mod.set('Docscript.Html', Html);
    Mod.set('Docscript.NODES', NODES);
    return Mod.set('Docscript.TYPES', TYPES);
  });

}).call(this);