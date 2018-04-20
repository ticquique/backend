export interface Urls {
    small: string;
    medium: string;
    big: string;
    low: string;
    orig: string;
}
export interface FileData {
    fieldname?: string;
    originalname?: string;
    mimetype?: string;
    encoding?: string;
    size?: number;
}
export interface FileUploaded {
    urls: Urls;
    params: FileData;
}
