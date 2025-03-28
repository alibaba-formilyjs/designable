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
import omit from "rc-util/es/omit";
import * as React from 'react';
import warning from '../_util/warning';
import Base from './Base';
var Text = function Text(_a, ref) {
  var ellipsis = _a.ellipsis,
    restProps = __rest(_a, ["ellipsis"]);
  var mergedEllipsis = React.useMemo(function () {
    if (ellipsis && _typeof(ellipsis) === 'object') {
      return omit(ellipsis, ['expandable', 'rows']);
    }
    return ellipsis;
  }, [ellipsis]);
  process.env.NODE_ENV !== "production" ? warning(_typeof(ellipsis) !== 'object' || !ellipsis || !('expandable' in ellipsis) && !('rows' in ellipsis), 'Typography.Text', '`ellipsis` do not support `expandable` or `rows` props.') : void 0;
  return /*#__PURE__*/React.createElement(Base, _extends({
    ref: ref
  }, restProps, {
    ellipsis: mergedEllipsis,
    component: "span"
  }));
};
export default /*#__PURE__*/React.forwardRef(Text);