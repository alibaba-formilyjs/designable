import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import * as React from 'react';
import warning from '../_util/warning';
import Base from './Base';
var Link = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var ellipsis = _a.ellipsis,
    rel = _a.rel,
    restProps = __rest(_a, ["ellipsis", "rel"]);
  process.env.NODE_ENV !== "production" ? warning(_typeof(ellipsis) !== 'object', 'Typography.Link', '`ellipsis` only supports boolean value.') : void 0;
  var mergedProps = _extends(_extends({}, restProps), {
    rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel
  });
  // @ts-expect-error: https://github.com/ant-design/ant-design/issues/26622
  delete mergedProps.navigate;
  return /*#__PURE__*/React.createElement(Base, _extends({}, mergedProps, {
    ref: ref,
    ellipsis: !!ellipsis,
    component: "a"
  }));
});
export default Link;