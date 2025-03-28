import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import DotChartOutlined from "@ant-design/icons/es/icons/DotChartOutlined";
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
var SkeletonNode = function SkeletonNode(props) {
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    style = props.style,
    active = props.active,
    children = props.children;
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  var cls = classNames(prefixCls, "".concat(prefixCls, "-element"), _defineProperty({}, "".concat(prefixCls, "-active"), active), className);
  var content = children !== null && children !== void 0 ? children : /*#__PURE__*/React.createElement(DotChartOutlined, null);
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames("".concat(prefixCls, "-image"), className),
    style: style
  }, content));
};
export default SkeletonNode;