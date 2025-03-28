import _typeof from "@babel/runtime/helpers/esm/typeof";
import CaretDownFilled from "@ant-design/icons/es/icons/CaretDownFilled";
import FileOutlined from "@ant-design/icons/es/icons/FileOutlined";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import MinusSquareOutlined from "@ant-design/icons/es/icons/MinusSquareOutlined";
import PlusSquareOutlined from "@ant-design/icons/es/icons/PlusSquareOutlined";
import classNames from 'classnames';
import * as React from 'react';
import { cloneElement, isValidElement } from '../../_util/reactNode';
export default function renderSwitcherIcon(prefixCls, switcherIcon, showLine, treeNodeProps) {
  var isLeaf = treeNodeProps.isLeaf,
    expanded = treeNodeProps.expanded,
    loading = treeNodeProps.loading;
  if (loading) {
    return /*#__PURE__*/React.createElement(LoadingOutlined, {
      className: "".concat(prefixCls, "-switcher-loading-icon")
    });
  }
  var showLeafIcon;
  if (showLine && _typeof(showLine) === 'object') {
    showLeafIcon = showLine.showLeafIcon;
  }
  if (isLeaf) {
    if (!showLine) {
      return null;
    }
    if (typeof showLeafIcon !== 'boolean' && !!showLeafIcon) {
      var leafIcon = typeof showLeafIcon === 'function' ? showLeafIcon(treeNodeProps) : showLeafIcon;
      var leafCls = "".concat(prefixCls, "-switcher-line-custom-icon");
      if (isValidElement(leafIcon)) {
        return cloneElement(leafIcon, {
          className: classNames(leafIcon.props.className || '', leafCls)
        });
      }
      return leafIcon;
    }
    return showLeafIcon ? ( /*#__PURE__*/React.createElement(FileOutlined, {
      className: "".concat(prefixCls, "-switcher-line-icon")
    })) : ( /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-switcher-leaf-line")
    }));
  }
  var switcherCls = "".concat(prefixCls, "-switcher-icon");
  var switcher = typeof switcherIcon === 'function' ? switcherIcon(treeNodeProps) : switcherIcon;
  if (isValidElement(switcher)) {
    return cloneElement(switcher, {
      className: classNames(switcher.props.className || '', switcherCls)
    });
  }
  if (switcher) {
    return switcher;
  }
  if (showLine) {
    return expanded ? ( /*#__PURE__*/React.createElement(MinusSquareOutlined, {
      className: "".concat(prefixCls, "-switcher-line-icon")
    })) : ( /*#__PURE__*/React.createElement(PlusSquareOutlined, {
      className: "".concat(prefixCls, "-switcher-line-icon")
    }));
  }
  return /*#__PURE__*/React.createElement(CaretDownFilled, {
    className: switcherCls
  });
}