"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = _interopRequireDefault(require("../config-provider"));
var _ActionButton = _interopRequireDefault(require("../_util/ActionButton"));
var _motion = require("../_util/motion");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _Modal = _interopRequireDefault(require("./Modal"));
var ConfirmDialog = function ConfirmDialog(props) {
  var icon = props.icon,
    onCancel = props.onCancel,
    onOk = props.onOk,
    close = props.close,
    zIndex = props.zIndex,
    afterClose = props.afterClose,
    visible = props.visible,
    open = props.open,
    keyboard = props.keyboard,
    centered = props.centered,
    getContainer = props.getContainer,
    maskStyle = props.maskStyle,
    okText = props.okText,
    okButtonProps = props.okButtonProps,
    cancelText = props.cancelText,
    cancelButtonProps = props.cancelButtonProps,
    direction = props.direction,
    prefixCls = props.prefixCls,
    wrapClassName = props.wrapClassName,
    rootPrefixCls = props.rootPrefixCls,
    iconPrefixCls = props.iconPrefixCls,
    bodyStyle = props.bodyStyle,
    _props$closable = props.closable,
    closable = _props$closable === void 0 ? false : _props$closable,
    closeIcon = props.closeIcon,
    modalRender = props.modalRender,
    focusTriggerAfterClose = props.focusTriggerAfterClose;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!(typeof icon === 'string' && icon.length > 2), 'Modal', "`icon` is using ReactNode instead of string naming in v4. Please check `".concat(icon, "` at https://ant.design/components/icon")) : void 0;
    process.env.NODE_ENV !== "production" ? (0, _warning["default"])(visible === undefined, 'Modal', "`visible` is deprecated, please use `open` instead.") : void 0;
  }
  // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
  var okType = props.okType || 'primary';
  var contentPrefixCls = "".concat(prefixCls, "-confirm");
  // 默认为 true，保持向下兼容
  var okCancel = 'okCancel' in props ? props.okCancel : true;
  var width = props.width || 416;
  var style = props.style || {};
  var mask = props.mask === undefined ? true : props.mask;
  // 默认为 false，保持旧版默认行为
  var maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  var autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';
  var classString = (0, _classnames["default"])(contentPrefixCls, "".concat(contentPrefixCls, "-").concat(props.type), (0, _defineProperty2["default"])({}, "".concat(contentPrefixCls, "-rtl"), direction === 'rtl'), props.className);
  var cancelButton = okCancel && ( /*#__PURE__*/React.createElement(_ActionButton["default"], {
    actionFn: onCancel,
    close: close,
    autoFocus: autoFocusButton === 'cancel',
    buttonProps: cancelButtonProps,
    prefixCls: "".concat(rootPrefixCls, "-btn")
  }, cancelText));
  return /*#__PURE__*/React.createElement(_configProvider["default"], {
    prefixCls: rootPrefixCls,
    iconPrefixCls: iconPrefixCls,
    direction: direction
  }, /*#__PURE__*/React.createElement(_Modal["default"], {
    prefixCls: prefixCls,
    className: classString,
    wrapClassName: (0, _classnames["default"])((0, _defineProperty2["default"])({}, "".concat(contentPrefixCls, "-centered"), !!props.centered), wrapClassName),
    onCancel: function onCancel() {
      return close === null || close === void 0 ? void 0 : close({
        triggerCancel: true
      });
    },
    open: open || visible,
    title: "",
    footer: "",
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'fade', props.maskTransitionName),
    mask: mask,
    maskClosable: maskClosable,
    maskStyle: maskStyle,
    style: style,
    bodyStyle: bodyStyle,
    width: width,
    zIndex: zIndex,
    afterClose: afterClose,
    keyboard: keyboard,
    centered: centered,
    getContainer: getContainer,
    closable: closable,
    closeIcon: closeIcon,
    modalRender: modalRender,
    focusTriggerAfterClose: focusTriggerAfterClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(contentPrefixCls, "-body-wrapper")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(contentPrefixCls, "-body")
  }, icon, props.title === undefined ? null : ( /*#__PURE__*/React.createElement("span", {
    className: "".concat(contentPrefixCls, "-title")
  }, props.title)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(contentPrefixCls, "-content")
  }, props.content)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(contentPrefixCls, "-btns")
  }, cancelButton, /*#__PURE__*/React.createElement(_ActionButton["default"], {
    type: okType,
    actionFn: onOk,
    close: close,
    autoFocus: autoFocusButton === 'ok',
    buttonProps: okButtonProps,
    prefixCls: "".concat(rootPrefixCls, "-btn")
  }, okText)))));
};
var _default = exports["default"] = ConfirmDialog;