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
import DoubleLeftOutlined from "@ant-design/icons/es/icons/DoubleLeftOutlined";
import DoubleRightOutlined from "@ant-design/icons/es/icons/DoubleRightOutlined";
import LeftOutlined from "@ant-design/icons/es/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import classNames from 'classnames';
import RcPagination from 'rc-pagination';
import enUS from "rc-pagination/es/locale/en_US";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { MiddleSelect, MiniSelect } from './Select';
var Pagination = function Pagination(_a) {
  var customizePrefixCls = _a.prefixCls,
    customizeSelectPrefixCls = _a.selectPrefixCls,
    className = _a.className,
    size = _a.size,
    customLocale = _a.locale,
    selectComponentClass = _a.selectComponentClass,
    responsive = _a.responsive,
    showSizeChanger = _a.showSizeChanger,
    restProps = __rest(_a, ["prefixCls", "selectPrefixCls", "className", "size", "locale", "selectComponentClass", "responsive", "showSizeChanger"]);
  var _useBreakpoint = useBreakpoint(responsive),
    xs = _useBreakpoint.xs;
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction,
    _React$useContext$pag = _React$useContext.pagination,
    pagination = _React$useContext$pag === void 0 ? {} : _React$useContext$pag;
  var prefixCls = getPrefixCls('pagination', customizePrefixCls);
  var mergedShowSizeChanger = showSizeChanger !== null && showSizeChanger !== void 0 ? showSizeChanger : pagination.showSizeChanger;
  var getIconsProps = function getIconsProps() {
    var ellipsis = /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-item-ellipsis")
    }, "\u2022\u2022\u2022");
    var prevIcon = /*#__PURE__*/React.createElement("button", {
      className: "".concat(prefixCls, "-item-link"),
      type: "button",
      tabIndex: -1
    }, /*#__PURE__*/React.createElement(LeftOutlined, null));
    var nextIcon = /*#__PURE__*/React.createElement("button", {
      className: "".concat(prefixCls, "-item-link"),
      type: "button",
      tabIndex: -1
    }, /*#__PURE__*/React.createElement(RightOutlined, null));
    var jumpPrevIcon = /*#__PURE__*/React.createElement("a", {
      className: "".concat(prefixCls, "-item-link")
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-item-container")
    }, /*#__PURE__*/React.createElement(DoubleLeftOutlined, {
      className: "".concat(prefixCls, "-item-link-icon")
    }), ellipsis));
    var jumpNextIcon = /*#__PURE__*/React.createElement("a", {
      className: "".concat(prefixCls, "-item-link")
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-item-container")
    }, /*#__PURE__*/React.createElement(DoubleRightOutlined, {
      className: "".concat(prefixCls, "-item-link-icon")
    }), ellipsis));
    // change arrows direction in right-to-left direction
    if (direction === 'rtl') {
      var _ref = [nextIcon, prevIcon];
      prevIcon = _ref[0];
      nextIcon = _ref[1];
      var _ref2 = [jumpNextIcon, jumpPrevIcon];
      jumpPrevIcon = _ref2[0];
      jumpNextIcon = _ref2[1];
    }
    return {
      prevIcon: prevIcon,
      nextIcon: nextIcon,
      jumpPrevIcon: jumpPrevIcon,
      jumpNextIcon: jumpNextIcon
    };
  };
  return /*#__PURE__*/React.createElement(LocaleReceiver, {
    componentName: "Pagination",
    defaultLocale: enUS
  }, function (contextLocale) {
    var locale = _extends(_extends({}, contextLocale), customLocale);
    var isSmall = size === 'small' || !!(xs && !size && responsive);
    var selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);
    var extendedClassName = classNames(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-mini"), isSmall), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
    return /*#__PURE__*/React.createElement(RcPagination, _extends({}, getIconsProps(), restProps, {
      prefixCls: prefixCls,
      selectPrefixCls: selectPrefixCls,
      className: extendedClassName,
      selectComponentClass: selectComponentClass || (isSmall ? MiniSelect : MiddleSelect),
      locale: locale,
      showSizeChanger: mergedShowSizeChanger
    }));
  });
};
export default Pagination;