"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.flattenKeys = flattenKeys;
exports.getFilterData = getFilterData;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var React = _interopRequireWildcard(require("react"));
var _warning = _interopRequireDefault(require("../../../_util/warning"));
var _util = require("../../util");
var _FilterDropdown = _interopRequireDefault(require("./FilterDropdown"));
function collectFilterStates(columns, init, pos) {
  var filterStates = [];
  (columns || []).forEach(function (column, index) {
    var _a;
    var columnPos = (0, _util.getColumnPos)(index, pos);
    if (column.filters || 'filterDropdown' in column || 'onFilter' in column) {
      if ('filteredValue' in column) {
        // Controlled
        var filteredValues = column.filteredValue;
        if (!('filterDropdown' in column)) {
          filteredValues = (_a = filteredValues === null || filteredValues === void 0 ? void 0 : filteredValues.map(String)) !== null && _a !== void 0 ? _a : filteredValues;
        }
        filterStates.push({
          column: column,
          key: (0, _util.getColumnKey)(column, columnPos),
          filteredKeys: filteredValues,
          forceFiltered: column.filtered
        });
      } else {
        // Uncontrolled
        filterStates.push({
          column: column,
          key: (0, _util.getColumnKey)(column, columnPos),
          filteredKeys: init && column.defaultFilteredValue ? column.defaultFilteredValue : undefined,
          forceFiltered: column.filtered
        });
      }
    }
    if ('children' in column) {
      filterStates = [].concat((0, _toConsumableArray2["default"])(filterStates), (0, _toConsumableArray2["default"])(collectFilterStates(column.children, init, columnPos)));
    }
  });
  return filterStates;
}
function injectFilter(prefixCls, dropdownPrefixCls, columns, filterStates, triggerFilter, getPopupContainer, locale, pos) {
  return columns.map(function (column, index) {
    var columnPos = (0, _util.getColumnPos)(index, pos);
    var _column$filterMultipl = column.filterMultiple,
      filterMultiple = _column$filterMultipl === void 0 ? true : _column$filterMultipl,
      filterMode = column.filterMode,
      filterSearch = column.filterSearch;
    var newColumn = column;
    if (newColumn.filters || newColumn.filterDropdown) {
      var columnKey = (0, _util.getColumnKey)(newColumn, columnPos);
      var filterState = filterStates.find(function (_ref) {
        var key = _ref.key;
        return columnKey === key;
      });
      newColumn = (0, _extends2["default"])((0, _extends2["default"])({}, newColumn), {
        title: function title(renderProps) {
          return /*#__PURE__*/React.createElement(_FilterDropdown["default"], {
            tablePrefixCls: prefixCls,
            prefixCls: "".concat(prefixCls, "-filter"),
            dropdownPrefixCls: dropdownPrefixCls,
            column: newColumn,
            columnKey: columnKey,
            filterState: filterState,
            filterMultiple: filterMultiple,
            filterMode: filterMode,
            filterSearch: filterSearch,
            triggerFilter: triggerFilter,
            locale: locale,
            getPopupContainer: getPopupContainer
          }, (0, _util.renderColumnTitle)(column.title, renderProps));
        }
      });
    }
    if ('children' in newColumn) {
      newColumn = (0, _extends2["default"])((0, _extends2["default"])({}, newColumn), {
        children: injectFilter(prefixCls, dropdownPrefixCls, newColumn.children, filterStates, triggerFilter, getPopupContainer, locale, columnPos)
      });
    }
    return newColumn;
  });
}
function flattenKeys(filters) {
  var keys = [];
  (filters || []).forEach(function (_ref2) {
    var value = _ref2.value,
      children = _ref2.children;
    keys.push(value);
    if (children) {
      keys = [].concat((0, _toConsumableArray2["default"])(keys), (0, _toConsumableArray2["default"])(flattenKeys(children)));
    }
  });
  return keys;
}
function generateFilterInfo(filterStates) {
  var currentFilters = {};
  filterStates.forEach(function (_ref3) {
    var key = _ref3.key,
      filteredKeys = _ref3.filteredKeys,
      column = _ref3.column;
    var keyAsString = key;
    var filters = column.filters,
      filterDropdown = column.filterDropdown;
    if (filterDropdown) {
      currentFilters[keyAsString] = filteredKeys || null;
    } else if (Array.isArray(filteredKeys)) {
      var keys = flattenKeys(filters);
      currentFilters[keyAsString] = keys.filter(function (originKey) {
        return filteredKeys.includes(String(originKey));
      });
    } else {
      currentFilters[keyAsString] = null;
    }
  });
  return currentFilters;
}
function getFilterData(data, filterStates) {
  return filterStates.reduce(function (currentData, filterState) {
    var _filterState$column = filterState.column,
      onFilter = _filterState$column.onFilter,
      filters = _filterState$column.filters,
      filteredKeys = filterState.filteredKeys;
    if (onFilter && filteredKeys && filteredKeys.length) {
      return currentData.filter(function (record) {
        return filteredKeys.some(function (key) {
          var keys = flattenKeys(filters);
          var keyIndex = keys.findIndex(function (k) {
            return String(k) === String(key);
          });
          var realKey = keyIndex !== -1 ? keys[keyIndex] : key;
          return onFilter(realKey, record);
        });
      });
    }
    return currentData;
  }, data);
}
function useFilter(_ref4) {
  var prefixCls = _ref4.prefixCls,
    dropdownPrefixCls = _ref4.dropdownPrefixCls,
    mergedColumns = _ref4.mergedColumns,
    onFilterChange = _ref4.onFilterChange,
    getPopupContainer = _ref4.getPopupContainer,
    tableLocale = _ref4.locale;
  var _React$useState = React.useState(function () {
      return collectFilterStates(mergedColumns, true);
    }),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    filterStates = _React$useState2[0],
    setFilterStates = _React$useState2[1];
  var mergedFilterStates = React.useMemo(function () {
    var collectedStates = collectFilterStates(mergedColumns, false);
    var filteredKeysIsAllNotControlled = true;
    var filteredKeysIsAllControlled = true;
    collectedStates.forEach(function (_ref5) {
      var filteredKeys = _ref5.filteredKeys;
      if (filteredKeys !== undefined) {
        filteredKeysIsAllNotControlled = false;
      } else {
        filteredKeysIsAllControlled = false;
      }
    });
    // Return if not controlled
    if (filteredKeysIsAllNotControlled) {
      return filterStates;
    }
    process.env.NODE_ENV !== "production" ? (0, _warning["default"])(filteredKeysIsAllControlled, 'Table', 'Columns should all contain `filteredValue` or not contain `filteredValue`.') : void 0;
    return collectedStates;
  }, [mergedColumns, filterStates]);
  var filters = React.useMemo(function () {
    return generateFilterInfo(mergedFilterStates);
  }, [mergedFilterStates]);
  var triggerFilter = function triggerFilter(filterState) {
    var newFilterStates = mergedFilterStates.filter(function (_ref6) {
      var key = _ref6.key;
      return key !== filterState.key;
    });
    newFilterStates.push(filterState);
    setFilterStates(newFilterStates);
    onFilterChange(generateFilterInfo(newFilterStates), newFilterStates);
  };
  var transformColumns = function transformColumns(innerColumns) {
    return injectFilter(prefixCls, dropdownPrefixCls, innerColumns, mergedFilterStates, triggerFilter, getPopupContainer, tableLocale);
  };
  return [transformColumns, mergedFilterStates, filters];
}
var _default = exports["default"] = useFilter;