import * as React from 'react';
import type { PaginationConfig } from '../pagination';
import type { SpinProps } from '../spin';
export { ListItemMetaProps, ListItemProps } from './Item';
export type ColumnCount = number;
export type ColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export interface ListGridType {
    gutter?: number;
    column?: ColumnCount;
    xs?: ColumnCount;
    sm?: ColumnCount;
    md?: ColumnCount;
    lg?: ColumnCount;
    xl?: ColumnCount;
    xxl?: ColumnCount;
}
export type ListSize = 'small' | 'default' | 'large';
export type ListItemLayout = 'horizontal' | 'vertical';
export interface ListProps<T> {
    bordered?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    dataSource?: T[];
    extra?: React.ReactNode;
    grid?: ListGridType;
    id?: string;
    itemLayout?: ListItemLayout;
    loading?: boolean | SpinProps;
    loadMore?: React.ReactNode;
    pagination?: PaginationConfig | false;
    prefixCls?: string;
    rowKey?: ((item: T) => React.Key) | keyof T;
    renderItem?: (item: T, index: number) => React.ReactNode;
    size?: ListSize;
    split?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    locale?: ListLocale;
}
export interface ListLocale {
    emptyText: React.ReactNode;
}
export interface ListConsumerProps {
    grid?: any;
    itemLayout?: string;
}
export declare const ListContext: React.Context<ListConsumerProps>;
export declare const ListConsumer: React.Consumer<ListConsumerProps>;
declare function List<T>({ pagination, prefixCls: customizePrefixCls, bordered, split, className, children, itemLayout, loadMore, grid, dataSource, size, header, footer, loading, rowKey, renderItem, locale, ...rest }: ListProps<T>): React.JSX.Element;
declare namespace List {
    var Item: import("./Item").ListItemTypeProps;
}
export default List;
