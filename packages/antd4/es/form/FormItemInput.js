import _extends from "@babel/runtime/helpers/esm/extends";
import classNames from 'classnames';
import * as React from 'react';
import Col from '../grid/col';
import { FormContext, FormItemPrefixContext } from './context';
import ErrorList from './ErrorList';
var FormItemInput = function FormItemInput(props) {
  var prefixCls = props.prefixCls,
    status = props.status,
    wrapperCol = props.wrapperCol,
    children = props.children,
    errors = props.errors,
    warnings = props.warnings,
    formItemRender = props._internalItemRender,
    extra = props.extra,
    help = props.help,
    fieldId = props.fieldId,
    marginBottom = props.marginBottom,
    onErrorVisibleChanged = props.onErrorVisibleChanged;
  var baseClassName = "".concat(prefixCls, "-item");
  var formContext = React.useContext(FormContext);
  var mergedWrapperCol = wrapperCol || formContext.wrapperCol || {};
  var className = classNames("".concat(baseClassName, "-control"), mergedWrapperCol.className);
  // Pass to sub FormItem should not with col info
  var subFormContext = React.useMemo(function () {
    return _extends({}, formContext);
  }, [formContext]);
  delete subFormContext.labelCol;
  delete subFormContext.wrapperCol;
  var inputDom = /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-control-input")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(baseClassName, "-control-input-content")
  }, children));
  var formItemContext = React.useMemo(function () {
    return {
      prefixCls: prefixCls,
      status: status
    };
  }, [prefixCls, status]);
  var errorListDom = marginBottom !== null || errors.length || warnings.length ? ( /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(FormItemPrefixContext.Provider, {
    value: formItemContext
  }, /*#__PURE__*/React.createElement(ErrorList, {
    fieldId: fieldId,
    errors: errors,
    warnings: warnings,
    help: help,
    helpStatus: status,
    className: "".concat(baseClassName, "-explain-connected"),
    onVisibleChanged: onErrorVisibleChanged
  })), !!marginBottom && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 0,
      height: marginBottom
    }
  }))) : null;
  var extraProps = {};
  if (fieldId) {
    extraProps.id = "".concat(fieldId, "_extra");
  }
  // If extra = 0, && will goes wrong
  // 0&&error -> 0
  var extraDom = extra ? ( /*#__PURE__*/React.createElement("div", _extends({}, extraProps, {
    className: "".concat(baseClassName, "-extra")
  }), extra)) : null;
  var dom = formItemRender && formItemRender.mark === 'pro_table_render' && formItemRender.render ? formItemRender.render(props, {
    input: inputDom,
    errorList: errorListDom,
    extra: extraDom
  }) : ( /*#__PURE__*/React.createElement(React.Fragment, null, inputDom, errorListDom, extraDom));
  return /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: subFormContext
  }, /*#__PURE__*/React.createElement(Col, _extends({}, mergedWrapperCol, {
    className: className
  }), dom));
};
export default FormItemInput;