"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "List", {
  enumerable: true,
  get: function get() {
    return _rcFieldForm.List;
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "useForm", {
  enumerable: true,
  get: function get() {
    return _useForm3["default"];
  }
});
Object.defineProperty(exports, "useWatch", {
  enumerable: true,
  get: function get() {
    return _rcFieldForm.useWatch;
  }
});
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcFieldForm = _interopRequireWildcard(require("rc-field-form"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _configProvider = require("../config-provider");
var _DisabledContext = _interopRequireWildcard(require("../config-provider/DisabledContext"));
var _SizeContext = _interopRequireWildcard(require("../config-provider/SizeContext"));
var _context = require("./context");
var _validateMessagesContext = _interopRequireDefault(require("./validateMessagesContext"));
var _useForm3 = _interopRequireDefault(require("./hooks/useForm"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var InternalForm = function InternalForm(props, ref) {
  var contextSize = React.useContext(_SizeContext["default"]);
  var contextDisabled = React.useContext(_DisabledContext["default"]);
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction,
    contextForm = _React$useContext.form;
  var customizePrefixCls = props.prefixCls,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    _props$size = props.size,
    size = _props$size === void 0 ? contextSize : _props$size,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? contextDisabled : _props$disabled,
    form = props.form,
    colon = props.colon,
    labelAlign = props.labelAlign,
    labelWrap = props.labelWrap,
    labelCol = props.labelCol,
    wrapperCol = props.wrapperCol,
    hideRequiredMark = props.hideRequiredMark,
    _props$layout = props.layout,
    layout = _props$layout === void 0 ? 'horizontal' : _props$layout,
    scrollToFirstError = props.scrollToFirstError,
    requiredMark = props.requiredMark,
    onFinishFailed = props.onFinishFailed,
    name = props.name,
    restFormProps = __rest(props, ["prefixCls", "className", "size", "disabled", "form", "colon", "labelAlign", "labelWrap", "labelCol", "wrapperCol", "hideRequiredMark", "layout", "scrollToFirstError", "requiredMark", "onFinishFailed", "name"]);
  var contextValidateMessages = React.useContext(_validateMessagesContext["default"]);
  var mergedRequiredMark = (0, _react.useMemo)(function () {
    if (requiredMark !== undefined) {
      return requiredMark;
    }
    if (contextForm && contextForm.requiredMark !== undefined) {
      return contextForm.requiredMark;
    }
    if (hideRequiredMark) {
      return false;
    }
    return true;
  }, [hideRequiredMark, requiredMark, contextForm]);
  var mergedColon = colon !== null && colon !== void 0 ? colon : contextForm === null || contextForm === void 0 ? void 0 : contextForm.colon;
  var prefixCls = getPrefixCls('form', customizePrefixCls);
  var formClassName = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-").concat(layout), true), "".concat(prefixCls, "-hide-required-mark"), mergedRequiredMark === false), "".concat(prefixCls, "-rtl"), direction === 'rtl'), "".concat(prefixCls, "-").concat(size), size), className);
  var _useForm = (0, _useForm3["default"])(form),
    _useForm2 = (0, _slicedToArray2["default"])(_useForm, 1),
    wrapForm = _useForm2[0];
  var __INTERNAL__ = wrapForm.__INTERNAL__;
  __INTERNAL__.name = name;
  var formContextValue = (0, _react.useMemo)(function () {
    return {
      name: name,
      labelAlign: labelAlign,
      labelCol: labelCol,
      labelWrap: labelWrap,
      wrapperCol: wrapperCol,
      vertical: layout === 'vertical',
      colon: mergedColon,
      requiredMark: mergedRequiredMark,
      itemRef: __INTERNAL__.itemRef,
      form: wrapForm
    };
  }, [name, labelAlign, labelCol, wrapperCol, layout, mergedColon, mergedRequiredMark, wrapForm]);
  React.useImperativeHandle(ref, function () {
    return wrapForm;
  });
  var onInternalFinishFailed = function onInternalFinishFailed(errorInfo) {
    onFinishFailed === null || onFinishFailed === void 0 ? void 0 : onFinishFailed(errorInfo);
    var defaultScrollToFirstError = {
      block: 'nearest'
    };
    if (scrollToFirstError && errorInfo.errorFields.length) {
      if ((0, _typeof2["default"])(scrollToFirstError) === 'object') {
        defaultScrollToFirstError = scrollToFirstError;
      }
      wrapForm.scrollToField(errorInfo.errorFields[0].name, defaultScrollToFirstError);
    }
  };
  return /*#__PURE__*/React.createElement(_DisabledContext.DisabledContextProvider, {
    disabled: disabled
  }, /*#__PURE__*/React.createElement(_SizeContext.SizeContextProvider, {
    size: size
  }, /*#__PURE__*/React.createElement(_context.FormProvider, (0, _extends2["default"])({}, {
    // This is not list in API, we pass with spread
    validateMessages: contextValidateMessages
  }), /*#__PURE__*/React.createElement(_context.FormContext.Provider, {
    value: formContextValue
  }, /*#__PURE__*/React.createElement(_rcFieldForm["default"], (0, _extends2["default"])({
    id: name
  }, restFormProps, {
    name: name,
    onFinishFailed: onInternalFinishFailed,
    form: wrapForm,
    className: formClassName
  }))))));
};
var Form = /*#__PURE__*/React.forwardRef(InternalForm);
var _default = exports["default"] = Form;