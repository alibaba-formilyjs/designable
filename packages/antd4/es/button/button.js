import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import { useCompactItemContext } from '../space/Compact';
import { cloneElement, isFragment } from '../_util/reactNode';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import Wave from '../_util/wave';
import Group, { GroupSizeContext } from './button-group';
import LoadingIcon from './LoadingIcon';
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
  return typeof str === 'string';
}
function isUnBorderedButtonType(type) {
  return type === 'text' || type === 'link';
}
// Insert one space between two chinese characters automatically.
function insertSpace(child, needInserted) {
  // Check the child if is undefined or null.
  if (child === null || child === undefined) {
    return;
  }
  var SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (typeof child !== 'string' && typeof child !== 'number' && isString(child.type) && isTwoCNChar(child.props.children)) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE)
    });
  }
  if (typeof child === 'string') {
    return isTwoCNChar(child) ? /*#__PURE__*/React.createElement("span", null, child.split('').join(SPACE)) : /*#__PURE__*/React.createElement("span", null, child);
  }
  if (isFragment(child)) {
    return /*#__PURE__*/React.createElement("span", null, child);
  }
  return child;
}
function spaceChildren(children, needInserted) {
  var isPrevChildPure = false;
  var childList = [];
  React.Children.forEach(children, function (child) {
    var type = _typeof(child);
    var isCurrentChildPure = type === 'string' || type === 'number';
    if (isPrevChildPure && isCurrentChildPure) {
      var lastIndex = childList.length - 1;
      var lastChild = childList[lastIndex];
      childList[lastIndex] = "".concat(lastChild).concat(child);
    } else {
      childList.push(child);
    }
    isPrevChildPure = isCurrentChildPure;
  });
  // Pass to React.Children.map to auto fill key
  return React.Children.map(childList, function (child) {
    return insertSpace(child, needInserted);
  });
}
var ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
var ButtonShapes = tuple('default', 'circle', 'round');
var ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export function convertLegacyProps(type) {
  if (type === 'danger') {
    return {
      danger: true
    };
  }
  return {
    type: type
  };
}
var InternalButton = function InternalButton(props, ref) {
  var _classNames;
  var _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading,
    customizePrefixCls = props.prefixCls,
    _props$type = props.type,
    type = _props$type === void 0 ? 'default' : _props$type,
    danger = props.danger,
    _props$shape = props.shape,
    shape = _props$shape === void 0 ? 'default' : _props$shape,
    customizeSize = props.size,
    customDisabled = props.disabled,
    className = props.className,
    children = props.children,
    icon = props.icon,
    _props$ghost = props.ghost,
    ghost = _props$ghost === void 0 ? false : _props$ghost,
    _props$block = props.block,
    block = _props$block === void 0 ? false : _props$block,
    _props$htmlType = props.htmlType,
    htmlType = _props$htmlType === void 0 ? 'button' : _props$htmlType,
    rest = __rest(props, ["loading", "prefixCls", "type", "danger", "shape", "size", "disabled", "className", "children", "icon", "ghost", "block", "htmlType"]);
  var size = React.useContext(SizeContext);
  // ===================== Disabled =====================
  var disabled = React.useContext(DisabledContext);
  var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  var groupSize = React.useContext(GroupSizeContext);
  var _React$useState = React.useState(!!loading),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    innerLoading = _React$useState2[0],
    setLoading = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    hasTwoCNChar = _React$useState4[0],
    setHasTwoCNChar = _React$useState4[1];
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    autoInsertSpaceInButton = _React$useContext.autoInsertSpaceInButton,
    direction = _React$useContext.direction;
  var buttonRef = ref || /*#__PURE__*/React.createRef();
  var isNeedInserted = function isNeedInserted() {
    return React.Children.count(children) === 1 && !icon && !isUnBorderedButtonType(type);
  };
  var fixTwoCNChar = function fixTwoCNChar() {
    // Fix for HOC usage like <FormatMessage />
    if (!buttonRef || !buttonRef.current || autoInsertSpaceInButton === false) {
      return;
    }
    var buttonText = buttonRef.current.textContent;
    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  };
  // =============== Update Loading ===============
  var loadingOrDelay = typeof loading === 'boolean' ? loading : (loading === null || loading === void 0 ? void 0 : loading.delay) || true;
  React.useEffect(function () {
    var delayTimer = null;
    if (typeof loadingOrDelay === 'number') {
      delayTimer = window.setTimeout(function () {
        delayTimer = null;
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay);
    }
    return function () {
      if (delayTimer) {
        // in order to not perform a React state update on an unmounted component
        // and clear timer after 'loadingOrDelay' updated.
        window.clearTimeout(delayTimer);
        delayTimer = null;
      }
    };
  }, [loadingOrDelay]);
  React.useEffect(fixTwoCNChar, [buttonRef]);
  var handleClick = function handleClick(e) {
    var onClick = props.onClick;
    // https://github.com/ant-design/ant-design/issues/30207
    if (innerLoading || mergedDisabled) {
      e.preventDefault();
      return;
    }
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
  };
  process.env.NODE_ENV !== "production" ? warning(!(typeof icon === 'string' && icon.length > 2), 'Button', "`icon` is using ReactNode instead of string naming in v4. Please check `".concat(icon, "` at https://ant.design/components/icon")) : void 0;
  process.env.NODE_ENV !== "production" ? warning(!(ghost && isUnBorderedButtonType(type)), 'Button', "`link` or `text` button can't be a `ghost` button.") : void 0;
  var prefixCls = getPrefixCls('btn', customizePrefixCls);
  var autoInsertSpace = autoInsertSpaceInButton !== false;
  var _useCompactItemContex = useCompactItemContext(prefixCls, direction),
    compactSize = _useCompactItemContex.compactSize,
    compactItemClassnames = _useCompactItemContex.compactItemClassnames;
  var sizeClassNameMap = {
    large: 'lg',
    small: 'sm',
    middle: undefined
  };
  var sizeFullname = compactSize || groupSize || customizeSize || size;
  var sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';
  var iconType = innerLoading ? 'loading' : icon;
  var linkButtonRestProps = omit(rest, ['navigate']);
  var classes = classNames(prefixCls, (_classNames = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames, "".concat(prefixCls, "-").concat(shape), shape !== 'default' && shape), "".concat(prefixCls, "-").concat(type), type), "".concat(prefixCls, "-").concat(sizeCls), sizeCls), "".concat(prefixCls, "-icon-only"), !children && children !== 0 && !!iconType), "".concat(prefixCls, "-background-ghost"), ghost && !isUnBorderedButtonType(type)), "".concat(prefixCls, "-loading"), innerLoading), "".concat(prefixCls, "-two-chinese-chars"), hasTwoCNChar && autoInsertSpace && !innerLoading), "".concat(prefixCls, "-block"), block), "".concat(prefixCls, "-dangerous"), !!danger), "".concat(prefixCls, "-rtl"), direction === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), linkButtonRestProps.href !== undefined && mergedDisabled)), compactItemClassnames, className);
  var iconNode = icon && !innerLoading ? icon : ( /*#__PURE__*/React.createElement(LoadingIcon, {
    existIcon: !!icon,
    prefixCls: prefixCls,
    loading: !!innerLoading
  }));
  var kids = children || children === 0 ? spaceChildren(children, isNeedInserted() && autoInsertSpace) : null;
  if (linkButtonRestProps.href !== undefined) {
    return /*#__PURE__*/React.createElement("a", _extends({}, linkButtonRestProps, {
      className: classes,
      onClick: handleClick,
      ref: buttonRef
    }), iconNode, kids);
  }
  var buttonNode = /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    type: htmlType,
    className: classes,
    onClick: handleClick,
    disabled: mergedDisabled,
    ref: buttonRef
  }), iconNode, kids);
  if (isUnBorderedButtonType(type)) {
    return buttonNode;
  }
  return /*#__PURE__*/React.createElement(Wave, {
    disabled: !!innerLoading
  }, buttonNode);
};
var Button = /*#__PURE__*/React.forwardRef(InternalButton);
if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
Button.Group = Group;
Button.__ANT_BUTTON = true;
export default Button;