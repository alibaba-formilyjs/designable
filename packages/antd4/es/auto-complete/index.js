import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
/**
 * TODO: 4.0
 *
 * - Remove `dataSource`
 * - `size` not work with customizeInput
 * - CustomizeInput not feedback `ENTER` key since accessibility enhancement
 */
import classNames from 'classnames';
import toArray from "rc-util/es/Children/toArray";
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigConsumer } from '../config-provider';
import Select from '../select';
import { isValidElement } from '../_util/reactNode';
import warning from '../_util/warning';
var Option = Select.Option;
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
  var childNodes = toArray(children);
  // ============================= Input =============================
  var customizeInput;
  if (childNodes.length === 1 && isValidElement(childNodes[0]) && !isSelectOptionOrSelectOptGroup(childNodes[0])) {
    var _childNodes = _slicedToArray(childNodes, 1);
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
      if (isValidElement(item)) {
        return item;
      }
      switch (_typeof(item)) {
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
          process.env.NODE_ENV !== "production" ? warning(false, 'AutoComplete', '`dataSource` is only supports type `string[] | Object[]`.') : void 0;
          return undefined;
      }
    }) : [];
  }
  process.env.NODE_ENV !== "production" ? warning(!('dataSource' in props), 'AutoComplete', '`dataSource` is deprecated, please use `options` instead.') : void 0;
  process.env.NODE_ENV !== "production" ? warning(!dropdownClassName, 'AutoComplete', '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.') : void 0;
  process.env.NODE_ENV !== "production" ? warning(!customizeInput || !('size' in props), 'AutoComplete', 'You need to control style self instead of setting `size` when using customize input.') : void 0;
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_ref) {
    var getPrefixCls = _ref.getPrefixCls;
    var prefixCls = getPrefixCls('select', customizePrefixCls);
    return /*#__PURE__*/React.createElement(Select, _extends({
      ref: ref
    }, omit(props, ['dataSource']), {
      prefixCls: prefixCls,
      popupClassName: popupClassName || dropdownClassName,
      className: classNames("".concat(prefixCls, "-auto-complete"), className),
      mode: Select.SECRET_COMBOBOX_MODE_DO_NOT_USE
    }, {
      // Internal api
      getInputElement: getInputElement
    }), optionChildren);
  });
};
var RefAutoComplete = /*#__PURE__*/React.forwardRef(AutoComplete);
RefAutoComplete.Option = Option;
export default RefAutoComplete;