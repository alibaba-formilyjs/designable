import CheckOutlined from "@ant-design/icons/es/icons/CheckOutlined";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import DownOutlined from "@ant-design/icons/es/icons/DownOutlined";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import SearchOutlined from "@ant-design/icons/es/icons/SearchOutlined";
import * as React from 'react';
export default function getIcons(_ref) {
  var suffixIcon = _ref.suffixIcon,
    clearIcon = _ref.clearIcon,
    menuItemSelectedIcon = _ref.menuItemSelectedIcon,
    removeIcon = _ref.removeIcon,
    loading = _ref.loading,
    multiple = _ref.multiple,
    hasFeedback = _ref.hasFeedback,
    prefixCls = _ref.prefixCls,
    showArrow = _ref.showArrow,
    feedbackIcon = _ref.feedbackIcon;
  // Clear Icon
  var mergedClearIcon = clearIcon !== null && clearIcon !== void 0 ? clearIcon : /*#__PURE__*/React.createElement(CloseCircleFilled, null);
  // Validation Feedback Icon
  var getSuffixIconNode = function getSuffixIconNode(arrowIcon) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, showArrow !== false && arrowIcon, hasFeedback && feedbackIcon);
  };
  // Arrow item icon
  var mergedSuffixIcon = null;
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = getSuffixIconNode(suffixIcon);
  } else if (loading) {
    mergedSuffixIcon = getSuffixIconNode( /*#__PURE__*/React.createElement(LoadingOutlined, {
      spin: true
    }));
  } else {
    var iconCls = "".concat(prefixCls, "-suffix");
    mergedSuffixIcon = function mergedSuffixIcon(_ref2) {
      var open = _ref2.open,
        showSearch = _ref2.showSearch;
      if (open && showSearch) {
        return getSuffixIconNode( /*#__PURE__*/React.createElement(SearchOutlined, {
          className: iconCls
        }));
      }
      return getSuffixIconNode( /*#__PURE__*/React.createElement(DownOutlined, {
        className: iconCls
      }));
    };
  }
  // Checked item icon
  var mergedItemIcon = null;
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    mergedItemIcon = /*#__PURE__*/React.createElement(CheckOutlined, null);
  } else {
    mergedItemIcon = null;
  }
  var mergedRemoveIcon = null;
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon;
  } else {
    mergedRemoveIcon = /*#__PURE__*/React.createElement(CloseOutlined, null);
  }
  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon
  };
}