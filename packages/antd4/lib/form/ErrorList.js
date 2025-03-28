"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ErrorList;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireWildcard(require("rc-motion"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _motion = _interopRequireDefault(require("../_util/motion"));
var _context = require("./context");
var _useDebounce = _interopRequireDefault(require("./hooks/useDebounce"));
var EMPTY_LIST = [];
function toErrorEntity(error, errorStatus, prefix) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return {
    key: typeof error === 'string' ? error : "".concat(prefix, "-").concat(index),
    error: error,
    errorStatus: errorStatus
  };
}
function ErrorList(_ref) {
  var help = _ref.help,
    helpStatus = _ref.helpStatus,
    _ref$errors = _ref.errors,
    errors = _ref$errors === void 0 ? EMPTY_LIST : _ref$errors,
    _ref$warnings = _ref.warnings,
    warnings = _ref$warnings === void 0 ? EMPTY_LIST : _ref$warnings,
    rootClassName = _ref.className,
    fieldId = _ref.fieldId,
    onVisibleChanged = _ref.onVisibleChanged;
  var _React$useContext = React.useContext(_context.FormItemPrefixContext),
    prefixCls = _React$useContext.prefixCls;
  var _React$useContext2 = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext2.getPrefixCls;
  var baseClassName = "".concat(prefixCls, "-item-explain");
  var rootPrefixCls = getPrefixCls();
  // We have to debounce here again since somewhere use ErrorList directly still need no shaking
  // ref: https://github.com/ant-design/ant-design/issues/36336
  var debounceErrors = (0, _useDebounce["default"])(errors);
  var debounceWarnings = (0, _useDebounce["default"])(warnings);
  var fullKeyList = React.useMemo(function () {
    if (help !== undefined && help !== null) {
      return [toErrorEntity(help, helpStatus, 'help')];
    }
    return [].concat((0, _toConsumableArray2["default"])(debounceErrors.map(function (error, index) {
      return toErrorEntity(error, 'error', 'error', index);
    })), (0, _toConsumableArray2["default"])(debounceWarnings.map(function (warning, index) {
      return toErrorEntity(warning, 'warning', 'warning', index);
    })));
  }, [help, helpStatus, debounceErrors, debounceWarnings]);
  var helpProps = {};
  if (fieldId) {
    helpProps.id = "".concat(fieldId, "_help");
  }
  return /*#__PURE__*/React.createElement(_rcMotion["default"], {
    motionDeadline: _motion["default"].motionDeadline,
    motionName: "".concat(rootPrefixCls, "-show-help"),
    visible: !!fullKeyList.length,
    onVisibleChanged: onVisibleChanged
  }, function (holderProps) {
    var holderClassName = holderProps.className,
      holderStyle = holderProps.style;
    return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, helpProps, {
      className: (0, _classnames["default"])(baseClassName, holderClassName, rootClassName),
      style: holderStyle,
      role: "alert"
    }), /*#__PURE__*/React.createElement(_rcMotion.CSSMotionList, (0, _extends2["default"])({
      keys: fullKeyList
    }, _motion["default"], {
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
        className: (0, _classnames["default"])(itemClassName, (0, _defineProperty2["default"])({}, "".concat(baseClassName, "-").concat(errorStatus), errorStatus)),
        style: itemStyle
      }, error);
    }));
  });
}