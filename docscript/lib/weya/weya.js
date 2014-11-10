(function() {
  var Api, Tags, Weya, weyaDom, weyaDomCreate, weyaMarkup, weyaMarkupCreate;

  Tags = {
    svg: 'a altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform circle clipPath color-profile cursor defs desc ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font font-face font-face-format font-face-name font-face-src font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient marker mask metadata missing-glyph mpath path pattern polygon polyline radialGradient rect script set stop style svg symbol text textPath title tref tspan use view vkern switch foreignObject',
    html: 'a abbr address article aside audio b bdi bdo blockquote body button canvas caption cite code colgroup datalist dd del details dfn div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins kbd label legend li main map mark menu meter nav noscript object ol optgroup option output p pre progress q rp rt ruby s samp script section select small span strong style sub summary sup table tbody td textarea tfoot th thead time title tr u ul video',
    htmlVoid: 'area base br col command embed hr img input keygen link meta param source track wbr'
  };

  Api = {
    document: this.document
  };

  weyaDomCreate = function() {
    var append, name, parseIdClass, setAttributes, setEvents, setStyles, weya, wrapAppend, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    weya = {
      _elem: null
    };
    setStyles = function(elem, styles) {
      var k, v, _results;
      _results = [];
      for (k in styles) {
        v = styles[k];
        if (v != null) {
          _results.push(elem.style.setProperty(k, v));
        } else {
          _results.push(elem.style.removeProperty(k));
        }
      }
      return _results;
    };
    setEvents = function(elem, events) {
      var k, v, _results;
      _results = [];
      for (k in events) {
        v = events[k];
        _results.push(elem.addEventListener(k, v, false));
      }
      return _results;
    };
    setAttributes = function(elem, attrs) {
      var k, v, _results;
      _results = [];
      for (k in attrs) {
        v = attrs[k];
        switch (k) {
          case 'style':
            _results.push(setStyles(elem, v));
            break;
          case 'on':
            _results.push(setEvents(elem, v));
            break;
          default:
            if (v != null) {
              _results.push(elem.setAttribute(k, v));
            } else {
              _results.push(elem.removeAttribute(k));
            }
        }
      }
      return _results;
    };
    parseIdClass = function(str) {
      var c, i, res, _i, _len, _ref;
      res = {
        id: null,
        "class": []
      };
      _ref = str.split(".");
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        c = _ref[i];
        if (c.indexOf("#") === 0) {
          res.id = c.substr(1);
        } else if (c !== "") {
          if (res["class"] == null) {
            res["class"] = [c];
          } else {
            res["class"].push(c);
          }
        }
      }
      return res;
    };
    append = function(ns, name, args) {
      var arg, attrs, c, contentFunction, contentText, elem, i, idClass, pElem, _i, _j, _len, _len1, _ref;
      idClass = null;
      contentText = null;
      attrs = null;
      contentFunction = null;
      for (i = _i = 0, _len = args.length; _i < _len; i = ++_i) {
        arg = args[i];
        switch (typeof arg) {
          case 'function':
            contentFunction = arg;
            break;
          case 'object':
            attrs = arg;
            break;
          case 'string':
            if (args.length === 1) {
              contentText = arg;
            } else {
              c = arg.charAt(0);
              if (i === 0 && (c === '#' || c === '.')) {
                idClass = arg;
              } else {
                contentText = arg;
              }
            }
        }
      }
      pElem = this._elem;
      if (ns != null) {
        elem = this._elem = Api.document.createElementNS(ns, name);
      } else {
        elem = this._elem = Api.document.createElement(name);
      }
      if (idClass != null) {
        idClass = parseIdClass(idClass);
        if (idClass.id != null) {
          elem.id = idClass.id;
        }
        if (idClass["class"] != null) {
          _ref = idClass["class"];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            c = _ref[_j];
            elem.classList.add(c);
          }
        }
      }
      if (attrs != null) {
        setAttributes(elem, attrs);
      }
      if (pElem != null) {
        pElem.appendChild(elem);
      }
      if (contentFunction != null) {
        contentFunction.call(this);
      } else if (contentText != null) {
        elem.textContent = contentText;
      }
      this._elem = pElem;
      return elem;
    };
    wrapAppend = function(ns, name) {
      return function() {
        return append.call(this, ns, name, arguments);
      };
    };
    _ref = Tags.svg.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      weya[name] = wrapAppend("http://www.w3.org/2000/svg", name);
    }
    _ref1 = Tags.html.split(' ');
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      name = _ref1[_j];
      weya[name] = wrapAppend("http://www.w3.org/1999/xhtml", name);
    }
    _ref2 = Tags.htmlVoid.split(' ');
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      name = _ref2[_k];
      weya[name] = wrapAppend(null, name);
    }
    return weya;
  };

  weyaMarkupCreate = function() {
    var append, name, parseIdClass, setAttributes, setEvents, setIndent, setStyles, weya, wrapAppend, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    weya = {
      _buf: null,
      _indent: 0
    };
    setStyles = function(buf, styles) {
      var k, v;
      buf.push(" style=\"");
      for (k in styles) {
        v = styles[k];
        buf.push("" + k + ":" + v + ";");
      }
      return buf.push("\"");
    };
    setEvents = function(buf, events) {
      var k, v, _results;
      _results = [];
      for (k in events) {
        v = events[k];
        _results.push(buf.push(" on" + k + "=\"" + v + "\""));
      }
      return _results;
    };
    setAttributes = function(buf, attrs) {
      var k, v, _results;
      _results = [];
      for (k in attrs) {
        v = attrs[k];
        switch (k) {
          case 'style':
            _results.push(setStyles(buf, v));
            break;
          case 'on':
            _results.push(setEvents(buf, v));
            break;
          default:
            _results.push(buf.push(" " + k + "=\"" + v + "\""));
        }
      }
      return _results;
    };
    setIndent = function(buf, indent) {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= indent ? _i < indent : _i > indent; i = 0 <= indent ? ++_i : --_i) {
        _results.push(buf.push(" "));
      }
      return _results;
    };
    parseIdClass = function(str) {
      var c, i, res, _i, _len, _ref;
      res = {
        id: null,
        "class": null
      };
      _ref = str.split(".");
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        c = _ref[i];
        if (c.indexOf("#") === 0) {
          res.id = c.substr(1);
        } else if (c !== "") {
          if (res["class"] == null) {
            res["class"] = c;
          } else {
            res["class"] += " " + c;
          }
        }
      }
      return res;
    };
    append = function(ns, name, args) {
      var arg, attrs, buf, c, contentFunction, contentText, i, idClass, _i, _len;
      idClass = null;
      contentText = null;
      attrs = null;
      contentFunction = null;
      for (i = _i = 0, _len = args.length; _i < _len; i = ++_i) {
        arg = args[i];
        switch (typeof arg) {
          case 'function':
            contentFunction = arg;
            break;
          case 'object':
            attrs = arg;
            break;
          case 'string':
            if (args.length === 1) {
              contentText = arg;
            } else {
              c = arg.charAt(0);
              if (i === 0 && (c === '#' || c === '.')) {
                idClass = arg;
              } else {
                contentText = arg;
              }
            }
        }
      }
      buf = this._buf;
      setIndent(buf, this._indent);
      buf.push("<" + name);
      if (idClass != null) {
        idClass = parseIdClass(idClass);
        if (idClass.id != null) {
          buf.push(" id=\"" + idClass.id + "\"");
        }
        if (idClass["class"] != null) {
          buf.push(" class=\"" + idClass["class"] + "\"");
        }
      }
      if (attrs != null) {
        setAttributes(buf, attrs);
      }
      buf.push(">\n");
      this._indent++;
      if (contentFunction != null) {
        contentFunction.call(this);
      } else if (contentText != null) {
        setIndent(buf, this._indent);
        buf.push(contentText);
        buf.push("\n");
      }
      this._indent--;
      setIndent(buf, this._indent);
      return buf.push("</" + name + ">\n");
    };
    wrapAppend = function(ns, name) {
      return function() {
        return append.call(this, ns, name, arguments);
      };
    };
    _ref = Tags.svg.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      weya[name] = wrapAppend("http://www.w3.org/2000/svg", name);
    }
    _ref1 = Tags.html.split(' ');
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      name = _ref1[_j];
      weya[name] = wrapAppend(null, name);
    }
    _ref2 = Tags.htmlVoid.split(' ');
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      name = _ref2[_k];
      weya[name] = wrapAppend(null, name);
    }
    return weya;
  };

  weyaDom = weyaDomCreate();

  weyaMarkup = weyaMarkupCreate();

  this.Weya = Weya = function(options, func) {
    var pContext, pElem, r, weya;
    weya = weyaDom;
    pContext = weya.$;
    weya.$ = options.context;
    pElem = weya._elem;
    weya._elem = options.elem;
    r = func != null ? func.call(weya) : void 0;
    weya._elem = pElem;
    weya.$ = pContext;
    return r;
  };

  Weya.markup = function(options, func) {
    var buf, pBuf, pContext, r, weya;
    weya = weyaMarkup;
    pContext = weya.$;
    weya.$ = options.context;
    pBuf = weya._buf;
    weya._buf = [];
    r = func != null ? func.call(weya) : void 0;
    buf = weya._buf;
    weya._buf = pBuf;
    weya.$ = pContext;
    return buf.join('');
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Weya;
  }

}).call(this);
