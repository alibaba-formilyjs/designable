"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
/* eslint-disable jsx-a11y/heading-has-content */

var Title = function Title(_ref) {
  var prefixCls = _ref.prefixCls,
    className = _ref.className,
    width = _ref.width,
    style = _ref.style;
  return /*#__PURE__*/React.createElement("h3", {
    className: (0, _classnames["default"])(prefixCls, className),
    style: (0, _extends2["default"])({
      width: width
    }, style)
  });
};
var _default = exports["default"] = Title;