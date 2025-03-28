"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
/** Similar with `useEffect` but only trigger after mounted */
var useUpdatedEffect = function useUpdatedEffect(callback, conditions) {
  var mountRef = React.useRef(false);
  React.useEffect(function () {
    if (mountRef.current) {
      callback();
    } else {
      mountRef.current = true;
    }
  }, conditions);
};
var _default = exports["default"] = useUpdatedEffect;