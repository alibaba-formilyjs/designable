"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useFrameState;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _raf = _interopRequireDefault(require("rc-util/lib/raf"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
function useFrameState(defaultValue) {
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  var frameRef = (0, _react.useRef)(null);
  var batchRef = (0, _react.useRef)([]);
  var destroyRef = (0, _react.useRef)(false);
  React.useEffect(function () {
    destroyRef.current = false;
    return function () {
      destroyRef.current = true;
      _raf["default"].cancel(frameRef.current);
      frameRef.current = null;
    };
  }, []);
  function setFrameValue(updater) {
    if (destroyRef.current) {
      return;
    }
    if (frameRef.current === null) {
      batchRef.current = [];
      frameRef.current = (0, _raf["default"])(function () {
        frameRef.current = null;
        setValue(function (prevValue) {
          var current = prevValue;
          batchRef.current.forEach(function (func) {
            current = func(current);
          });
          return current;
        });
      });
    }
    batchRef.current.push(updater);
  }
  return [value, setFrameValue];
}