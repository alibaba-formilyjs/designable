"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _StarFilled = _interopRequireDefault(require("@ant-design/icons/StarFilled"));
var _rcRate = _interopRequireDefault(require("rc-rate"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _tooltip = _interopRequireDefault(require("../tooltip"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var Rate = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var prefixCls = props.prefixCls,
    tooltips = props.tooltips,
    _props$character = props.character,
    character = _props$character === void 0 ? /*#__PURE__*/React.createElement(_StarFilled["default"], null) : _props$character,
    rest = __rest(props, ["prefixCls", "tooltips", "character"]);
  var characterRender = function characterRender(node, _ref) {
    var index = _ref.index;
    if (!tooltips) {
      return node;
    }
    return /*#__PURE__*/React.createElement(_tooltip["default"], {
      title: tooltips[index]
    }, node);
  };
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var ratePrefixCls = getPrefixCls('rate', prefixCls);
  return /*#__PURE__*/React.createElement(_rcRate["default"], (0, _extends2["default"])({
    ref: ref,
    character: character,
    characterRender: characterRender
  }, rest, {
    prefixCls: ratePrefixCls,
    direction: direction
  }));
});
if (process.env.NODE_ENV !== 'production') {
  Rate.displayName = 'Rate';
}
var _default = exports["default"] = Rate;