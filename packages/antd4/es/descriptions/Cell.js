import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import classNames from 'classnames';
import * as React from 'react';
function notEmpty(val) {
  return val !== undefined && val !== null;
}
var Cell = function Cell(_ref) {
  var itemPrefixCls = _ref.itemPrefixCls,
    component = _ref.component,
    span = _ref.span,
    className = _ref.className,
    style = _ref.style,
    labelStyle = _ref.labelStyle,
    contentStyle = _ref.contentStyle,
    bordered = _ref.bordered,
    label = _ref.label,
    content = _ref.content,
    colon = _ref.colon;
  var Component = component;
  if (bordered) {
    return /*#__PURE__*/React.createElement(Component, {
      className: classNames(_defineProperty(_defineProperty({}, "".concat(itemPrefixCls, "-item-label"), notEmpty(label)), "".concat(itemPrefixCls, "-item-content"), notEmpty(content)), className),
      style: style,
      colSpan: span
    }, notEmpty(label) && /*#__PURE__*/React.createElement("span", {
      style: labelStyle
    }, label), notEmpty(content) && /*#__PURE__*/React.createElement("span", {
      style: contentStyle
    }, content));
  }
  return /*#__PURE__*/React.createElement(Component, {
    className: classNames("".concat(itemPrefixCls, "-item"), className),
    style: style,
    colSpan: span
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(itemPrefixCls, "-item-container")
  }, (label || label === 0) && ( /*#__PURE__*/React.createElement("span", {
    className: classNames("".concat(itemPrefixCls, "-item-label"), _defineProperty({}, "".concat(itemPrefixCls, "-item-no-colon"), !colon)),
    style: labelStyle
  }, label)), (content || content === 0) && ( /*#__PURE__*/React.createElement("span", {
    className: classNames("".concat(itemPrefixCls, "-item-content")),
    style: contentStyle
  }, content))));
};
export default Cell;