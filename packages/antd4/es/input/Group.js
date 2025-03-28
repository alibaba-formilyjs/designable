import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import classNames from 'classnames';
import * as React from 'react';
import { useContext, useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import { FormItemInputContext } from '../form/context';
var Group = function Group(props) {
  var _useContext = useContext(ConfigContext),
    getPrefixCls = _useContext.getPrefixCls,
    direction = _useContext.direction;
  var customizePrefixCls = props.prefixCls,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className;
  var prefixCls = getPrefixCls('input-group', customizePrefixCls);
  var cls = classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-lg"), props.size === 'large'), "".concat(prefixCls, "-sm"), props.size === 'small'), "".concat(prefixCls, "-compact"), props.compact), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  var formItemContext = useContext(FormItemInputContext);
  var groupFormItemContext = useMemo(function () {
    return _extends(_extends({}, formItemContext), {
      isFormItemInput: false
    });
  }, [formItemContext]);
  return /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: props.style,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onFocus: props.onFocus,
    onBlur: props.onBlur
  }, /*#__PURE__*/React.createElement(FormItemInputContext.Provider, {
    value: groupFormItemContext
  }, props.children));
};
export default Group;