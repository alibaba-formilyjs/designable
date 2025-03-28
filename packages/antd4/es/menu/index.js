import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _isNativeReflectConstruct from "@babel/runtime/helpers/esm/isNativeReflectConstruct";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _extends from "@babel/runtime/helpers/esm/extends";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import EllipsisOutlined from "@ant-design/icons/es/icons/EllipsisOutlined";
import classNames from 'classnames';
import RcMenu, { ItemGroup } from 'rc-menu';
import useEvent from "rc-util/es/hooks/useEvent";
import omit from "rc-util/es/omit";
import * as React from 'react';
import { forwardRef } from 'react';
import { ConfigContext } from '../config-provider';
import { SiderContext } from '../layout/Sider';
import collapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import warning from '../_util/warning';
import useItems from './hooks/useItems';
import MenuContext from './MenuContext';
import MenuDivider from './MenuDivider';
import Item from './MenuItem';
import OverrideContext from './OverrideContext';
import SubMenu from './SubMenu';
var InternalMenu = /*#__PURE__*/forwardRef(function (props, ref) {
  var _a;
  var override = React.useContext(OverrideContext) || {};
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    getPopupContainer = _React$useContext.getPopupContainer,
    direction = _React$useContext.direction;
  var rootPrefixCls = getPrefixCls();
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    _props$theme = props.theme,
    theme = _props$theme === void 0 ? 'light' : _props$theme,
    expandIcon = props.expandIcon,
    _internalDisableMenuItemTitleTooltip = props._internalDisableMenuItemTitleTooltip,
    inlineCollapsed = props.inlineCollapsed,
    siderCollapsed = props.siderCollapsed,
    items = props.items,
    children = props.children,
    mode = props.mode,
    selectable = props.selectable,
    onClick = props.onClick,
    restProps = __rest(props, ["prefixCls", "className", "theme", "expandIcon", "_internalDisableMenuItemTitleTooltip", "inlineCollapsed", "siderCollapsed", "items", "children", "mode", "selectable", "onClick"]);
  var passedProps = omit(restProps, ['collapsedWidth']);
  // ========================= Items ===========================
  var mergedChildren = useItems(items) || children;
  // ======================== Warning ==========================
  process.env.NODE_ENV !== "production" ? warning(!('inlineCollapsed' in props && mode !== 'inline'), 'Menu', '`inlineCollapsed` should only be used when `mode` is inline.') : void 0;
  process.env.NODE_ENV !== "production" ? warning(!(props.siderCollapsed !== undefined && 'inlineCollapsed' in props), 'Menu', '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.') : void 0;
  process.env.NODE_ENV !== "production" ? warning('items' in props && !children, 'Menu', '`children` will be removed in next major version. Please use `items` instead.') : void 0;
  (_a = override.validator) === null || _a === void 0 ? void 0 : _a.call(override, {
    mode: mode
  });
  // ========================== Click ==========================
  // Tell dropdown that item clicked
  var onItemClick = useEvent(function () {
    var _a;
    onClick === null || onClick === void 0 ? void 0 : onClick.apply(void 0, arguments);
    (_a = override === null || override === void 0 ? void 0 : override.onClick) === null || _a === void 0 ? void 0 : _a.call(override);
  });
  // ========================== Mode ===========================
  var mergedMode = override.mode || mode;
  // ======================= Selectable ========================
  var mergedSelectable = selectable !== null && selectable !== void 0 ? selectable : override.selectable;
  // ======================== Collapsed ========================
  // Inline Collapsed
  var mergedInlineCollapsed = React.useMemo(function () {
    if (siderCollapsed !== undefined) {
      return siderCollapsed;
    }
    return inlineCollapsed;
  }, [inlineCollapsed, siderCollapsed]);
  var defaultMotions = {
    horizontal: {
      motionName: "".concat(rootPrefixCls, "-slide-up")
    },
    inline: collapseMotion,
    other: {
      motionName: "".concat(rootPrefixCls, "-zoom-big")
    }
  };
  var prefixCls = getPrefixCls('menu', customizePrefixCls || override.prefixCls);
  var menuClassName = classNames("".concat(prefixCls, "-").concat(theme), className);
  // ====================== Expand Icon ========================
  var mergedExpandIcon;
  if (typeof expandIcon === 'function') {
    mergedExpandIcon = expandIcon;
  } else {
    mergedExpandIcon = cloneElement(expandIcon || override.expandIcon, {
      className: "".concat(prefixCls, "-submenu-expand-icon")
    });
  }
  // ======================== Context ==========================
  var contextValue = React.useMemo(function () {
    return {
      prefixCls: prefixCls,
      inlineCollapsed: mergedInlineCollapsed || false,
      antdMenuTheme: theme,
      direction: direction,
      firstLevel: true,
      disableMenuItemTitleTooltip: _internalDisableMenuItemTitleTooltip
    };
  }, [prefixCls, mergedInlineCollapsed, theme, direction, _internalDisableMenuItemTitleTooltip]);
  // ========================= Render ==========================
  return /*#__PURE__*/React.createElement(OverrideContext.Provider, {
    value: null
  }, /*#__PURE__*/React.createElement(MenuContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(RcMenu, _extends({
    getPopupContainer: getPopupContainer,
    overflowedIndicator: /*#__PURE__*/React.createElement(EllipsisOutlined, null),
    overflowedIndicatorPopupClassName: "".concat(prefixCls, "-").concat(theme),
    mode: mergedMode,
    selectable: mergedSelectable,
    onClick: onItemClick
  }, passedProps, {
    inlineCollapsed: mergedInlineCollapsed,
    className: menuClassName,
    prefixCls: prefixCls,
    direction: direction,
    defaultMotions: defaultMotions,
    expandIcon: mergedExpandIcon,
    ref: ref
  }), mergedChildren)));
});
// We should keep this as ref-able
var Menu = /*#__PURE__*/function (_React$Component) {
  _inherits(Menu, _React$Component);
  function Menu() {
    var _this;
    _classCallCheck(this, Menu);
    _this = _callSuper(this, Menu, arguments);
    _this.focus = function (options) {
      var _a;
      (_a = _this.menu) === null || _a === void 0 ? void 0 : _a.focus(options);
    };
    return _this;
  }
  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement(SiderContext.Consumer, null, function (context) {
        return /*#__PURE__*/React.createElement(InternalMenu, _extends({
          ref: function ref(node) {
            _this2.menu = node;
          }
        }, _this2.props, context));
      });
    }
  }]);
  return Menu;
}(React.Component);
Menu.Divider = MenuDivider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
export default Menu;