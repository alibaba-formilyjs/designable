"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LayoutContext = exports.Header = exports.Footer = exports.Content = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var LayoutContext = exports.LayoutContext = /*#__PURE__*/React.createContext({
  siderHook: {
    addSider: function addSider() {
      return null;
    },
    removeSider: function removeSider() {
      return null;
    }
  }
});
function generator(_ref) {
  var suffixCls = _ref.suffixCls,
    tagName = _ref.tagName,
    displayName = _ref.displayName;
  return function (BasicComponent) {
    var Adapter = /*#__PURE__*/React.forwardRef(function (props, ref) {
      var _React$useContext = React.useContext(_configProvider.ConfigContext),
        getPrefixCls = _React$useContext.getPrefixCls;
      var customizePrefixCls = props.prefixCls;
      var prefixCls = getPrefixCls(suffixCls, customizePrefixCls);
      return /*#__PURE__*/React.createElement(BasicComponent, (0, _extends2["default"])({
        ref: ref,
        prefixCls: prefixCls,
        tagName: tagName
      }, props));
    });
    if (process.env.NODE_ENV !== 'production') {
      Adapter.displayName = displayName;
    }
    return Adapter;
  };
}
var Basic = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var prefixCls = props.prefixCls,
    className = props.className,
    children = props.children,
    tagName = props.tagName,
    others = __rest(props, ["prefixCls", "className", "children", "tagName"]);
  var classString = (0, _classnames["default"])(prefixCls, className);
  return /*#__PURE__*/React.createElement(tagName, (0, _extends2["default"])((0, _extends2["default"])({
    className: classString
  }, others), {
    ref: ref
  }), children);
});
var BasicLayout = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useContext2 = React.useContext(_configProvider.ConfigContext),
    direction = _React$useContext2.direction;
  var _React$useState = React.useState([]),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    siders = _React$useState2[0],
    setSiders = _React$useState2[1];
  var prefixCls = props.prefixCls,
    className = props.className,
    children = props.children,
    hasSider = props.hasSider,
    Tag = props.tagName,
    others = __rest(props, ["prefixCls", "className", "children", "hasSider", "tagName"]);
  var classString = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-has-sider"), typeof hasSider === 'boolean' ? hasSider : siders.length > 0), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  var contextValue = React.useMemo(function () {
    return {
      siderHook: {
        addSider: function addSider(id) {
          setSiders(function (prev) {
            return [].concat((0, _toConsumableArray2["default"])(prev), [id]);
          });
        },
        removeSider: function removeSider(id) {
          setSiders(function (prev) {
            return prev.filter(function (currentId) {
              return currentId !== id;
            });
          });
        }
      }
    };
  }, []);
  return /*#__PURE__*/React.createElement(LayoutContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Tag, (0, _extends2["default"])({
    ref: ref,
    className: classString
  }, others), children));
});
var Layout = generator({
  suffixCls: 'layout',
  tagName: 'section',
  displayName: 'Layout'
})(BasicLayout);
var Header = exports.Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  displayName: 'Header'
})(Basic);
var Footer = exports.Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  displayName: 'Footer'
})(Basic);
var Content = exports.Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  displayName: 'Content'
})(Basic);
var _default = exports["default"] = Layout;