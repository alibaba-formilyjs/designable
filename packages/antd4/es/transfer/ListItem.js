import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import classNames from 'classnames';
import * as React from 'react';
import Checkbox from '../checkbox';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import TransButton from '../_util/transButton';
var ListItem = function ListItem(props) {
  var renderedText = props.renderedText,
    renderedEl = props.renderedEl,
    item = props.item,
    checked = props.checked,
    disabled = props.disabled,
    prefixCls = props.prefixCls,
    onClick = props.onClick,
    onRemove = props.onRemove,
    showRemove = props.showRemove;
  var className = classNames(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-content-item"), true), "".concat(prefixCls, "-content-item-disabled"), disabled || item.disabled), "".concat(prefixCls, "-content-item-checked"), checked));
  var title;
  if (typeof renderedText === 'string' || typeof renderedText === 'number') {
    title = String(renderedText);
  }
  return /*#__PURE__*/React.createElement(LocaleReceiver, {
    componentName: "Transfer",
    defaultLocale: defaultLocale.Transfer
  }, function (contextLocale) {
    var liProps = {
      className: className,
      title: title
    };
    var labelNode = /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-content-item-text")
    }, renderedEl);
    // Show remove
    if (showRemove) {
      return /*#__PURE__*/React.createElement("li", _extends({}, liProps), labelNode, /*#__PURE__*/React.createElement(TransButton, {
        disabled: disabled || item.disabled,
        className: "".concat(prefixCls, "-content-item-remove"),
        "aria-label": contextLocale.remove,
        onClick: function onClick() {
          onRemove === null || onRemove === void 0 ? void 0 : onRemove(item);
        }
      }, /*#__PURE__*/React.createElement(DeleteOutlined, null)));
    }
    // Default click to select
    liProps.onClick = disabled || item.disabled ? undefined : function () {
      return onClick(item);
    };
    return /*#__PURE__*/React.createElement("li", _extends({}, liProps), /*#__PURE__*/React.createElement(Checkbox, {
      className: "".concat(prefixCls, "-checkbox"),
      checked: checked,
      disabled: disabled || item.disabled
    }), labelNode);
  });
};
export default /*#__PURE__*/React.memo(ListItem);