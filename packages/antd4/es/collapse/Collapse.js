import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import classNames from 'classnames';
import RcCollapse from 'rc-collapse';
import * as React from 'react';
import toArray from "rc-util/es/Children/toArray";
import omit from "rc-util/es/omit";
import { ConfigContext } from '../config-provider';
import collapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import warning from '../_util/warning';
import CollapsePanel from './CollapsePanel';
var Collapse = function Collapse(props) {
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    _props$bordered = props.bordered,
    bordered = _props$bordered === void 0 ? true : _props$bordered,
    ghost = props.ghost,
    _props$expandIconPosi = props.expandIconPosition,
    expandIconPosition = _props$expandIconPosi === void 0 ? 'start' : _props$expandIconPosi;
  var prefixCls = getPrefixCls('collapse', customizePrefixCls);
  // Warning if use legacy type `expandIconPosition`
  process.env.NODE_ENV !== "production" ? warning(expandIconPosition !== 'left' && expandIconPosition !== 'right', 'Collapse', '`expandIconPosition` with `left` or `right` is deprecated. Please use `start` or `end` instead.') : void 0;
  // Align with logic position
  var mergedExpandIconPosition = React.useMemo(function () {
    if (expandIconPosition === 'left') {
      return 'start';
    }
    return expandIconPosition === 'right' ? 'end' : expandIconPosition;
  }, [expandIconPosition]);
  var renderExpandIcon = function renderExpandIcon() {
    var panelProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var expandIcon = props.expandIcon;
    var icon = expandIcon ? expandIcon(panelProps) : ( /*#__PURE__*/React.createElement(RightOutlined, {
      rotate: panelProps.isActive ? 90 : undefined
    }));
    return cloneElement(icon, function () {
      return {
        className: classNames(icon.props.className, "".concat(prefixCls, "-arrow"))
      };
    });
  };
  var collapseClassName = classNames("".concat(prefixCls, "-icon-position-").concat(mergedExpandIconPosition), _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-borderless"), !bordered), "".concat(prefixCls, "-rtl"), direction === 'rtl'), "".concat(prefixCls, "-ghost"), !!ghost), className);
  var openMotion = _extends(_extends({}, collapseMotion), {
    motionAppear: false,
    leavedClassName: "".concat(prefixCls, "-content-hidden")
  });
  var getItems = function getItems() {
    var children = props.children;
    return toArray(children).map(function (child, index) {
      var _a;
      if ((_a = child.props) === null || _a === void 0 ? void 0 : _a.disabled) {
        var key = child.key || String(index);
        var _child$props = child.props,
          disabled = _child$props.disabled,
          collapsible = _child$props.collapsible;
        var childProps = _extends(_extends({}, omit(child.props, ['disabled'])), {
          key: key,
          collapsible: collapsible !== null && collapsible !== void 0 ? collapsible : disabled ? 'disabled' : undefined
        });
        return cloneElement(child, childProps);
      }
      return child;
    });
  };
  return /*#__PURE__*/React.createElement(RcCollapse, _extends({
    openMotion: openMotion
  }, props, {
    expandIcon: renderExpandIcon,
    prefixCls: prefixCls,
    className: collapseClassName
  }), getItems());
};
Collapse.Panel = CollapsePanel;
export default Collapse;