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
var _VerticalAlignTopOutlined = _interopRequireDefault(require("@ant-design/icons/VerticalAlignTopOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));
var _useMergedState3 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _getScroll = _interopRequireDefault(require("../_util/getScroll"));
var _reactNode = require("../_util/reactNode");
var _scrollTo = _interopRequireDefault(require("../_util/scrollTo"));
var _throttleByAnimationFrame = require("../_util/throttleByAnimationFrame");
var BackTopContent = function BackTopContent(props) {
  var prefixCls = props.prefixCls,
    rootPrefixCls = props.rootPrefixCls,
    children = props.children,
    visible = props.visible;
  var defaultElement = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-content")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-icon")
  }, /*#__PURE__*/React.createElement(_VerticalAlignTopOutlined["default"], null)));
  return /*#__PURE__*/React.createElement(_rcMotion["default"], {
    visible: visible,
    motionName: "".concat(rootPrefixCls, "-fade")
  }, function (_ref) {
    var motionClassName = _ref.className;
    return (0, _reactNode.cloneElement)(children || defaultElement, function (_ref2) {
      var className = _ref2.className;
      return {
        className: (0, _classnames["default"])(motionClassName, className)
      };
    });
  });
};
var BackTop = function BackTop(props) {
  var _useMergedState = (0, _useMergedState3["default"])(false, {
      value: props.visible
    }),
    _useMergedState2 = (0, _slicedToArray2["default"])(_useMergedState, 2),
    visible = _useMergedState2[0],
    setVisible = _useMergedState2[1];
  var ref = /*#__PURE__*/React.createRef();
  var scrollEvent = React.useRef(null);
  var getDefaultTarget = function getDefaultTarget() {
    return ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;
  };
  var handleScroll = (0, _throttleByAnimationFrame.throttleByAnimationFrame)(function (e) {
    var _props$visibilityHeig = props.visibilityHeight,
      visibilityHeight = _props$visibilityHeig === void 0 ? 400 : _props$visibilityHeig;
    var scrollTop = (0, _getScroll["default"])(e.target, true);
    setVisible(scrollTop > visibilityHeight);
  });
  var bindScrollEvent = function bindScrollEvent() {
    var target = props.target;
    var getTarget = target || getDefaultTarget;
    var container = getTarget();
    scrollEvent.current = (0, _addEventListener["default"])(container, 'scroll', function (e) {
      handleScroll(e);
    });
    handleScroll({
      target: container
    });
  };
  React.useEffect(function () {
    bindScrollEvent();
    return function () {
      if (scrollEvent.current) {
        scrollEvent.current.remove();
      }
      handleScroll.cancel();
    };
  }, [props.target]);
  var scrollToTop = function scrollToTop(e) {
    var onClick = props.onClick,
      target = props.target,
      _props$duration = props.duration,
      duration = _props$duration === void 0 ? 450 : _props$duration;
    (0, _scrollTo["default"])(0, {
      getContainer: target || getDefaultTarget,
      duration: duration
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className;
  var prefixCls = getPrefixCls('back-top', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var classString = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  // fix https://fb.me/react-unknown-prop
  var divProps = (0, _omit["default"])(props, ['prefixCls', 'className', 'children', 'visibilityHeight', 'target', 'visible']);
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, divProps, {
    className: classString,
    onClick: scrollToTop,
    ref: ref
  }), /*#__PURE__*/React.createElement(BackTopContent, {
    prefixCls: prefixCls,
    rootPrefixCls: rootPrefixCls,
    visible: visible
  }, props.children));
};
var _default = exports["default"] = /*#__PURE__*/React.memo(BackTop);