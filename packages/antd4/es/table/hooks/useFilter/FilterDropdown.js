import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import FilterFilled from "@ant-design/icons/es/icons/FilterFilled";
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import * as React from 'react';
import { flattenKeys } from '.';
import Button from '../../../button';
import Checkbox from '../../../checkbox';
import { ConfigContext } from '../../../config-provider/context';
import Dropdown from '../../../dropdown';
import Empty from '../../../empty';
import Menu from '../../../menu';
import { OverrideProvider } from '../../../menu/OverrideContext';
import Radio from '../../../radio';
import Tree from '../../../tree';
import useSyncState from '../../../_util/hooks/useSyncState';
import FilterSearch from './FilterSearch';
import FilterDropdownMenuWrapper from './FilterWrapper';
function hasSubMenu(filters) {
  return filters.some(function (_ref) {
    var children = _ref.children;
    return children;
  });
}
function searchValueMatched(searchValue, text) {
  if (typeof text === 'string' || typeof text === 'number') {
    return text === null || text === void 0 ? void 0 : text.toString().toLowerCase().includes(searchValue.trim().toLowerCase());
  }
  return false;
}
function renderFilterItems(_ref2) {
  var filters = _ref2.filters,
    prefixCls = _ref2.prefixCls,
    filteredKeys = _ref2.filteredKeys,
    filterMultiple = _ref2.filterMultiple,
    searchValue = _ref2.searchValue,
    filterSearch = _ref2.filterSearch;
  return filters.map(function (filter, index) {
    var key = String(filter.value);
    if (filter.children) {
      return {
        key: key || index,
        label: filter.text,
        popupClassName: "".concat(prefixCls, "-dropdown-submenu"),
        children: renderFilterItems({
          filters: filter.children,
          prefixCls: prefixCls,
          filteredKeys: filteredKeys,
          filterMultiple: filterMultiple,
          searchValue: searchValue,
          filterSearch: filterSearch
        })
      };
    }
    var Component = filterMultiple ? Checkbox : Radio;
    var item = {
      key: filter.value !== undefined ? key : index,
      label: ( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Component, {
        checked: filteredKeys.includes(key)
      }), /*#__PURE__*/React.createElement("span", null, filter.text)))
    };
    if (searchValue.trim()) {
      if (typeof filterSearch === 'function') {
        return filterSearch(searchValue, filter) ? item : null;
      }
      return searchValueMatched(searchValue, filter.text) ? item : null;
    }
    return item;
  });
}
function wrapStringListType(keys) {
  return keys || [];
}
function FilterDropdown(props) {
  var _a;
  var tablePrefixCls = props.tablePrefixCls,
    prefixCls = props.prefixCls,
    column = props.column,
    dropdownPrefixCls = props.dropdownPrefixCls,
    columnKey = props.columnKey,
    filterMultiple = props.filterMultiple,
    _props$filterMode = props.filterMode,
    filterMode = _props$filterMode === void 0 ? 'menu' : _props$filterMode,
    _props$filterSearch = props.filterSearch,
    filterSearch = _props$filterSearch === void 0 ? false : _props$filterSearch,
    filterState = props.filterState,
    triggerFilter = props.triggerFilter,
    locale = props.locale,
    children = props.children,
    getPopupContainer = props.getPopupContainer;
  var filterDropdownOpen = column.filterDropdownOpen,
    onFilterDropdownOpenChange = column.onFilterDropdownOpenChange,
    filterDropdownVisible = column.filterDropdownVisible,
    onFilterDropdownVisibleChange = column.onFilterDropdownVisibleChange,
    filterResetToDefaultFilteredValue = column.filterResetToDefaultFilteredValue,
    defaultFilteredValue = column.defaultFilteredValue;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visible = _React$useState2[0],
    setVisible = _React$useState2[1];
  var filtered = !!(filterState && (((_a = filterState.filteredKeys) === null || _a === void 0 ? void 0 : _a.length) || filterState.forceFiltered));
  var triggerVisible = function triggerVisible(newVisible) {
    setVisible(newVisible);
    onFilterDropdownOpenChange === null || onFilterDropdownOpenChange === void 0 ? void 0 : onFilterDropdownOpenChange(newVisible);
    onFilterDropdownVisibleChange === null || onFilterDropdownVisibleChange === void 0 ? void 0 : onFilterDropdownVisibleChange(newVisible);
  };
  var mergedVisible;
  if (typeof filterDropdownOpen === 'boolean') {
    mergedVisible = filterDropdownOpen;
  } else {
    mergedVisible = typeof filterDropdownVisible === 'boolean' ? filterDropdownVisible : visible;
  }
  // ===================== Select Keys =====================
  var propFilteredKeys = filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys;
  var _useSyncState = useSyncState(wrapStringListType(propFilteredKeys)),
    _useSyncState2 = _slicedToArray(_useSyncState, 2),
    getFilteredKeysSync = _useSyncState2[0],
    setFilteredKeysSync = _useSyncState2[1];
  var onSelectKeys = function onSelectKeys(_ref3) {
    var selectedKeys = _ref3.selectedKeys;
    setFilteredKeysSync(selectedKeys);
  };
  var onCheck = function onCheck(keys, _ref4) {
    var node = _ref4.node,
      checked = _ref4.checked;
    if (!filterMultiple) {
      onSelectKeys({
        selectedKeys: checked && node.key ? [node.key] : []
      });
    } else {
      onSelectKeys({
        selectedKeys: keys
      });
    }
  };
  React.useEffect(function () {
    if (!visible) {
      return;
    }
    onSelectKeys({
      selectedKeys: wrapStringListType(propFilteredKeys)
    });
  }, [propFilteredKeys]);
  // ====================== Open Keys ======================
  var _React$useState3 = React.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    openKeys = _React$useState4[0],
    setOpenKeys = _React$useState4[1];
  var onOpenChange = function onOpenChange(keys) {
    setOpenKeys(keys);
  };
  // search in tree mode column filter
  var _React$useState5 = React.useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    searchValue = _React$useState6[0],
    setSearchValue = _React$useState6[1];
  var onSearch = function onSearch(e) {
    var value = e.target.value;
    setSearchValue(value);
  };
  // clear search value after close filter dropdown
  React.useEffect(function () {
    if (!visible) {
      setSearchValue('');
    }
  }, [visible]);
  // ======================= Submit ========================
  var internalTriggerFilter = function internalTriggerFilter(keys) {
    var mergedKeys = keys && keys.length ? keys : null;
    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }
    if (isEqual(mergedKeys, filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys)) {
      return null;
    }
    triggerFilter({
      column: column,
      key: columnKey,
      filteredKeys: mergedKeys
    });
  };
  var onConfirm = function onConfirm() {
    triggerVisible(false);
    internalTriggerFilter(getFilteredKeysSync());
  };
  var onReset = function onReset() {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        confirm: false,
        closeDropdown: false
      },
      confirm = _ref5.confirm,
      closeDropdown = _ref5.closeDropdown;
    if (confirm) {
      internalTriggerFilter([]);
    }
    if (closeDropdown) {
      triggerVisible(false);
    }
    setSearchValue('');
    if (filterResetToDefaultFilteredValue) {
      setFilteredKeysSync((defaultFilteredValue || []).map(function (key) {
        return String(key);
      }));
    } else {
      setFilteredKeysSync([]);
    }
  };
  var doFilter = function doFilter() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        closeDropdown: true
      },
      closeDropdown = _ref6.closeDropdown;
    if (closeDropdown) {
      triggerVisible(false);
    }
    internalTriggerFilter(getFilteredKeysSync());
  };
  var onVisibleChange = function onVisibleChange(newVisible) {
    if (newVisible && propFilteredKeys !== undefined) {
      // Sync filteredKeys on appear in controlled mode (propFilteredKeys !== undefiend)
      setFilteredKeysSync(wrapStringListType(propFilteredKeys));
    }
    triggerVisible(newVisible);
    // Default will filter when closed
    if (!newVisible && !column.filterDropdown) {
      onConfirm();
    }
  };
  // ======================== Style ========================
  var dropdownMenuClass = classNames(_defineProperty({}, "".concat(dropdownPrefixCls, "-menu-without-submenu"), !hasSubMenu(column.filters || [])));
  var onCheckAll = function onCheckAll(e) {
    if (e.target.checked) {
      var allFilterKeys = flattenKeys(column === null || column === void 0 ? void 0 : column.filters).map(function (key) {
        return String(key);
      });
      setFilteredKeysSync(allFilterKeys);
    } else {
      setFilteredKeysSync([]);
    }
  };
  var getTreeData = function getTreeData(_ref7) {
    var filters = _ref7.filters;
    return (filters || []).map(function (filter, index) {
      var key = String(filter.value);
      var item = {
        title: filter.text,
        key: filter.value !== undefined ? key : String(index)
      };
      if (filter.children) {
        item.children = getTreeData({
          filters: filter.children
        });
      }
      return item;
    });
  };
  var getFilterData = function getFilterData(node) {
    var _a;
    return _extends(_extends({}, node), {
      text: node.title,
      value: node.key,
      children: ((_a = node.children) === null || _a === void 0 ? void 0 : _a.map(function (item) {
        return getFilterData(item);
      })) || []
    });
  };
  var dropdownContent;
  if (typeof column.filterDropdown === 'function') {
    dropdownContent = column.filterDropdown({
      prefixCls: "".concat(dropdownPrefixCls, "-custom"),
      setSelectedKeys: function setSelectedKeys(selectedKeys) {
        return onSelectKeys({
          selectedKeys: selectedKeys
        });
      },
      selectedKeys: getFilteredKeysSync(),
      confirm: doFilter,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible,
      close: function close() {
        triggerVisible(false);
      }
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    var selectedKeys = getFilteredKeysSync() || [];
    var getFilterComponent = function getFilterComponent() {
      if ((column.filters || []).length === 0) {
        return /*#__PURE__*/React.createElement(Empty, {
          image: Empty.PRESENTED_IMAGE_SIMPLE,
          description: locale.filterEmptyText,
          imageStyle: {
            height: 24
          },
          style: {
            margin: 0,
            padding: '16px 0'
          }
        });
      }
      if (filterMode === 'tree') {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FilterSearch, {
          filterSearch: filterSearch,
          value: searchValue,
          onChange: onSearch,
          tablePrefixCls: tablePrefixCls,
          locale: locale
        }), /*#__PURE__*/React.createElement("div", {
          className: "".concat(tablePrefixCls, "-filter-dropdown-tree")
        }, filterMultiple ? ( /*#__PURE__*/React.createElement(Checkbox, {
          checked: selectedKeys.length === flattenKeys(column.filters).length,
          indeterminate: selectedKeys.length > 0 && selectedKeys.length < flattenKeys(column.filters).length,
          className: "".concat(tablePrefixCls, "-filter-dropdown-checkall"),
          onChange: onCheckAll
        }, locale.filterCheckall)) : null, /*#__PURE__*/React.createElement(Tree, {
          checkable: true,
          selectable: false,
          blockNode: true,
          multiple: filterMultiple,
          checkStrictly: !filterMultiple,
          className: "".concat(dropdownPrefixCls, "-menu"),
          onCheck: onCheck,
          checkedKeys: selectedKeys,
          selectedKeys: selectedKeys,
          showIcon: false,
          treeData: getTreeData({
            filters: column.filters
          }),
          autoExpandParent: true,
          defaultExpandAll: true,
          filterTreeNode: searchValue.trim() ? function (node) {
            if (typeof filterSearch === 'function') {
              return filterSearch(searchValue, getFilterData(node));
            }
            return searchValueMatched(searchValue, node.title);
          } : undefined
        })));
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FilterSearch, {
        filterSearch: filterSearch,
        value: searchValue,
        onChange: onSearch,
        tablePrefixCls: tablePrefixCls,
        locale: locale
      }), /*#__PURE__*/React.createElement(Menu, {
        selectable: true,
        multiple: filterMultiple,
        prefixCls: "".concat(dropdownPrefixCls, "-menu"),
        className: dropdownMenuClass,
        onSelect: onSelectKeys,
        onDeselect: onSelectKeys,
        selectedKeys: selectedKeys,
        getPopupContainer: getPopupContainer,
        openKeys: openKeys,
        onOpenChange: onOpenChange,
        items: renderFilterItems({
          filters: column.filters || [],
          filterSearch: filterSearch,
          prefixCls: prefixCls,
          filteredKeys: getFilteredKeysSync(),
          filterMultiple: filterMultiple,
          searchValue: searchValue
        })
      }));
    };
    var getResetDisabled = function getResetDisabled() {
      if (filterResetToDefaultFilteredValue) {
        return isEqual((defaultFilteredValue || []).map(function (key) {
          return String(key);
        }), selectedKeys);
      }
      return selectedKeys.length === 0;
    };
    dropdownContent = /*#__PURE__*/React.createElement(React.Fragment, null, getFilterComponent(), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-dropdown-btns")
    }, /*#__PURE__*/React.createElement(Button, {
      type: "link",
      size: "small",
      disabled: getResetDisabled(),
      onClick: function onClick() {
        return onReset();
      }
    }, locale.filterReset), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      size: "small",
      onClick: onConfirm
    }, locale.filterConfirm)));
  }
  // We should not block customize Menu with additional props
  if (column.filterDropdown) {
    dropdownContent = /*#__PURE__*/React.createElement(OverrideProvider, {
      selectable: undefined
    }, dropdownContent);
  }
  var menu = function menu() {
    return /*#__PURE__*/React.createElement(FilterDropdownMenuWrapper, {
      className: "".concat(prefixCls, "-dropdown")
    }, dropdownContent);
  };
  var filterIcon;
  if (typeof column.filterIcon === 'function') {
    filterIcon = column.filterIcon(filtered);
  } else if (column.filterIcon) {
    filterIcon = column.filterIcon;
  } else {
    filterIcon = /*#__PURE__*/React.createElement(FilterFilled, null);
  }
  var _React$useContext = React.useContext(ConfigContext),
    direction = _React$useContext.direction;
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-column")
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(tablePrefixCls, "-column-title")
  }, children), /*#__PURE__*/React.createElement(Dropdown, {
    dropdownRender: menu,
    trigger: ['click'],
    open: mergedVisible,
    onOpenChange: onVisibleChange,
    getPopupContainer: getPopupContainer,
    placement: direction === 'rtl' ? 'bottomLeft' : 'bottomRight'
  }, /*#__PURE__*/React.createElement("span", {
    role: "button",
    tabIndex: -1,
    className: classNames("".concat(prefixCls, "-trigger"), {
      active: filtered
    }),
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }, filterIcon)));
}
export default FilterDropdown;