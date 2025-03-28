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
import CheckCircleFilled from "@ant-design/icons/es/icons/CheckCircleFilled";
import CheckOutlined from "@ant-design/icons/es/icons/CheckOutlined";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import Circle from './Circle';
import Line from './Line';
import Steps from './Steps';
import { getSuccessPercent, validProgress } from './utils';
var ProgressTypes = tuple('line', 'circle', 'dashboard');
var ProgressStatuses = tuple('normal', 'exception', 'active', 'success');
var Progress = function Progress(props) {
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    steps = props.steps,
    strokeColor = props.strokeColor,
    _props$percent = props.percent,
    percent = _props$percent === void 0 ? 0 : _props$percent,
    _props$size = props.size,
    size = _props$size === void 0 ? 'default' : _props$size,
    _props$showInfo = props.showInfo,
    showInfo = _props$showInfo === void 0 ? true : _props$showInfo,
    _props$type = props.type,
    type = _props$type === void 0 ? 'line' : _props$type,
    restProps = __rest(props, ["prefixCls", "className", "steps", "strokeColor", "percent", "size", "showInfo", "type"]);
  function getPercentNumber() {
    var successPercent = getSuccessPercent(props);
    return parseInt(successPercent !== undefined ? successPercent.toString() : percent.toString(), 10);
  }
  function getProgressStatus() {
    var status = props.status;
    if (!ProgressStatuses.includes(status) && getPercentNumber() >= 100) {
      return 'success';
    }
    return status || 'normal';
  }
  function renderProcessInfo(prefixCls, progressStatus) {
    var format = props.format;
    var successPercent = getSuccessPercent(props);
    if (!showInfo) {
      return null;
    }
    var text;
    var textFormatter = format || function (percentNumber) {
      return "".concat(percentNumber, "%");
    };
    var isLineType = type === 'line';
    if (format || progressStatus !== 'exception' && progressStatus !== 'success') {
      text = textFormatter(validProgress(percent), validProgress(successPercent));
    } else if (progressStatus === 'exception') {
      text = isLineType ? /*#__PURE__*/React.createElement(CloseCircleFilled, null) : /*#__PURE__*/React.createElement(CloseOutlined, null);
    } else if (progressStatus === 'success') {
      text = isLineType ? /*#__PURE__*/React.createElement(CheckCircleFilled, null) : /*#__PURE__*/React.createElement(CheckOutlined, null);
    }
    return /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-text"),
      title: typeof text === 'string' ? text : undefined
    }, text);
  }
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var prefixCls = getPrefixCls('progress', customizePrefixCls);
  var progressStatus = getProgressStatus();
  var progressInfo = renderProcessInfo(prefixCls, progressStatus);
  process.env.NODE_ENV !== "production" ? warning(!('successPercent' in props), 'Progress', '`successPercent` is deprecated. Please use `success.percent` instead.') : void 0;
  var strokeColorNotArray = Array.isArray(strokeColor) ? strokeColor[0] : strokeColor;
  var strokeColorNotGradient = typeof strokeColor === 'string' || Array.isArray(strokeColor) ? strokeColor : undefined;
  var progress;
  // Render progress shape
  if (type === 'line') {
    progress = steps ? ( /*#__PURE__*/React.createElement(Steps, _extends({}, props, {
      strokeColor: strokeColorNotGradient,
      prefixCls: prefixCls,
      steps: steps
    }), progressInfo)) : ( /*#__PURE__*/React.createElement(Line, _extends({}, props, {
      strokeColor: strokeColorNotArray,
      prefixCls: prefixCls,
      direction: direction
    }), progressInfo));
  } else if (type === 'circle' || type === 'dashboard') {
    progress = /*#__PURE__*/React.createElement(Circle, _extends({}, props, {
      strokeColor: strokeColorNotArray,
      prefixCls: prefixCls,
      progressStatus: progressStatus
    }), progressInfo);
  }
  var classString = classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-").concat(type === 'dashboard' && 'circle' || steps && 'steps' || type), true), "".concat(prefixCls, "-status-").concat(progressStatus), true), "".concat(prefixCls, "-show-info"), showInfo), "".concat(prefixCls, "-").concat(size), size), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", _extends({}, omit(restProps, ['status', 'format', 'trailColor', 'strokeWidth', 'width', 'gapDegree', 'gapPosition', 'strokeLinecap', 'success', 'successPercent']), {
    className: classString,
    role: "progressbar"
  }), progress);
};
export default Progress;