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
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';
var defaultEmptyImg = /*#__PURE__*/React.createElement(DefaultEmptyImg, null);
var simpleEmptyImg = /*#__PURE__*/React.createElement(SimpleEmptyImg, null);
var Empty = function Empty(_a) {
  var className = _a.className,
    customizePrefixCls = _a.prefixCls,
    _a$image = _a.image,
    image = _a$image === void 0 ? defaultEmptyImg : _a$image,
    description = _a.description,
    children = _a.children,
    imageStyle = _a.imageStyle,
    restProps = __rest(_a, ["className", "prefixCls", "image", "description", "children", "imageStyle"]);
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  return /*#__PURE__*/React.createElement(LocaleReceiver, {
    componentName: "Empty"
  }, function (contextLocale) {
    var prefixCls = getPrefixCls('empty', customizePrefixCls);
    var des = typeof description !== 'undefined' ? description : contextLocale.description;
    var alt = typeof des === 'string' ? des : 'empty';
    var imageNode = null;
    if (typeof image === 'string') {
      imageNode = /*#__PURE__*/React.createElement("img", {
        alt: alt,
        src: image
      });
    } else {
      imageNode = image;
    }
    return /*#__PURE__*/React.createElement("div", _extends({
      className: classNames(prefixCls, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-normal"), image === simpleEmptyImg), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className)
    }, restProps), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-image"),
      style: imageStyle
    }, imageNode), des && /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-description")
    }, des), children && /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-footer")
    }, children));
  });
};
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
export default Empty;