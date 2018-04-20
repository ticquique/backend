import * as mongoose from 'mongoose';

interface IAttachment {
    userId?: string;
    relatedId?: string;
    urls?: {
        small?: string,
        medium?: string,
        big?: string,
        low?: string,
        orig: string,
    };
    type?: 'book' | 'photo';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAttachmentModel extends IAttachment, mongoose.Document {}
