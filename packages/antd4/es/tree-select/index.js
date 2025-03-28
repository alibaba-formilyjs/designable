import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import RcTreeSelect, { SHOW_ALL, SHOW_CHILD, SHOW_PARENT, TreeNode } from 'rc-tree-select';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import defaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import getIcons from '../select/utils/iconUtil';
import renderSwitcherIcon from '../tree/utils/iconUtil';
import { getTransitionDirection, getTransitionName } from '../_util/motion';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { useCompactItemContext } from '../space/Compact';
import warning from '../_util/warning';
var InternalTreeSelect = function InternalTreeSelect(_a, ref) {
  var customizePrefixCls = _a.prefixCls,
    customizeSize = _a.size,
    customDisabled = _a.disabled,
    _a$bordered = _a.bordered,
    bordered = _a$bordered === void 0 ? true : _a$bordered,
    className = _a.className,
    treeCheckable = _a.treeCheckable,
    multiple = _a.multiple,
    _a$listHeight = _a.listHeight,
    listHeight = _a$listHeight === void 0 ? 256 : _a$listHeight,
    _a$listItemHeight = _a.listItemHeight,
    listItemHeight = _a$listItemHeight === void 0 ? 26 : _a$listItemHeight,
    placement = _a.placement,
    notFoundContent = _a.notFoundContent,
    _switcherIcon = _a.switcherIcon,
    treeLine = _a.treeLine,
    getPopupContainer = _a.getPopupContainer,
    dropdownClassName = _a.dropdownClassName,
    popupClassName = _a.popupClassName,
    _a$treeIcon = _a.treeIcon,
    treeIcon = _a$treeIcon === void 0 ? false : _a$treeIcon,
    transitionName = _a.transitionName,
    _a$choiceTransitionNa = _a.choiceTransitionName,
    choiceTransitionName = _a$choiceTransitionNa === void 0 ? '' : _a$choiceTransitionNa,
    customStatus = _a.status,
    showArrow = _a.showArrow,
    treeExpandAction = _a.treeExpandAction,
    props = __rest(_a, ["prefixCls", "size", "disabled", "bordered", "className", "treeCheckable", "multiple", "listHeight", "listItemHeight", "placement", "notFoundContent", "switcherIcon", "treeLine", "getPopupContainer", "dropdownClassName", "popupClassName", "treeIcon", "transitionName", "choiceTransitionName", "status", "showArrow", "treeExpandAction"]);
  var _React$useContext = React.useContext(ConfigContext),
    getContextPopupContainer = _React$useContext.getPopupContainer,
    getPrefixCls = _React$useContext.getPrefixCls,
    renderEmpty = _React$useContext.renderEmpty,
    direction = _React$useContext.direction,
    virtual = _React$useContext.virtual,
    dropdownMatchSelectWidth = _React$useContext.dropdownMatchSelectWidth;
  var size = React.useContext(SizeContext);
  process.env.NODE_ENV !== "production" ? warning(multiple !== false || !treeCheckable, 'TreeSelect', '`multiple` will always be `true` when `treeCheckable` is true') : void 0;
  process.env.NODE_ENV !== "production" ? warning(!dropdownClassName, 'TreeSelect', '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.') : void 0;
  var prefixCls = getPrefixCls('select', customizePrefixCls);
  var treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);
  var treeSelectPrefixCls = getPrefixCls('tree-select', customizePrefixCls);
  var _useCompactItemContex = useCompactItemContext(prefixCls, direction),
    compactSize = _useCompactItemContex.compactSize,
    compactItemClassnames = _useCompactItemContex.compactItemClassnames;
  var mergedDropdownClassName = classNames(popupClassName || dropdownClassName, "".concat(treeSelectPrefixCls, "-dropdown"), _defineProperty({}, "".concat(treeSelectPrefixCls, "-dropdown-rtl"), direction === 'rtl'));
  var isMultiple = !!(treeCheckable || multiple);
  var mergedShowArrow = showArrow !== undefined ? showArrow : props.loading || !isMultiple;
  // ===================== Form =====================
  var _useContext = useContext(FormItemInputContext),
    contextStatus = _useContext.status,
    hasFeedback = _useContext.hasFeedback,
    isFormItemInput = _useContext.isFormItemInput,
    feedbackIcon = _useContext.feedbackIcon;
  var mergedStatus = getMergedStatus(contextStatus, customStatus);
  // ===================== Icons =====================
  var _getIcons = getIcons(_extends(_extends({}, props), {
      multiple: isMultiple,
      showArrow: mergedShowArrow,
      hasFeedback: hasFeedback,
      feedbackIcon: feedbackIcon,
      prefixCls: prefixCls
    })),
    suffixIcon = _getIcons.suffixIcon,
    removeIcon = _getIcons.removeIcon,
    clearIcon = _getIcons.clearIcon;
  // ===================== Empty =====================
  var mergedNotFound;
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else {
    mergedNotFound = (renderEmpty || defaultRenderEmpty)('Select');
  }
  // ==================== Render =====================
  var selectProps = omit(props, ['suffixIcon', 'itemIcon', 'removeIcon', 'clearIcon', 'switcherIcon']);
  // ===================== Placement =====================
  var getPlacement = function getPlacement() {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  };
  var mergedSize = compactSize || customizeSize || size;
  // ===================== Disabled =====================
  var disabled = React.useContext(DisabledContext);
  var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  var mergedClassName = classNames(!customizePrefixCls && treeSelectPrefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-lg"), mergedSize === 'large'), "".concat(prefixCls, "-sm"), mergedSize === 'small'), "".concat(prefixCls, "-rtl"), direction === 'rtl'), "".concat(prefixCls, "-borderless"), !bordered), "".concat(prefixCls, "-in-form-item"), isFormItemInput), getStatusClassNames(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, className);
  var rootPrefixCls = getPrefixCls();
  return /*#__PURE__*/React.createElement(RcTreeSelect, _extends({
    virtual: virtual,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth,
    disabled: mergedDisabled
  }, selectProps, {
    ref: ref,
    prefixCls: prefixCls,
    className: mergedClassName,
    listHeight: listHeight,
    listItemHeight: listItemHeight,
    treeCheckable: treeCheckable ? /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-tree-checkbox-inner")
    }) : treeCheckable,
    treeLine: !!treeLine,
    inputIcon: suffixIcon,
    multiple: multiple,
    placement: getPlacement(),
    removeIcon: removeIcon,
    clearIcon: clearIcon,
    switcherIcon: function switcherIcon(nodeProps) {
      return renderSwitcherIcon(treePrefixCls, _switcherIcon, treeLine, nodeProps);
    },
    showTreeIcon: treeIcon,
    notFoundContent: mergedNotFound,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    treeMotion: null,
    dropdownClassName: mergedDropdownClassName,
    choiceTransitionName: getTransitionName(rootPrefixCls, '', choiceTransitionName),
    transitionName: getTransitionName(rootPrefixCls, getTransitionDirection(placement), transitionName),
    showArrow: hasFeedback || showArrow,
    treeExpandAction: treeExpandAction
  }));
};
var TreeSelectRef = /*#__PURE__*/React.forwardRef(InternalTreeSelect);
var TreeSelect = TreeSelectRef;
TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
export { TreeNode };
export default TreeSelect;