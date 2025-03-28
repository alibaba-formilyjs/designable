"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _col = _interopRequireDefault(require("../grid/col"));
var _context = require("./context");
var _ErrorList = _interopRequireDefault(require("./ErrorList"));
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
  var formContext = React.useContext(_context.FormContext);
  var mergedWrapperCol = wrapperCol || formContext.wrapperCol || {};
  var className = (0, _classnames["default"])("".concat(baseClassName, "-control"), mergedWrapperCol.className);
  // Pass to sub FormItem should not with col info
  var subFormContext = React.useMemo(function () {
    return (0, _extends2["default"])({}, formContext);
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
  }, /*#__PURE__*/React.createElement(_context.FormItemPrefixContext.Provider, {
    value: formItemContext
  }, /*#__PURE__*/React.createElement(_ErrorList["default"], {
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
  var extraDom = extra ? ( /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, extraProps, {
    className: "".concat(baseClassName, "-extra")
  }), extra)) : null;
  var dom = formItemRender && formItemRender.mark === 'pro_table_render' && formItemRender.render ? formItemRender.render(props, {
    input: inputDom,
    errorList: errorListDom,
    extra: extraDom
  }) : ( /*#__PURE__*/React.createElement(React.Fragment, null, inputDom, errorListDom, extraDom));
  return /*#__PURE__*/React.createElement(_context.FormContext.Provider, {
    value: subFormContext
  }, /*#__PURE__*/React.createElement(_col["default"], (0, _extends2["default"])({}, mergedWrapperCol, {
    className: className
  }), dom));
};
var _default = exports["default"] = FormItemInput;