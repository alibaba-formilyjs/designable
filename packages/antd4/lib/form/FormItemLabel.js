"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _QuestionCircleOutlined = _interopRequireDefault(require("@ant-design/icons/QuestionCircleOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _col = _interopRequireDefault(require("../grid/col"));
var _LocaleReceiver = require("../locale-provider/LocaleReceiver");
var _default2 = _interopRequireDefault(require("../locale/default"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _context = require("./context");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function toTooltipProps(tooltip) {
  if (!tooltip) {
    return null;
  }
  if ((0, _typeof2["default"])(tooltip) === 'object' && ! /*#__PURE__*/React.isValidElement(tooltip)) {
    return tooltip;
  }
  return {
    title: tooltip
  };
}
var FormItemLabel = function FormItemLabel(_ref) {
  var prefixCls = _ref.prefixCls,
    label = _ref.label,
    htmlFor = _ref.htmlFor,
    labelCol = _ref.labelCol,
    labelAlign = _ref.labelAlign,
    colon = _ref.colon,
    required = _ref.required,
    requiredMark = _ref.requiredMark,
    tooltip = _ref.tooltip;
  var _useLocaleReceiver = (0, _LocaleReceiver.useLocaleReceiver)('Form'),
    _useLocaleReceiver2 = (0, _slicedToArray2["default"])(_useLocaleReceiver, 1),
    formLocale = _useLocaleReceiver2[0];
  if (!label) return null;
  return /*#__PURE__*/React.createElement(_context.FormContext.Consumer, {
    key: "label"
  }, function (_ref2) {
    var vertical = _ref2.vertical,
      contextLabelAlign = _ref2.labelAlign,
      contextLabelCol = _ref2.labelCol,
      labelWrap = _ref2.labelWrap,
      contextColon = _ref2.colon;
    var _a;
    var mergedLabelCol = labelCol || contextLabelCol || {};
    var mergedLabelAlign = labelAlign || contextLabelAlign;
    var labelClsBasic = "".concat(prefixCls, "-item-label");
    var labelColClassName = (0, _classnames["default"])(labelClsBasic, mergedLabelAlign === 'left' && "".concat(labelClsBasic, "-left"), mergedLabelCol.className, (0, _defineProperty2["default"])({}, "".concat(labelClsBasic, "-wrap"), !!labelWrap));
    var labelChildren = label;
    // Keep label is original where there should have no colon
    var computedColon = colon === true || contextColon !== false && colon !== false;
    var haveColon = computedColon && !vertical;
    // Remove duplicated user input colon
    if (haveColon && typeof label === 'string' && label.trim() !== '') {
      labelChildren = label.replace(/[:|：]\s*$/, '');
    }
    // Tooltip
    var tooltipProps = toTooltipProps(tooltip);
    if (tooltipProps) {
      var _tooltipProps$icon = tooltipProps.icon,
        icon = _tooltipProps$icon === void 0 ? /*#__PURE__*/React.createElement(_QuestionCircleOutlined["default"], null) : _tooltipProps$icon,
        restTooltipProps = __rest(tooltipProps, ["icon"]);
      var tooltipNode = /*#__PURE__*/React.createElement(_tooltip["default"], (0, _extends2["default"])({}, restTooltipProps), /*#__PURE__*/React.cloneElement(icon, {
        className: "".concat(prefixCls, "-item-tooltip"),
        title: '',
        onClick: function onClick(e) {
          // Prevent label behavior in tooltip icon
          // https://github.com/ant-design/ant-design/issues/46154
          e.preventDefault();
        },
        tabIndex: null
      }));
      labelChildren = /*#__PURE__*/React.createElement(React.Fragment, null, labelChildren, tooltipNode);
    }
    // Add required mark if optional
    if (requiredMark === 'optional' && !required) {
      labelChildren = /*#__PURE__*/React.createElement(React.Fragment, null, labelChildren, /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-item-optional"),
        title: ""
      }, (formLocale === null || formLocale === void 0 ? void 0 : formLocale.optional) || ((_a = _default2["default"].Form) === null || _a === void 0 ? void 0 : _a.optional)));
    }
    var labelClassName = (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-item-required"), required), "".concat(prefixCls, "-item-required-mark-optional"), requiredMark === 'optional'), "".concat(prefixCls, "-item-no-colon"), !computedColon));
    return /*#__PURE__*/React.createElement(_col["default"], (0, _extends2["default"])({}, mergedLabelCol, {
      className: labelColClassName
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: htmlFor,
      className: labelClassName,
      title: typeof label === 'string' ? label : ''
    }, labelChildren));
  });
};
var _default = exports["default"] = FormItemLabel;