import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CheckCircleOutlined from "@ant-design/icons/es/icons/CheckCircleOutlined";
import CloseCircleOutlined from "@ant-design/icons/es/icons/CloseCircleOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/es/icons/ExclamationCircleOutlined";
import InfoCircleOutlined from "@ant-design/icons/es/icons/InfoCircleOutlined";
import { render as reactRender, unmount as reactUnmount } from "rc-util/es/React/render";
import * as React from 'react';
import { globalConfig } from '../config-provider';
import warning from '../_util/warning';
import ConfirmDialog from './ConfirmDialog';
import destroyFns from './destroyFns';
import { getConfirmLocale } from './locale';
var defaultRootPrefixCls = '';
function getRootPrefixCls() {
  return defaultRootPrefixCls;
}
export default function confirm(config) {
  var container = document.createDocumentFragment();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  var currentConfig = _extends(_extends({}, config), {
    close: close,
    open: true
  });
  var timeoutId;
  function destroy() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var triggerCancel = args.some(function (param) {
      return param && param.triggerCancel;
    });
    if (config.onCancel && triggerCancel) {
      config.onCancel.apply(config, [function () {}].concat(_toConsumableArray(args.slice(1))));
    }
    for (var i = 0; i < destroyFns.length; i++) {
      var fn = destroyFns[i];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
    reactUnmount(container);
  }
  function render(_a) {
    var okText = _a.okText,
      cancelText = _a.cancelText,
      customizePrefixCls = _a.prefixCls,
      props = __rest(_a, ["okText", "cancelText", "prefixCls"]);
    clearTimeout(timeoutId);
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    timeoutId = setTimeout(function () {
      var runtimeLocale = getConfirmLocale();
      var _globalConfig = globalConfig(),
        getPrefixCls = _globalConfig.getPrefixCls,
        getIconPrefixCls = _globalConfig.getIconPrefixCls;
      // because Modal.config  set rootPrefixCls, which is different from other components
      var rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
      var prefixCls = customizePrefixCls || "".concat(rootPrefixCls, "-modal");
      var iconPrefixCls = getIconPrefixCls();
      reactRender( /*#__PURE__*/React.createElement(ConfirmDialog, _extends({}, props, {
        prefixCls: prefixCls,
        rootPrefixCls: rootPrefixCls,
        iconPrefixCls: iconPrefixCls,
        okText: okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText),
        cancelText: cancelText || runtimeLocale.cancelText
      })), container);
    });
  }
  function close() {
    var _this = this;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    currentConfig = _extends(_extends({}, currentConfig), {
      open: false,
      afterClose: function afterClose() {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }
        destroy.apply(_this, args);
      }
    });
    // Legacy support
    if (currentConfig.visible) {
      delete currentConfig.visible;
    }
    render(currentConfig);
  }
  function update(configUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = _extends(_extends({}, currentConfig), configUpdate);
    }
    render(currentConfig);
  }
  render(currentConfig);
  destroyFns.push(close);
  return {
    destroy: close,
    update: update
  };
}
export function withWarn(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(ExclamationCircleOutlined, null),
    okCancel: false
  }, props), {
    type: 'warning'
  });
}
export function withInfo(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(InfoCircleOutlined, null),
    okCancel: false
  }, props), {
    type: 'info'
  });
}
export function withSuccess(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(CheckCircleOutlined, null),
    okCancel: false
  }, props), {
    type: 'success'
  });
}
export function withError(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(CloseCircleOutlined, null),
    okCancel: false
  }, props), {
    type: 'error'
  });
}
export function withConfirm(props) {
  return _extends(_extends({
    icon: /*#__PURE__*/React.createElement(ExclamationCircleOutlined, null),
    okCancel: true
  }, props), {
    type: 'confirm'
  });
}
export function modalGlobalConfig(_ref) {
  var rootPrefixCls = _ref.rootPrefixCls;
  process.env.NODE_ENV !== "production" ? warning(false, 'Modal', 'Modal.config is deprecated. Please use ConfigProvider.config instead.') : void 0;
  defaultRootPrefixCls = rootPrefixCls;
}