"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LIST_IGNORE = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _regeneratorRuntime2 = _interopRequireDefault(require("@babel/runtime/helpers/regeneratorRuntime"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcUpload = _interopRequireDefault(require("rc-upload"));
var _useMergedState3 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _configProvider = require("../config-provider");
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));
var _default2 = _interopRequireDefault(require("../locale/default"));
var _UploadList = _interopRequireDefault(require("./UploadList"));
var _utils = require("./utils");
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var LIST_IGNORE = exports.LIST_IGNORE = "__LIST_IGNORE_".concat(Date.now(), "__");
var InternalUpload = function InternalUpload(props, ref) {
  var fileList = props.fileList,
    defaultFileList = props.defaultFileList,
    onRemove = props.onRemove,
    _props$showUploadList = props.showUploadList,
    showUploadList = _props$showUploadList === void 0 ? true : _props$showUploadList,
    _props$listType = props.listType,
    listType = _props$listType === void 0 ? 'text' : _props$listType,
    onPreview = props.onPreview,
    onDownload = props.onDownload,
    onChange = props.onChange,
    onDrop = props.onDrop,
    previewFile = props.previewFile,
    customDisabled = props.disabled,
    propLocale = props.locale,
    iconRender = props.iconRender,
    isImageUrl = props.isImageUrl,
    progress = props.progress,
    customizePrefixCls = props.prefixCls,
    className = props.className,
    _props$type = props.type,
    type = _props$type === void 0 ? 'select' : _props$type,
    children = props.children,
    style = props.style,
    itemRender = props.itemRender,
    maxCount = props.maxCount,
    _props$data = props.data,
    data = _props$data === void 0 ? {} : _props$data,
    _props$multiple = props.multiple,
    multiple = _props$multiple === void 0 ? false : _props$multiple,
    _props$action = props.action,
    action = _props$action === void 0 ? '' : _props$action,
    _props$accept = props.accept,
    accept = _props$accept === void 0 ? '' : _props$accept,
    _props$supportServerR = props.supportServerRender,
    supportServerRender = _props$supportServerR === void 0 ? true : _props$supportServerR;
  // ===================== Disabled =====================
  var disabled = React.useContext(_DisabledContext["default"]);
  var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  var _useMergedState = (0, _useMergedState3["default"])(defaultFileList || [], {
      value: fileList,
      postState: function postState(list) {
        return list !== null && list !== void 0 ? list : [];
      }
    }),
    _useMergedState2 = (0, _slicedToArray2["default"])(_useMergedState, 2),
    mergedFileList = _useMergedState2[0],
    setMergedFileList = _useMergedState2[1];
  var _React$useState = React.useState('drop'),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    dragState = _React$useState2[0],
    setDragState = _React$useState2[1];
  var upload = React.useRef(null);
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])('fileList' in props || !('value' in props), 'Upload', '`value` is not a valid prop, do you mean `fileList`?') : void 0;
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!('transformFile' in props), 'Upload', '`transformFile` is deprecated. Please use `beforeUpload` directly.') : void 0;
  // Control mode will auto fill file uid if not provided
  React.useMemo(function () {
    var timestamp = Date.now();
    (fileList || []).forEach(function (file, index) {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = "__AUTO__".concat(timestamp, "_").concat(index, "__");
      }
    });
  }, [fileList]);
  var onInternalChange = function onInternalChange(file, changedFileList, event) {
    var cloneList = (0, _toConsumableArray2["default"])(changedFileList);
    // Cut to match count
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else if (maxCount) {
      cloneList = cloneList.slice(0, maxCount);
    }
    // Prevent React18 auto batch since input[upload] trigger process at same time
    // which makes fileList closure problem
    (0, _reactDom.flushSync)(function () {
      setMergedFileList(cloneList);
    });
    var changeInfo = {
      file: file,
      fileList: cloneList
    };
    if (event) {
      changeInfo.event = event;
    }
    (0, _reactDom.flushSync)(function () {
      onChange === null || onChange === void 0 ? void 0 : onChange(changeInfo);
    });
  };
  var mergedBeforeUpload = function mergedBeforeUpload(file, fileListArgs) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/(0, _regeneratorRuntime2["default"])().mark(function _callee() {
      var beforeUpload, transformFile, parsedFile, result;
      return (0, _regeneratorRuntime2["default"])().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            beforeUpload = props.beforeUpload, transformFile = props.transformFile;
            parsedFile = file;
            if (!beforeUpload) {
              _context.next = 13;
              break;
            }
            _context.next = 5;
            return beforeUpload(file, fileListArgs);
          case 5:
            result = _context.sent;
            if (!(result === false)) {
              _context.next = 8;
              break;
            }
            return _context.abrupt("return", false);
          case 8:
            // Hack for LIST_IGNORE, we add additional info to remove from the list
            delete file[LIST_IGNORE];
            if (!(result === LIST_IGNORE)) {
              _context.next = 12;
              break;
            }
            Object.defineProperty(file, LIST_IGNORE, {
              value: true,
              configurable: true
            });
            return _context.abrupt("return", false);
          case 12:
            if ((0, _typeof2["default"])(result) === 'object' && result) {
              parsedFile = result;
            }
          case 13:
            if (!transformFile) {
              _context.next = 17;
              break;
            }
            _context.next = 16;
            return transformFile(parsedFile);
          case 16:
            parsedFile = _context.sent;
          case 17:
            return _context.abrupt("return", parsedFile);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
  };
  var onBatchStart = function onBatchStart(batchFileInfoList) {
    // Skip file which marked as `LIST_IGNORE`, these file will not add to file list
    var filteredFileInfoList = batchFileInfoList.filter(function (info) {
      return !info.file[LIST_IGNORE];
    });
    // Nothing to do since no file need upload
    if (!filteredFileInfoList.length) {
      return;
    }
    var objectFileList = filteredFileInfoList.map(function (info) {
      return (0, _utils.file2Obj)(info.file);
    });
    // Concat new files with prev files
    var newFileList = (0, _toConsumableArray2["default"])(mergedFileList);
    objectFileList.forEach(function (fileObj) {
      // Replace file if exist
      newFileList = (0, _utils.updateFileList)(fileObj, newFileList);
    });
    objectFileList.forEach(function (fileObj, index) {
      // Repeat trigger `onChange` event for compatible
      var triggerFileObj = fileObj;
      if (!filteredFileInfoList[index].parsedFile) {
        // `beforeUpload` return false
        var originFileObj = fileObj.originFileObj;
        var clone;
        try {
          clone = new File([originFileObj], originFileObj.name, {
            type: originFileObj.type
          });
        } catch (e) {
          clone = new Blob([originFileObj], {
            type: originFileObj.type
          });
          clone.name = originFileObj.name;
          clone.lastModifiedDate = new Date();
          clone.lastModified = new Date().getTime();
        }
        clone.uid = fileObj.uid;
        triggerFileObj = clone;
      } else {
        // Inject `uploading` status
        fileObj.status = 'uploading';
      }
      onInternalChange(triggerFileObj, newFileList);
    });
  };
  var onSuccess = function onSuccess(response, file, xhr) {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    // removed
    if (!(0, _utils.getFileItem)(file, mergedFileList)) {
      return;
    }
    var targetItem = (0, _utils.file2Obj)(file);
    targetItem.status = 'done';
    targetItem.percent = 100;
    targetItem.response = response;
    targetItem.xhr = xhr;
    var nextFileList = (0, _utils.updateFileList)(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList);
  };
  var onProgress = function onProgress(e, file) {
    // removed
    if (!(0, _utils.getFileItem)(file, mergedFileList)) {
      return;
    }
    var targetItem = (0, _utils.file2Obj)(file);
    targetItem.status = 'uploading';
    targetItem.percent = e.percent;
    var nextFileList = (0, _utils.updateFileList)(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList, e);
  };
  var onError = function onError(error, response, file) {
    // removed
    if (!(0, _utils.getFileItem)(file, mergedFileList)) {
      return;
    }
    var targetItem = (0, _utils.file2Obj)(file);
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    var nextFileList = (0, _utils.updateFileList)(targetItem, mergedFileList);
    onInternalChange(targetItem, nextFileList);
  };
  var handleRemove = function handleRemove(file) {
    var currentFile;
    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(function (ret) {
      var _a;
      // Prevent removing file
      if (ret === false) {
        return;
      }
      var removedFileList = (0, _utils.removeFileItem)(file, mergedFileList);
      if (removedFileList) {
        currentFile = (0, _extends2["default"])((0, _extends2["default"])({}, file), {
          status: 'removed'
        });
        mergedFileList === null || mergedFileList === void 0 ? void 0 : mergedFileList.forEach(function (item) {
          var matchKey = currentFile.uid !== undefined ? 'uid' : 'name';
          if (item[matchKey] === currentFile[matchKey] && !Object.isFrozen(item)) {
            item.status = 'removed';
          }
        });
        (_a = upload.current) === null || _a === void 0 ? void 0 : _a.abort(currentFile);
        onInternalChange(currentFile, removedFileList);
      }
    });
  };
  var onFileDrop = function onFileDrop(e) {
    setDragState(e.type);
    if (e.type === 'drop') {
      onDrop === null || onDrop === void 0 ? void 0 : onDrop(e);
    }
  };
  // Test needs
  React.useImperativeHandle(ref, function () {
    return {
      onBatchStart: onBatchStart,
      onSuccess: onSuccess,
      onProgress: onProgress,
      onError: onError,
      fileList: mergedFileList,
      upload: upload.current
    };
  });
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var prefixCls = getPrefixCls('upload', customizePrefixCls);
  var rcUploadProps = (0, _extends2["default"])((0, _extends2["default"])({
    onBatchStart: onBatchStart,
    onError: onError,
    onProgress: onProgress,
    onSuccess: onSuccess
  }, props), {
    data: data,
    multiple: multiple,
    action: action,
    accept: accept,
    supportServerRender: supportServerRender,
    prefixCls: prefixCls,
    disabled: mergedDisabled,
    beforeUpload: mergedBeforeUpload,
    onChange: undefined
  });
  delete rcUploadProps.className;
  delete rcUploadProps.style;
  // Remove id to avoid open by label when trigger is hidden
  // !children: https://github.com/ant-design/ant-design/issues/14298
  // disabled: https://github.com/ant-design/ant-design/issues/16478
  //           https://github.com/ant-design/ant-design/issues/24197
  if (!children || mergedDisabled) {
    delete rcUploadProps.id;
  }
  var renderUploadList = function renderUploadList(button, buttonVisible) {
    return showUploadList ? ( /*#__PURE__*/React.createElement(_LocaleReceiver["default"], {
      componentName: 'Upload',
      defaultLocale: _default2["default"].Upload
    }, function (contextLocale) {
      var _ref = typeof showUploadList === 'boolean' ? {} : showUploadList,
        showRemoveIcon = _ref.showRemoveIcon,
        showPreviewIcon = _ref.showPreviewIcon,
        showDownloadIcon = _ref.showDownloadIcon,
        removeIcon = _ref.removeIcon,
        previewIcon = _ref.previewIcon,
        downloadIcon = _ref.downloadIcon;
      return /*#__PURE__*/React.createElement(_UploadList["default"], {
        prefixCls: prefixCls,
        listType: listType,
        items: mergedFileList,
        previewFile: previewFile,
        onPreview: onPreview,
        onDownload: onDownload,
        onRemove: handleRemove,
        showRemoveIcon: !mergedDisabled && showRemoveIcon,
        showPreviewIcon: showPreviewIcon,
        showDownloadIcon: showDownloadIcon,
        removeIcon: removeIcon,
        previewIcon: previewIcon,
        downloadIcon: downloadIcon,
        iconRender: iconRender,
        locale: (0, _extends2["default"])((0, _extends2["default"])({}, contextLocale), propLocale),
        isImageUrl: isImageUrl,
        progress: progress,
        appendAction: button,
        appendActionVisible: buttonVisible,
        itemRender: itemRender,
        disabled: mergedDisabled
      });
    })) : button;
  };
  if (type === 'drag') {
    var dragCls = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-drag"), true), "".concat(prefixCls, "-drag-uploading"), mergedFileList.some(function (file) {
      return file.status === 'uploading';
    })), "".concat(prefixCls, "-drag-hover"), dragState === 'dragover'), "".concat(prefixCls, "-disabled"), mergedDisabled), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
    return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
      className: dragCls,
      onDrop: onFileDrop,
      onDragOver: onFileDrop,
      onDragLeave: onFileDrop,
      style: style
    }, /*#__PURE__*/React.createElement(_rcUpload["default"], (0, _extends2["default"])({}, rcUploadProps, {
      ref: upload,
      className: "".concat(prefixCls, "-btn")
    }), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-drag-container")
    }, children))), renderUploadList());
  }
  var uploadButtonCls = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-select"), true), "".concat(prefixCls, "-select-").concat(listType), true), "".concat(prefixCls, "-disabled"), mergedDisabled), "".concat(prefixCls, "-rtl"), direction === 'rtl'));
  var renderUploadButton = function renderUploadButton(uploadButtonStyle) {
    return /*#__PURE__*/React.createElement("div", {
      className: uploadButtonCls,
      style: uploadButtonStyle
    }, /*#__PURE__*/React.createElement(_rcUpload["default"], (0, _extends2["default"])({}, rcUploadProps, {
      ref: upload
    })));
  };
  var uploadButton = renderUploadButton(children ? undefined : {
    display: 'none'
  });
  if (listType === 'picture-card') {
    return /*#__PURE__*/React.createElement("span", {
      className: (0, _classnames["default"])("".concat(prefixCls, "-picture-card-wrapper"), className)
    }, renderUploadList(uploadButton, !!children));
  }
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, uploadButton, renderUploadList());
};
var Upload = /*#__PURE__*/React.forwardRef(InternalUpload);
if (process.env.NODE_ENV !== 'production') {
  Upload.displayName = 'Upload';
}
var _default = exports["default"] = Upload;