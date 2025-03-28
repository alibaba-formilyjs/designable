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
import DatePicker from '../date-picker';
import warning from '../_util/warning';
var InternalTimePicker = DatePicker.TimePicker,
  InternalRangePicker = DatePicker.RangePicker;
var RangePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var dropdownClassName = props.dropdownClassName,
    popupClassName = props.popupClassName;
  return /*#__PURE__*/React.createElement(InternalRangePicker, _extends({}, props, {
    dropdownClassName: dropdownClassName,
    popupClassName: popupClassName,
    picker: "time",
    mode: undefined,
    ref: ref
  }));
});
var TimePicker = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var addon = _a.addon,
    renderExtraFooter = _a.renderExtraFooter,
    popupClassName = _a.popupClassName,
    dropdownClassName = _a.dropdownClassName,
    restProps = __rest(_a, ["addon", "renderExtraFooter", "popupClassName", "dropdownClassName"]);
  var internalRenderExtraFooter = React.useMemo(function () {
    if (renderExtraFooter) {
      return renderExtraFooter;
    }
    if (addon) {
      process.env.NODE_ENV !== "production" ? warning(false, 'TimePicker', '`addon` is deprecated. Please use `renderExtraFooter` instead.') : void 0;
      return addon;
    }
    return undefined;
  }, [addon, renderExtraFooter]);
  return /*#__PURE__*/React.createElement(InternalTimePicker, _extends({
    dropdownClassName: dropdownClassName,
    popupClassName: popupClassName
  }, restProps, {
    mode: undefined,
    ref: ref,
    renderExtraFooter: internalRenderExtraFooter
  }));
});
if (process.env.NODE_ENV !== 'production') {
  TimePicker.displayName = 'TimePicker';
}
TimePicker.RangePicker = RangePicker;
export default TimePicker;