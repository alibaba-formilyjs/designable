import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useFlexGapSupport from '../_util/hooks/useFlexGapSupport';
import ResponsiveObserve, { responsiveArray } from '../_util/responsiveObserve';
import { tuple } from '../_util/type';
import RowContext from './RowContext';
var RowAligns = tuple('top', 'middle', 'bottom', 'stretch');
var RowJustify = tuple('start', 'end', 'center', 'space-around', 'space-between', 'space-evenly');
function useMergePropByScreen(oriProp, screen) {
  var _React$useState = React.useState(typeof oriProp === 'string' ? oriProp : ''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    prop = _React$useState2[0],
    setProp = _React$useState2[1];
  var clacMergeAlignOrJustify = function clacMergeAlignOrJustify() {
    if (typeof oriProp === 'string') {
      setProp(oriProp);
    }
    if (_typeof(oriProp) !== 'object') {
      return;
    }
    for (var i = 0; i < responsiveArray.length; i++) {
      var breakpoint = responsiveArray[i];
      // if do not match, do nothing
      if (!screen[breakpoint]) continue;
      var curVal = oriProp[breakpoint];
      if (curVal !== undefined) {
        setProp(curVal);
        return;
      }
    }
  };
  React.useEffect(function () {
    clacMergeAlignOrJustify();
  }, [JSON.stringify(oriProp), screen]);
  return prop;
}
var Row = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var customizePrefixCls = props.prefixCls,
    justify = props.justify,
    align = props.align,
    className = props.className,
    style = props.style,
    children = props.children,
    _props$gutter = props.gutter,
    gutter = _props$gutter === void 0 ? 0 : _props$gutter,
    wrap = props.wrap,
    others = __rest(props, ["prefixCls", "justify", "align", "className", "style", "children", "gutter", "wrap"]);
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var _React$useState3 = React.useState({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
      xxl: true
    }),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    screens = _React$useState4[0],
    setScreens = _React$useState4[1];
  // to save screens info when responsiveObserve callback had been call
  var _React$useState5 = React.useState({
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false,
      xxl: false
    }),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    curScreens = _React$useState6[0],
    setCurScreens = _React$useState6[1];
  // ================================== calc reponsive data ==================================
  var mergeAlign = useMergePropByScreen(align, curScreens);
  var mergeJustify = useMergePropByScreen(justify, curScreens);
  var supportFlexGap = useFlexGapSupport();
  var gutterRef = React.useRef(gutter);
  // ================================== Effect ==================================
  React.useEffect(function () {
    var token = ResponsiveObserve.subscribe(function (screen) {
      setCurScreens(screen);
      var currentGutter = gutterRef.current || 0;
      if (!Array.isArray(currentGutter) && _typeof(currentGutter) === 'object' || Array.isArray(currentGutter) && (_typeof(currentGutter[0]) === 'object' || _typeof(currentGutter[1]) === 'object')) {
        setScreens(screen);
      }
    });
    return function () {
      return ResponsiveObserve.unsubscribe(token);
    };
  }, []);
  // ================================== Render ==================================
  var getGutter = function getGutter() {
    var results = [undefined, undefined];
    var normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, undefined];
    normalizedGutter.forEach(function (g, index) {
      if (_typeof(g) === 'object') {
        for (var i = 0; i < responsiveArray.length; i++) {
          var breakpoint = responsiveArray[i];
          if (screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint];
            break;
          }
        }
      } else {
        results[index] = g;
      }
    });
    return results;
  };
  var prefixCls = getPrefixCls('row', customizePrefixCls);
  var gutters = getGutter();
  var classes = classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-no-wrap"), wrap === false), "".concat(prefixCls, "-").concat(mergeJustify), mergeJustify), "".concat(prefixCls, "-").concat(mergeAlign), mergeAlign), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  // Add gutter related style
  var rowStyle = {};
  var horizontalGutter = gutters[0] != null && gutters[0] > 0 ? gutters[0] / -2 : undefined;
  var verticalGutter = gutters[1] != null && gutters[1] > 0 ? gutters[1] / -2 : undefined;
  if (horizontalGutter) {
    rowStyle.marginLeft = horizontalGutter;
    rowStyle.marginRight = horizontalGutter;
  }
  if (supportFlexGap) {
    // Set gap direct if flex gap support
    var _gutters = _slicedToArray(gutters, 2);
    rowStyle.rowGap = _gutters[1];
  } else if (verticalGutter) {
    rowStyle.marginTop = verticalGutter;
    rowStyle.marginBottom = verticalGutter;
  }
  // "gutters" is a new array in each rendering phase, it'll make 'React.useMemo' effectless.
  // So we deconstruct "gutters" variable here.
  var _gutters2 = _slicedToArray(gutters, 2),
    gutterH = _gutters2[0],
    gutterV = _gutters2[1];
  var rowContext = React.useMemo(function () {
    return {
      gutter: [gutterH, gutterV],
      wrap: wrap,
      supportFlexGap: supportFlexGap
    };
  }, [gutterH, gutterV, wrap, supportFlexGap]);
  return /*#__PURE__*/React.createElement(RowContext.Provider, {
    value: rowContext
  }, /*#__PURE__*/React.createElement("div", _extends({}, others, {
    className: classes,
    style: _extends(_extends({}, rowStyle), style),
    ref: ref
  }), children));
});
if (process.env.NODE_ENV !== 'production') {
  Row.displayName = 'Row';
}
export default Row;