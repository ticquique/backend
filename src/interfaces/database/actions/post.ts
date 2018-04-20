import * as mongoose from 'mongoose';

interface IPost {
    title?: string;
    attachments?: string[];
    author?: string;
    comments?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostModel extends IPost, mongoose.Document {}
