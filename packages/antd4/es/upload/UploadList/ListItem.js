import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import DownloadOutlined from "@ant-design/icons/es/icons/DownloadOutlined";
import EyeOutlined from "@ant-design/icons/es/icons/EyeOutlined";
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import * as React from 'react';
import { ConfigContext } from '../../config-provider';
import Progress from '../../progress';
import Tooltip from '../../tooltip';
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
    _React$useState2 = _slicedToArray(_React$useState, 2),
    mergedStatus = _React$useState2[0],
    setMergedStatus = _React$useState2[1];
  React.useEffect(function () {
    if (status !== 'removed') {
      setMergedStatus(status);
    }
  }, [status]);
  // Delay to show the progress bar
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
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
      var uploadingClassName = classNames(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-list-item-thumbnail"), true), "".concat(prefixCls, "-list-item-file"), mergedStatus !== 'uploading'));
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
      var aClassName = classNames(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-list-item-thumbnail"), true), "".concat(prefixCls, "-list-item-file"), isImgUrl && !isImgUrl(file)));
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
  var infoUploadingClass = classNames(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-list-item"), true), "".concat(prefixCls, "-list-item-").concat(mergedStatus), true), "".concat(prefixCls, "-list-item-list-type-").concat(listType), true));
  var linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
  var removeIcon = showRemoveIcon ? actionIconRender((typeof customRemoveIcon === 'function' ? customRemoveIcon(file) : customRemoveIcon) || ( /*#__PURE__*/React.createElement(DeleteOutlined, null)), function () {
    return onClose(file);
  }, prefixCls, locale.removeFile) : null;
  var downloadIcon = showDownloadIcon && mergedStatus === 'done' ? actionIconRender((typeof customDownloadIcon === 'function' ? customDownloadIcon(file) : customDownloadIcon) || /*#__PURE__*/React.createElement(DownloadOutlined, null), function () {
    return onDownload(file);
  }, prefixCls, locale.downloadFile) : null;
  var downloadOrDelete = listType !== 'picture-card' && ( /*#__PURE__*/React.createElement("span", {
    key: "download-delete",
    className: classNames("".concat(prefixCls, "-list-item-card-actions"), {
      picture: listType === 'picture'
    })
  }, downloadIcon, removeIcon));
  var listItemNameClass = classNames("".concat(prefixCls, "-list-item-name"));
  var preview = file.url ? [/*#__PURE__*/React.createElement("a", _extends({
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
  }, typeof customPreviewIcon === 'function' ? customPreviewIcon(file) : customPreviewIcon || /*#__PURE__*/React.createElement(EyeOutlined, null))) : null;
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
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var rootPrefixCls = getPrefixCls();
  var dom = /*#__PURE__*/React.createElement("div", {
    className: infoUploadingClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-list-item-info")
  }, iconAndPreview), actions, showProgress && ( /*#__PURE__*/React.createElement(CSSMotion, {
    motionName: "".concat(rootPrefixCls, "-fade"),
    visible: mergedStatus === 'uploading',
    motionDeadline: 2000
  }, function (_ref2) {
    var motionClassName = _ref2.className;
    // show loading icon if upload progress listener is disabled
    var loadingProgress = 'percent' in file ? ( /*#__PURE__*/React.createElement(Progress, _extends({}, progressProps, {
      type: "line",
      percent: file.percent
    }))) : null;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames("".concat(prefixCls, "-list-item-progress"), motionClassName)
    }, loadingProgress);
  })));
  var listContainerNameClass = classNames("".concat(prefixCls, "-list-").concat(listType, "-container"), className);
  var item = mergedStatus === 'error' ? ( /*#__PURE__*/React.createElement(Tooltip, {
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
export default ListItem;