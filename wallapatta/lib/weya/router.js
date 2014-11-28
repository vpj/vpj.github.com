(function() {
  var History, Router, Weya,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (this.Weya == null) {
    this.Weya = {};
  }

  Weya = this.Weya;

  if (typeof exports !== "undefined" && exports !== null) {
    Weya = require('./weya');
    Weya.Base = require('./weya_base');
  }

  if (Weya.Base == null) {
    throw new Error('Weya.Base not found');
  }

  Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
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
      Weya.history.start(options);
      fragment = Weya.history.getFragment();
      if ((options != null ? options.silent : void 0) === true) {
        return this._history.push({
          fragment: fragment,
          title: document.title
        });
      }
    };

    Router.prototype.back = function() {
      if (this._history.length > 1) {
        return Weya.history.back();
      }
    };

    Router.prototype.canBack = function() {
      if (this._history.length > 1 && Weya.history.canBack()) {
        return true;
      } else {
        return false;
      }
    };

    Router.prototype.route = function(route, name) {
      if (!_.isRegExp(route)) {
        route = this._routeToRegExp(route);
      }
      return Weya.history.route(route, (function(_this) {
        return function(fragment, event) {
          var args, callback, callbacks, _i, _len, _ref, _results;
          args = _this._extractParameters(route, fragment);
          _this._event = event;
          if (((_ref = _this._event) != null ? _ref.type : void 0) === "popstate") {
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
            if ((typeof callback) === 'string') {
              callback = _this[callback];
            }
            if (!callback.apply(_this, args)) {
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this));
    };

    Router.prototype.getState = function() {
      var _ref, _ref1;
      if (((_ref = this._event) != null ? (_ref1 = _ref.originalEvent) != null ? _ref1.state : void 0 : void 0) != null) {
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
      return Weya.history.navigate(fragment, options);
    };

    Router.prototype._bindRoutes = function() {
      var name, route, _ref, _results;
      _ref = this._routes;
      _results = [];
      for (route in _ref) {
        name = _ref[route];
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

  })(Weya.Base);

  History = (function(_super) {
    __extends(History, _super);

    function History() {
      return History.__super__.constructor.apply(this, arguments);
    }

    History.prototype.routeStripper = /^[#\/]|\s+$/g;

    History.prototype.rootStripper = /^\/+|\/+$/g;

    History.prototype.trailingSlash = /\/$/;

    History.prototype.pathStripper = /[?#].*$/;

    History.initialize(function() {
      this.handlers = [];
      _.bindAll(this, 'checkUrl');
      this.history = window.history;
      this.location = window.location;
      return this.stateList = [];
    });

    History.prototype.interval = 50;

    History.prototype.getHash = function() {
      var match;
      match = this.location.href.match(/#(.*)$/);
      return (match != null ? match[1] : '');
    };

    History.prototype.getEmulateState = function() {
      if (this.stateList.length > 0) {
        return this.stateList[this.stateList.length - 1];
      } else {
        return {
          fragment: ""
        };
      }
    };

    History.prototype.popEmulateState = function() {
      return this.stateList.pop();
    };

    History.prototype.pushEmulateState = function(state, title, fragment) {
      return this.stateList.push({
        state: state,
        title: title,
        fragment: fragment
      });
    };

    History.prototype.getFragment = function(fragment, forcePushState) {
      var root;
      if (fragment == null) {
        if (this._emulateState) {
          fragment = this.getEmulateState().fragment;
        } else if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          root = this.root.replace(this.trailingSlash, '');
          if ((fragment.indexOf(root)) === 0) {
            fragment = fragment.slice(root.length);
          }
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(this.routeStripper, '');
    };

    History.prototype.back = function() {
      var _ref;
      if (this._emulateState === true) {
        this.popEmulateState();
        return this.loadUrl(null, null);
      } else {
        return (_ref = this.history) != null ? typeof _ref.back === "function" ? _ref.back() : void 0 : void 0;
      }
    };

    History.prototype.canBack = function() {
      var _ref;
      if (this._emulateState === true) {
        return this.stateList.length > 1;
      } else {
        return ((_ref = this.history) != null ? _ref.back : void 0) != null;
      }
    };

    History.prototype.start = function(options) {
      var _ref;
      History.started = true;
      this.options = _.extend({
        root: '/'
      }, this.options, options);
      this.root = this.options.root;
      this._emulateState = this.options.emulateState === true;
      this._wantsHashChange = this._emulateState === false && this.options.hashChange !== false;
      this._wantsPushState = this._emulateState === false && this.options.pushState === true;
      this._hasPushState = this._wantsPushState === true && (((_ref = this.history) != null ? _ref.pushState : void 0) != null);
      if (this._emulateState && (this.options.start != null)) {
        this.pushEmulateState(this.options.start.state, this.options.start.title, this.options.start.fragment);
      }
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
      if (this._emulateState) {
        if (options.replace === true) {
          this.popEmulateState();
        }
        state = {};
        if (options.state != null) {
          state = options.state;
        }
        title = '';
        if (options.title != null) {
          title = options.title;
        }
        this.pushEmulateState(state, title, fragment);
      } else if (this._hasPushState) {
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

  })(Weya.Base);

  Weya.Router = Router;

  Weya.history = new History;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Weya.Router;
  }

}).call(this);
