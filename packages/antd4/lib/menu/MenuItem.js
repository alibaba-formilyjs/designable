"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _isNativeReflectConstruct2 = _interopRequireDefault(require("@babel/runtime/helpers/isNativeReflectConstruct"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMenu = require("rc-menu");
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var React = _interopRequireWildcard(require("react"));
var _Sider = require("../layout/Sider");
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _reactNode = require("../_util/reactNode");
var _MenuContext = _interopRequireDefault(require("./MenuContext"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, (0, _isNativeReflectConstruct2["default"])() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var MenuItem = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(MenuItem, _React$Component);
  function MenuItem() {
    var _this;
    (0, _classCallCheck2["default"])(this, MenuItem);
    _this = _callSuper(this, MenuItem, arguments);
    _this.renderItem = function (_ref) {
      var siderCollapsed = _ref.siderCollapsed;
      var _a;
      var _this$context = _this.context,
        prefixCls = _this$context.prefixCls,
        firstLevel = _this$context.firstLevel,
        inlineCollapsed = _this$context.inlineCollapsed,
        direction = _this$context.direction,
        disableMenuItemTitleTooltip = _this$context.disableMenuItemTitleTooltip;
      var _this$props = _this.props,
        className = _this$props.className,
        children = _this$props.children;
      var _b = _this.props,
        title = _b.title,
        icon = _b.icon,
        danger = _b.danger,
        rest = __rest(_b, ["title", "icon", "danger"]);
      var tooltipTitle = title;
      if (typeof title === 'undefined') {
        tooltipTitle = firstLevel ? children : '';
      } else if (title === false) {
        tooltipTitle = '';
      }
      var tooltipProps = {
        title: tooltipTitle
      };
      if (!siderCollapsed && !inlineCollapsed) {
        tooltipProps.title = null;
        // Reset `open` to fix control mode tooltip display not correct
        // ref: https://github.com/ant-design/ant-design/issues/16742
        tooltipProps.open = false;
      }
      var childrenLength = (0, _toArray["default"])(children).length;
      var returnNode = /*#__PURE__*/React.createElement(_rcMenu.Item, (0, _extends2["default"])({}, rest, {
        className: (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-item-danger"), danger), "".concat(prefixCls, "-item-only-child"), (icon ? childrenLength + 1 : childrenLength) === 1), className),
        title: typeof title === 'string' ? title : undefined
      }), (0, _reactNode.cloneElement)(icon, {
        className: (0, _classnames["default"])((0, _reactNode.isValidElement)(icon) ? (_a = icon.props) === null || _a === void 0 ? void 0 : _a.className : '', "".concat(prefixCls, "-item-icon"))
      }), _this.renderItemChildren(inlineCollapsed));
      if (!disableMenuItemTitleTooltip) {
        returnNode = /*#__PURE__*/React.createElement(_tooltip["default"], (0, _extends2["default"])({}, tooltipProps, {
          placement: direction === 'rtl' ? 'left' : 'right',
          overlayClassName: "".concat(prefixCls, "-inline-collapsed-tooltip")
        }), returnNode);
      }
      return returnNode;
    };
    return _this;
  }
  (0, _createClass2["default"])(MenuItem, [{
    key: "renderItemChildren",
    value: function renderItemChildren(inlineCollapsed) {
      var _this$context2 = this.context,
        prefixCls = _this$context2.prefixCls,
        firstLevel = _this$context2.firstLevel;
      var _this$props2 = this.props,
        icon = _this$props2.icon,
        children = _this$props2.children;
      var wrapNode = /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-title-content")
      }, children);
      // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
      // ref: https://github.com/ant-design/ant-design/pull/23456
      if (!icon || (0, _reactNode.isValidElement)(children) && children.type === 'span') {
        if (children && inlineCollapsed && firstLevel && typeof children === 'string') {
          return /*#__PURE__*/React.createElement("div", {
            className: "".concat(prefixCls, "-inline-collapsed-noicon")
          }, children.charAt(0));
        }
      }
      return wrapNode;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(_Sider.SiderContext.Consumer, null, this.renderItem);
    }
  }]);
  return MenuItem;
}(React.Component);
MenuItem.contextType = _MenuContext["default"];