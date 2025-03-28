import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import VerticalAlignTopOutlined from "@ant-design/icons/es/icons/VerticalAlignTopOutlined";
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import addEventListener from "rc-util/es/Dom/addEventListener";
import useMergedState from "rc-util/es/hooks/useMergedState";
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import { cloneElement } from '../_util/reactNode';
import scrollTo from '../_util/scrollTo';
import { throttleByAnimationFrame } from '../_util/throttleByAnimationFrame';
var BackTopContent = function BackTopContent(props) {
  var prefixCls = props.prefixCls,
    rootPrefixCls = props.rootPrefixCls,
    children = props.children,
    visible = props.visible;
  var defaultElement = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-content")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-icon")
  }, /*#__PURE__*/React.createElement(VerticalAlignTopOutlined, null)));
  return /*#__PURE__*/React.createElement(CSSMotion, {
    visible: visible,
    motionName: "".concat(rootPrefixCls, "-fade")
  }, function (_ref) {
    var motionClassName = _ref.className;
    return cloneElement(children || defaultElement, function (_ref2) {
      var className = _ref2.className;
      return {
        className: classNames(motionClassName, className)
      };
    });
  });
};
var BackTop = function BackTop(props) {
  var _useMergedState = useMergedState(false, {
      value: props.visible
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    visible = _useMergedState2[0],
    setVisible = _useMergedState2[1];
  var ref = /*#__PURE__*/React.createRef();
  var scrollEvent = React.useRef(null);
  var getDefaultTarget = function getDefaultTarget() {
    return ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;
  };
  var handleScroll = throttleByAnimationFrame(function (e) {
    var _props$visibilityHeig = props.visibilityHeight,
      visibilityHeight = _props$visibilityHeig === void 0 ? 400 : _props$visibilityHeig;
    var scrollTop = getScroll(e.target, true);
    setVisible(scrollTop > visibilityHeight);
  });
  var bindScrollEvent = function bindScrollEvent() {
    var target = props.target;
    var getTarget = target || getDefaultTarget;
    var container = getTarget();
    scrollEvent.current = addEventListener(container, 'scroll', function (e) {
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
    scrollTo(0, {
      getContainer: target || getDefaultTarget,
      duration: duration
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className;
  var prefixCls = getPrefixCls('back-top', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var classString = classNames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  // fix https://fb.me/react-unknown-prop
  var divProps = omit(props, ['prefixCls', 'className', 'children', 'visibilityHeight', 'target', 'visible']);
  return /*#__PURE__*/React.createElement("div", _extends({}, divProps, {
    className: classString,
    onClick: scrollToTop,
    ref: ref
  }), /*#__PURE__*/React.createElement(BackTopContent, {
    prefixCls: prefixCls,
    rootPrefixCls: rootPrefixCls,
    visible: visible
  }, props.children));
};
export default /*#__PURE__*/React.memo(BackTop);