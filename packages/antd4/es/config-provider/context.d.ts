import * as React from 'react';
import type { ValidateMessages } from 'rc-field-form/lib/interface';
import type { RequiredMark } from '../form/Form';
import type { Locale } from '../locale-provider';
import type { RenderEmptyHandler } from './defaultRenderEmpty';
import type { SizeType } from './SizeContext';
export interface Theme {
    primaryColor?: string;
    infoColor?: string;
    successColor?: string;
    processingColor?: string;
    errorColor?: string;
    warningColor?: string;
}
export interface CSPConfig {
    nonce?: string;
}
export type DirectionType = 'ltr' | 'rtl' | undefined;
export interface ConfigConsumerProps {
    getTargetContainer?: () => HTMLElement;
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
    rootPrefixCls?: string;
    iconPrefixCls?: string;
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
    renderEmpty?: RenderEmptyHandler;
    csp?: CSPConfig;
    autoInsertSpaceInButton?: boolean;
    input?: {
        autoComplete?: string;
    };
    pagination?: {
        showSizeChanger?: boolean;
    };
    locale?: Locale;
    pageHeader?: {
        ghost: boolean;
    };
    direction?: DirectionType;
    space?: {
        size?: SizeType | number;
    };
    virtual?: boolean;
    dropdownMatchSelectWidth?: boolean;
    form?: {
        validateMessages?: ValidateMessages;
        requiredMark?: RequiredMark;
        colon?: boolean;
    };
}
export declare const ConfigContext: React.Context<ConfigConsumerProps>;
export declare const ConfigConsumer: React.Consumer<ConfigConsumerProps>;
interface BasicExportProps {
    prefixCls?: string;
}
interface ConsumerConfig {
    prefixCls: string;
}
/** @deprecated Use hooks instead. This is a legacy function */
export declare function withConfigConsumer<ExportProps extends BasicExportProps>(config: ConsumerConfig): <ComponentDef>(Component: React.ComponentType<ExportProps>) => React.FC<ExportProps> & ComponentDef;
export {};
