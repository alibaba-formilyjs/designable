import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import SearchOutlined from "@ant-design/icons/es/icons/SearchOutlined";
import classNames from 'classnames';
import { composeRef } from "rc-util/es/ref";
import * as React from 'react';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import { useCompactItemContext } from '../space/Compact';
import { cloneElement } from '../_util/reactNode';
import Input from './Input';
var Search = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var customizePrefixCls = props.prefixCls,
    customizeInputPrefixCls = props.inputPrefixCls,
    className = props.className,
    customizeSize = props.size,
    suffix = props.suffix,
    _props$enterButton = props.enterButton,
    enterButton = _props$enterButton === void 0 ? false : _props$enterButton,
    addonAfter = props.addonAfter,
    loading = props.loading,
    disabled = props.disabled,
    customOnSearch = props.onSearch,
    customOnChange = props.onChange,
    onCompositionStart = props.onCompositionStart,
    onCompositionEnd = props.onCompositionEnd,
    restProps = __rest(props, ["prefixCls", "inputPrefixCls", "className", "size", "suffix", "enterButton", "addonAfter", "loading", "disabled", "onSearch", "onChange", "onCompositionStart", "onCompositionEnd"]);
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var contextSize = React.useContext(SizeContext);
  var composedRef = React.useRef(false);
  var prefixCls = getPrefixCls('input-search', customizePrefixCls);
  var inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
  var _useCompactItemContex = useCompactItemContext(prefixCls, direction),
    compactSize = _useCompactItemContex.compactSize;
  var size = compactSize || customizeSize || contextSize;
  var inputRef = React.useRef(null);
  var onChange = function onChange(e) {
    if (e && e.target && e.type === 'click' && customOnSearch) {
      customOnSearch(e.target.value, e);
    }
    if (customOnChange) {
      customOnChange(e);
    }
  };
  var onMouseDown = function onMouseDown(e) {
    var _a;
    if (document.activeElement === ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input)) {
      e.preventDefault();
    }
  };
  var onSearch = function onSearch(e) {
    var _a, _b;
    if (customOnSearch) {
      customOnSearch((_b = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.value, e);
    }
  };
  var onPressEnter = function onPressEnter(e) {
    if (composedRef.current || loading) {
      return;
    }
    onSearch(e);
  };
  var searchIcon = typeof enterButton === 'boolean' ? /*#__PURE__*/React.createElement(SearchOutlined, null) : null;
  var btnClassName = "".concat(prefixCls, "-button");
  var button;
  var enterButtonAsElement = enterButton || {};
  var isAntdButton = enterButtonAsElement.type && enterButtonAsElement.type.__ANT_BUTTON === true;
  if (isAntdButton || enterButtonAsElement.type === 'button') {
    button = cloneElement(enterButtonAsElement, _extends({
      onMouseDown: onMouseDown,
      onClick: function onClick(e) {
        var _a, _b;
        (_b = (_a = enterButtonAsElement === null || enterButtonAsElement === void 0 ? void 0 : enterButtonAsElement.props) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        onSearch(e);
      },
      key: 'enterButton'
    }, isAntdButton ? {
      className: btnClassName,
      size: size
    } : {}));
  } else {
    button = /*#__PURE__*/React.createElement(Button, {
      className: btnClassName,
      type: enterButton ? 'primary' : undefined,
      size: size,
      disabled: disabled,
      key: "enterButton",
      onMouseDown: onMouseDown,
      onClick: onSearch,
      loading: loading,
      icon: searchIcon
    }, enterButton);
  }
  if (addonAfter) {
    button = [button, cloneElement(addonAfter, {
      key: 'addonAfter'
    })];
  }
  var cls = classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), "".concat(prefixCls, "-").concat(size), !!size), "".concat(prefixCls, "-with-button"), !!enterButton), className);
  var handleOnCompositionStart = function handleOnCompositionStart(e) {
    composedRef.current = true;
    onCompositionStart === null || onCompositionStart === void 0 ? void 0 : onCompositionStart(e);
  };
  var handleOnCompositionEnd = function handleOnCompositionEnd(e) {
    composedRef.current = false;
    onCompositionEnd === null || onCompositionEnd === void 0 ? void 0 : onCompositionEnd(e);
  };
  return /*#__PURE__*/React.createElement(Input, _extends({
    ref: composeRef(inputRef, ref),
    onPressEnter: onPressEnter
  }, restProps, {
    size: size,
    onCompositionStart: handleOnCompositionStart,
    onCompositionEnd: handleOnCompositionEnd,
    prefixCls: inputPrefixCls,
    addonAfter: button,
    suffix: suffix,
    onChange: onChange,
    className: cls,
    disabled: disabled
  }));
});
if (process.env.NODE_ENV !== 'production') {
  Search.displayName = 'Search';
}
export default Search;