import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import * as React from 'react';
import { tupleNum } from '../_util/type';
import warning from '../_util/warning';
import Base from './Base';
var TITLE_ELE_LIST = tupleNum(1, 2, 3, 4, 5);
var Title = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$level = props.level,
    level = _props$level === void 0 ? 1 : _props$level,
    restProps = __rest(props, ["level"]);
  var component;
  if (TITLE_ELE_LIST.includes(level)) {
    component = "h".concat(level);
  } else {
    process.env.NODE_ENV !== "production" ? warning(false, 'Typography.Title', 'Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version.') : void 0;
    component = 'h1';
  }
  return /*#__PURE__*/React.createElement(Base, _extends({
    ref: ref
  }, restProps, {
    component: component
  }));
});
export default Title;