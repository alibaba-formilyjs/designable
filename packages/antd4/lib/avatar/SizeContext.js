"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SizeContextProvider = void 0;
var React = _interopRequireWildcard(require("react"));
var SizeContext = /*#__PURE__*/React.createContext('default');
var SizeContextProvider = exports.SizeContextProvider = function SizeContextProvider(_ref) {
  var children = _ref.children,
    size = _ref.size;
  return /*#__PURE__*/React.createElement(SizeContext.Consumer, null, function (originSize) {
    return /*#__PURE__*/React.createElement(SizeContext.Provider, {
      value: size || originSize
    }, children);
  });
};
var _default = exports["default"] = SizeContext;