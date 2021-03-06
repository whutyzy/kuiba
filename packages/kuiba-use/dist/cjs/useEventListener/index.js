"use strict";

exports.__esModule = true;
exports.supportsPassive = void 0;
exports.useEventListener = useEventListener;

var _vue = require("vue");

var _onMountedOrActivated = require("../onMountedOrActivated");

var _utils = require("../utils");

// eslint-disable-next-line
var supportsPassive = false;
exports.supportsPassive = supportsPassive;

if (_utils.inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        exports.supportsPassive = supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts); // eslint-disable-next-line no-empty
  } catch (e) {}
}

function useEventListener(type, listener, options) {
  if (options === void 0) {
    options = {};
  }

  if (!_utils.inBrowser) return;
  var _options = options,
      _options$target = _options.target,
      target = _options$target === void 0 ? window : _options$target,
      _options$passive = _options.passive,
      passive = _options$passive === void 0 ? false : _options$passive,
      _options$capture = _options.capture,
      capture = _options$capture === void 0 ? false : _options$capture;
  var attached;

  var add = function add(target) {
    var element = (0, _vue.unref)(target);

    if (element && !attached) {
      element.addEventListener(type, listener, supportsPassive ? {
        capture: capture,
        passive: passive
      } : capture);
      attached = true;
    }
  };

  var remove = function remove(target) {
    var element = (0, _vue.unref)(target);

    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };

  (0, _vue.onUnmounted)(function () {
    return remove(target);
  });
  (0, _onMountedOrActivated.onMountedOrActivated)(function () {
    return add(target);
  });

  if ((0, _vue.isRef)(target)) {
    (0, _vue.watch)(target, function (val, oldVal) {
      remove(oldVal);
      add(val);
    });
  }
}