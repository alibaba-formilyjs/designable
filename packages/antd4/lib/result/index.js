"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.IconMap = exports.ExceptionMap = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _CheckCircleFilled = _interopRequireDefault(require("@ant-design/icons/CheckCircleFilled"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));
var _WarningFilled = _interopRequireDefault(require("@ant-design/icons/WarningFilled"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _noFound = _interopRequireDefault(require("./noFound"));
var _serverError = _interopRequireDefault(require("./serverError"));
var _unauthorized = _interopRequireDefault(require("./unauthorized"));
var IconMap = exports.IconMap = {
  success: _CheckCircleFilled["default"],
  error: _CloseCircleFilled["default"],
  info: _ExclamationCircleFilled["default"],
  warning: _WarningFilled["default"]
};
var ExceptionMap = exports.ExceptionMap = {
  '404': _noFound["default"],
  '500': _serverError["default"],
  '403': _unauthorized["default"]
};
// ExceptionImageMap keys
var ExceptionStatus = Object.keys(ExceptionMap);
var Icon = function Icon(_ref) {
  var prefixCls = _ref.prefixCls,
    icon = _ref.icon,
    status = _ref.status;
  var className = (0, _classnames["default"])("".concat(prefixCls, "-icon"));
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!(typeof icon === 'string' && icon.length > 2), 'Result', "`icon` is using ReactNode instead of string naming in v4. Please check `".concat(icon, "` at https://ant.design/components/icon")) : void 0;
  if (ExceptionStatus.includes("".concat(status))) {
    var SVGComponent = ExceptionMap[status];
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(className, " ").concat(prefixCls, "-image")
    }, /*#__PURE__*/React.createElement(SVGComponent, null));
  }
  var iconNode = /*#__PURE__*/React.createElement(IconMap[status]);
  if (icon === null || icon === false) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, icon || iconNode);
};
var Extra = function Extra(_ref2) {
  var prefixCls = _ref2.prefixCls,
    extra = _ref2.extra;
  if (!extra) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-extra")
  }, extra);
};
var Result = function Result(_ref3) {
  var customizePrefixCls = _ref3.prefixCls,
    customizeClassName = _ref3.className,
    subTitle = _ref3.subTitle,
    title = _ref3.title,
    style = _ref3.style,
    children = _ref3.children,
    _ref3$status = _ref3.status,
    status = _ref3$status === void 0 ? 'info' : _ref3$status,
    icon = _ref3.icon,
    extra = _ref3.extra;
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var prefixCls = getPrefixCls('result', customizePrefixCls);
  var className = (0, _classnames["default"])(prefixCls, "".concat(prefixCls, "-").concat(status), customizeClassName, (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, /*#__PURE__*/React.createElement(Icon, {
    prefixCls: prefixCls,
    status: status,
    icon: icon
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-title")
  }, title), subTitle && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-subtitle")
  }, subTitle), /*#__PURE__*/React.createElement(Extra, {
    prefixCls: prefixCls,
    extra: extra
  }), children && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-content")
  }, children));
};
Result.PRESENTED_IMAGE_403 = ExceptionMap['403'];
Result.PRESENTED_IMAGE_404 = ExceptionMap['404'];
Result.PRESENTED_IMAGE_500 = ExceptionMap['500'];
var _default = exports["default"] = Result;