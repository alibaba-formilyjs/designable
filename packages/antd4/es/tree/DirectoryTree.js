import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import FileOutlined from "@ant-design/icons/es/icons/FileOutlined";
import FolderOpenOutlined from "@ant-design/icons/es/icons/FolderOpenOutlined";
import FolderOutlined from "@ant-design/icons/es/icons/FolderOutlined";
import classNames from 'classnames';
import { conductExpandParent } from "rc-tree/es/util";
import { convertDataToEntities, convertTreeToData } from "rc-tree/es/utils/treeUtil";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Tree from './Tree';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './utils/dictUtil';
function getIcon(props) {
  var isLeaf = props.isLeaf,
    expanded = props.expanded;
  if (isLeaf) {
    return /*#__PURE__*/React.createElement(FileOutlined, null);
  }
  return expanded ? /*#__PURE__*/React.createElement(FolderOpenOutlined, null) : /*#__PURE__*/React.createElement(FolderOutlined, null);
}
function getTreeData(_ref) {
  var treeData = _ref.treeData,
    children = _ref.children;
  return treeData || convertTreeToData(children);
}
var DirectoryTree = function DirectoryTree(_a, ref) {
  var defaultExpandAll = _a.defaultExpandAll,
    defaultExpandParent = _a.defaultExpandParent,
    defaultExpandedKeys = _a.defaultExpandedKeys,
    props = __rest(_a, ["defaultExpandAll", "defaultExpandParent", "defaultExpandedKeys"]);
  // Shift click usage
  var lastSelectedKey = React.useRef();
  var cachedSelectedKeys = React.useRef();
  var getInitExpandedKeys = function getInitExpandedKeys() {
    var _convertDataToEntitie = convertDataToEntities(getTreeData(props)),
      keyEntities = _convertDataToEntitie.keyEntities;
    var initExpandedKeys;
    // Expanded keys
    if (defaultExpandAll) {
      initExpandedKeys = Object.keys(keyEntities);
    } else if (defaultExpandParent) {
      initExpandedKeys = conductExpandParent(props.expandedKeys || defaultExpandedKeys || [], keyEntities);
    } else {
      initExpandedKeys = props.expandedKeys || defaultExpandedKeys;
    }
    return initExpandedKeys;
  };
  var _React$useState = React.useState(props.selectedKeys || props.defaultSelectedKeys || []),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    selectedKeys = _React$useState2[0],
    setSelectedKeys = _React$useState2[1];
  var _React$useState3 = React.useState(function () {
      return getInitExpandedKeys();
    }),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    expandedKeys = _React$useState4[0],
    setExpandedKeys = _React$useState4[1];
  React.useEffect(function () {
    if ('selectedKeys' in props) {
      setSelectedKeys(props.selectedKeys);
    }
  }, [props.selectedKeys]);
  React.useEffect(function () {
    if ('expandedKeys' in props) {
      setExpandedKeys(props.expandedKeys);
    }
  }, [props.expandedKeys]);
  var onExpand = function onExpand(keys, info) {
    var _a;
    if (!('expandedKeys' in props)) {
      setExpandedKeys(keys);
    }
    // Call origin function
    return (_a = props.onExpand) === null || _a === void 0 ? void 0 : _a.call(props, keys, info);
  };
  var onSelect = function onSelect(keys, event) {
    var _a;
    var multiple = props.multiple;
    var node = event.node,
      nativeEvent = event.nativeEvent;
    var _node$key = node.key,
      key = _node$key === void 0 ? '' : _node$key;
    var treeData = getTreeData(props);
    // const newState: DirectoryTreeState = {};
    // We need wrap this event since some value is not same
    var newEvent = _extends(_extends({}, event), {
      selected: true
    });
    // Windows / Mac single pick
    var ctrlPick = (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.ctrlKey) || (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.metaKey);
    var shiftPick = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.shiftKey;
    // Generate new selected keys
    var newSelectedKeys;
    if (multiple && ctrlPick) {
      // Control click
      newSelectedKeys = keys;
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    } else if (multiple && shiftPick) {
      // Shift click
      newSelectedKeys = Array.from(new Set([].concat(_toConsumableArray(cachedSelectedKeys.current || []), _toConsumableArray(calcRangeKeys({
        treeData: treeData,
        expandedKeys: expandedKeys,
        startKey: key,
        endKey: lastSelectedKey.current
      })))));
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    } else {
      // Single click
      newSelectedKeys = [key];
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    }
    (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, newSelectedKeys, newEvent);
    if (!('selectedKeys' in props)) {
      setSelectedKeys(newSelectedKeys);
    }
  };
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    _props$showIcon = props.showIcon,
    showIcon = _props$showIcon === void 0 ? true : _props$showIcon,
    _props$expandAction = props.expandAction,
    expandAction = _props$expandAction === void 0 ? 'click' : _props$expandAction,
    otherProps = __rest(props, ["prefixCls", "className", "showIcon", "expandAction"]);
  var prefixCls = getPrefixCls('tree', customizePrefixCls);
  var connectClassName = classNames("".concat(prefixCls, "-directory"), _defineProperty({}, "".concat(prefixCls, "-directory-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement(Tree, _extends({
    icon: getIcon,
    ref: ref,
    blockNode: true
  }, otherProps, {
    showIcon: showIcon,
    expandAction: expandAction,
    prefixCls: prefixCls,
    className: connectClassName,
    expandedKeys: expandedKeys,
    selectedKeys: selectedKeys,
    onSelect: onSelect,
    onExpand: onExpand
  }));
};
var ForwardDirectoryTree = /*#__PURE__*/React.forwardRef(DirectoryTree);
if (process.env.NODE_ENV !== 'production') {
  ForwardDirectoryTree.displayName = 'DirectoryTree';
}
export default ForwardDirectoryTree;