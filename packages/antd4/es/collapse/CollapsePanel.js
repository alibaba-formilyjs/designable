import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import classNames from 'classnames';
import RcCollapse from 'rc-collapse';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';
var CollapsePanel = function CollapsePanel(props) {
  process.env.NODE_ENV !== "production" ? warning(!('disabled' in props), 'Collapse.Panel', '`disabled` is deprecated. Please use `collapsible="disabled"` instead.') : void 0;
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var customizePrefixCls = props.prefixCls,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    _props$showArrow = props.showArrow,
    showArrow = _props$showArrow === void 0 ? true : _props$showArrow;
  var prefixCls = getPrefixCls('collapse', customizePrefixCls);
  var collapsePanelClassName = classNames(_defineProperty({}, "".concat(prefixCls, "-no-arrow"), !showArrow), className);
  return /*#__PURE__*/React.createElement(RcCollapse.Panel, _extends({}, props, {
    prefixCls: prefixCls,
    className: collapsePanelClassName
  }));
};
export default CollapsePanel;