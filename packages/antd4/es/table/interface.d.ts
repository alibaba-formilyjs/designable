import type { ColumnType as RcColumnType, FixedType, RenderedCell as RcRenderedCell } from 'rc-table/lib/interface';
import { ExpandableConfig, GetRowKey } from 'rc-table/lib/interface';
import type * as React from 'react';
import type { CheckboxProps } from '../checkbox';
import type { PaginationProps } from '../pagination';
import type { TooltipProps } from '../tooltip';
import type { Breakpoint } from '../_util/responsiveObserve';
import type { INTERNAL_SELECTION_ITEM } from './hooks/useSelection';
export { GetRowKey, ExpandableConfig };
export type Key = React.Key;
export type SafeKey = Exclude<Key, bigint>;
export type RowSelectionType = 'checkbox' | 'radio';
export type SelectionItemSelectFn = (currentRowKeys: Key[]) => void;
export type ExpandType = null | 'row' | 'nest';
export interface TableLocale {
    filterTitle?: string;
    filterConfirm?: React.ReactNode;
    filterReset?: React.ReactNode;
    filterEmptyText?: React.ReactNode;
    filterCheckall?: React.ReactNode;
    filterSearchPlaceholder?: string;
    emptyText?: React.ReactNode | (() => React.ReactNode);
    selectAll?: React.ReactNode;
    selectNone?: React.ReactNode;
    selectInvert?: React.ReactNode;
    selectionAll?: React.ReactNode;
    sortTitle?: string;
    expand?: string;
    collapse?: string;
    triggerDesc?: string;
    triggerAsc?: string;
    cancelSort?: string;
}
export type SortOrder = 'descend' | 'ascend' | null;
declare const TableActions: ["paginate", "sort", "filter"];
export type TableAction = typeof TableActions[number];
export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;
export interface ColumnFilterItem {
    text: React.ReactNode;
    value: React.Key | boolean;
    children?: ColumnFilterItem[];
}
export interface ColumnTitleProps<RecordType> {
    /** @deprecated Please use `sorterColumns` instead. */
    sortOrder?: SortOrder;
    /** @deprecated Please use `sorterColumns` instead. */
    sortColumn?: ColumnType<RecordType>;
    sortColumns?: {
        column: ColumnType<RecordType>;
        order: SortOrder;
    }[];
    filters?: Record<string, FilterValue>;
}
export type ColumnTitle<RecordType> = React.ReactNode | ((props: ColumnTitleProps<RecordType>) => React.ReactNode);
export type FilterValue = (Key | boolean)[];
export type FilterKey = (string | number)[] | null;
export type FilterSearchType<RecordType = Record<string, any>> = boolean | ((input: string, record: RecordType) => boolean);
export interface FilterConfirmProps {
    closeDropdown: boolean;
}
export interface FilterDropdownProps {
    prefixCls: string;
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    selectedKeys: React.Key[];
    /**
     * Confirm filter value, if you want to close dropdown before commit, you can call with
     * {closeDropdown: true}
     */
    confirm: (param?: FilterConfirmProps) => void;
    clearFilters?: () => void;
    filters?: ColumnFilterItem[];
    /** Only close filterDropdown */
    close: () => void;
    visible: boolean;
}
export interface ColumnType<RecordType> extends Omit<RcColumnType<RecordType>, 'title'> {
    title?: ColumnTitle<RecordType>;
    sorter?: boolean | CompareFn<RecordType> | {
        compare?: CompareFn<RecordType>;
        /** Config multiple sorter order priority */
        multiple?: number;
    };
    sortOrder?: SortOrder;
    defaultSortOrder?: SortOrder;
    sortDirections?: SortOrder[];
    showSorterTooltip?: boolean | TooltipProps;
    filtered?: boolean;
    filters?: ColumnFilterItem[];
    filterDropdown?: React.ReactNode | ((props: FilterDropdownProps) => React.ReactNode);
    filterMultiple?: boolean;
    filteredValue?: FilterValue | null;
    defaultFilteredValue?: FilterValue | null;
    filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
    filterMode?: 'menu' | 'tree';
    filterSearch?: FilterSearchType<ColumnFilterItem>;
    onFilter?: (value: React.Key | boolean, record: RecordType) => boolean;
    /**
     * @deprecated `filterDropdownVisible` is deprecated which will be removed in next major version.
     *   Please use `filterDropdownOpen` instead.
     */
    filterDropdownVisible?: boolean;
    filterDropdownOpen?: boolean;
    /**
     * @deprecated `onFilterDropdownVisibleChange` is deprecated which will be removed in next major
     *   version. Please use `onFilterDropdownOpenChange` instead.
     */
    onFilterDropdownVisibleChange?: (visible: boolean) => void;
    onFilterDropdownOpenChange?: (open: boolean) => void;
    filterResetToDefaultFilteredValue?: boolean;
    responsive?: Breakpoint[];
}
export interface ColumnGroupType<RecordType> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
    children: ColumnsType<RecordType>;
}
export type ColumnsType<RecordType = unknown> = (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];
export interface SelectionItem {
    key: string;
    text: React.ReactNode;
    onSelect?: SelectionItemSelectFn;
}
export type SelectionSelectFn<T> = (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
export type RowSelectMethod = 'all' | 'none' | 'invert' | 'single' | 'multiple';
export interface TableRowSelection<T> {
    /** Keep the selection keys in list even the key not exist in `dataSource` anymore */
    preserveSelectedRowKeys?: boolean;
    type?: RowSelectionType;
    selectedRowKeys?: Key[];
    defaultSelectedRowKeys?: Key[];
    onChange?: (selectedRowKeys: Key[], selectedRows: T[], info: {
        type: RowSelectMethod;
    }) => void;
    getCheckboxProps?: (record: T) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
    onSelect?: SelectionSelectFn<T>;
    /** @deprecated This function is deprecated and should use `onChange` instead */
    onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
    /** @deprecated This function is deprecated and should use `onChange` instead */
    onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
    /** @deprecated This function is deprecated and should use `onChange` instead */
    onSelectInvert?: (selectedRowKeys: Key[]) => void;
    /** @deprecated This function is deprecated and should use `onChange` instead */
    onSelectNone?: () => void;
    selections?: INTERNAL_SELECTION_ITEM[] | boolean;
    hideSelectAll?: boolean;
    fixed?: FixedType;
    columnWidth?: string | number;
    columnTitle?: string | React.ReactNode;
    checkStrictly?: boolean;
    renderCell?: (value: boolean, record: T, index: number, originNode: React.ReactNode) => React.ReactNode | RcRenderedCell<T>;
}
export type TransformColumns<RecordType> = (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>;
export interface TableCurrentDataSource<RecordType> {
    currentDataSource: RecordType[];
    action: TableAction;
}
export interface SorterResult<RecordType> {
    column?: ColumnType<RecordType>;
    order?: SortOrder;
    field?: Key | readonly Key[];
    columnKey?: Key;
}
export type GetPopupContainer = (triggerNode: HTMLElement) => HTMLElement;
type TablePaginationPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
export interface TablePaginationConfig extends PaginationProps {
    position?: TablePaginationPosition[];
}
