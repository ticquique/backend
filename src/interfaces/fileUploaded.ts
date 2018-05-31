export interface Urls {
    small: string;
    medium: string;
    big: string;
    low: string;
    orig: string;
}
export interface FileUploaded {
    urls: Urls;
    params: FileData;
}

export interface FileData {
    fieldname?: string;
    originalname?: string;
    mimetype?: string;
    encoding?: string;
    size?: number;
}

export interface UploadedFile {
    urls: FileUrls;
    params: FileData;
}

export interface Size {
    name: string;
    prefix: string;
    size: number;
    lowRes?: boolean;
}

export interface FileUrls {
    small?: string;
    medium?: string;
    big?: string;
    low?: string;
    orig?: string;
    [size: string]: string;
}
