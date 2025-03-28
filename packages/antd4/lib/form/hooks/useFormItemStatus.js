"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _context = require("../context");
var _warning = _interopRequireDefault(require("../../_util/warning"));
var useFormItemStatus = function useFormItemStatus() {
  var _useContext = (0, _react.useContext)(_context.FormItemInputContext),
    status = _useContext.status;
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(status !== undefined, 'Form.Item', "Form.Item.useStatus should be used under Form.Item component. For more information: ".concat(window.location.protocol, "//").concat(window.location.host, "/components/form-cn/#Form.Item.useStatus")) : void 0;
  return {
    status: status
  };
};
var _default = exports["default"] = useFormItemStatus;