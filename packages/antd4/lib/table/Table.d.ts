import RcTable, { Summary } from 'rc-table';
import type { TableProps as RcTableProps } from 'rc-table/lib/Table';
import * as React from 'react';
import type { SizeType } from '../config-provider/SizeContext';
import type { SpinProps } from '../spin';
import type { TooltipProps } from '../tooltip';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import { SELECTION_COLUMN } from './hooks/useSelection';
import type { FilterValue, GetPopupContainer, SorterResult, SortOrder, TableCurrentDataSource, TableLocale, TableRowSelection } from './interface';
import { ColumnsType, TablePaginationConfig } from './interface';
export { ColumnsType, TablePaginationConfig };
export interface TableProps<RecordType> extends Omit<RcTableProps<RecordType>, 'transformColumns' | 'internalHooks' | 'internalRefs' | 'data' | 'columns' | 'scroll' | 'emptyText'> {
    dropdownPrefixCls?: string;
    dataSource?: RcTableProps<RecordType>['data'];
    columns?: ColumnsType<RecordType>;
    pagination?: false | TablePaginationConfig;
    loading?: boolean | SpinProps;
    size?: SizeType;
    bordered?: boolean;
    locale?: TableLocale;
    onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<RecordType> | SorterResult<RecordType>[], extra: TableCurrentDataSource<RecordType>) => void;
    rowSelection?: TableRowSelection<RecordType>;
    getPopupContainer?: GetPopupContainer;
    scroll?: RcTableProps<RecordType>['scroll'] & {
        scrollToFirstRowOnChange?: boolean;
    };
    sortDirections?: SortOrder[];
    showSorterTooltip?: boolean | TooltipProps;
}
declare const ForwardTable: <RecordType extends object = any>(props: TableProps<RecordType> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<HTMLDivElement> | undefined;
}) => React.ReactElement;
type InternalTableType = typeof ForwardTable;
type CompoundedComponent = InternalTableType & {
    SELECTION_COLUMN: typeof SELECTION_COLUMN;
    EXPAND_COLUMN: typeof RcTable.EXPAND_COLUMN;
    SELECTION_ALL: 'SELECT_ALL';
    SELECTION_INVERT: 'SELECT_INVERT';
    SELECTION_NONE: 'SELECT_NONE';
    Column: typeof Column;
    ColumnGroup: typeof ColumnGroup;
    Summary: typeof Summary;
};
declare const Table: CompoundedComponent;
export default Table;
