import type { ValidateStatus } from '../form/FormItem';
declare const InputStatuses: ["warning", "error", ""];
export type InputStatus = typeof InputStatuses[number];
export declare function getStatusClassNames(prefixCls: string, status?: ValidateStatus, hasFeedback?: boolean): string;
export declare const getMergedStatus: (contextStatus?: ValidateStatus, customStatus?: InputStatus) => "" | "success" | "warning" | "error" | "validating" | undefined;
export {};
