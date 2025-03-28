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
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import Skeleton from '../skeleton';
import Tabs from '../tabs';
import Grid from './Grid';
function getAction(actions) {
  var actionList = actions.map(function (action, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement("li", {
        style: {
          width: "".concat(100 / actions.length, "%")
        },
        key: "action-".concat(index)
      }, /*#__PURE__*/React.createElement("span", null, action))
    );
  });
  return actionList;
}
var Card = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var size = React.useContext(SizeContext);
  var onTabChange = function onTabChange(key) {
    var _a;
    (_a = props.onTabChange) === null || _a === void 0 ? void 0 : _a.call(props, key);
  };
  var isContainGrid = function isContainGrid() {
    var containGrid;
    React.Children.forEach(props.children, function (element) {
      if (element && element.type && element.type === Grid) {
        containGrid = true;
      }
    });
    return containGrid;
  };
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    extra = props.extra,
    _props$headStyle = props.headStyle,
    headStyle = _props$headStyle === void 0 ? {} : _props$headStyle,
    _props$bodyStyle = props.bodyStyle,
    bodyStyle = _props$bodyStyle === void 0 ? {} : _props$bodyStyle,
    title = props.title,
    loading = props.loading,
    _props$bordered = props.bordered,
    bordered = _props$bordered === void 0 ? true : _props$bordered,
    customizeSize = props.size,
    type = props.type,
    cover = props.cover,
    actions = props.actions,
    tabList = props.tabList,
    children = props.children,
    activeTabKey = props.activeTabKey,
    defaultActiveTabKey = props.defaultActiveTabKey,
    tabBarExtraContent = props.tabBarExtraContent,
    hoverable = props.hoverable,
    _props$tabProps = props.tabProps,
    tabProps = _props$tabProps === void 0 ? {} : _props$tabProps,
    others = __rest(props, ["prefixCls", "className", "extra", "headStyle", "bodyStyle", "title", "loading", "bordered", "size", "type", "cover", "actions", "tabList", "children", "activeTabKey", "defaultActiveTabKey", "tabBarExtraContent", "hoverable", "tabProps"]);
  var prefixCls = getPrefixCls('card', customizePrefixCls);
  var loadingBlock = /*#__PURE__*/React.createElement(Skeleton, {
    loading: true,
    active: true,
    paragraph: {
      rows: 4
    },
    title: false
  }, children);
  var hasActiveTabKey = activeTabKey !== undefined;
  var extraProps = _extends(_extends({}, tabProps), _defineProperty(_defineProperty({}, hasActiveTabKey ? 'activeKey' : 'defaultActiveKey', hasActiveTabKey ? activeTabKey : defaultActiveTabKey), "tabBarExtraContent", tabBarExtraContent));
  var head;
  var tabs = tabList && tabList.length ? ( /*#__PURE__*/React.createElement(Tabs, _extends({
    size: "large"
  }, extraProps, {
    className: "".concat(prefixCls, "-head-tabs"),
    onChange: onTabChange,
    items: tabList.map(function (item) {
      var _a;
      return {
        label: item.tab,
        key: item.key,
        disabled: (_a = item.disabled) !== null && _a !== void 0 ? _a : false
      };
    })
  }))) : null;
  if (title || extra || tabs) {
    head = /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-head"),
      style: headStyle
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-head-wrapper")
    }, title && /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-head-title")
    }, title), extra && /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-extra")
    }, extra)), tabs);
  }
  var coverDom = cover ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-cover")
  }, cover) : null;
  var body = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-body"),
    style: bodyStyle
  }, loading ? loadingBlock : children);
  var actionDom = actions && actions.length ? ( /*#__PURE__*/React.createElement("ul", {
    className: "".concat(prefixCls, "-actions")
  }, getAction(actions))) : null;
  var divProps = omit(others, ['onTabChange']);
  var mergedSize = customizeSize || size;
  var classString = classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-loading"), loading), "".concat(prefixCls, "-bordered"), bordered), "".concat(prefixCls, "-hoverable"), hoverable), "".concat(prefixCls, "-contain-grid"), isContainGrid()), "".concat(prefixCls, "-contain-tabs"), tabList && tabList.length), "".concat(prefixCls, "-").concat(mergedSize), mergedSize), "".concat(prefixCls, "-type-").concat(type), !!type), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref
  }, divProps, {
    className: classString
  }), head, coverDom, body, actionDom);
});
export default Card;