"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _DeleteOutlined = _interopRequireDefault(require("@ant-design/icons/DeleteOutlined"));
var _DownloadOutlined = _interopRequireDefault(require("@ant-design/icons/DownloadOutlined"));
var _EyeOutlined = _interopRequireDefault(require("@ant-design/icons/EyeOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../../config-provider");
var _progress = _interopRequireDefault(require("../../progress"));
var _tooltip = _interopRequireDefault(require("../../tooltip"));
var ListItem = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var prefixCls = _ref.prefixCls,
    className = _ref.className,
    style = _ref.style,
    locale = _ref.locale,
    listType = _ref.listType,
    file = _ref.file,
    items = _ref.items,
    progressProps = _ref.progress,
    iconRender = _ref.iconRender,
    actionIconRender = _ref.actionIconRender,
    itemRender = _ref.itemRender,
    isImgUrl = _ref.isImgUrl,
    showPreviewIcon = _ref.showPreviewIcon,
    showRemoveIcon = _ref.showRemoveIcon,
    showDownloadIcon = _ref.showDownloadIcon,
    customPreviewIcon = _ref.previewIcon,
    customRemoveIcon = _ref.removeIcon,
    customDownloadIcon = _ref.downloadIcon,
    onPreview = _ref.onPreview,
    onDownload = _ref.onDownload,
    onClose = _ref.onClose;
  var _a, _b;
  // Status: which will ignore `removed` status
  var status = file.status;
  var _React$useState = React.useState(status),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    mergedStatus = _React$useState2[0],
    setMergedStatus = _React$useState2[1];
  React.useEffect(function () {
    if (status !== 'removed') {
      setMergedStatus(status);
    }
  }, [status]);
  // Delay to show the progress bar
  var _React$useState3 = React.useState(false),
    _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
    showProgress = _React$useState4[0],
    setShowProgress = _React$useState4[1];
  var progressRafRef = React.useRef(null);
  React.useEffect(function () {
    progressRafRef.current = setTimeout(function () {
      setShowProgress(true);
    }, 300);
    return function () {
      if (progressRafRef.current) {
        clearTimeout(progressRafRef.current);
      }
    };
  }, []);
  // This is used for legacy span make scrollHeight the wrong value.
  // We will force these to be `display: block` with non `picture-card`
  var spanClassName = "".concat(prefixCls, "-span");
  var iconNode = iconRender(file);
  var icon = /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-text-icon")
  }, iconNode);
  if (listType === 'picture' || listType === 'picture-card') {
    if (mergedStatus === 'uploading' || !file.thumbUrl && !file.url) {
      var uploadingClassName = (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-list-item-thumbnail"), true), "".concat(prefixCls, "-list-item-file"), mergedStatus !== 'uploading'));
      icon = /*#__PURE__*/React.createElement("div", {
        className: uploadingClassName
      }, iconNode);
    } else {
      var thumbnail = (isImgUrl === null || isImgUrl === void 0 ? void 0 : isImgUrl(file)) ? ( /*#__PURE__*/React.createElement("img", {
        src: file.thumbUrl || file.url,
        alt: file.name,
        className: "".concat(prefixCls, "-list-item-image"),
        crossOrigin: file.crossOrigin
      })) : iconNode;
      var aClassName = (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-list-item-thumbnail"), true), "".concat(prefixCls, "-list-item-file"), isImgUrl && !isImgUrl(file)));
      icon = /*#__PURE__*/React.createElement("a", {
        className: aClassName,
        onClick: function onClick(e) {
          return onPreview(file, e);
        },
        href: file.url || file.thumbUrl,
        target: "_blank",
        rel: "noopener noreferrer"
      }, thumbnail);
    }
  }
  var infoUploadingClass = (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-list-item"), true), "".concat(prefixCls, "-list-item-").concat(mergedStatus), true), "".concat(prefixCls, "-list-item-list-type-").concat(listType), true));
  var linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
  var removeIcon = showRemoveIcon ? actionIconRender((typeof customRemoveIcon === 'function' ? customRemoveIcon(file) : customRemoveIcon) || ( /*#__PURE__*/React.createElement(_DeleteOutlined["default"], null)), function () {
    return onClose(file);
  }, prefixCls, locale.removeFile) : null;
  var downloadIcon = showDownloadIcon && mergedStatus === 'done' ? actionIconRender((typeof customDownloadIcon === 'function' ? customDownloadIcon(file) : customDownloadIcon) || /*#__PURE__*/React.createElement(_DownloadOutlined["default"], null), function () {
    return onDownload(file);
  }, prefixCls, locale.downloadFile) : null;
  var downloadOrDelete = listType !== 'picture-card' && ( /*#__PURE__*/React.createElement("span", {
    key: "download-delete",
    className: (0, _classnames["default"])("".concat(prefixCls, "-list-item-card-actions"), {
      picture: listType === 'picture'
    })
  }, downloadIcon, removeIcon));
  var listItemNameClass = (0, _classnames["default"])("".concat(prefixCls, "-list-item-name"));
  var preview = file.url ? [/*#__PURE__*/React.createElement("a", (0, _extends2["default"])({
    key: "view",
    target: "_blank",
    rel: "noopener noreferrer",
    className: listItemNameClass,
    title: file.name
  }, linkProps, {
    href: file.url,
    onClick: function onClick(e) {
      return onPreview(file, e);
    }
  }), file.name), downloadOrDelete] : [/*#__PURE__*/React.createElement("span", {
    key: "view",
    className: listItemNameClass,
    onClick: function onClick(e) {
      return onPreview(file, e);
    },
    title: file.name
  }, file.name), downloadOrDelete];
  var previewStyle = {
    pointerEvents: 'none',
    opacity: 0.5
  };
  var previewIcon = showPreviewIcon ? ( /*#__PURE__*/React.createElement("a", {
    href: file.url || file.thumbUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    style: file.url || file.thumbUrl ? undefined : previewStyle,
    onClick: function onClick(e) {
      return onPreview(file, e);
    },
    title: locale.previewFile
  }, typeof customPreviewIcon === 'function' ? customPreviewIcon(file) : customPreviewIcon || /*#__PURE__*/React.createElement(_EyeOutlined["default"], null))) : null;
  var actions = listType === 'picture-card' && mergedStatus !== 'uploading' && ( /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-list-item-actions")
  }, previewIcon, mergedStatus === 'done' && downloadIcon, removeIcon));
  var message;
  if (file.response && typeof file.response === 'string') {
    message = file.response;
  } else {
    message = ((_a = file.error) === null || _a === void 0 ? void 0 : _a.statusText) || ((_b = file.error) === null || _b === void 0 ? void 0 : _b.message) || locale.uploadError;
  }
  var iconAndPreview = /*#__PURE__*/React.createElement("span", {
    className: spanClassName
  }, icon, preview);
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var rootPrefixCls = getPrefixCls();
  var dom = /*#__PURE__*/React.createElement("div", {
    className: infoUploadingClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-list-item-info")
  }, iconAndPreview), actions, showProgress && ( /*#__PURE__*/React.createElement(_rcMotion["default"], {
    motionName: "".concat(rootPrefixCls, "-fade"),
    visible: mergedStatus === 'uploading',
    motionDeadline: 2000
  }, function (_ref2) {
    var motionClassName = _ref2.className;
    // show loading icon if upload progress listener is disabled
    var loadingProgress = 'percent' in file ? ( /*#__PURE__*/React.createElement(_progress["default"], (0, _extends2["default"])({}, progressProps, {
      type: "line",
      percent: file.percent
    }))) : null;
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames["default"])("".concat(prefixCls, "-list-item-progress"), motionClassName)
    }, loadingProgress);
  })));
  var listContainerNameClass = (0, _classnames["default"])("".concat(prefixCls, "-list-").concat(listType, "-container"), className);
  var item = mergedStatus === 'error' ? ( /*#__PURE__*/React.createElement(_tooltip["default"], {
    title: message,
    getPopupContainer: function getPopupContainer(node) {
      return node.parentNode;
    }
  }, dom)) : dom;
  return /*#__PURE__*/React.createElement("div", {
    className: listContainerNameClass,
    style: style,
    ref: ref
  }, itemRender ? itemRender(item, file, items, {
    download: onDownload.bind(null, file),
    preview: onPreview.bind(null, file),
    remove: onClose.bind(null, file)
  }) : item);
});
var _default = exports["default"] = ListItem;