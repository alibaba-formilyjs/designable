"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _select = _interopRequireDefault(require("../select"));
var _reactNode = require("../_util/reactNode");
var _warning = _interopRequireDefault(require("../_util/warning"));
/**
 * TODO: 4.0
 *
 * - Remove `dataSource`
 * - `size` not work with customizeInput
 * - CustomizeInput not feedback `ENTER` key since accessibility enhancement
 */

var Option = _select["default"].Option;
function isSelectOptionOrSelectOptGroup(child) {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}
var AutoComplete = function AutoComplete(props, ref) {
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    popupClassName = props.popupClassName,
    dropdownClassName = props.dropdownClassName,
    children = props.children,
    dataSource = props.dataSource;
  var childNodes = (0, _toArray["default"])(children);
  // ============================= Input =============================
  var customizeInput;
  if (childNodes.length === 1 && (0, _reactNode.isValidElement)(childNodes[0]) && !isSelectOptionOrSelectOptGroup(childNodes[0])) {
    var _childNodes = (0, _slicedToArray2["default"])(childNodes, 1);
    customizeInput = _childNodes[0];
  }
  var getInputElement = customizeInput ? function () {
    return customizeInput;
  } : undefined;
  // ============================ Options ============================
  var optionChildren;
  // [Legacy] convert `children` or `dataSource` into option children
  if (childNodes.length && isSelectOptionOrSelectOptGroup(childNodes[0])) {
    optionChildren = children;
  } else {
    optionChildren = dataSource ? dataSource.map(function (item) {
      if ((0, _reactNode.isValidElement)(item)) {
        return item;
      }
      switch ((0, _typeof2["default"])(item)) {
        case 'string':
          return /*#__PURE__*/React.createElement(Option, {
            key: item,
            value: item
          }, item);
        case 'object':
          {
            var optionValue = item.value;
            return /*#__PURE__*/React.createElement(Option, {
              key: optionValue,
              value: optionValue
            }, item.text);
          }
        default:
          process.env.NODE_ENV !== "production" ? (0, _warning["default"])(false, 'AutoComplete', '`dataSource` is only supports type `string[] | Object[]`.') : void 0;
          return undefined;
      }
    }) : [];
  }
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!('dataSource' in props), 'AutoComplete', '`dataSource` is deprecated, please use `options` instead.') : void 0;
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!dropdownClassName, 'AutoComplete', '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.') : void 0;
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!customizeInput || !('size' in props), 'AutoComplete', 'You need to control style self instead of setting `size` when using customize input.') : void 0;
  return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, function (_ref) {
    var getPrefixCls = _ref.getPrefixCls;
    var prefixCls = getPrefixCls('select', customizePrefixCls);
    return /*#__PURE__*/React.createElement(_select["default"], (0, _extends2["default"])({
      ref: ref
    }, (0, _omit["default"])(props, ['dataSource']), {
      prefixCls: prefixCls,
      popupClassName: popupClassName || dropdownClassName,
      className: (0, _classnames["default"])("".concat(prefixCls, "-auto-complete"), className),
      mode: _select["default"].SECRET_COMBOBOX_MODE_DO_NOT_USE
    }, {
      // Internal api
      getInputElement: getInputElement
    }), optionChildren);
  });
};
var RefAutoComplete = /*#__PURE__*/React.forwardRef(AutoComplete);
RefAutoComplete.Option = Option;
var _default = exports["default"] = RefAutoComplete;