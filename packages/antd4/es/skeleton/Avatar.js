import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Element from './Element';
var SkeletonAvatar = function SkeletonAvatar(props) {
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    active = props.active,
    _props$shape = props.shape,
    shape = _props$shape === void 0 ? 'circle' : _props$shape,
    _props$size = props.size,
    size = _props$size === void 0 ? 'default' : _props$size;
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  var otherProps = omit(props, ['prefixCls', 'className']);
  var cls = classNames(prefixCls, "".concat(prefixCls, "-element"), _defineProperty({}, "".concat(prefixCls, "-active"), active), className);
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, /*#__PURE__*/React.createElement(Element, _extends({
    prefixCls: "".concat(prefixCls, "-avatar"),
    shape: shape,
    size: size
  }, otherProps)));
};
export default SkeletonAvatar;