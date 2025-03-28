import _typeof from "@babel/runtime/helpers/esm/typeof";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import classNames from 'classnames';
import RcTable, { Summary } from 'rc-table';
import { convertChildrenToColumns } from "rc-table/es/hooks/useColumns";
import { INTERNAL_HOOKS } from "rc-table/es/Table";
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider/context';
import defaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import SizeContext from '../config-provider/SizeContext';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import defaultLocale from '../locale/en_US';
import Pagination from '../pagination';
import Spin from '../spin';
import scrollTo from '../_util/scrollTo';
import warning from '../_util/warning';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import renderExpandIcon from './ExpandIcon';
import useFilter, { getFilterData } from './hooks/useFilter';
import useLazyKVMap from './hooks/useLazyKVMap';
import usePagination, { DEFAULT_PAGE_SIZE, getPaginationParam } from './hooks/usePagination';
import useSelection, { SELECTION_ALL, SELECTION_COLUMN, SELECTION_INVERT, SELECTION_NONE } from './hooks/useSelection';
import useSorter, { getSortData } from './hooks/useSorter';
import useTitleColumns from './hooks/useTitleColumns';
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
  process.env.NODE_ENV !== "production" ? warning(!(typeof rowKey === 'function' && rowKey.length > 1), 'Table', '`index` parameter of `rowKey` function is deprecated. There is no guarantee that it will work as expected.') : void 0;
  [['filterDropdownVisible', 'filterDropdownOpen'], ['onFilterDropdownVisibleChange', 'onFilterDropdownOpenChange']].forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      deprecatedName = _ref2[0],
      newName = _ref2[1];
    process.env.NODE_ENV !== "production" ? warning(!(deprecatedName in props), 'Table', "`".concat(deprecatedName, "` is deprecated which will be removed in next major version.Please use `").concat(newName, "` instead. ")) : void 0;
  });
  var baseColumns = React.useMemo(function () {
    return columns || convertChildrenToColumns(children);
  }, [columns, children]);
  var needResponsive = React.useMemo(function () {
    return baseColumns.some(function (col) {
      return col.responsive;
    });
  }, [baseColumns]);
  var screens = useBreakpoint(needResponsive);
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
  var tableProps = omit(props, ['className', 'style', 'columns']);
  var size = React.useContext(SizeContext);
  var _React$useContext = React.useContext(ConfigContext),
    _React$useContext$loc = _React$useContext.locale,
    contextLocale = _React$useContext$loc === void 0 ? defaultLocale : _React$useContext$loc,
    renderEmpty = _React$useContext.renderEmpty,
    direction = _React$useContext.direction;
  var mergedSize = customizeSize || size;
  var tableLocale = _extends(_extends({}, contextLocale.Table), locale);
  var rawData = dataSource || EMPTY_LIST;
  var _React$useContext2 = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext2.getPrefixCls;
  var prefixCls = getPrefixCls('table', customizePrefixCls);
  var dropdownPrefixCls = getPrefixCls('dropdown', customizeDropdownPrefixCls);
  var mergedExpandable = _extends({
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
  var _useLazyKVMap = useLazyKVMap(rawData, childrenColumnName, getRowKey),
    _useLazyKVMap2 = _slicedToArray(_useLazyKVMap, 1),
    getRecordByKey = _useLazyKVMap2[0];
  // ============================ Events =============================
  var changeEventInfo = {};
  var triggerOnChange = function triggerOnChange(info, action) {
    var reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var changeInfo = _extends(_extends({}, changeEventInfo), info);
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
      scrollTo(0, {
        getContainer: function getContainer() {
          return internalRefs.body.current;
        }
      });
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(changeInfo.pagination, changeInfo.filters, changeInfo.sorter, {
      currentDataSource: getFilterData(getSortData(rawData, changeInfo.sorterStates, childrenColumnName), changeInfo.filterStates),
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
  var _useSorter = useSorter({
      prefixCls: prefixCls,
      mergedColumns: mergedColumns,
      onSorterChange: onSorterChange,
      sortDirections: sortDirections || ['ascend', 'descend'],
      tableLocale: tableLocale,
      showSorterTooltip: showSorterTooltip
    }),
    _useSorter2 = _slicedToArray(_useSorter, 4),
    transformSorterColumns = _useSorter2[0],
    sortStates = _useSorter2[1],
    sorterTitleProps = _useSorter2[2],
    getSorters = _useSorter2[3];
  var sortedData = React.useMemo(function () {
    return getSortData(rawData, sortStates, childrenColumnName);
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
  var _useFilter = useFilter({
      prefixCls: prefixCls,
      locale: tableLocale,
      dropdownPrefixCls: dropdownPrefixCls,
      mergedColumns: mergedColumns,
      onFilterChange: onFilterChange,
      getPopupContainer: getPopupContainer
    }),
    _useFilter2 = _slicedToArray(_useFilter, 3),
    transformFilterColumns = _useFilter2[0],
    filterStates = _useFilter2[1],
    filters = _useFilter2[2];
  var mergedData = getFilterData(sortedData, filterStates);
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
    return _extends(_extends({}, sorterTitleProps), {
      filters: mergedFilters
    });
  }, [sorterTitleProps, filters]);
  var _useTitleColumns = useTitleColumns(columnTitleProps),
    _useTitleColumns2 = _slicedToArray(_useTitleColumns, 1),
    transformTitleColumns = _useTitleColumns2[0];
  // ========================== Pagination ==========================
  var onPaginationChange = function onPaginationChange(current, pageSize) {
    triggerOnChange({
      pagination: _extends(_extends({}, changeEventInfo.pagination), {
        current: current,
        pageSize: pageSize
      })
    }, 'paginate');
  };
  var _usePagination = usePagination(mergedData.length, pagination, onPaginationChange),
    _usePagination2 = _slicedToArray(_usePagination, 2),
    mergedPagination = _usePagination2[0],
    resetPagination = _usePagination2[1];
  changeEventInfo.pagination = pagination === false ? {} : getPaginationParam(pagination, mergedPagination);
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
      pageSize = _mergedPagination$pag === void 0 ? DEFAULT_PAGE_SIZE : _mergedPagination$pag;
    process.env.NODE_ENV !== "production" ? warning(current > 0, 'Table', '`current` should be positive number.') : void 0;
    // Dynamic table data
    if (mergedData.length < total) {
      if (mergedData.length > pageSize) {
        process.env.NODE_ENV !== "production" ? warning(false, 'Table', '`dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.') : void 0;
        return mergedData.slice((current - 1) * pageSize, current * pageSize);
      }
      return mergedData;
    }
    return mergedData.slice((current - 1) * pageSize, current * pageSize);
  }, [!!pagination, mergedData, mergedPagination && mergedPagination.current, mergedPagination && mergedPagination.pageSize, mergedPagination && mergedPagination.total]);
  // ========================== Selections ==========================
  var _useSelection = useSelection(rowSelection, {
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
    _useSelection2 = _slicedToArray(_useSelection, 2),
    transformSelectionColumns = _useSelection2[0],
    selectedKeySet = _useSelection2[1];
  var internalRowClassName = function internalRowClassName(record, index, indent) {
    var mergedRowClassName;
    if (typeof rowClassName === 'function') {
      mergedRowClassName = classNames(rowClassName(record, index, indent));
    } else {
      mergedRowClassName = classNames(rowClassName);
    }
    return classNames(_defineProperty({}, "".concat(prefixCls, "-row-selected"), selectedKeySet.has(getRowKey(record, index))), mergedRowClassName);
  };
  // ========================== Expandable ==========================
  // Pass origin render status into `rc-table`, this can be removed when refactor with `rc-table`
  mergedExpandable.__PARENT_RENDER_ICON__ = mergedExpandable.expandIcon;
  // Customize expandable icon
  mergedExpandable.expandIcon = mergedExpandable.expandIcon || expandIcon || renderExpandIcon(tableLocale);
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
      return /*#__PURE__*/React.createElement(Pagination, _extends({}, mergedPagination, {
        className: classNames("".concat(prefixCls, "-pagination ").concat(prefixCls, "-pagination-").concat(position), mergedPagination.className),
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
  } else if (_typeof(loading) === 'object') {
    spinProps = _extends({
      spinning: true
    }, loading);
  }
  var wrapperClassNames = classNames("".concat(prefixCls, "-wrapper"), _defineProperty({}, "".concat(prefixCls, "-wrapper-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: wrapperClassNames,
    style: style
  }, /*#__PURE__*/React.createElement(Spin, _extends({
    spinning: false
  }, spinProps), topPaginationNode, /*#__PURE__*/React.createElement(RcTable, _extends({}, tableProps, {
    columns: mergedColumns,
    direction: direction,
    expandable: mergedExpandable,
    prefixCls: prefixCls,
    className: classNames(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-middle"), mergedSize === 'middle'), "".concat(prefixCls, "-small"), mergedSize === 'small'), "".concat(prefixCls, "-bordered"), bordered), "".concat(prefixCls, "-empty"), rawData.length === 0)),
    data: pageData,
    rowKey: getRowKey,
    rowClassName: internalRowClassName,
    emptyText: locale && locale.emptyText || (renderEmpty || defaultRenderEmpty)('Table'),
    // Internal
    internalHooks: INTERNAL_HOOKS,
    internalRefs: internalRefs,
    transformColumns: transformColumns
  })), bottomPaginationNode));
}
var ForwardTable = /*#__PURE__*/React.forwardRef(InternalTable);
var Table = ForwardTable;
Table.SELECTION_COLUMN = SELECTION_COLUMN;
Table.EXPAND_COLUMN = RcTable.EXPAND_COLUMN;
Table.SELECTION_ALL = SELECTION_ALL;
Table.SELECTION_INVERT = SELECTION_INVERT;
Table.SELECTION_NONE = SELECTION_NONE;
Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.Summary = Summary;
export default Table;