import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import EllipsisOutlined from "@ant-design/icons/es/icons/EllipsisOutlined";
import PlusOutlined from "@ant-design/icons/es/icons/PlusOutlined";
import classNames from 'classnames';
import RcTabs from 'rc-tabs';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import warning from '../_util/warning';
import useAnimateConfig from './hooks/useAnimateConfig';
import useLegacyItems from './hooks/useLegacyItems';
import TabPane from './TabPane';
function Tabs(_a) {
  var type = _a.type,
    className = _a.className,
    propSize = _a.size,
    _onEdit = _a.onEdit,
    hideAdd = _a.hideAdd,
    centered = _a.centered,
    addIcon = _a.addIcon,
    children = _a.children,
    items = _a.items,
    animated = _a.animated,
    props = __rest(_a, ["type", "className", "size", "onEdit", "hideAdd", "centered", "addIcon", "children", "items", "animated"]);
  var customizePrefixCls = props.prefixCls,
    _props$moreIcon = props.moreIcon,
    moreIcon = _props$moreIcon === void 0 ? /*#__PURE__*/React.createElement(EllipsisOutlined, null) : _props$moreIcon;
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction,
    getPopupContainer = _React$useContext.getPopupContainer;
  var prefixCls = getPrefixCls('tabs', customizePrefixCls);
  var editable;
  if (type === 'editable-card') {
    editable = {
      onEdit: function onEdit(editType, _ref) {
        var key = _ref.key,
          event = _ref.event;
        _onEdit === null || _onEdit === void 0 ? void 0 : _onEdit(editType === 'add' ? event : key, editType);
      },
      removeIcon: /*#__PURE__*/React.createElement(CloseOutlined, null),
      addIcon: addIcon || /*#__PURE__*/React.createElement(PlusOutlined, null),
      showAdd: hideAdd !== true
    };
  }
  var rootPrefixCls = getPrefixCls();
  process.env.NODE_ENV !== "production" ? warning(!('onPrevClick' in props) && !('onNextClick' in props), 'Tabs', '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.') : void 0;
  var mergedItems = useLegacyItems(items, children);
  var mergedAnimated = useAnimateConfig(prefixCls, animated);
  return /*#__PURE__*/React.createElement(SizeContext.Consumer, null, function (contextSize) {
    var size = propSize !== undefined ? propSize : contextSize;
    return /*#__PURE__*/React.createElement(RcTabs, _extends({
      direction: direction,
      getPopupContainer: getPopupContainer,
      moreTransitionName: "".concat(rootPrefixCls, "-slide-up")
    }, props, {
      items: mergedItems,
      className: classNames(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-").concat(size), size), "".concat(prefixCls, "-card"), ['card', 'editable-card'].includes(type)), "".concat(prefixCls, "-editable-card"), type === 'editable-card'), "".concat(prefixCls, "-centered"), centered), className),
      editable: editable,
      moreIcon: moreIcon,
      prefixCls: prefixCls,
      animated: mergedAnimated
    }));
  });
}
Tabs.TabPane = TabPane;
export default Tabs;