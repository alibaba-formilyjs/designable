import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import classNames from 'classnames';
import CSSMotion, { CSSMotionList } from 'rc-motion';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import collapseMotion from '../_util/motion';
import { FormItemPrefixContext } from './context';
import useDebounce from './hooks/useDebounce';
var EMPTY_LIST = [];
function toErrorEntity(error, errorStatus, prefix) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return {
    key: typeof error === 'string' ? error : "".concat(prefix, "-").concat(index),
    error: error,
    errorStatus: errorStatus
  };
}
export default function ErrorList(_ref) {
  var help = _ref.help,
    helpStatus = _ref.helpStatus,
    _ref$errors = _ref.errors,
    errors = _ref$errors === void 0 ? EMPTY_LIST : _ref$errors,
    _ref$warnings = _ref.warnings,
    warnings = _ref$warnings === void 0 ? EMPTY_LIST : _ref$warnings,
    rootClassName = _ref.className,
    fieldId = _ref.fieldId,
    onVisibleChanged = _ref.onVisibleChanged;
  var _React$useContext = React.useContext(FormItemPrefixContext),
    prefixCls = _React$useContext.prefixCls;
  var _React$useContext2 = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext2.getPrefixCls;
  var baseClassName = "".concat(prefixCls, "-item-explain");
  var rootPrefixCls = getPrefixCls();
  // We have to debounce here again since somewhere use ErrorList directly still need no shaking
  // ref: https://github.com/ant-design/ant-design/issues/36336
  var debounceErrors = useDebounce(errors);
  var debounceWarnings = useDebounce(warnings);
  var fullKeyList = React.useMemo(function () {
    if (help !== undefined && help !== null) {
      return [toErrorEntity(help, helpStatus, 'help')];
    }
    return [].concat(_toConsumableArray(debounceErrors.map(function (error, index) {
      return toErrorEntity(error, 'error', 'error', index);
    })), _toConsumableArray(debounceWarnings.map(function (warning, index) {
      return toErrorEntity(warning, 'warning', 'warning', index);
    })));
  }, [help, helpStatus, debounceErrors, debounceWarnings]);
  var helpProps = {};
  if (fieldId) {
    helpProps.id = "".concat(fieldId, "_help");
  }
  return /*#__PURE__*/React.createElement(CSSMotion, {
    motionDeadline: collapseMotion.motionDeadline,
    motionName: "".concat(rootPrefixCls, "-show-help"),
    visible: !!fullKeyList.length,
    onVisibleChanged: onVisibleChanged
  }, function (holderProps) {
    var holderClassName = holderProps.className,
      holderStyle = holderProps.style;
    return /*#__PURE__*/React.createElement("div", _extends({}, helpProps, {
      className: classNames(baseClassName, holderClassName, rootClassName),
      style: holderStyle,
      role: "alert"
    }), /*#__PURE__*/React.createElement(CSSMotionList, _extends({
      keys: fullKeyList
    }, collapseMotion, {
      motionName: "".concat(rootPrefixCls, "-show-help-item"),
      component: false
    }), function (itemProps) {
      var key = itemProps.key,
        error = itemProps.error,
        errorStatus = itemProps.errorStatus,
        itemClassName = itemProps.className,
        itemStyle = itemProps.style;
      return /*#__PURE__*/React.createElement("div", {
        key: key,
        className: classNames(itemClassName, _defineProperty({}, "".concat(baseClassName, "-").concat(errorStatus), errorStatus)),
        style: itemStyle
      }, error);
    }));
  });
}