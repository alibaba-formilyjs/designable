"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTable = _interopRequireWildcard(require("rc-table"));
var _useColumns = require("rc-table/lib/hooks/useColumns");
var _Table = require("rc-table/lib/Table");
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _context = require("../config-provider/context");
var _defaultRenderEmpty = _interopRequireDefault(require("../config-provider/defaultRenderEmpty"));
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _useBreakpoint = _interopRequireDefault(require("../grid/hooks/useBreakpoint"));
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _pagination = _interopRequireDefault(require("../pagination"));
var _spin = _interopRequireDefault(require("../spin"));
var _scrollTo = _interopRequireDefault(require("../_util/scrollTo"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _Column = _interopRequireDefault(require("./Column"));
var _ColumnGroup = _interopRequireDefault(require("./ColumnGroup"));
var _ExpandIcon = _interopRequireDefault(require("./ExpandIcon"));
var _useFilter3 = _interopRequireWildcard(require("./hooks/useFilter"));
var _useLazyKVMap3 = _interopRequireDefault(require("./hooks/useLazyKVMap"));
var _usePagination3 = _interopRequireWildcard(require("./hooks/usePagination"));
var _useSelection3 = _interopRequireWildcard(require("./hooks/useSelection"));
var _useSorter3 = _interopRequireWildcard(require("./hooks/useSorter"));
var _useTitleColumns3 = _interopRequireDefault(require("./hooks/useTitleColumns"));
var EMPTY_LIST = [];
function InternalTable(props, ref) {
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    style = props.style,
    customizeSize = props.size,
    bordered = props.bordered,
    customizeDropdownPrefixCls = props.dropdownPrefixCls,
    dataSource = props.dataSource,
    pagination = props.pagination,
    rowSelection = props.rowSelection,
    _props$rowKey = props.rowKey,
    rowKey = _props$rowKey === void 0 ? 'key' : _props$rowKey,
    rowClassName = props.rowClassName,
    columns = props.columns,
    children = props.children,
    legacyChildrenColumnName = props.childrenColumnName,
    onChange = props.onChange,
    getPopupContainer = props.getPopupContainer,
    loading = props.loading,
    expandIcon = props.expandIcon,
    expandable = props.expandable,
    expandedRowRender = props.expandedRowRender,
    expandIconColumnIndex = props.expandIconColumnIndex,
    indentSize = props.indentSize,
    scroll = props.scroll,
    sortDirections = props.sortDirections,
    locale = props.locale,
    _props$showSorterTool = props.showSorterTooltip,
    showSorterTooltip = _props$showSorterTool === void 0 ? true : _props$showSorterTool;
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!(typeof rowKey === 'function' && rowKey.length > 1), 'Table', '`index` parameter of `rowKey` function is deprecated. There is no guarantee that it will work as expected.') : void 0;
  [['filterDropdownVisible', 'filterDropdownOpen'], ['onFilterDropdownVisibleChange', 'onFilterDropdownOpenChange']].forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      deprecatedName = _ref2[0],
      newName = _ref2[1];
    process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!(deprecatedName in props), 'Table', "`".concat(deprecatedName, "` is deprecated which will be removed in next major version.Please use `").concat(newName, "` instead. ")) : void 0;
  });
  var baseColumns = React.useMemo(function () {
    return columns || (0, _useColumns.convertChildrenToColumns)(children);
  }, [columns, children]);
  var needResponsive = React.useMemo(function () {
    return baseColumns.some(function (col) {
      return col.responsive;
    });
  }, [baseColumns]);
  var screens = (0, _useBreakpoint["default"])(needResponsive);
  var mergedColumns = React.useMemo(function () {
    var matched = new Set(Object.keys(screens).filter(function (m) {
      return screens[m];
    }));
    return baseColumns.filter(function (c) {
      return !c.responsive || c.responsive.some(function (r) {
        return matched.has(r);
      });
    });
  }, [baseColumns, screens]);
  var tableProps = (0, _omit["default"])(props, ['className', 'style', 'columns']);
  var size = React.useContext(_SizeContext["default"]);
  var _React$useContext = React.useContext(_context.ConfigContext),
    _React$useContext$loc = _React$useContext.locale,
    contextLocale = _React$useContext$loc === void 0 ? _en_US["default"] : _React$useContext$loc,
    renderEmpty = _React$useContext.renderEmpty,
    direction = _React$useContext.direction;
  var mergedSize = customizeSize || size;
  var tableLocale = (0, _extends2["default"])((0, _extends2["default"])({}, contextLocale.Table), locale);
  var rawData = dataSource || EMPTY_LIST;
  var _React$useContext2 = React.useContext(_context.ConfigContext),
    getPrefixCls = _React$useContext2.getPrefixCls;
  var prefixCls = getPrefixCls('table', customizePrefixCls);
  var dropdownPrefixCls = getPrefixCls('dropdown', customizeDropdownPrefixCls);
  var mergedExpandable = (0, _extends2["default"])({
    childrenColumnName: legacyChildrenColumnName,
    expandIconColumnIndex: expandIconColumnIndex
  }, expandable);
  var _mergedExpandable$chi = mergedExpandable.childrenColumnName,
    childrenColumnName = _mergedExpandable$chi === void 0 ? 'children' : _mergedExpandable$chi;
  var expandType = React.useMemo(function () {
    if (rawData.some(function (item) {
      return item === null || item === void 0 ? void 0 : item[childrenColumnName];
    })) {
      return 'nest';
    }
    if (expandedRowRender || expandable && expandable.expandedRowRender) {
      return 'row';
    }
    return null;
  }, [rawData]);
  var internalRefs = {
    body: React.useRef()
  };
  // ============================ RowKey ============================
  var getRowKey = React.useMemo(function () {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return function (record) {
      return record === null || record === void 0 ? void 0 : record[rowKey];
    };
  }, [rowKey]);
  var _useLazyKVMap = (0, _useLazyKVMap3["default"])(rawData, childrenColumnName, getRowKey),
    _useLazyKVMap2 = (0, _slicedToArray2["default"])(_useLazyKVMap, 1),
    getRecordByKey = _useLazyKVMap2[0];
  // ============================ Events =============================
  var changeEventInfo = {};
  var triggerOnChange = function triggerOnChange(info, action) {
    var reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var changeInfo = (0, _extends2["default"])((0, _extends2["default"])({}, changeEventInfo), info);
    if (reset) {
      changeEventInfo.resetPagination();
      // Reset event param
      if (changeInfo.pagination.current) {
        changeInfo.pagination.current = 1;
      }
      // Trigger pagination events
      if (pagination && pagination.onChange) {
        pagination.onChange(1, changeInfo.pagination.pageSize);
      }
    }
    if (scroll && scroll.scrollToFirstRowOnChange !== false && internalRefs.body.current) {
      (0, _scrollTo["default"])(0, {
        getContainer: function getContainer() {
          return internalRefs.body.current;
        }
      });
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(changeInfo.pagination, changeInfo.filters, changeInfo.sorter, {
      currentDataSource: (0, _useFilter3.getFilterData)((0, _useSorter3.getSortData)(rawData, changeInfo.sorterStates, childrenColumnName), changeInfo.filterStates),
      action: action
    });
  };
  /**
   * Controlled state in `columns` is not a good idea that makes too many code (1000+ line?) to read
   * state out and then put it back to title render. Move these code into `hooks` but still too
   * complex. We should provides Table props like `sorter` & `filter` to handle control in next big
   * version.
   */
  // ============================ Sorter =============================
  var onSorterChange = function onSorterChange(sorter, sorterStates) {
    triggerOnChange({
      sorter: sorter,
      sorterStates: sorterStates
    }, 'sort', false);
  };
  var _useSorter = (0, _useSorter3["default"])({
      prefixCls: prefixCls,
      mergedColumns: mergedColumns,
      onSorterChange: onSorterChange,
      sortDirections: sortDirections || ['ascend', 'descend'],
      tableLocale: tableLocale,
      showSorterTooltip: showSorterTooltip
    }),
    _useSorter2 = (0, _slicedToArray2["default"])(_useSorter, 4),
    transformSorterColumns = _useSorter2[0],
    sortStates = _useSorter2[1],
    sorterTitleProps = _useSorter2[2],
    getSorters = _useSorter2[3];
  var sortedData = React.useMemo(function () {
    return (0, _useSorter3.getSortData)(rawData, sortStates, childrenColumnName);
  }, [rawData, sortStates]);
  changeEventInfo.sorter = getSorters();
  changeEventInfo.sorterStates = sortStates;
  // ============================ Filter ============================
  var onFilterChange = function onFilterChange(filters, filterStates) {
    triggerOnChange({
      filters: filters,
      filterStates: filterStates
    }, 'filter', true);
  };
  var _useFilter = (0, _useFilter3["default"])({
      prefixCls: prefixCls,
      locale: tableLocale,
      dropdownPrefixCls: dropdownPrefixCls,
      mergedColumns: mergedColumns,
      onFilterChange: onFilterChange,
      getPopupContainer: getPopupContainer
    }),
    _useFilter2 = (0, _slicedToArray2["default"])(_useFilter, 3),
    transformFilterColumns = _useFilter2[0],
    filterStates = _useFilter2[1],
    filters = _useFilter2[2];
  var mergedData = (0, _useFilter3.getFilterData)(sortedData, filterStates);
  changeEventInfo.filters = filters;
  changeEventInfo.filterStates = filterStates;
  // ============================ Column ============================
  var columnTitleProps = React.useMemo(function () {
    var mergedFilters = {};
    Object.keys(filters).forEach(function (filterKey) {
      if (filters[filterKey] !== null) {
        mergedFilters[filterKey] = filters[filterKey];
      }
    });
    return (0, _extends2["default"])((0, _extends2["default"])({}, sorterTitleProps), {
      filters: mergedFilters
    });
  }, [sorterTitleProps, filters]);
  var _useTitleColumns = (0, _useTitleColumns3["default"])(columnTitleProps),
    _useTitleColumns2 = (0, _slicedToArray2["default"])(_useTitleColumns, 1),
    transformTitleColumns = _useTitleColumns2[0];
  // ========================== Pagination ==========================
  var onPaginationChange = function onPaginationChange(current, pageSize) {
    triggerOnChange({
      pagination: (0, _extends2["default"])((0, _extends2["default"])({}, changeEventInfo.pagination), {
        current: current,
        pageSize: pageSize
      })
    }, 'paginate');
  };
  var _usePagination = (0, _usePagination3["default"])(mergedData.length, pagination, onPaginationChange),
    _usePagination2 = (0, _slicedToArray2["default"])(_usePagination, 2),
    mergedPagination = _usePagination2[0],
    resetPagination = _usePagination2[1];
  changeEventInfo.pagination = pagination === false ? {} : (0, _usePagination3.getPaginationParam)(pagination, mergedPagination);
  changeEventInfo.resetPagination = resetPagination;
  // ============================= Data =============================
  var pageData = React.useMemo(function () {
    if (pagination === false || !mergedPagination.pageSize) {
      return mergedData;
    }
    var _mergedPagination$cur = mergedPagination.current,
      current = _mergedPagination$cur === void 0 ? 1 : _mergedPagination$cur,
      total = mergedPagination.total,
      _mergedPagination$pag = mergedPagination.pageSize,
      pageSize = _mergedPagination$pag === void 0 ? _usePagination3.DEFAULT_PAGE_SIZE : _mergedPagination$pag;
    process.env.NODE_ENV !== "production" ? (0, _warning["default"])(current > 0, 'Table', '`current` should be positive number.') : void 0;
    // Dynamic table data
    if (mergedData.length < total) {
      if (mergedData.length > pageSize) {
        process.env.NODE_ENV !== "production" ? (0, _warning["default"])(false, 'Table', '`dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.') : void 0;
        return mergedData.slice((current - 1) * pageSize, current * pageSize);
      }
      return mergedData;
    }
    return mergedData.slice((current - 1) * pageSize, current * pageSize);
  }, [!!pagination, mergedData, mergedPagination && mergedPagination.current, mergedPagination && mergedPagination.pageSize, mergedPagination && mergedPagination.total]);
  // ========================== Selections ==========================
  var _useSelection = (0, _useSelection3["default"])(rowSelection, {
      prefixCls: prefixCls,
      data: mergedData,
      pageData: pageData,
      getRowKey: getRowKey,
      getRecordByKey: getRecordByKey,
      expandType: expandType,
      childrenColumnName: childrenColumnName,
      locale: tableLocale,
      getPopupContainer: getPopupContainer
    }),
    _useSelection2 = (0, _slicedToArray2["default"])(_useSelection, 2),
    transformSelectionColumns = _useSelection2[0],
    selectedKeySet = _useSelection2[1];
  var internalRowClassName = function internalRowClassName(record, index, indent) {
    var mergedRowClassName;
    if (typeof rowClassName === 'function') {
      mergedRowClassName = (0, _classnames["default"])(rowClassName(record, index, indent));
    } else {
      mergedRowClassName = (0, _classnames["default"])(rowClassName);
    }
    return (0, _classnames["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-row-selected"), selectedKeySet.has(getRowKey(record, index))), mergedRowClassName);
  };
  // ========================== Expandable ==========================
  // Pass origin render status into `rc-table`, this can be removed when refactor with `rc-table`
  mergedExpandable.__PARENT_RENDER_ICON__ = mergedExpandable.expandIcon;
  // Customize expandable icon
  mergedExpandable.expandIcon = mergedExpandable.expandIcon || expandIcon || (0, _ExpandIcon["default"])(tableLocale);
  // Adjust expand icon index, no overwrite expandIconColumnIndex if set.
  if (expandType === 'nest' && mergedExpandable.expandIconColumnIndex === undefined) {
    mergedExpandable.expandIconColumnIndex = rowSelection ? 1 : 0;
  } else if (mergedExpandable.expandIconColumnIndex > 0 && rowSelection) {
    mergedExpandable.expandIconColumnIndex -= 1;
  }
  // Indent size
  if (typeof mergedExpandable.indentSize !== 'number') {
    mergedExpandable.indentSize = typeof indentSize === 'number' ? indentSize : 15;
  }
  // ============================ Render ============================
  var transformColumns = React.useCallback(function (innerColumns) {
    return transformTitleColumns(transformSelectionColumns(transformFilterColumns(transformSorterColumns(innerColumns))));
  }, [transformSorterColumns, transformFilterColumns, transformSelectionColumns]);
  var topPaginationNode;
  var bottomPaginationNode;
  if (pagination !== false && (mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.total)) {
    var paginationSize;
    if (mergedPagination.size) {
      paginationSize = mergedPagination.size;
    } else {
      paginationSize = mergedSize === 'small' || mergedSize === 'middle' ? 'small' : undefined;
    }
    var renderPagination = function renderPagination(position) {
      return /*#__PURE__*/React.createElement(_pagination["default"], (0, _extends2["default"])({}, mergedPagination, {
        className: (0, _classnames["default"])("".concat(prefixCls, "-pagination ").concat(prefixCls, "-pagination-").concat(position), mergedPagination.className),
        size: paginationSize
      }));
    };
    var defaultPosition = direction === 'rtl' ? 'left' : 'right';
    var position = mergedPagination.position;
    if (position !== null && Array.isArray(position)) {
      var topPos = position.find(function (p) {
        return p.includes('top');
      });
      var bottomPos = position.find(function (p) {
        return p.includes('bottom');
      });
      var isDisable = position.every(function (p) {
        return "".concat(p) === 'none';
      });
      if (!topPos && !bottomPos && !isDisable) {
        bottomPaginationNode = renderPagination(defaultPosition);
      }
      if (topPos) {
        topPaginationNode = renderPagination(topPos.toLowerCase().replace('top', ''));
      }
      if (bottomPos) {
        bottomPaginationNode = renderPagination(bottomPos.toLowerCase().replace('bottom', ''));
      }
    } else {
      bottomPaginationNode = renderPagination(defaultPosition);
    }
  }
  // >>>>>>>>> Spinning
  var spinProps;
  if (typeof loading === 'boolean') {
    spinProps = {
      spinning: loading
    };
  } else if ((0, _typeof2["default"])(loading) === 'object') {
    spinProps = (0, _extends2["default"])({
      spinning: true
    }, loading);
  }
  var wrapperClassNames = (0, _classnames["default"])("".concat(prefixCls, "-wrapper"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-wrapper-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: wrapperClassNames,
    style: style
  }, /*#__PURE__*/React.createElement(_spin["default"], (0, _extends2["default"])({
    spinning: false
  }, spinProps), topPaginationNode, /*#__PURE__*/React.createElement(_rcTable["default"], (0, _extends2["default"])({}, tableProps, {
    columns: mergedColumns,
    direction: direction,
    expandable: mergedExpandable,
    prefixCls: prefixCls,
    className: (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-middle"), mergedSize === 'middle'), "".concat(prefixCls, "-small"), mergedSize === 'small'), "".concat(prefixCls, "-bordered"), bordered), "".concat(prefixCls, "-empty"), rawData.length === 0)),
    data: pageData,
    rowKey: getRowKey,
    rowClassName: internalRowClassName,
    emptyText: locale && locale.emptyText || (renderEmpty || _defaultRenderEmpty["default"])('Table'),
    // Internal
    internalHooks: _Table.INTERNAL_HOOKS,
    internalRefs: internalRefs,
    transformColumns: transformColumns
  })), bottomPaginationNode));
}
var ForwardTable = /*#__PURE__*/React.forwardRef(InternalTable);
var Table = ForwardTable;
Table.SELECTION_COLUMN = _useSelection3.SELECTION_COLUMN;
Table.EXPAND_COLUMN = _rcTable["default"].EXPAND_COLUMN;
Table.SELECTION_ALL = _useSelection3.SELECTION_ALL;
Table.SELECTION_INVERT = _useSelection3.SELECTION_INVERT;
Table.SELECTION_NONE = _useSelection3.SELECTION_NONE;
Table.Column = _Column["default"];
Table.ColumnGroup = _ColumnGroup["default"];
Table.Summary = _rcTable.Summary;
var _default = exports["default"] = Table;