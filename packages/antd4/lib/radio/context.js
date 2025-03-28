"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RadioOptionTypeContextProvider = exports.RadioOptionTypeContext = exports.RadioGroupContextProvider = void 0;
var React = _interopRequireWildcard(require("react"));
var RadioGroupContext = /*#__PURE__*/React.createContext(null);
var RadioGroupContextProvider = exports.RadioGroupContextProvider = RadioGroupContext.Provider;
var _default = exports["default"] = RadioGroupContext;
var RadioOptionTypeContext = exports.RadioOptionTypeContext = /*#__PURE__*/React.createContext(null);
var RadioOptionTypeContextProvider = exports.RadioOptionTypeContextProvider = RadioOptionTypeContext.Provider;