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
    var append, j, l, len, len1, len2, m, name, parseIdClass, ref, ref1, ref2, setAttributes, setEvents, setStyles, weya, wrapAppend;
    weya = {
      _elem: null
    };
    setStyles = function(elem, styles) {
      var k, results, v;
      results = [];
      for (k in styles) {
        v = styles[k];
        if (v != null) {
          results.push(elem.style.setProperty(k, v));
        } else {
          results.push(elem.style.removeProperty(k));
        }
      }
      return results;
    };
    setEvents = function(elem, events) {
      var k, results, v;
      results = [];
      for (k in events) {
        v = events[k];
        results.push(elem.addEventListener(k, v, false));
      }
      return results;
    };
    setAttributes = function(elem, attrs) {
      var k, results, v;
      results = [];
      for (k in attrs) {
        v = attrs[k];
        switch (k) {
          case 'style':
            results.push(setStyles(elem, v));
            break;
          case 'on':
            results.push(setEvents(elem, v));
            break;
          default:
            if (v != null) {
              results.push(elem.setAttribute(k, v));
            } else {
              results.push(elem.removeAttribute(k));
            }
        }
      }
      return results;
    };
    parseIdClass = function(str) {
      var c, i, j, len, ref, res;
      res = {
        id: null,
        "class": []
      };
      ref = str.split(".");
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        c = ref[i];
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
      var arg, attrs, c, className, contentFunction, contentText, elem, i, idClass, j, l, len, len1, pElem, ref;
      idClass = null;
      contentText = null;
      attrs = null;
      contentFunction = null;
      for (i = j = 0, len = args.length; j < len; i = ++j) {
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
          className = '';
          ref = idClass["class"];
          for (l = 0, len1 = ref.length; l < len1; l++) {
            c = ref[l];
            if (className !== '') {
              className += ' ';
            }
            className += "" + c;
          }
          elem.className = className;
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
    ref = Tags.svg.split(' ');
    for (j = 0, len = ref.length; j < len; j++) {
      name = ref[j];
      weya[name] = wrapAppend("http://www.w3.org/2000/svg", name);
    }
    ref1 = Tags.html.split(' ');
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      name = ref1[l];
      weya[name] = wrapAppend("http://www.w3.org/1999/xhtml", name);
    }
    ref2 = Tags.htmlVoid.split(' ');
    for (m = 0, len2 = ref2.length; m < len2; m++) {
      name = ref2[m];
      weya[name] = wrapAppend(null, name);
    }
    return weya;
  };

  weyaMarkupCreate = function() {
    var append, j, l, len, len1, len2, m, name, parseIdClass, ref, ref1, ref2, setAttributes, setEvents, setIndent, setStyles, weya, wrapAppend;
    weya = {
      _buf: null,
      _indent: 0
    };
    setStyles = function(buf, styles) {
      var k, v;
      buf.push(" style=\"");
      for (k in styles) {
        v = styles[k];
        buf.push(k + ":" + v + ";");
      }
      return buf.push("\"");
    };
    setEvents = function(buf, events) {
      var k, results, v;
      results = [];
      for (k in events) {
        v = events[k];
        results.push(buf.push(" on" + k + "=\"" + v + "\""));
      }
      return results;
    };
    setAttributes = function(buf, attrs) {
      var k, results, v;
      results = [];
      for (k in attrs) {
        v = attrs[k];
        switch (k) {
          case 'style':
            results.push(setStyles(buf, v));
            break;
          case 'on':
            results.push(setEvents(buf, v));
            break;
          default:
            results.push(buf.push(" " + k + "=\"" + v + "\""));
        }
      }
      return results;
    };
    setIndent = function(buf, indent) {
      var i, j, ref, results;
      results = [];
      for (i = j = 0, ref = indent; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        results.push(buf.push(" "));
      }
      return results;
    };
    parseIdClass = function(str) {
      var c, i, j, len, ref, res;
      res = {
        id: null,
        "class": null
      };
      ref = str.split(".");
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        c = ref[i];
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
      var arg, attrs, buf, c, contentFunction, contentText, i, idClass, j, len;
      idClass = null;
      contentText = null;
      attrs = null;
      contentFunction = null;
      for (i = j = 0, len = args.length; j < len; i = ++j) {
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
    ref = Tags.svg.split(' ');
    for (j = 0, len = ref.length; j < len; j++) {
      name = ref[j];
      weya[name] = wrapAppend("http://www.w3.org/2000/svg", name);
    }
    ref1 = Tags.html.split(' ');
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      name = ref1[l];
      weya[name] = wrapAppend(null, name);
    }
    ref2 = Tags.htmlVoid.split(' ');
    for (m = 0, len2 = ref2.length; m < len2; m++) {
      name = ref2[m];
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

  Weya.setApi = function(api) {
    var k, results, v;
    results = [];
    for (k in api) {
      v = api[k];
      results.push(Api[k] = v);
    }
    return results;
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Weya;
  }

}).call(this);
