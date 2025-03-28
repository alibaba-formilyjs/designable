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
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import classNames from 'classnames';
import RcSwitch from 'rc-switch';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import warning from '../_util/warning';
import Wave from '../_util/wave';
var Switch = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var customizePrefixCls = _a.prefixCls,
    customizeSize = _a.size,
    customDisabled = _a.disabled,
    loading = _a.loading,
    _a$className = _a.className,
    className = _a$className === void 0 ? '' : _a$className,
    props = __rest(_a, ["prefixCls", "size", "disabled", "loading", "className"]);
  process.env.NODE_ENV !== "production" ? warning('checked' in props || !('value' in props), 'Switch', '`value` is not a valid prop, do you mean `checked`?') : void 0;
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var size = React.useContext(SizeContext);
  // ===================== Disabled =====================
  var disabled = React.useContext(DisabledContext);
  var mergedDisabled = (customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled) || loading;
  var prefixCls = getPrefixCls('switch', customizePrefixCls);
  var loadingIcon = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-handle")
  }, loading && /*#__PURE__*/React.createElement(LoadingOutlined, {
    className: "".concat(prefixCls, "-loading-icon")
  }));
  var classes = classNames(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-small"), (customizeSize || size) === 'small'), "".concat(prefixCls, "-loading"), loading), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement(Wave, {
    insertExtraNode: true
  }, /*#__PURE__*/React.createElement(RcSwitch, _extends({}, props, {
    prefixCls: prefixCls,
    className: classes,
    disabled: mergedDisabled,
    ref: ref,
    loadingIcon: loadingIcon
  })));
});
Switch.__ANT_SWITCH = true;
if (process.env.NODE_ENV !== 'production') {
  Switch.displayName = 'Switch';
}
export default Switch;