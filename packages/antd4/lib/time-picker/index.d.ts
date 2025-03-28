import type { Moment } from 'moment';
import * as React from 'react';
import type { PickerTimeProps, RangePickerTimeProps } from '../date-picker/generatePicker';
import type { InputStatus } from '../_util/statusUtils';
export interface TimePickerLocale {
    placeholder?: string;
    rangePlaceholder?: [string, string];
}
export interface TimeRangePickerProps extends Omit<RangePickerTimeProps<Moment>, 'picker'> {
    /**
     * @deprecated `dropdownClassName` is deprecated which will be removed in next major
     *   version.Please use `popupClassName` instead.
     */
    dropdownClassName?: string;
    popupClassName?: string;
}
declare const RangePicker: React.ForwardRefExoticComponent<TimeRangePickerProps & React.RefAttributes<any>>;
export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, 'picker'> {
    addon?: () => React.ReactNode;
    popupClassName?: string;
    /**
     * @deprecated `dropdownClassName` is deprecated which will be removed in next major
     *   version.Please use `popupClassName` instead.
     */
    dropdownClassName?: string;
    status?: InputStatus;
}
declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<any>>;
type MergedTimePicker = typeof TimePicker & {
    RangePicker: typeof RangePicker;
};
declare const _default: MergedTimePicker;
export default _default;
