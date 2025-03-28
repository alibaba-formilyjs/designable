"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuccessPercent = getSuccessPercent;
exports.validProgress = validProgress;
var _warning = _interopRequireDefault(require("../_util/warning"));
function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  }
  if (progress > 100) {
    return 100;
  }
  return progress;
}
function getSuccessPercent(_ref) {
  var success = _ref.success,
    successPercent = _ref.successPercent;
  var percent = successPercent;
  /** @deprecated Use `percent` instead */
  if (success && 'progress' in success) {
    process.env.NODE_ENV !== "production" ? (0, _warning["default"])(false, 'Progress', '`success.progress` is deprecated. Please use `success.percent` instead.') : void 0;
    percent = success.progress;
  }
  if (success && 'percent' in success) {
    percent = success.percent;
  }
  return percent;
}