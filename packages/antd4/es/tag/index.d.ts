import * as React from 'react';
import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import type { LiteralUnion } from '../_util/type';
import CheckableTag from './CheckableTag';
export { CheckableTagProps } from './CheckableTag';
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    prefixCls?: string;
    className?: string;
    color?: LiteralUnion<PresetColorType | PresetStatusColorType, string>;
    closable?: boolean;
    closeIcon?: React.ReactNode;
    /** @deprecated `visible` will be removed in next major version. */
    visible?: boolean;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
    style?: React.CSSProperties;
    icon?: React.ReactNode;
}
export interface TagType extends React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLElement>> {
    CheckableTag: typeof CheckableTag;
}
declare const Tag: TagType;
export default Tag;
