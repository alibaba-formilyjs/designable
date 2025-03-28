import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import classNames from 'classnames';
import RcSegmented from 'rc-segmented';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
function isSegmentedLabeledOptionWithIcon(option) {
  return _typeof(option) === 'object' && !!(option === null || option === void 0 ? void 0 : option.icon);
}
var Segmented = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    block = props.block,
    _props$options = props.options,
    options = _props$options === void 0 ? [] : _props$options,
    _props$size = props.size,
    customSize = _props$size === void 0 ? 'middle' : _props$size,
    restProps = __rest(props, ["prefixCls", "className", "block", "options", "size"]);
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var prefixCls = getPrefixCls('segmented', customizePrefixCls);
  // ===================== Size =====================
  var size = React.useContext(SizeContext);
  var mergedSize = customSize || size;
  // syntactic sugar to support `icon` for Segmented Item
  var extendedOptions = React.useMemo(function () {
    return options.map(function (option) {
      if (isSegmentedLabeledOptionWithIcon(option)) {
        var icon = option.icon,
          label = option.label,
          restOption = __rest(option, ["icon", "label"]);
        return _extends(_extends({}, restOption), {
          label: ( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-item-icon")
          }, icon), label && /*#__PURE__*/React.createElement("span", null, label)))
        });
      }
      return option;
    });
  }, [options, prefixCls]);
  return /*#__PURE__*/React.createElement(RcSegmented, _extends({}, restProps, {
    className: classNames(className, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-block"), block), "".concat(prefixCls, "-sm"), mergedSize === 'small'), "".concat(prefixCls, "-lg"), mergedSize === 'large')),
    options: extendedOptions,
    ref: ref,
    prefixCls: prefixCls,
    direction: direction
  }));
});
if (process.env.NODE_ENV !== 'production') {
  Segmented.displayName = 'Segmented';
}
export default Segmented;