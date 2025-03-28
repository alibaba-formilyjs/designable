import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import ActionButton from '../_util/ActionButton';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { ConfigContext } from '../config-provider';
export var Overlay = function Overlay(props) {
  var prefixCls = props.prefixCls,
    okButtonProps = props.okButtonProps,
    cancelButtonProps = props.cancelButtonProps,
    title = props.title,
    cancelText = props.cancelText,
    okText = props.okText,
    okType = props.okType,
    icon = props.icon,
    _props$showCancel = props.showCancel,
    showCancel = _props$showCancel === void 0 ? true : _props$showCancel,
    close = props.close,
    onConfirm = props.onConfirm,
    onCancel = props.onCancel;
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  return /*#__PURE__*/React.createElement(LocaleReceiver, {
    componentName: "Popconfirm",
    defaultLocale: defaultLocale.Popconfirm
  }, function (contextLocale) {
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-inner-content")
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-message")
    }, icon && /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-message-icon")
    }, icon), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-message-title")
    }, getRenderPropValue(title))), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-buttons")
    }, showCancel && ( /*#__PURE__*/React.createElement(Button, _extends({
      onClick: onCancel,
      size: "small"
    }, cancelButtonProps), cancelText !== null && cancelText !== void 0 ? cancelText : contextLocale.cancelText)), /*#__PURE__*/React.createElement(ActionButton, {
      buttonProps: _extends(_extends({
        size: 'small'
      }, convertLegacyProps(okType)), okButtonProps),
      actionFn: onConfirm,
      close: close,
      prefixCls: getPrefixCls('btn'),
      quitOnNullishReturnValue: true,
      emitEvent: true
    }, okText !== null && okText !== void 0 ? okText : contextLocale.okText)));
  });
};