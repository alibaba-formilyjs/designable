"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../../config-provider");
var _LocaleReceiver = _interopRequireDefault(require("../../locale-provider/LocaleReceiver"));
var _default2 = _interopRequireDefault(require("../../locale/default"));
var _ConfirmDialog = _interopRequireDefault(require("../ConfirmDialog"));
var HookModal = function HookModal(_ref, ref) {
  var afterClose = _ref.afterClose,
    config = _ref.config;
  var _React$useState = React.useState(true),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    open = _React$useState2[0],
    setOpen = _React$useState2[1];
  var _React$useState3 = React.useState(config),
    _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
    innerConfig = _React$useState4[0],
    setInnerConfig = _React$useState4[1];
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
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
      innerConfig.onCancel.apply(innerConfig, [function () {}].concat((0, _toConsumableArray2["default"])(args.slice(1))));
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      destroy: close,
      update: function update(newConfig) {
        setInnerConfig(function (originConfig) {
          return (0, _extends2["default"])((0, _extends2["default"])({}, originConfig), newConfig);
        });
      }
    };
  });
  return /*#__PURE__*/React.createElement(_LocaleReceiver["default"], {
    componentName: "Modal",
    defaultLocale: _default2["default"].Modal
  }, function (contextLocale) {
    return /*#__PURE__*/React.createElement(_ConfirmDialog["default"], (0, _extends2["default"])({
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
var _default = exports["default"] = /*#__PURE__*/React.forwardRef(HookModal);