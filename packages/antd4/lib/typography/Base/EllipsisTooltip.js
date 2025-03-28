"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _tooltip = _interopRequireDefault(require("../../tooltip"));
var EllipsisTooltip = function EllipsisTooltip(_ref) {
  var enabledEllipsis = _ref.enabledEllipsis,
    isEllipsis = _ref.isEllipsis,
    children = _ref.children,
    tooltipProps = _ref.tooltipProps;
  if (!(tooltipProps === null || tooltipProps === void 0 ? void 0 : tooltipProps.title) || !enabledEllipsis) {
    return children;
  }
  return /*#__PURE__*/React.createElement(_tooltip["default"], (0, _extends2["default"])({
    open: isEllipsis ? undefined : false
  }, tooltipProps), children);
};
if (process.env.NODE_ENV !== 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}
var _default = exports["default"] = EllipsisTooltip;