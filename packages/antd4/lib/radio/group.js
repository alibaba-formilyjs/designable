"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _useMergedState3 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _getDataOrAriaProps = _interopRequireDefault(require("../_util/getDataOrAriaProps"));
var _context = require("./context");
var _radio = _interopRequireDefault(require("./radio"));
var RadioGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var size = React.useContext(_SizeContext["default"]);
  var _useMergedState = (0, _useMergedState3["default"])(props.defaultValue, {
      value: props.value
    }),
    _useMergedState2 = (0, _slicedToArray2["default"])(_useMergedState, 2),
    value = _useMergedState2[0],
    setValue = _useMergedState2[1];
  var onRadioChange = function onRadioChange(ev) {
    var lastValue = value;
    var val = ev.target.value;
    if (!('value' in props)) {
      setValue(val);
    }
    var onChange = props.onChange;
    if (onChange && val !== lastValue) {
      onChange(ev);
    }
  };
  var customizePrefixCls = props.prefixCls,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    options = props.options,
    _props$buttonStyle = props.buttonStyle,
    buttonStyle = _props$buttonStyle === void 0 ? 'outline' : _props$buttonStyle,
    disabled = props.disabled,
    children = props.children,
    customizeSize = props.size,
    style = props.style,
    id = props.id,
    onMouseEnter = props.onMouseEnter,
    onMouseLeave = props.onMouseLeave,
    onFocus = props.onFocus,
    onBlur = props.onBlur;
  var prefixCls = getPrefixCls('radio', customizePrefixCls);
  var groupPrefixCls = "".concat(prefixCls, "-group");
  var childrenToRender = children;
  // 如果存在 options, 优先使用
  if (options && options.length > 0) {
    childrenToRender = options.map(function (option) {
      if (typeof option === 'string' || typeof option === 'number') {
        // 此处类型自动推导为 string
        return /*#__PURE__*/React.createElement(_radio["default"], {
          key: option.toString(),
          prefixCls: prefixCls,
          disabled: disabled,
          value: option,
          checked: value === option
        }, option);
      }
      // 此处类型自动推导为 { label: string value: string }
      return /*#__PURE__*/React.createElement(_radio["default"], {
        key: "radio-group-value-options-".concat(option.value),
        prefixCls: prefixCls,
        disabled: option.disabled || disabled,
        value: option.value,
        checked: value === option.value,
        style: option.style
      }, option.label);
    });
  }
  var mergedSize = customizeSize || size;
  var classString = (0, _classnames["default"])(groupPrefixCls, "".concat(groupPrefixCls, "-").concat(buttonStyle), (0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(groupPrefixCls, "-").concat(mergedSize), mergedSize), "".concat(groupPrefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, (0, _getDataOrAriaProps["default"])(props), {
    className: classString,
    style: style,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onFocus: onFocus,
    onBlur: onBlur,
    id: id,
    ref: ref
  }), /*#__PURE__*/React.createElement(_context.RadioGroupContextProvider, {
    value: {
      onChange: onRadioChange,
      value: value,
      disabled: props.disabled,
      name: props.name,
      optionType: props.optionType
    }
  }, childrenToRender));
});
var _default = exports["default"] = /*#__PURE__*/React.memo(RadioGroup);