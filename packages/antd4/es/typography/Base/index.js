import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CheckOutlined from "@ant-design/icons/es/icons/CheckOutlined";
import CopyOutlined from "@ant-design/icons/es/icons/CopyOutlined";
import EditOutlined from "@ant-design/icons/es/icons/EditOutlined";
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import ResizeObserver from 'rc-resize-observer';
import toArray from "rc-util/es/Children/toArray";
import useIsomorphicLayoutEffect from "rc-util/es/hooks/useLayoutEffect";
import useMergedState from "rc-util/es/hooks/useMergedState";
import omit from "rc-util/es/omit";
import { composeRef } from "rc-util/es/ref";
import * as React from 'react';
import { ConfigContext } from '../../config-provider';
import { useLocaleReceiver } from '../../locale-provider/LocaleReceiver';
import TransButton from '../../_util/transButton';
import { isStyleSupport } from '../../_util/styleChecker';
import Tooltip from '../../tooltip';
import Editable from '../Editable';
import useMergedConfig from '../hooks/useMergedConfig';
import useUpdatedEffect from '../hooks/useUpdatedEffect';
import Typography from '../Typography';
import Ellipsis from './Ellipsis';
import EllipsisTooltip from './EllipsisTooltip';
function wrapperDecorations(_ref, content) {
  var mark = _ref.mark,
    code = _ref.code,
    underline = _ref.underline,
    del = _ref["delete"],
    strong = _ref.strong,
    keyboard = _ref.keyboard,
    italic = _ref.italic;
  var currentContent = content;
  function wrap(needed, tag) {
    if (!needed) return;
    currentContent = /*#__PURE__*/React.createElement(tag, {}, currentContent);
  }
  wrap(strong, 'strong');
  wrap(underline, 'u');
  wrap(del, 'del');
  wrap(code, 'code');
  wrap(mark, 'mark');
  wrap(keyboard, 'kbd');
  wrap(italic, 'i');
  return currentContent;
}
function getNode(dom, defaultNode, needDom) {
  if (dom === true || dom === undefined) {
    return defaultNode;
  }
  return dom || needDom && defaultNode;
}
function toList(val) {
  if (val === false) {
    return [false, false];
  }
  return Array.isArray(val) ? val : [val];
}
var ELLIPSIS_STR = '...';
var Base = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _a, _b, _c;
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    style = props.style,
    type = props.type,
    disabled = props.disabled,
    children = props.children,
    ellipsis = props.ellipsis,
    editable = props.editable,
    copyable = props.copyable,
    component = props.component,
    title = props.title,
    restProps = __rest(props, ["prefixCls", "className", "style", "type", "disabled", "children", "ellipsis", "editable", "copyable", "component", "title"]);
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var textLocale = useLocaleReceiver('Text')[0]; // Force TS get this
  var typographyRef = React.useRef(null);
  var editIconRef = React.useRef(null);
  // ============================ MISC ============================
  var prefixCls = getPrefixCls('typography', customizePrefixCls);
  var textProps = omit(restProps, ['mark', 'code', 'delete', 'underline', 'strong', 'keyboard', 'italic']);
  // ========================== Editable ==========================
  var _useMergedConfig = useMergedConfig(editable),
    _useMergedConfig2 = _slicedToArray(_useMergedConfig, 2),
    enableEdit = _useMergedConfig2[0],
    editConfig = _useMergedConfig2[1];
  var _useMergedState = useMergedState(false, {
      value: editConfig.editing
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    editing = _useMergedState2[0],
    setEditing = _useMergedState2[1];
  var _editConfig$triggerTy = editConfig.triggerType,
    triggerType = _editConfig$triggerTy === void 0 ? ['icon'] : _editConfig$triggerTy;
  var triggerEdit = function triggerEdit(edit) {
    var _a;
    if (edit) {
      (_a = editConfig.onStart) === null || _a === void 0 ? void 0 : _a.call(editConfig);
    }
    setEditing(edit);
  };
  // Focus edit icon when back
  useUpdatedEffect(function () {
    var _a;
    if (!editing) {
      (_a = editIconRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }, [editing]);
  var onEditClick = function onEditClick(e) {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    triggerEdit(true);
  };
  var onEditChange = function onEditChange(value) {
    var _a;
    (_a = editConfig.onChange) === null || _a === void 0 ? void 0 : _a.call(editConfig, value);
    triggerEdit(false);
  };
  var onEditCancel = function onEditCancel() {
    var _a;
    (_a = editConfig.onCancel) === null || _a === void 0 ? void 0 : _a.call(editConfig);
    triggerEdit(false);
  };
  // ========================== Copyable ==========================
  var _useMergedConfig3 = useMergedConfig(copyable),
    _useMergedConfig4 = _slicedToArray(_useMergedConfig3, 2),
    enableCopy = _useMergedConfig4[0],
    copyConfig = _useMergedConfig4[1];
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    copied = _React$useState2[0],
    setCopied = _React$useState2[1];
  var copyIdRef = React.useRef();
  var copyOptions = {};
  if (copyConfig.format) {
    copyOptions.format = copyConfig.format;
  }
  var cleanCopyId = function cleanCopyId() {
    window.clearTimeout(copyIdRef.current);
  };
  var onCopyClick = function onCopyClick(e) {
    var _a;
    e === null || e === void 0 ? void 0 : e.preventDefault();
    e === null || e === void 0 ? void 0 : e.stopPropagation();
    copy(copyConfig.text || String(children) || '', copyOptions);
    setCopied(true);
    // Trigger tips update
    cleanCopyId();
    copyIdRef.current = window.setTimeout(function () {
      setCopied(false);
    }, 3000);
    (_a = copyConfig.onCopy) === null || _a === void 0 ? void 0 : _a.call(copyConfig, e);
  };
  React.useEffect(function () {
    return cleanCopyId;
  }, []);
  // ========================== Ellipsis ==========================
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isLineClampSupport = _React$useState4[0],
    setIsLineClampSupport = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    isTextOverflowSupport = _React$useState6[0],
    setIsTextOverflowSupport = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    expanded = _React$useState8[0],
    setExpanded = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    isJsEllipsis = _React$useState10[0],
    setIsJsEllipsis = _React$useState10[1];
  var _React$useState11 = React.useState(false),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    isNativeEllipsis = _React$useState12[0],
    setIsNativeEllipsis = _React$useState12[1];
  var _React$useState13 = React.useState(true),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    isNativeVisible = _React$useState14[0],
    setIsNativeVisible = _React$useState14[1];
  var _useMergedConfig5 = useMergedConfig(ellipsis, {
      expandable: false
    }),
    _useMergedConfig6 = _slicedToArray(_useMergedConfig5, 2),
    enableEllipsis = _useMergedConfig6[0],
    ellipsisConfig = _useMergedConfig6[1];
  var mergedEnableEllipsis = enableEllipsis && !expanded;
  // Shared prop to reduce bundle size
  var _ellipsisConfig$rows = ellipsisConfig.rows,
    rows = _ellipsisConfig$rows === void 0 ? 1 : _ellipsisConfig$rows;
  var needMeasureEllipsis = React.useMemo(function () {
    return (
      // Disable ellipsis
      !mergedEnableEllipsis ||
      // Provide suffix
      ellipsisConfig.suffix !== undefined || ellipsisConfig.onEllipsis ||
      // Can't use css ellipsis since we need to provide the place for button
      ellipsisConfig.expandable || enableEdit || enableCopy
    );
  }, [mergedEnableEllipsis, ellipsisConfig, enableEdit, enableCopy]);
  useIsomorphicLayoutEffect(function () {
    if (enableEllipsis && !needMeasureEllipsis) {
      setIsLineClampSupport(isStyleSupport('webkitLineClamp'));
      setIsTextOverflowSupport(isStyleSupport('textOverflow'));
    }
  }, [needMeasureEllipsis, enableEllipsis]);
  var cssEllipsis = React.useMemo(function () {
    if (needMeasureEllipsis) {
      return false;
    }
    if (rows === 1) {
      return isTextOverflowSupport;
    }
    return isLineClampSupport;
  }, [needMeasureEllipsis, isTextOverflowSupport, isLineClampSupport]);
  var isMergedEllipsis = mergedEnableEllipsis && (cssEllipsis ? isNativeEllipsis : isJsEllipsis);
  var cssTextOverflow = mergedEnableEllipsis && rows === 1 && cssEllipsis;
  var cssLineClamp = mergedEnableEllipsis && rows > 1 && cssEllipsis;
  // >>>>> Expand
  var onExpandClick = function onExpandClick(e) {
    var _a;
    setExpanded(true);
    (_a = ellipsisConfig.onExpand) === null || _a === void 0 ? void 0 : _a.call(ellipsisConfig, e);
  };
  var _React$useState15 = React.useState(0),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    ellipsisWidth = _React$useState16[0],
    setEllipsisWidth = _React$useState16[1];
  var _React$useState17 = React.useState(0),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    ellipsisFontSize = _React$useState18[0],
    setEllipsisFontSize = _React$useState18[1];
  var onResize = function onResize(_ref2, element) {
    var offsetWidth = _ref2.offsetWidth;
    var _a;
    setEllipsisWidth(offsetWidth);
    setEllipsisFontSize(parseInt((_a = window.getComputedStyle) === null || _a === void 0 ? void 0 : _a.call(window, element).fontSize, 10) || 0);
  };
  // >>>>> JS Ellipsis
  var onJsEllipsis = function onJsEllipsis(jsEllipsis) {
    var _a;
    setIsJsEllipsis(jsEllipsis);
    // Trigger if changed
    if (isJsEllipsis !== jsEllipsis) {
      (_a = ellipsisConfig.onEllipsis) === null || _a === void 0 ? void 0 : _a.call(ellipsisConfig, jsEllipsis);
    }
  };
  // >>>>> Native ellipsis
  React.useEffect(function () {
    var textEle = typographyRef.current;
    if (enableEllipsis && cssEllipsis && textEle) {
      var currentEllipsis = cssLineClamp ? textEle.offsetHeight < textEle.scrollHeight : textEle.offsetWidth < textEle.scrollWidth;
      if (isNativeEllipsis !== currentEllipsis) {
        setIsNativeEllipsis(currentEllipsis);
      }
    }
  }, [enableEllipsis, cssEllipsis, children, cssLineClamp, isNativeVisible]);
  // https://github.com/ant-design/ant-design/issues/36786
  // Use IntersectionObserver to check if element is invisible
  React.useEffect(function () {
    var textEle = typographyRef.current;
    if (typeof IntersectionObserver === 'undefined' || !textEle || !cssEllipsis || !mergedEnableEllipsis) {
      return;
    }
    /* eslint-disable-next-line compat/compat */
    var observer = new IntersectionObserver(function () {
      setIsNativeVisible(!!textEle.offsetParent);
    });
    observer.observe(textEle);
    return function () {
      observer.disconnect();
    };
  }, [cssEllipsis, mergedEnableEllipsis]);
  // ========================== Tooltip ===========================
  var tooltipProps = {};
  if (ellipsisConfig.tooltip === true) {
    tooltipProps = {
      title: (_a = editConfig.text) !== null && _a !== void 0 ? _a : children
    };
  } else if ( /*#__PURE__*/React.isValidElement(ellipsisConfig.tooltip)) {
    tooltipProps = {
      title: ellipsisConfig.tooltip
    };
  } else if (_typeof(ellipsisConfig.tooltip) === 'object') {
    tooltipProps = _extends({
      title: (_b = editConfig.text) !== null && _b !== void 0 ? _b : children
    }, ellipsisConfig.tooltip);
  } else {
    tooltipProps = {
      title: ellipsisConfig.tooltip
    };
  }
  var topAriaLabel = React.useMemo(function () {
    var isValid = function isValid(val) {
      return ['string', 'number'].includes(_typeof(val));
    };
    if (!enableEllipsis || cssEllipsis) {
      return undefined;
    }
    if (isValid(editConfig.text)) {
      return editConfig.text;
    }
    if (isValid(children)) {
      return children;
    }
    if (isValid(title)) {
      return title;
    }
    if (isValid(tooltipProps.title)) {
      return tooltipProps.title;
    }
    return undefined;
  }, [enableEllipsis, cssEllipsis, title, tooltipProps.title, isMergedEllipsis]);
  // =========================== Render ===========================
  // >>>>>>>>>>> Editing input
  if (editing) {
    return /*#__PURE__*/React.createElement(Editable, {
      value: (_c = editConfig.text) !== null && _c !== void 0 ? _c : typeof children === 'string' ? children : '',
      onSave: onEditChange,
      onCancel: onEditCancel,
      onEnd: editConfig.onEnd,
      prefixCls: prefixCls,
      className: className,
      style: style,
      direction: direction,
      component: component,
      maxLength: editConfig.maxLength,
      autoSize: editConfig.autoSize,
      enterIcon: editConfig.enterIcon
    });
  }
  // >>>>>>>>>>> Typography
  // Expand
  var renderExpand = function renderExpand() {
    var expandable = ellipsisConfig.expandable,
      symbol = ellipsisConfig.symbol;
    if (!expandable) return null;
    var expandContent;
    if (symbol) {
      expandContent = symbol;
    } else {
      expandContent = textLocale.expand;
    }
    return /*#__PURE__*/React.createElement("a", {
      key: "expand",
      className: "".concat(prefixCls, "-expand"),
      onClick: onExpandClick,
      "aria-label": textLocale.expand
    }, expandContent);
  };
  // Edit
  var renderEdit = function renderEdit() {
    if (!enableEdit) return;
    var icon = editConfig.icon,
      tooltip = editConfig.tooltip;
    var editTitle = toArray(tooltip)[0] || textLocale.edit;
    var ariaLabel = typeof editTitle === 'string' ? editTitle : '';
    return triggerType.includes('icon') ? ( /*#__PURE__*/React.createElement(Tooltip, {
      key: "edit",
      title: tooltip === false ? '' : editTitle
    }, /*#__PURE__*/React.createElement(TransButton, {
      ref: editIconRef,
      className: "".concat(prefixCls, "-edit"),
      onClick: onEditClick,
      "aria-label": ariaLabel
    }, icon || /*#__PURE__*/React.createElement(EditOutlined, {
      role: "button"
    })))) : null;
  };
  // Copy
  var renderCopy = function renderCopy() {
    if (!enableCopy) return;
    var tooltips = copyConfig.tooltips,
      icon = copyConfig.icon;
    var tooltipNodes = toList(tooltips);
    var iconNodes = toList(icon);
    var copyTitle = copied ? getNode(tooltipNodes[1], textLocale.copied) : getNode(tooltipNodes[0], textLocale.copy);
    var systemStr = copied ? textLocale.copied : textLocale.copy;
    var ariaLabel = typeof copyTitle === 'string' ? copyTitle : systemStr;
    return /*#__PURE__*/React.createElement(Tooltip, {
      key: "copy",
      title: copyTitle
    }, /*#__PURE__*/React.createElement(TransButton, {
      className: classNames("".concat(prefixCls, "-copy"), copied && "".concat(prefixCls, "-copy-success")),
      onClick: onCopyClick,
      "aria-label": ariaLabel
    }, copied ? getNode(iconNodes[1], /*#__PURE__*/React.createElement(CheckOutlined, null), true) : getNode(iconNodes[0], /*#__PURE__*/React.createElement(CopyOutlined, null), true)));
  };
  var renderOperations = function renderOperations(renderExpanded) {
    return [renderExpanded && renderExpand(), renderEdit(), renderCopy()];
  };
  var renderEllipsis = function renderEllipsis(needEllipsis) {
    return [needEllipsis && ( /*#__PURE__*/React.createElement("span", {
      "aria-hidden": true,
      key: "ellipsis"
    }, ELLIPSIS_STR)), ellipsisConfig.suffix, renderOperations(needEllipsis)];
  };
  return /*#__PURE__*/React.createElement(ResizeObserver, {
    onResize: onResize,
    disabled: !mergedEnableEllipsis || cssEllipsis
  }, function (resizeRef) {
    return /*#__PURE__*/React.createElement(EllipsisTooltip, {
      tooltipProps: tooltipProps,
      enabledEllipsis: mergedEnableEllipsis,
      isEllipsis: isMergedEllipsis
    }, /*#__PURE__*/React.createElement(Typography, _extends({
      className: classNames(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-").concat(type), type), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-ellipsis"), enableEllipsis), "".concat(prefixCls, "-single-line"), mergedEnableEllipsis && rows === 1), "".concat(prefixCls, "-ellipsis-single-line"), cssTextOverflow), "".concat(prefixCls, "-ellipsis-multiple-line"), cssLineClamp), className),
      prefixCls: customizePrefixCls,
      style: _extends(_extends({}, style), {
        WebkitLineClamp: cssLineClamp ? rows : undefined
      }),
      component: component,
      ref: composeRef(resizeRef, typographyRef, ref),
      direction: direction,
      onClick: triggerType.includes('text') ? onEditClick : undefined,
      "aria-label": topAriaLabel === null || topAriaLabel === void 0 ? void 0 : topAriaLabel.toString(),
      title: title
    }, textProps), /*#__PURE__*/React.createElement(Ellipsis, {
      enabledMeasure: mergedEnableEllipsis && !cssEllipsis,
      text: children,
      rows: rows,
      width: ellipsisWidth,
      fontSize: ellipsisFontSize,
      onEllipsis: onJsEllipsis
    }, function (node, needEllipsis) {
      var renderNode = node;
      if (node.length && needEllipsis && topAriaLabel) {
        renderNode = /*#__PURE__*/React.createElement("span", {
          key: "show-content",
          "aria-hidden": true
        }, renderNode);
      }
      var wrappedContext = wrapperDecorations(props, /*#__PURE__*/React.createElement(React.Fragment, null, renderNode, renderEllipsis(needEllipsis)));
      return wrappedContext;
    })));
  });
});
export default Base;