import type { RcFile as OriRcFile, UploadProps as RcUploadProps, UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import type * as React from 'react';
import type { ProgressProps } from '../progress';
export interface RcFile extends OriRcFile {
    readonly lastModifiedDate: Date;
}
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';
export interface HttpRequestHeader {
    [key: string]: string;
}
export interface UploadFile<T = any> {
    uid: string;
    size?: number;
    name: string;
    fileName?: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    url?: string;
    status?: UploadFileStatus;
    percent?: number;
    thumbUrl?: string;
    crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
    originFileObj?: RcFile;
    response?: T;
    error?: any;
    linkProps?: any;
    type?: string;
    xhr?: T;
    preview?: string;
}
export interface InternalUploadFile<T = any> extends UploadFile<T> {
    originFileObj: RcFile;
}
export interface UploadChangeParam<T = UploadFile> {
    file: T;
    fileList: T[];
    event?: {
        percent: number;
    };
}
export interface ShowUploadListInterface {
    showRemoveIcon?: boolean;
    showPreviewIcon?: boolean;
    showDownloadIcon?: boolean;
    removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
    downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
    previewIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
}
export interface UploadLocale {
    uploading?: string;
    removeFile?: string;
    downloadFile?: string;
    uploadError?: string;
    previewFile?: string;
}
export type UploadType = 'drag' | 'select';
export type UploadListType = 'text' | 'picture' | 'picture-card';
export type UploadListProgressProps = Omit<ProgressProps, 'percent' | 'type'>;
export type ItemRender<T = any> = (originNode: React.ReactElement, file: UploadFile, fileList: Array<UploadFile<T>>, actions: {
    download: () => void;
    preview: () => void;
    remove: () => void;
}) => React.ReactNode;
type PreviewFileHandler = (file: File | Blob) => PromiseLike<string>;
type TransformFileHandler = (file: RcFile) => string | Blob | File | PromiseLike<string | Blob | File>;
type BeforeUploadValueType = void | boolean | string | Blob | File;
export interface UploadProps<T = any> extends Pick<RcUploadProps, 'capture'> {
    type?: UploadType;
    name?: string;
    defaultFileList?: Array<UploadFile<T>>;
    fileList?: Array<UploadFile<T>>;
    action?: string | ((file: RcFile) => string) | ((file: RcFile) => PromiseLike<string>);
    directory?: boolean;
    data?: Record<string, unknown> | ((file: UploadFile<T>) => Record<string, unknown> | Promise<Record<string, unknown>>);
    method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
    headers?: HttpRequestHeader;
    showUploadList?: boolean | ShowUploadListInterface;
    multiple?: boolean;
    accept?: string;
    beforeUpload?: (file: RcFile, FileList: RcFile[]) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
    onChange?: (info: UploadChangeParam<UploadFile<T>>) => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
    listType?: UploadListType;
    className?: string;
    onPreview?: (file: UploadFile<T>) => void;
    onDownload?: (file: UploadFile<T>) => void;
    onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
    supportServerRender?: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    prefixCls?: string;
    customRequest?: (options: RcCustomRequestOptions) => void;
    withCredentials?: boolean;
    openFileDialogOnClick?: boolean;
    locale?: UploadLocale;
    id?: string;
    previewFile?: PreviewFileHandler;
    /** @deprecated Please use `beforeUpload` directly */
    transformFile?: TransformFileHandler;
    iconRender?: (file: UploadFile<T>, listType?: UploadListType) => React.ReactNode;
    isImageUrl?: (file: UploadFile) => boolean;
    progress?: UploadListProgressProps;
    itemRender?: ItemRender<T>;
    /** Config max count of `fileList`. Will replace current one when `maxCount` is 1 */
    maxCount?: number;
    children?: React.ReactNode;
}
export interface UploadState<T = any> {
    fileList: UploadFile<T>[];
    dragState: string;
}
export interface UploadListProps<T = any> {
    listType?: UploadListType;
    onPreview?: (file: UploadFile<T>) => void;
    onDownload?: (file: UploadFile<T>) => void;
    onRemove?: (file: UploadFile<T>) => void | boolean;
    items?: Array<UploadFile<T>>;
    progress?: UploadListProgressProps;
    prefixCls?: string;
    showRemoveIcon?: boolean;
    showDownloadIcon?: boolean;
    showPreviewIcon?: boolean;
    removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
    downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
    previewIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
    locale: UploadLocale;
    previewFile?: PreviewFileHandler;
    iconRender?: (file: UploadFile<T>, listType?: UploadListType) => React.ReactNode;
    isImageUrl?: (file: UploadFile) => boolean;
    appendAction?: React.ReactNode;
    appendActionVisible?: boolean;
    itemRender?: ItemRender<T>;
}
export {};
