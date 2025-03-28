"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DisabledContextProvider = void 0;
var React = _interopRequireWildcard(require("react"));
var DisabledContext = /*#__PURE__*/React.createContext(false);
var DisabledContextProvider = exports.DisabledContextProvider = function DisabledContextProvider(_ref) {
  var children = _ref.children,
    disabled = _ref.disabled;
  var originDisabled = React.useContext(DisabledContext);
  return /*#__PURE__*/React.createElement(DisabledContext.Provider, {
    value: disabled !== null && disabled !== void 0 ? disabled : originDisabled
  }, children);
};
var _default = exports["default"] = DisabledContext;