"use strict";

exports.__esModule = true;

var _useClickAway = require("./useClickAway");

Object.keys(_useClickAway).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useClickAway[key]) return;
  exports[key] = _useClickAway[key];
});

var _useScrollParent = require("./useScrollParent");

Object.keys(_useScrollParent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useScrollParent[key]) return;
  exports[key] = _useScrollParent[key];
});

var _useEventListener = require("./useEventListener");

Object.keys(_useEventListener).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useEventListener[key]) return;
  exports[key] = _useEventListener[key];
});

var _onMountedOrActivated = require("./onMountedOrActivated");

Object.keys(_onMountedOrActivated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _onMountedOrActivated[key]) return;
  exports[key] = _onMountedOrActivated[key];
});