"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _configProvider = require("../config-provider");
var _context = require("../form/context");
var Group = function Group(props) {
  var _useContext = (0, _react.useContext)(_configProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls,
    direction = _useContext.direction;
  var customizePrefixCls = props.prefixCls,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className;
  var prefixCls = getPrefixCls('input-group', customizePrefixCls);
  var cls = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-lg"), props.size === 'large'), "".concat(prefixCls, "-sm"), props.size === 'small'), "".concat(prefixCls, "-compact"), props.compact), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  var formItemContext = (0, _react.useContext)(_context.FormItemInputContext);
  var groupFormItemContext = (0, _react.useMemo)(function () {
    return (0, _extends2["default"])((0, _extends2["default"])({}, formItemContext), {
      isFormItemInput: false
    });
  }, [formItemContext]);
  return /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: props.style,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onFocus: props.onFocus,
    onBlur: props.onBlur
  }, /*#__PURE__*/React.createElement(_context.FormItemInputContext.Provider, {
    value: groupFormItemContext
  }, props.children));
};
var _default = exports["default"] = Group;