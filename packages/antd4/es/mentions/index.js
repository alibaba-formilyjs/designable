import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import RcMentions from 'rc-mentions';
import { composeRef } from "rc-util/es/ref";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import defaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import { FormItemInputContext } from '../form/context';
import Spin from '../spin';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import warning from '../_util/warning';
var Option = RcMentions.Option;
export { Option };
function loadingFilterOption() {
  return true;
}
var InternalMentions = function InternalMentions(_a, ref) {
  var customizePrefixCls = _a.prefixCls,
    className = _a.className,
    disabled = _a.disabled,
    loading = _a.loading,
    filterOption = _a.filterOption,
    children = _a.children,
    notFoundContent = _a.notFoundContent,
    options = _a.options,
    customStatus = _a.status,
    restProps = __rest(_a, ["prefixCls", "className", "disabled", "loading", "filterOption", "children", "notFoundContent", "options", "status"]);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focused = _React$useState2[0],
    setFocused = _React$useState2[1];
  var innerRef = React.useRef();
  var mergedRef = composeRef(ref, innerRef);
  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? warning(!children, 'Mentions', '`Mentions.Option` is deprecated. Please use `options` instead.') : void 0;
  }
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    renderEmpty = _React$useContext.renderEmpty,
    direction = _React$useContext.direction;
  var _React$useContext2 = React.useContext(FormItemInputContext),
    contextStatus = _React$useContext2.status,
    hasFeedback = _React$useContext2.hasFeedback,
    feedbackIcon = _React$useContext2.feedbackIcon;
  var mergedStatus = getMergedStatus(contextStatus, customStatus);
  var onFocus = function onFocus() {
    if (restProps.onFocus) {
      restProps.onFocus.apply(restProps, arguments);
    }
    setFocused(true);
  };
  var onBlur = function onBlur() {
    if (restProps.onBlur) {
      restProps.onBlur.apply(restProps, arguments);
    }
    setFocused(false);
  };
  var getNotFoundContent = function getNotFoundContent() {
    if (notFoundContent !== undefined) {
      return notFoundContent;
    }
    return (renderEmpty || defaultRenderEmpty)('Select');
  };
  var getOptions = function getOptions() {
    if (loading) {
      return /*#__PURE__*/React.createElement(Option, {
        value: "ANTD_SEARCHING",
        disabled: true
      }, /*#__PURE__*/React.createElement(Spin, {
        size: "small"
      }));
    }
    return children;
  };
  var mergedOptions = loading ? [{
    value: 'ANTD_SEARCHING',
    disabled: true,
    label: /*#__PURE__*/React.createElement(Spin, {
      size: "small"
    })
  }] : options;
  var getFilterOption = function getFilterOption() {
    if (loading) {
      return loadingFilterOption;
    }
    return filterOption;
  };
  var prefixCls = getPrefixCls('mentions', customizePrefixCls);
  var mergedClassName = classNames(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-rtl"), direction === 'rtl'), getStatusClassNames(prefixCls, mergedStatus), !hasFeedback && className);
  var mentions = /*#__PURE__*/React.createElement(RcMentions, _extends({
    prefixCls: prefixCls,
    notFoundContent: getNotFoundContent(),
    className: mergedClassName,
    disabled: disabled,
    direction: direction
  }, restProps, {
    filterOption: getFilterOption(),
    onFocus: onFocus,
    onBlur: onBlur,
    ref: mergedRef,
    options: mergedOptions
  }), getOptions());
  if (hasFeedback) {
    return /*#__PURE__*/React.createElement("div", {
      className: classNames("".concat(prefixCls, "-affix-wrapper"), getStatusClassNames("".concat(prefixCls, "-affix-wrapper"), mergedStatus, hasFeedback), className)
    }, mentions, /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-suffix")
    }, feedbackIcon));
  }
  return mentions;
};
var Mentions = /*#__PURE__*/React.forwardRef(InternalMentions);
if (process.env.NODE_ENV !== 'production') {
  Mentions.displayName = 'Mentions';
}
Mentions.Option = Option;
Mentions.getMentions = function () {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _config$prefix = config.prefix,
    prefix = _config$prefix === void 0 ? '@' : _config$prefix,
    _config$split = config.split,
    split = _config$split === void 0 ? ' ' : _config$split;
  var prefixList = Array.isArray(prefix) ? prefix : [prefix];
  return value.split(split).map(function () {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var hitPrefix = null;
    prefixList.some(function (prefixStr) {
      var startStr = str.slice(0, prefixStr.length);
      if (startStr === prefixStr) {
        hitPrefix = prefixStr;
        return true;
      }
      return false;
    });
    if (hitPrefix !== null) {
      return {
        prefix: hitPrefix,
        value: str.slice(hitPrefix.length)
      };
    }
    return null;
  }).filter(function (entity) {
    return !!entity && !!entity.value;
  });
};
export default Mentions;