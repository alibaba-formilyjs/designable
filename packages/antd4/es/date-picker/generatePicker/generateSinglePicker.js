import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CalendarOutlined from "@ant-design/icons/es/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/es/icons/ClockCircleOutlined";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import classNames from 'classnames';
import RCPicker from 'rc-picker';
import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import { useCompactItemContext } from '../../space/Compact';
import { Components, getTimeProps } from '.';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import SizeContext from '../../config-provider/SizeContext';
import { FormItemInputContext } from '../../form/context';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import warning from '../../_util/warning';
import enUS from '../locale/en_US';
import { getPlaceholder, transPlacement2DropdownAlign } from '../util';
export default function generatePicker(generateConfig) {
  function getPicker(picker, displayName) {
    var Picker = /*#__PURE__*/forwardRef(function (props, ref) {
      var customizePrefixCls = props.prefixCls,
        customizeGetPopupContainer = props.getPopupContainer,
        className = props.className,
        customizeSize = props.size,
        _props$bordered = props.bordered,
        bordered = _props$bordered === void 0 ? true : _props$bordered,
        placement = props.placement,
        placeholder = props.placeholder,
        popupClassName = props.popupClassName,
        dropdownClassName = props.dropdownClassName,
        customDisabled = props.disabled,
        customStatus = props.status,
        restProps = __rest(props, ["prefixCls", "getPopupContainer", "className", "size", "bordered", "placement", "placeholder", "popupClassName", "dropdownClassName", "disabled", "status"]);
      var _useContext = useContext(ConfigContext),
        getPrefixCls = _useContext.getPrefixCls,
        direction = _useContext.direction,
        getPopupContainer = _useContext.getPopupContainer;
      var prefixCls = getPrefixCls('picker', customizePrefixCls);
      var _useCompactItemContex = useCompactItemContext(prefixCls, direction),
        compactSize = _useCompactItemContex.compactSize,
        compactItemClassnames = _useCompactItemContex.compactItemClassnames;
      var innerRef = React.useRef(null);
      var format = props.format,
        showTime = props.showTime;
      useImperativeHandle(ref, function () {
        return {
          focus: function focus() {
            var _a;
            return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
          },
          blur: function blur() {
            var _a;
            return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.blur();
          }
        };
      });
      var additionalProps = {
        showToday: true
      };
      var additionalOverrideProps = {};
      if (picker) {
        additionalOverrideProps.picker = picker;
      }
      var mergedPicker = picker || props.picker;
      additionalOverrideProps = _extends(_extends(_extends({}, additionalOverrideProps), showTime ? getTimeProps(_extends({
        format: format,
        picker: mergedPicker
      }, showTime)) : {}), mergedPicker === 'time' ? getTimeProps(_extends(_extends({
        format: format
      }, props), {
        picker: mergedPicker
      })) : {});
      var rootPrefixCls = getPrefixCls();
      // =================== Warning =====================
      process.env.NODE_ENV !== "production" ? warning(picker !== 'quarter', displayName, "DatePicker.".concat(displayName, " is legacy usage. Please use DatePicker[picker='").concat(picker, "'] directly.")) : void 0;
      process.env.NODE_ENV !== "production" ? warning(!dropdownClassName, mergedPicker === 'time' ? 'TimePicker' : 'DatePicker', '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.') : void 0;
      // ===================== Size =====================
      var size = React.useContext(SizeContext);
      var mergedSize = compactSize || customizeSize || size;
      // ===================== Disabled =====================
      var disabled = React.useContext(DisabledContext);
      var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
      // ===================== FormItemInput =====================
      var formItemContext = useContext(FormItemInputContext);
      var hasFeedback = formItemContext.hasFeedback,
        contextStatus = formItemContext.status,
        feedbackIcon = formItemContext.feedbackIcon;
      var suffixNode = /*#__PURE__*/React.createElement(React.Fragment, null, mergedPicker === 'time' ? /*#__PURE__*/React.createElement(ClockCircleOutlined, null) : /*#__PURE__*/React.createElement(CalendarOutlined, null), hasFeedback && feedbackIcon);
      return /*#__PURE__*/React.createElement(LocaleReceiver, {
        componentName: "DatePicker",
        defaultLocale: enUS
      }, function (contextLocale) {
        var locale = _extends(_extends({}, contextLocale), props.locale);
        return /*#__PURE__*/React.createElement(RCPicker, _extends({
          ref: innerRef,
          placeholder: getPlaceholder(mergedPicker, locale, placeholder),
          suffixIcon: suffixNode,
          dropdownAlign: transPlacement2DropdownAlign(direction, placement),
          clearIcon: /*#__PURE__*/React.createElement(CloseCircleFilled, null),
          prevIcon: /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-prev-icon")
          }),
          nextIcon: /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-next-icon")
          }),
          superPrevIcon: /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-super-prev-icon")
          }),
          superNextIcon: /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-super-next-icon")
          }),
          allowClear: true,
          transitionName: "".concat(rootPrefixCls, "-slide-up")
        }, additionalProps, restProps, additionalOverrideProps, {
          locale: locale.lang,
          className: classNames(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-").concat(mergedSize), mergedSize), "".concat(prefixCls, "-borderless"), !bordered), getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), compactItemClassnames, className),
          prefixCls: prefixCls,
          getPopupContainer: customizeGetPopupContainer || getPopupContainer,
          generateConfig: generateConfig,
          components: Components,
          direction: direction,
          disabled: mergedDisabled,
          dropdownClassName: popupClassName || dropdownClassName
        }));
      });
    });
    if (displayName) {
      Picker.displayName = displayName;
    }
    return Picker;
  }
  var DatePicker = getPicker();
  var WeekPicker = getPicker('week', 'WeekPicker');
  var MonthPicker = getPicker('month', 'MonthPicker');
  var YearPicker = getPicker('year', 'YearPicker');
  var TimePicker = getPicker('time', 'TimePicker');
  var QuarterPicker = getPicker('quarter', 'QuarterPicker');
  return {
    DatePicker: DatePicker,
    WeekPicker: WeekPicker,
    MonthPicker: MonthPicker,
    YearPicker: YearPicker,
    TimePicker: TimePicker,
    QuarterPicker: QuarterPicker
  };
}