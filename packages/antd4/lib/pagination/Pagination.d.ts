import type { PaginationProps as RcPaginationProps } from 'rc-pagination';
import { PaginationLocale } from 'rc-pagination';
import * as React from 'react';
export interface PaginationProps extends RcPaginationProps {
    showQuickJumper?: boolean | {
        goButton?: React.ReactNode;
    };
    size?: 'default' | 'small';
    responsive?: boolean;
    role?: string;
    totalBoundaryShowSizeChanger?: number;
}
export type PaginationPosition = 'top' | 'bottom' | 'both';
export interface PaginationConfig extends PaginationProps {
    position?: PaginationPosition;
}
export { PaginationLocale };
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
