import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CheckCircleFilled from "@ant-design/icons/es/icons/CheckCircleFilled";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import ExclamationCircleFilled from "@ant-design/icons/es/icons/ExclamationCircleFilled";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import useLayoutEffect from "rc-util/es/hooks/useLayoutEffect";
import classNames from 'classnames';
import * as React from 'react';
import omit from "rc-util/es/omit";
import { Row } from '../../grid';
import FormItemLabel from '../FormItemLabel';
import FormItemInput from '../FormItemInput';
import { FormContext, FormItemInputContext, NoStyleItemContext } from '../context';
import useDebounce from '../hooks/useDebounce';
var iconMap = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined
};
export default function ItemHolder(props) {
  var prefixCls = props.prefixCls,
    className = props.className,
    style = props.style,
    help = props.help,
    errors = props.errors,
    warnings = props.warnings,
    validateStatus = props.validateStatus,
    meta = props.meta,
    hasFeedback = props.hasFeedback,
    hidden = props.hidden,
    children = props.children,
    fieldId = props.fieldId,
    isRequired = props.isRequired,
    onSubItemMetaChange = props.onSubItemMetaChange,
    restProps = __rest(props, ["prefixCls", "className", "style", "help", "errors", "warnings", "validateStatus", "meta", "hasFeedback", "hidden", "children", "fieldId", "isRequired", "onSubItemMetaChange"]);
  var itemPrefixCls = "".concat(prefixCls, "-item");
  var _React$useContext = React.useContext(FormContext),
    requiredMark = _React$useContext.requiredMark;
  // ======================== Margin ========================
  var itemRef = React.useRef(null);
  var debounceErrors = useDebounce(errors);
  var debounceWarnings = useDebounce(warnings);
  var hasHelp = help !== undefined && help !== null;
  var hasError = !!(hasHelp || errors.length || warnings.length);
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    marginBottom = _React$useState2[0],
    setMarginBottom = _React$useState2[1];
  useLayoutEffect(function () {
    if (hasError && itemRef.current) {
      var itemStyle = getComputedStyle(itemRef.current);
      setMarginBottom(parseInt(itemStyle.marginBottom, 10));
    }
  }, [hasError]);
  var onErrorVisibleChanged = function onErrorVisibleChanged(nextVisible) {
    if (!nextVisible) {
      setMarginBottom(null);
    }
  };
  // ======================== Status ========================
  var mergedValidateStatus = '';
  if (validateStatus !== undefined) {
    mergedValidateStatus = validateStatus;
  } else if (meta.validating) {
    mergedValidateStatus = 'validating';
  } else if (debounceErrors.length) {
    mergedValidateStatus = 'error';
  } else if (debounceWarnings.length) {
    mergedValidateStatus = 'warning';
  } else if (meta.touched) {
    mergedValidateStatus = 'success';
  }
  var formItemStatusContext = React.useMemo(function () {
    var feedbackIcon;
    if (hasFeedback) {
      var IconNode = mergedValidateStatus && iconMap[mergedValidateStatus];
      feedbackIcon = IconNode ? ( /*#__PURE__*/React.createElement("span", {
        className: classNames("".concat(itemPrefixCls, "-feedback-icon"), "".concat(itemPrefixCls, "-feedback-icon-").concat(mergedValidateStatus))
      }, /*#__PURE__*/React.createElement(IconNode, null))) : null;
    }
    return {
      status: mergedValidateStatus,
      hasFeedback: hasFeedback,
      feedbackIcon: feedbackIcon,
      isFormItemInput: true
    };
  }, [mergedValidateStatus, hasFeedback]);
  // ======================== Render ========================
  var itemClassName = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, itemPrefixCls, true), "".concat(itemPrefixCls, "-with-help"), hasHelp || debounceErrors.length || debounceWarnings.length), "".concat(className), !!className), "".concat(itemPrefixCls, "-has-feedback"), mergedValidateStatus && hasFeedback), "".concat(itemPrefixCls, "-has-success"), mergedValidateStatus === 'success'), "".concat(itemPrefixCls, "-has-warning"), mergedValidateStatus === 'warning'), "".concat(itemPrefixCls, "-has-error"), mergedValidateStatus === 'error'), "".concat(itemPrefixCls, "-is-validating"), mergedValidateStatus === 'validating'), "".concat(itemPrefixCls, "-hidden"), hidden);
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(itemClassName),
    style: style,
    ref: itemRef
  }, /*#__PURE__*/React.createElement(Row, _extends({
    className: "".concat(itemPrefixCls, "-row")
  }, omit(restProps, ['_internalItemRender', 'colon', 'dependencies', 'extra', 'fieldKey', 'getValueFromEvent', 'getValueProps', 'htmlFor', 'id', 'initialValue', 'isListField', 'label', 'labelAlign', 'labelCol', 'labelWrap', 'messageVariables', 'name', 'normalize', 'noStyle', 'preserve', 'required', 'requiredMark', 'rules', 'shouldUpdate', 'trigger', 'tooltip', 'validateFirst', 'validateTrigger', 'valuePropName', 'wrapperCol'])), /*#__PURE__*/React.createElement(FormItemLabel, _extends({
    htmlFor: fieldId,
    required: isRequired,
    requiredMark: requiredMark
  }, props, {
    prefixCls: prefixCls
  })), /*#__PURE__*/React.createElement(FormItemInput, _extends({}, props, meta, {
    errors: debounceErrors,
    warnings: debounceWarnings,
    prefixCls: prefixCls,
    status: mergedValidateStatus,
    help: help,
    marginBottom: marginBottom,
    onErrorVisibleChanged: onErrorVisibleChanged
  }), /*#__PURE__*/React.createElement(NoStyleItemContext.Provider, {
    value: onSubItemMetaChange
  }, /*#__PURE__*/React.createElement(FormItemInputContext.Provider, {
    value: formItemStatusContext
  }, children)))), !!marginBottom && ( /*#__PURE__*/React.createElement("div", {
    className: "".concat(itemPrefixCls, "-margin-offset"),
    style: {
      marginBottom: -marginBottom
    }
  })));
}