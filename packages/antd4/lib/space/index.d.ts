import * as React from 'react';
import type { SizeType } from '../config-provider/SizeContext';
import Compact from './Compact';
export declare const SpaceContext: React.Context<{
    latestIndex: number;
    horizontalSize: number;
    verticalSize: number;
    supportFlexGap: boolean;
}>;
export type SpaceSize = SizeType | number;
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: SpaceSize | [SpaceSize, SpaceSize];
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'end' | 'center' | 'baseline';
    split?: React.ReactNode;
    wrap?: boolean;
}
type CompoundedComponent = React.FC<SpaceProps> & {
    Compact: typeof Compact;
};
declare const CompoundedSpace: CompoundedComponent;
export default CompoundedSpace;
