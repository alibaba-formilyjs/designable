import type { SelectProps as RcSelectProps } from 'rc-select';
import { BaseSelectRef, OptGroup, Option } from 'rc-select';
import { OptionProps } from 'rc-select/lib/Option';
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select';
import * as React from 'react';
import type { SizeType } from '../config-provider/SizeContext';
import type { SelectCommonPlacement } from '../_util/motion';
import type { InputStatus } from '../_util/statusUtils';
type RawValue = string | number;
export { OptionProps, BaseSelectRef as RefSelectProps, BaseOptionType, DefaultOptionType };
export interface LabeledValue {
    key?: string;
    value: RawValue;
    label: React.ReactNode;
}
export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;
export interface InternalSelectProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType> extends Omit<RcSelectProps<ValueType, OptionType>, 'mode'> {
    suffixIcon?: React.ReactNode;
    size?: SizeType;
    disabled?: boolean;
    mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
    bordered?: boolean;
}
export interface SelectProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType> extends Omit<InternalSelectProps<ValueType, OptionType>, 'inputIcon' | 'mode' | 'getInputElement' | 'getRawInputElement' | 'backfill' | 'placement'> {
    placement?: SelectCommonPlacement;
    mode?: 'multiple' | 'tags';
    status?: InputStatus;
    /**
     * @deprecated `dropdownClassName` is deprecated which will be removed in next major
     *   version.Please use `popupClassName` instead.
     */
    dropdownClassName?: string;
    popupClassName?: string;
}
declare const Select: (<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(props: SelectProps<ValueType, OptionType> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<BaseSelectRef> | undefined;
}) => React.ReactElement) & {
    SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
    Option: typeof Option;
    OptGroup: typeof OptGroup;
};
export default Select;
