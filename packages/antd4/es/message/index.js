import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import CheckCircleFilled from "@ant-design/icons/es/icons/CheckCircleFilled";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import ExclamationCircleFilled from "@ant-design/icons/es/icons/ExclamationCircleFilled";
import InfoCircleFilled from "@ant-design/icons/es/icons/InfoCircleFilled";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import classNames from 'classnames';
import RCNotification from 'rc-notification';
import * as React from 'react';
import ConfigProvider, { globalConfig } from '../config-provider';
import createUseMessage from './hooks/useMessage';
var messageInstance;
var defaultDuration = 3;
var defaultTop;
var key = 1;
var localPrefixCls = '';
var transitionName = 'move-up';
var hasTransitionName = false;
var getContainer;
var maxCount;
var rtl = false;
export function getKeyThenIncreaseKey() {
  return key++;
}
function setMessageConfig(options) {
  if (options.top !== undefined) {
    defaultTop = options.top;
    messageInstance = null; // delete messageInstance for new defaultTop
  }
  if (options.duration !== undefined) {
    defaultDuration = options.duration;
  }
  if (options.prefixCls !== undefined) {
    localPrefixCls = options.prefixCls;
  }
  if (options.getContainer !== undefined) {
    getContainer = options.getContainer;
    messageInstance = null; // delete messageInstance for new getContainer
  }
  if (options.transitionName !== undefined) {
    transitionName = options.transitionName;
    messageInstance = null; // delete messageInstance for new transitionName
    hasTransitionName = true;
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount;
    messageInstance = null;
  }
  if (options.rtl !== undefined) {
    rtl = options.rtl;
  }
}
function getRCNotificationInstance(args, callback) {
  var customizePrefixCls = args.prefixCls,
    getContextPopupContainer = args.getPopupContainer;
  var _globalConfig = globalConfig(),
    getPrefixCls = _globalConfig.getPrefixCls,
    getRootPrefixCls = _globalConfig.getRootPrefixCls,
    getIconPrefixCls = _globalConfig.getIconPrefixCls;
  var prefixCls = getPrefixCls('message', customizePrefixCls || localPrefixCls);
  var rootPrefixCls = getRootPrefixCls(args.rootPrefixCls, prefixCls);
  var iconPrefixCls = getIconPrefixCls();
  if (messageInstance) {
    callback({
      prefixCls: prefixCls,
      rootPrefixCls: rootPrefixCls,
      iconPrefixCls: iconPrefixCls,
      instance: messageInstance
    });
    return;
  }
  var instanceConfig = {
    prefixCls: prefixCls,
    transitionName: hasTransitionName ? transitionName : "".concat(rootPrefixCls, "-").concat(transitionName),
    style: {
      top: defaultTop
    },
    getContainer: getContainer || getContextPopupContainer,
    maxCount: maxCount
  };
  RCNotification.newInstance(instanceConfig, function (instance) {
    if (messageInstance) {
      callback({
        prefixCls: prefixCls,
        rootPrefixCls: rootPrefixCls,
        iconPrefixCls: iconPrefixCls,
        instance: messageInstance
      });
      return;
    }
    messageInstance = instance;
    if (process.env.NODE_ENV === 'test') {
      messageInstance.config = instanceConfig;
    }
    callback({
      prefixCls: prefixCls,
      rootPrefixCls: rootPrefixCls,
      iconPrefixCls: iconPrefixCls,
      instance: instance
    });
  });
}
var typeToIcon = {
  info: InfoCircleFilled,
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
  loading: LoadingOutlined
};
export var typeList = Object.keys(typeToIcon);
function getRCNoticeProps(args, prefixCls, iconPrefixCls) {
  var duration = args.duration !== undefined ? args.duration : defaultDuration;
  var IconComponent = typeToIcon[args.type];
  var messageClass = classNames("".concat(prefixCls, "-custom-content"), _defineProperty(_defineProperty({}, "".concat(prefixCls, "-").concat(args.type), args.type), "".concat(prefixCls, "-rtl"), rtl === true));
  return {
    key: args.key,
    duration: duration,
    style: args.style || {},
    className: args.className,
    content: ( /*#__PURE__*/React.createElement(ConfigProvider, {
      iconPrefixCls: iconPrefixCls
    }, /*#__PURE__*/React.createElement("div", {
      className: messageClass
    }, args.icon || IconComponent && /*#__PURE__*/React.createElement(IconComponent, null), /*#__PURE__*/React.createElement("span", null, args.content)))),
    onClose: args.onClose,
    onClick: args.onClick
  };
}
function notice(args) {
  var target = args.key || getKeyThenIncreaseKey();
  var closePromise = new Promise(function (resolve) {
    var callback = function callback() {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }
      return resolve(true);
    };
    getRCNotificationInstance(args, function (_ref) {
      var prefixCls = _ref.prefixCls,
        iconPrefixCls = _ref.iconPrefixCls,
        instance = _ref.instance;
      instance.notice(getRCNoticeProps(_extends(_extends({}, args), {
        key: target,
        onClose: callback
      }), prefixCls, iconPrefixCls));
    });
  });
  var result = function result() {
    var _a;
    if (messageInstance) {
      messageInstance.removeNotice(target);
      (_a = args.onClose) === null || _a === void 0 ? void 0 : _a.call(args);
    }
  };
  result.then = function (filled, rejected) {
    return closePromise.then(filled, rejected);
  };
  result.promise = closePromise;
  return result;
}
function isArgsProps(content) {
  return Object.prototype.toString.call(content) === '[object Object]' && !!content.content;
}
var api = {
  open: notice,
  config: setMessageConfig,
  destroy: function destroy(messageKey) {
    if (messageInstance) {
      if (messageKey) {
        var _messageInstance = messageInstance,
          removeNotice = _messageInstance.removeNotice;
        removeNotice(messageKey);
      } else {
        var _messageInstance2 = messageInstance,
          destroy = _messageInstance2.destroy;
        destroy();
        messageInstance = null;
      }
    }
  }
};
export function attachTypeApi(originalApi, type) {
  originalApi[type] = function (content, duration, onClose) {
    if (isArgsProps(content)) {
      return originalApi.open(_extends(_extends({}, content), {
        type: type
      }));
    }
    if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }
    return originalApi.open({
      content: content,
      duration: duration,
      type: type,
      onClose: onClose
    });
  };
}
typeList.forEach(function (type) {
  return attachTypeApi(api, type);
});
api.warn = api.warning;
api.useMessage = createUseMessage(getRCNotificationInstance, getRCNoticeProps);
/** @internal test Only function. Not work on production */
export var getInstance = function getInstance() {
  return process.env.NODE_ENV === 'test' ? messageInstance : null;
};
export default api;