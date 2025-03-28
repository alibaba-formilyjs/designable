import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _isNativeReflectConstruct from "@babel/runtime/helpers/esm/isNativeReflectConstruct";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import { Item } from 'rc-menu';
import toArray from "rc-util/es/Children/toArray";
import * as React from 'react';
import { SiderContext } from '../layout/Sider';
import Tooltip from '../tooltip';
import { cloneElement, isValidElement } from '../_util/reactNode';
import MenuContext from './MenuContext';
var MenuItem = /*#__PURE__*/function (_React$Component) {
  _inherits(MenuItem, _React$Component);
  function MenuItem() {
    var _this;
    _classCallCheck(this, MenuItem);
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
      var childrenLength = toArray(children).length;
      var returnNode = /*#__PURE__*/React.createElement(Item, _extends({}, rest, {
        className: classNames(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-item-danger"), danger), "".concat(prefixCls, "-item-only-child"), (icon ? childrenLength + 1 : childrenLength) === 1), className),
        title: typeof title === 'string' ? title : undefined
      }), cloneElement(icon, {
        className: classNames(isValidElement(icon) ? (_a = icon.props) === null || _a === void 0 ? void 0 : _a.className : '', "".concat(prefixCls, "-item-icon"))
      }), _this.renderItemChildren(inlineCollapsed));
      if (!disableMenuItemTitleTooltip) {
        returnNode = /*#__PURE__*/React.createElement(Tooltip, _extends({}, tooltipProps, {
          placement: direction === 'rtl' ? 'left' : 'right',
          overlayClassName: "".concat(prefixCls, "-inline-collapsed-tooltip")
        }), returnNode);
      }
      return returnNode;
    };
    return _this;
  }
  _createClass(MenuItem, [{
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
      if (!icon || isValidElement(children) && children.type === 'span') {
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
      return /*#__PURE__*/React.createElement(SiderContext.Consumer, null, this.renderItem);
    }
  }]);
  return MenuItem;
}(React.Component);
export { MenuItem as default };
MenuItem.contextType = MenuContext;