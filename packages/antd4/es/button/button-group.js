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
import warning from '../_util/warning';
export var GroupSizeContext = /*#__PURE__*/React.createContext(undefined);
var ButtonGroup = function ButtonGroup(props) {
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls,
    size = props.size,
    className = props.className,
    others = __rest(props, ["prefixCls", "size", "className"]);
  var prefixCls = getPrefixCls('btn-group', customizePrefixCls);
  // large => lg
  // small => sm
  var sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    case 'middle':
    case undefined:
      break;
    default:
      process.env.NODE_ENV !== "production" ? warning(!size, 'Button.Group', 'Invalid prop `size`.') : void 0;
  }
  var classes = classNames(prefixCls, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-").concat(sizeCls), sizeCls), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement(GroupSizeContext.Provider, {
    value: size
  }, /*#__PURE__*/React.createElement("div", _extends({}, others, {
    className: classes
  })));
};
export default ButtonGroup;