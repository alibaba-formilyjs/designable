"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _DeleteOutlined = _interopRequireDefault(require("@ant-design/icons/DeleteOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _checkbox = _interopRequireDefault(require("../checkbox"));
var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));
var _default2 = _interopRequireDefault(require("../locale/default"));
var _transButton = _interopRequireDefault(require("../_util/transButton"));
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
  var className = (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-content-item"), true), "".concat(prefixCls, "-content-item-disabled"), disabled || item.disabled), "".concat(prefixCls, "-content-item-checked"), checked));
  var title;
  if (typeof renderedText === 'string' || typeof renderedText === 'number') {
    title = String(renderedText);
  }
  return /*#__PURE__*/React.createElement(_LocaleReceiver["default"], {
    componentName: "Transfer",
    defaultLocale: _default2["default"].Transfer
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
      return /*#__PURE__*/React.createElement("li", (0, _extends2["default"])({}, liProps), labelNode, /*#__PURE__*/React.createElement(_transButton["default"], {
        disabled: disabled || item.disabled,
        className: "".concat(prefixCls, "-content-item-remove"),
        "aria-label": contextLocale.remove,
        onClick: function onClick() {
          onRemove === null || onRemove === void 0 ? void 0 : onRemove(item);
        }
      }, /*#__PURE__*/React.createElement(_DeleteOutlined["default"], null)));
    }
    // Default click to select
    liProps.onClick = disabled || item.disabled ? undefined : function () {
      return onClick(item);
    };
    return /*#__PURE__*/React.createElement("li", (0, _extends2["default"])({}, liProps), /*#__PURE__*/React.createElement(_checkbox["default"], {
      className: "".concat(prefixCls, "-checkbox"),
      checked: checked,
      disabled: disabled || item.disabled
    }), labelNode);
  });
};
var _default = exports["default"] = /*#__PURE__*/React.memo(ListItem);