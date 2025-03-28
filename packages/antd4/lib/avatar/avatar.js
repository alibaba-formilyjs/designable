"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));
var _ref = require("rc-util/lib/ref");
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _useBreakpoint = _interopRequireDefault(require("../grid/hooks/useBreakpoint"));
var _responsiveObserve = require("../_util/responsiveObserve");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _SizeContext = _interopRequireDefault(require("./SizeContext"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var InternalAvatar = function InternalAvatar(props, ref) {
  var groupSize = React.useContext(_SizeContext["default"]);
  var _React$useState = React.useState(1),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    scale = _React$useState2[0],
    setScale = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
    mounted = _React$useState4[0],
    setMounted = _React$useState4[1];
  var _React$useState5 = React.useState(true),
    _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
    isImgExist = _React$useState6[0],
    setIsImgExist = _React$useState6[1];
  var avatarNodeRef = React.useRef(null);
  var avatarChildrenRef = React.useRef(null);
  var avatarNodeMergeRef = (0, _ref.composeRef)(ref, avatarNodeRef);
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var setScaleParam = function setScaleParam() {
    if (!avatarChildrenRef.current || !avatarNodeRef.current) {
      return;
    }
    var childrenWidth = avatarChildrenRef.current.offsetWidth; // offsetWidth avoid affecting be transform scale
    var nodeWidth = avatarNodeRef.current.offsetWidth;
    // denominator is 0 is no meaning
    if (childrenWidth !== 0 && nodeWidth !== 0) {
      var _props$gap = props.gap,
        gap = _props$gap === void 0 ? 4 : _props$gap;
      if (gap * 2 < nodeWidth) {
        setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
      }
    }
  };
  React.useEffect(function () {
    setMounted(true);
  }, []);
  React.useEffect(function () {
    setIsImgExist(true);
    setScale(1);
  }, [props.src]);
  React.useEffect(function () {
    setScaleParam();
  }, [props.gap]);
  var handleImgLoadError = function handleImgLoadError() {
    var onError = props.onError;
    var errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };
  var customizePrefixCls = props.prefixCls,
    _props$shape = props.shape,
    shape = _props$shape === void 0 ? 'circle' : _props$shape,
    _props$size = props.size,
    customSize = _props$size === void 0 ? 'default' : _props$size,
    src = props.src,
    srcSet = props.srcSet,
    icon = props.icon,
    className = props.className,
    alt = props.alt,
    draggable = props.draggable,
    children = props.children,
    crossOrigin = props.crossOrigin,
    others = __rest(props, ["prefixCls", "shape", "size", "src", "srcSet", "icon", "className", "alt", "draggable", "children", "crossOrigin"]);
  var size = customSize === 'default' ? groupSize : customSize;
  var needResponsive = Object.keys((0, _typeof2["default"])(size) === 'object' ? size || {} : {}).some(function (key) {
    return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(key);
  });
  var screens = (0, _useBreakpoint["default"])(needResponsive);
  var responsiveSizeStyle = React.useMemo(function () {
    if ((0, _typeof2["default"])(size) !== 'object') {
      return {};
    }
    var currentBreakpoint = _responsiveObserve.responsiveArray.find(function (screen) {
      return screens[screen];
    });
    var currentSize = size[currentBreakpoint];
    return currentSize ? {
      width: currentSize,
      height: currentSize,
      lineHeight: "".concat(currentSize, "px"),
      fontSize: icon ? currentSize / 2 : 18
    } : {};
  }, [screens, size]);
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!(typeof icon === 'string' && icon.length > 2), 'Avatar', "`icon` is using ReactNode instead of string naming in v4. Please check `".concat(icon, "` at https://ant.design/components/icon")) : void 0;
  var prefixCls = getPrefixCls('avatar', customizePrefixCls);
  var sizeCls = (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-lg"), size === 'large'), "".concat(prefixCls, "-sm"), size === 'small'));
  var hasImageElement = /*#__PURE__*/React.isValidElement(src);
  var classString = (0, _classnames["default"])(prefixCls, sizeCls, (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-").concat(shape), !!shape), "".concat(prefixCls, "-image"), hasImageElement || src && isImgExist), "".concat(prefixCls, "-icon"), !!icon), className);
  var sizeStyle = typeof size === 'number' ? {
    width: size,
    height: size,
    lineHeight: "".concat(size, "px"),
    fontSize: icon ? size / 2 : 18
  } : {};
  var childrenToRender;
  if (typeof src === 'string' && isImgExist) {
    childrenToRender = /*#__PURE__*/React.createElement("img", {
      src: src,
      draggable: draggable,
      srcSet: srcSet,
      onError: handleImgLoadError,
      alt: alt,
      crossOrigin: crossOrigin
    });
  } else if (hasImageElement) {
    childrenToRender = src;
  } else if (icon) {
    childrenToRender = icon;
  } else if (mounted || scale !== 1) {
    var transformString = "scale(".concat(scale, ") translateX(-50%)");
    var childrenStyle = {
      msTransform: transformString,
      WebkitTransform: transformString,
      transform: transformString
    };
    var sizeChildrenStyle = typeof size === 'number' ? {
      lineHeight: "".concat(size, "px")
    } : {};
    childrenToRender = /*#__PURE__*/React.createElement(_rcResizeObserver["default"], {
      onResize: setScaleParam
    }, /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-string"),
      ref: avatarChildrenRef,
      style: (0, _extends2["default"])((0, _extends2["default"])({}, sizeChildrenStyle), childrenStyle)
    }, children));
  } else {
    childrenToRender = /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-string"),
      style: {
        opacity: 0
      },
      ref: avatarChildrenRef
    }, children);
  }
  // The event is triggered twice from bubbling up the DOM tree.
  // see https://codesandbox.io/s/kind-snow-9lidz
  delete others.onError;
  delete others.gap;
  return /*#__PURE__*/React.createElement("span", (0, _extends2["default"])({}, others, {
    style: (0, _extends2["default"])((0, _extends2["default"])((0, _extends2["default"])({}, sizeStyle), responsiveSizeStyle), others.style),
    className: classString,
    ref: avatarNodeMergeRef
  }), childrenToRender);
};
var Avatar = /*#__PURE__*/React.forwardRef(InternalAvatar);
if (process.env.NODE_ENV !== 'production') {
  Avatar.displayName = 'Avatar';
}
var _default = exports["default"] = Avatar;