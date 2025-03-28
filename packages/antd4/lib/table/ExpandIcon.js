"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
function renderExpandIcon(locale) {
  return function expandIcon(_ref) {
    var prefixCls = _ref.prefixCls,
      onExpand = _ref.onExpand,
      record = _ref.record,
      expanded = _ref.expanded,
      expandable = _ref.expandable;
    var iconPrefix = "".concat(prefixCls, "-row-expand-icon");
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick(e) {
        onExpand(record, e);
        e.stopPropagation();
      },
      className: (0, _classnames["default"])(iconPrefix, (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(iconPrefix, "-spaced"), !expandable), "".concat(iconPrefix, "-expanded"), expandable && expanded), "".concat(iconPrefix, "-collapsed"), expandable && !expanded)),
      "aria-label": expanded ? locale.collapse : locale.expand,
      "aria-expanded": expanded
    });
  };
}
var _default = exports["default"] = renderExpandIcon;