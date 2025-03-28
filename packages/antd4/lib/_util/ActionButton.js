"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _useState3 = _interopRequireDefault(require("rc-util/lib/hooks/useState"));
var React = _interopRequireWildcard(require("react"));
var _button = _interopRequireDefault(require("../button"));
var _button2 = require("../button/button");
function isThenable(thing) {
  return !!(thing && !!thing.then);
}
var ActionButton = function ActionButton(props) {
  var clickedRef = React.useRef(false);
  var ref = React.useRef(null);
  var _useState = (0, _useState3["default"])(false),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var close = props.close;
  var onInternalClose = function onInternalClose() {
    close === null || close === void 0 ? void 0 : close.apply(void 0, arguments);
  };
  React.useEffect(function () {
    var timeoutId = null;
    if (props.autoFocus) {
      timeoutId = setTimeout(function () {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
      });
    }
    return function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  var handlePromiseOnOk = function handlePromiseOnOk(returnValueOfOnOk) {
    if (!isThenable(returnValueOfOnOk)) {
      return;
    }
    setLoading(true);
    returnValueOfOnOk.then(function () {
      setLoading(false, true);
      onInternalClose.apply(void 0, arguments);
      clickedRef.current = false;
    }, function (e) {
      // See: https://github.com/ant-design/ant-design/issues/6183
      setLoading(false, true);
      clickedRef.current = false;
      return Promise.reject(e);
    });
  };
  var onClick = function onClick(e) {
    var actionFn = props.actionFn;
    if (clickedRef.current) {
      return;
    }
    clickedRef.current = true;
    if (!actionFn) {
      onInternalClose();
      return;
    }
    var returnValueOfOnOk;
    if (props.emitEvent) {
      returnValueOfOnOk = actionFn(e);
      if (props.quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
        clickedRef.current = false;
        onInternalClose(e);
        return;
      }
    } else if (actionFn.length) {
      returnValueOfOnOk = actionFn(close);
      // https://github.com/ant-design/ant-design/issues/23358
      clickedRef.current = false;
    } else {
      returnValueOfOnOk = actionFn();
      if (!returnValueOfOnOk) {
        onInternalClose();
        return;
      }
    }
    handlePromiseOnOk(returnValueOfOnOk);
  };
  var type = props.type,
    children = props.children,
    prefixCls = props.prefixCls,
    buttonProps = props.buttonProps;
  return /*#__PURE__*/React.createElement(_button["default"], (0, _extends2["default"])({}, (0, _button2.convertLegacyProps)(type), {
    onClick: onClick,
    loading: loading,
    prefixCls: prefixCls
  }, buttonProps, {
    ref: ref
  }), children);
};
var _default = exports["default"] = ActionButton;