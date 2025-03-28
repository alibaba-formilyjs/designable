"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _LeftOutlined = _interopRequireDefault(require("@ant-design/icons/LeftOutlined"));
var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));
var React = _interopRequireWildcard(require("react"));
var _button = _interopRequireDefault(require("../button"));
var Operation = function Operation(_ref) {
  var disabled = _ref.disabled,
    moveToLeft = _ref.moveToLeft,
    moveToRight = _ref.moveToRight,
    _ref$leftArrowText = _ref.leftArrowText,
    leftArrowText = _ref$leftArrowText === void 0 ? '' : _ref$leftArrowText,
    _ref$rightArrowText = _ref.rightArrowText,
    rightArrowText = _ref$rightArrowText === void 0 ? '' : _ref$rightArrowText,
    leftActive = _ref.leftActive,
    rightActive = _ref.rightActive,
    className = _ref.className,
    style = _ref.style,
    direction = _ref.direction,
    oneWay = _ref.oneWay;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, /*#__PURE__*/React.createElement(_button["default"], {
    type: "primary",
    size: "small",
    disabled: disabled || !rightActive,
    onClick: moveToRight,
    icon: direction !== 'rtl' ? /*#__PURE__*/React.createElement(_RightOutlined["default"], null) : /*#__PURE__*/React.createElement(_LeftOutlined["default"], null)
  }, rightArrowText), !oneWay && ( /*#__PURE__*/React.createElement(_button["default"], {
    type: "primary",
    size: "small",
    disabled: disabled || !leftActive,
    onClick: moveToLeft,
    icon: direction !== 'rtl' ? /*#__PURE__*/React.createElement(_LeftOutlined["default"], null) : /*#__PURE__*/React.createElement(_RightOutlined["default"], null)
  }, leftArrowText)));
};
var _default = exports["default"] = Operation;