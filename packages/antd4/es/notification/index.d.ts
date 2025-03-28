import * as React from 'react';
interface DivProps extends React.HTMLProps<HTMLDivElement> {
    'data-testid'?: string;
}
export type NotificationPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
export type IconType = 'success' | 'info' | 'error' | 'warning';
export interface ConfigProps {
    top?: number;
    bottom?: number;
    duration?: number;
    prefixCls?: string;
    placement?: NotificationPlacement;
    getContainer?: () => HTMLElement;
    closeIcon?: React.ReactNode;
    rtl?: boolean;
    maxCount?: number;
    props?: DivProps;
}
export interface ArgsProps {
    message: React.ReactNode;
    description?: React.ReactNode;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number | null;
    icon?: React.ReactNode;
    placement?: NotificationPlacement;
    maxCount?: number;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    readonly type?: IconType;
    onClick?: () => void;
    top?: number;
    bottom?: number;
    getContainer?: () => HTMLElement;
    closeIcon?: React.ReactNode;
    props?: DivProps;
}
export interface NotificationInstance {
    success(args: ArgsProps): void;
    error(args: ArgsProps): void;
    info(args: ArgsProps): void;
    warning(args: ArgsProps): void;
    open(args: ArgsProps): void;
}
export interface NotificationApi extends NotificationInstance {
    warn(args: ArgsProps): void;
    close(key: string): void;
    config(options: ConfigProps): void;
    destroy(): void;
    useNotification: () => [NotificationInstance, React.ReactElement];
}
declare const _default: NotificationApi;
export default _default;
