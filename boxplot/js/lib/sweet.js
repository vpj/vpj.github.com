// Generated by CoffeeScript 1.6.3
(function() {
  var Base, History, Model, Router, Sweet, View, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = (function() {
    function Base() {
      this._init.apply(this, arguments);
    }

    Base.prototype._initFuncs = [];

    Base.initialize = function(func) {
      this.prototype._initFuncs = _.clone(this.prototype._initFuncs);
      return this.prototype._initFuncs.push(func);
    };

    Base.prototype._init = function() {
      var init, _i, _len, _ref, _results;
      _ref = this._initFuncs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        init = _ref[_i];
        _results.push(init.apply(this, arguments));
      }
      return _results;
    };

    Base.include = function(obj) {
      var k, v, _results;
      _results = [];
      for (k in obj) {
        v = obj[k];
        if (this.prototype[k] == null) {
          _results.push(this.prototype[k] = v);
        }
      }
      return _results;
    };

    return Base;

  })();

  Model = (function(_super) {
    __extends(Model, _super);

    function Model() {
      _ref = Model.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Model.prototype._defaults = {};

    Model.defaults = function(defaults) {
      var k, v, _results;
      this.prototype._defaults = _.clone(this.prototype._defaults);
      _results = [];
      for (k in defaults) {
        v = defaults[k];
        _results.push(this.prototype._defaults[k] = v);
      }
      return _results;
    };

    Model.initialize(function(options) {
      var k, v, _ref1, _results;
      this.values = {};
      _ref1 = this._defaults;
      _results = [];
      for (k in _ref1) {
        v = _ref1[k];
        if (options[k] != null) {
          _results.push(this.values[k] = options[k]);
        } else {
          _results.push(this.values[k] = v);
        }
      }
      return _results;
    });

    Model.prototype.toJSON = function() {
      return _.clone(this.values);
    };

    Model.prototype.get = function(key) {
      return this.values[key];
    };

    Model.prototype.set = function(key, value) {
      if (this._defaults[key] != null) {
        return this.value[key] = value;
      }
    };

    return Model;

  })(Base);

  View = (function(_super) {
    __extends(View, _super);

    function View() {
      _ref1 = View.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    View.prototype.delegateEventSplitter = /^(\S+)\s*(.*)$/;

    View.initialize(function() {
      this._viewId = _.uniqueId('view');
      return this._setupElement();
    });

    View.prototype._events = {};

    View.prototype._attrs = {};

    View.events = function(events) {
      var k, v, _results;
      this.prototype._events = _.clone(this.prototype._events);
      _results = [];
      for (k in events) {
        v = events[k];
        _results.push(this.prototype._events[k] = v);
      }
      return _results;
    };

    View.attributes = function(attributes) {
      var k, v, _results;
      this.prototype._attrs = _.clone(this.prototype._attrs);
      _results = [];
      for (k in attributes) {
        v = attributes[k];
        _results.push(this.prototype._attrs[k] = v);
      }
      return _results;
    };

    View.prototype.tagName = 'div';

    View.prototype.$ = function(selector) {
      return this.$el.find(selector);
    };

    View.prototype.render = function() {
      return null;
    };

    View.prototype.setElement = function(element, delegate) {
      if (this.$el != null) {
        this.undelegateEvents();
      }
      this.$el = $(element);
      this.el = this.$el[0];
      if (delegate !== false) {
        return this.delegateEvents();
      }
    };

    View.prototype.delegateEvents = function() {
      var eventName, key, method, selector, _ref2, _ref3, _results;
      this.undelegateEvents();
      _ref2 = this._events;
      _results = [];
      for (key in _ref2) {
        method = _ref2[key];
        _ref3 = key.match(this.delegateEventSplitter), key = _ref3[0], eventName = _ref3[1], selector = _ref3[2];
        method = _.bind(this[method], this);
        eventName += '.delegateEvents' + this._viewId;
        if (selector === "") {
          _results.push(this.$el.on(eventName, method));
        } else {
          _results.push(this.$el.on(eventName, selector, method));
        }
      }
      return _results;
    };

    View.prototype.undelegateEvents = function() {
      return this.$el.off('.delegateEvents' + this._viewId);
    };

    View.prototype._setupElement = function() {
      var $el, attrs;
      if (!this.el) {
        attrs = _.clone(this._attrs);
        if (this.id != null) {
          attrs.id = this.id;
        }
        if (this.className != null) {
          attrs["class"] = this.className;
        }
        $el = ($("<" + this.tagName + ">")).attr(attrs);
        return this.setElement($el);
      } else {
        return this.setElement(this.el);
      }
    };

    return View;

  })(Base);

  Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      _ref2 = Router.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Router.prototype.optionalParam = /\((.*?)\)/g;

    Router.prototype.namedParam = /(\(\?)?:\w+/g;

    Router.prototype.splatParam = /\*\w+/g;

    Router.prototype.escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    Router.initialize(function() {
      this._bindRoutes();
      this._event = null;
      return this._history = [];
    });

    Router.prototype._routes = {};

    Router.routes = function(routes) {
      var k, v, _results;
      this.prototype._routes = _.clone(this.prototype._routes);
      _results = [];
      for (k in routes) {
        v = routes[k];
        _results.push(this.prototype._routes[k] = v);
      }
      return _results;
    };

    Router.prototype.start = function(options) {
      var fragment;
      Sweet.history.start(options);
      fragment = Sweet.history.getFragment();
      if ((options != null ? options.silent : void 0) === true) {
        return this._history.push({
          fragment: fragment,
          title: document.title
        });
      }
    };

    Router.prototype.back = function() {
      if (this._history.length > 1) {
        return Sweet.history.back();
      }
    };

    Router.prototype.canBack = function() {
      if (this._history.length > 1 && Sweet.history.canBack()) {
        return true;
      } else {
        return false;
      }
    };

    Router.prototype.route = function(route, name) {
      var _this = this;
      if (!_.isRegExp(route)) {
        route = this._routeToRegExp(route);
      }
      return Sweet.history.route(route, function(fragment, event) {
        var args, callback, callbacks, _i, _len, _ref3, _results;
        args = _this._extractParameters(route, fragment);
        _this._event = event;
        if (((_ref3 = _this._event) != null ? _ref3.type : void 0) === "popstate") {
          _this._history.pop();
          if (_this._history.length === 0) {
            _this._history.push({
              fragment: fragment,
              title: document.title,
              state: _this.getState()
            });
          }
        } else {
          _this._history.push({
            fragment: fragment,
            title: document.title,
            state: _this.getState()
          });
        }
        callbacks = name;
        if (!Array.isArray(callbacks)) {
          callbacks = [callbacks];
        }
        _results = [];
        for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
          callback = callbacks[_i];
          callback = _this[callback];
          if (!callback.apply(_this, args)) {
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    };

    Router.prototype.getState = function() {
      var _ref3, _ref4;
      if (((_ref3 = this._event) != null ? (_ref4 = _ref3.originalEvent) != null ? _ref4.state : void 0 : void 0) != null) {
        return this._event.originalEvent.state;
      } else {
        return null;
      }
    };

    Router.prototype.navigate = function(fragment, options) {
      if (!options) {
        options = {};
      }
      if (options.replace) {
        this._history.pop();
      }
      if (!options.trigger) {
        this._history.push({
          fragment: fragment,
          title: options.title,
          state: options.state
        });
      }
      return Sweet.history.navigate(fragment, options);
    };

    Router.prototype._bindRoutes = function() {
      var name, route, _ref3, _results;
      _ref3 = this._routes;
      _results = [];
      for (route in _ref3) {
        name = _ref3[route];
        _results.push(this.route(route, name));
      }
      return _results;
    };

    Router.prototype._routeToRegExp = function(route) {
      route = route.replace(this.escapeRegExp, '\\$&').replace(this.noptionalParam, '(?:$1)?').replace(this.namedParam, function(match, optional) {
        if (optional) {
          return match;
        } else {
          return '([^\/]+)';
        }
      }).replace(this.splatParam, '(.*?)');
      return new RegExp("^" + route + "$");
    };

    Router.prototype._extractParameters = function(route, fragment) {
      var params;
      params = route.exec(fragment).slice(1);
      return _.map(params, function(param) {
        if (param) {
          return decodeURIComponent(param);
        } else {
          return null;
        }
      });
    };

    return Router;

  })(Base);

  History = (function(_super) {
    __extends(History, _super);

    function History() {
      _ref3 = History.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    History.prototype.routeStripper = /^[#\/]|\s+$/g;

    History.prototype.rootStripper = /^\/+|\/+$/g;

    History.prototype.trailingSlash = /\/$/;

    History.prototype.pathStripper = /[?#].*$/;

    History.initialize(function() {
      this.handlers = [];
      _.bindAll(this, 'checkUrl');
      this.history = window.history;
      return this.location = window.location;
    });

    History.prototype.interval = 50;

    History.prototype.getHash = function() {
      var match;
      match = this.location.href.match(/#(.*)$/);
      return (match != null ? match[1] : '');
    };

    History.prototype.getFragment = function(fragment, forcePushState) {
      var root;
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          root = this.root.replace(this.trailingSlash, '');
          if (!fragment.indexOf(root)) {
            fragment = fragment.slice(root.length);
          }
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(this.routeStripper, '');
    };

    History.prototype.back = function() {
      var _ref4;
      return (_ref4 = this.history) != null ? typeof _ref4.back === "function" ? _ref4.back() : void 0 : void 0;
    };

    History.prototype.canBack = function() {
      var _ref4;
      return ((_ref4 = this.history) != null ? _ref4.back : void 0) != null;
    };

    History.prototype.start = function(options) {
      var _ref4;
      History.started = true;
      this.options = _.extend({
        root: '/'
      }, this.options, options);
      this.root = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState = this.options.pushState === true;
      this._hasPushState = this.options.pushState === true && (((_ref4 = this.history) != null ? _ref4.pushState : void 0) != null);
      this.fragment = this.getFragment();
      this.root = ("/" + this.root + "/").replace(this.rootStripper, '/');
      if (this._hasPushState) {
        $(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && (window.onhashchange != null)) {
        this(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }
      if (!this.options.silent) {
        return this.loadUrl(null, null);
      }
    };

    History.prototype.route = function(route, callback) {
      return this.handlers.unshift({
        route: route,
        callback: callback
      });
    };

    History.prototype.checkUrl = function(e) {
      var fragment;
      fragment = this.getFragment();
      if (fragment === this.fragment) {
        return;
      }
      return this.loadUrl(fragment, e);
    };

    History.prototype.loadUrl = function(fragment, e) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment, e);
          return true;
        } else {
          return false;
        }
      });
    };

    History.prototype.navigate = function(fragment, options) {
      var method, state, title, url;
      if (!History.started) {
        return false;
      }
      fragment = this.getFragment(fragment || '');
      url = this.root + fragment;
      fragment = fragment.replace(this.pathStripper, '');
      if (this.fragment === fragment) {
        return;
      }
      this.fragment = fragment;
      if (fragment === '' && url !== '/') {
        url = url.slice(0, -1);
      }
      if (this._hasPushState) {
        method = options.replace ? 'replaceState' : 'pushState';
        state = {};
        if (options.state != null) {
          state = options.state;
        }
        title = '';
        if (options.title != null) {
          title = options.title;
        }
        this.history[method](state, title, url);
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) {
        return this.loadUrl(fragment, null);
      }
    };

    History.prototype._updateHash = function(location, fragment, replace) {
      var href;
      if (replace) {
        href = location.href.replace(/(javascript:|#).*$/, '');
        return location.replace("" + href + "#" + fragment);
      } else {
        return location.hash = "#" + fragment;
      }
    };

    return History;

  })(Base);

  window.Sweet = Sweet = {
    View: View,
    Router: Router,
    Model: Model,
    Base: Base
  };

  Sweet.history = new History;

}).call(this);
