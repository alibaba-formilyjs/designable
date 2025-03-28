import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { ConfigContext } from '../../config-provider';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import defaultLocale from '../../locale/default';
import ConfirmDialog from '../ConfirmDialog';
var HookModal = function HookModal(_ref, ref) {
  var afterClose = _ref.afterClose,
    config = _ref.config;
  var _React$useState = React.useState(true),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    open = _React$useState2[0],
    setOpen = _React$useState2[1];
  var _React$useState3 = React.useState(config),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    innerConfig = _React$useState4[0],
    setInnerConfig = _React$useState4[1];
  var _React$useContext = React.useContext(ConfigContext),
    direction = _React$useContext.direction,
    getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls('modal');
  var rootPrefixCls = getPrefixCls();
  var close = function close() {
    setOpen(false);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var triggerCancel = args.some(function (param) {
      return param && param.triggerCancel;
    });
    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel.apply(innerConfig, [function () {}].concat(_toConsumableArray(args.slice(1))));
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      destroy: close,
      update: function update(newConfig) {
        setInnerConfig(function (originConfig) {
          return _extends(_extends({}, originConfig), newConfig);
        });
      }
    };
  });
  return /*#__PURE__*/React.createElement(LocaleReceiver, {
    componentName: "Modal",
    defaultLocale: defaultLocale.Modal
  }, function (contextLocale) {
    return /*#__PURE__*/React.createElement(ConfirmDialog, _extends({
      prefixCls: prefixCls,
      rootPrefixCls: rootPrefixCls
    }, innerConfig, {
      close: close,
      open: open,
      afterClose: afterClose,
      okText: innerConfig.okText || (innerConfig.okCancel ? contextLocale.okText : contextLocale.justOkText),
      direction: direction,
      cancelText: innerConfig.cancelText || contextLocale.cancelText
    }));
  });
};
export default /*#__PURE__*/React.forwardRef(HookModal);