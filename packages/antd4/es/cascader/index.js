import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import LeftOutlined from "@ant-design/icons/es/icons/LeftOutlined";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import classNames from 'classnames';
import RcCascader from 'rc-cascader';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import defaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import { useCompactItemContext } from '../space/Compact';
import { FormItemInputContext } from '../form/context';
import getIcons from '../select/utils/iconUtil';
import { getTransitionDirection, getTransitionName } from '../_util/motion';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import warning from '../_util/warning';
var SHOW_CHILD = RcCascader.SHOW_CHILD,
  SHOW_PARENT = RcCascader.SHOW_PARENT;
function highlightKeyword(str, lowerKeyword, prefixCls) {
  var cells = str.toLowerCase().split(lowerKeyword).reduce(function (list, cur, index) {
    return index === 0 ? [cur] : [].concat(_toConsumableArray(list), [lowerKeyword, cur]);
  }, []);
  var fillCells = [];
  var start = 0;
  cells.forEach(function (cell, index) {
    var end = start + cell.length;
    var originWorld = str.slice(start, end);
    start = end;
    if (index % 2 === 1) {
      originWorld =
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement("span", {
        className: "".concat(prefixCls, "-menu-item-keyword"),
        key: "seperator-".concat(index)
      }, originWorld);
    }
    fillCells.push(originWorld);
  });
  return fillCells;
}
var defaultSearchRender = function defaultSearchRender(inputValue, path, prefixCls, fieldNames) {
  var optionList = [];
  // We do lower here to save perf
  var lower = inputValue.toLowerCase();
  path.forEach(function (node, index) {
    if (index !== 0) {
      optionList.push(' / ');
    }
    var label = node[fieldNames.label];
    var type = _typeof(label);
    if (type === 'string' || type === 'number') {
      label = highlightKeyword(String(label), lower, prefixCls);
    }
    optionList.push(label);
  });
  return optionList;
};
var Cascader = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var customizePrefixCls = props.prefixCls,
    customizeSize = props.size,
    customDisabled = props.disabled,
    className = props.className,
    multiple = props.multiple,
    _props$bordered = props.bordered,
    bordered = _props$bordered === void 0 ? true : _props$bordered,
    transitionName = props.transitionName,
    _props$choiceTransiti = props.choiceTransitionName,
    choiceTransitionName = _props$choiceTransiti === void 0 ? '' : _props$choiceTransiti,
    popupClassName = props.popupClassName,
    dropdownClassName = props.dropdownClassName,
    expandIcon = props.expandIcon,
    placement = props.placement,
    showSearch = props.showSearch,
    _props$allowClear = props.allowClear,
    allowClear = _props$allowClear === void 0 ? true : _props$allowClear,
    notFoundContent = props.notFoundContent,
    direction = props.direction,
    getPopupContainer = props.getPopupContainer,
    customStatus = props.status,
    showArrow = props.showArrow,
    rest = __rest(props, ["prefixCls", "size", "disabled", "className", "multiple", "bordered", "transitionName", "choiceTransitionName", "popupClassName", "dropdownClassName", "expandIcon", "placement", "showSearch", "allowClear", "notFoundContent", "direction", "getPopupContainer", "status", "showArrow"]);
  var restProps = omit(rest, ['suffixIcon']);
  var _useContext = useContext(ConfigContext),
    getContextPopupContainer = _useContext.getPopupContainer,
    getPrefixCls = _useContext.getPrefixCls,
    renderEmpty = _useContext.renderEmpty,
    rootDirection = _useContext.direction;
  var mergedDirection = direction || rootDirection;
  var isRtl = mergedDirection === 'rtl';
  // =================== Form =====================
  var _useContext2 = useContext(FormItemInputContext),
    contextStatus = _useContext2.status,
    hasFeedback = _useContext2.hasFeedback,
    isFormItemInput = _useContext2.isFormItemInput,
    feedbackIcon = _useContext2.feedbackIcon;
  var mergedStatus = getMergedStatus(contextStatus, customStatus);
  // =================== Warning =====================
  process.env.NODE_ENV !== "production" ? warning(!dropdownClassName, 'Cascader', '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.') : void 0;
  // =================== No Found ====================
  var mergedNotFoundContent = notFoundContent || (renderEmpty || defaultRenderEmpty)('Cascader');
  // ==================== Prefix =====================
  var rootPrefixCls = getPrefixCls();
  var prefixCls = getPrefixCls('select', customizePrefixCls);
  var cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);
  var _useCompactItemContex = useCompactItemContext(prefixCls, direction),
    compactSize = _useCompactItemContex.compactSize,
    compactItemClassnames = _useCompactItemContex.compactItemClassnames;
  // =================== Dropdown ====================
  var mergedDropdownClassName = classNames(popupClassName || dropdownClassName, "".concat(cascaderPrefixCls, "-dropdown"), _defineProperty({}, "".concat(cascaderPrefixCls, "-dropdown-rtl"), mergedDirection === 'rtl'));
  // ==================== Search =====================
  var mergedShowSearch = React.useMemo(function () {
    if (!showSearch) {
      return showSearch;
    }
    var searchConfig = {
      render: defaultSearchRender
    };
    if (_typeof(showSearch) === 'object') {
      searchConfig = _extends(_extends({}, searchConfig), showSearch);
    }
    return searchConfig;
  }, [showSearch]);
  // ===================== Size ======================
  var size = React.useContext(SizeContext);
  var mergedSize = compactSize || customizeSize || size;
  // ===================== Disabled =====================
  var disabled = React.useContext(DisabledContext);
  var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  // ===================== Icon ======================
  var mergedExpandIcon = expandIcon;
  if (!expandIcon) {
    mergedExpandIcon = isRtl ? /*#__PURE__*/React.createElement(LeftOutlined, null) : /*#__PURE__*/React.createElement(RightOutlined, null);
  }
  var loadingIcon = /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-menu-item-loading-icon")
  }, /*#__PURE__*/React.createElement(LoadingOutlined, {
    spin: true
  }));
  // =================== Multiple ====================
  var checkable = React.useMemo(function () {
    return multiple ? /*#__PURE__*/React.createElement("span", {
      className: "".concat(cascaderPrefixCls, "-checkbox-inner")
    }) : false;
  }, [multiple]);
  // ===================== Icons =====================
  var mergedShowArrow = showArrow !== undefined ? showArrow : props.loading || !multiple;
  var _getIcons = getIcons(_extends(_extends({}, props), {
      hasFeedback: hasFeedback,
      feedbackIcon: feedbackIcon,
      showArrow: mergedShowArrow,
      multiple: multiple,
      prefixCls: prefixCls
    })),
    suffixIcon = _getIcons.suffixIcon,
    removeIcon = _getIcons.removeIcon,
    clearIcon = _getIcons.clearIcon;
  // ===================== Placement =====================
  var getPlacement = function getPlacement() {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  };
  // ==================== Render =====================
  return /*#__PURE__*/React.createElement(RcCascader, _extends({
    prefixCls: prefixCls,
    className: classNames(!customizePrefixCls && cascaderPrefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-lg"), mergedSize === 'large'), "".concat(prefixCls, "-sm"), mergedSize === 'small'), "".concat(prefixCls, "-rtl"), isRtl), "".concat(prefixCls, "-borderless"), !bordered), "".concat(prefixCls, "-in-form-item"), isFormItemInput), getStatusClassNames(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, className),
    disabled: mergedDisabled
  }, restProps, {
    direction: mergedDirection,
    placement: getPlacement(),
    notFoundContent: mergedNotFoundContent,
    allowClear: allowClear,
    showSearch: mergedShowSearch,
    expandIcon: mergedExpandIcon,
    inputIcon: suffixIcon,
    removeIcon: removeIcon,
    clearIcon: clearIcon,
    loadingIcon: loadingIcon,
    checkable: checkable,
    dropdownClassName: mergedDropdownClassName,
    dropdownPrefixCls: customizePrefixCls || cascaderPrefixCls,
    choiceTransitionName: getTransitionName(rootPrefixCls, '', choiceTransitionName),
    transitionName: getTransitionName(rootPrefixCls, getTransitionDirection(placement), transitionName),
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    ref: ref,
    showArrow: hasFeedback || showArrow
  }));
});
if (process.env.NODE_ENV !== 'production') {
  Cascader.displayName = 'Cascader';
}
Cascader.SHOW_PARENT = SHOW_PARENT;
Cascader.SHOW_CHILD = SHOW_CHILD;
export default Cascader;