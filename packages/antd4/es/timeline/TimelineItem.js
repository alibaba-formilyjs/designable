import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
var TimelineItem = function TimelineItem(_a) {
  var customizePrefixCls = _a.prefixCls,
    className = _a.className,
    _a$color = _a.color,
    color = _a$color === void 0 ? 'blue' : _a$color,
    dot = _a.dot,
    _a$pending = _a.pending,
    pending = _a$pending === void 0 ? false : _a$pending,
    position = _a.position,
    label = _a.label,
    children = _a.children,
    restProps = __rest(_a, ["prefixCls", "className", "color", "dot", "pending", "position", "label", "children"]);
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls('timeline', customizePrefixCls);
  var itemClassName = classNames(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-item"), true), "".concat(prefixCls, "-item-pending"), pending), className);
  var dotClassName = classNames(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-item-head"), true), "".concat(prefixCls, "-item-head-custom"), !!dot), "".concat(prefixCls, "-item-head-").concat(color), true));
  var customColor = /blue|red|green|gray/.test(color || '') ? undefined : color;
  return /*#__PURE__*/React.createElement("li", _extends({}, restProps, {
    className: itemClassName
  }), label && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-label")
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-tail")
  }), /*#__PURE__*/React.createElement("div", {
    className: dotClassName,
    style: {
      borderColor: customColor,
      color: customColor
    }
  }, dot), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-item-content")
  }, children));
};
export default TimelineItem;