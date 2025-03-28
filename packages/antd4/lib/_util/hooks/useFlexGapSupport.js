"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _styleChecker = require("../styleChecker");
var _default = exports["default"] = function _default() {
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    flexible = _React$useState2[0],
    setFlexible = _React$useState2[1];
  React.useEffect(function () {
    setFlexible((0, _styleChecker.detectFlexGapSupported)());
  }, []);
  return flexible;
};