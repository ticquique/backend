import * as mongoose from 'mongoose';

interface IPost {
    title?: string;
    attachments?: string[];
    author?: string;
    reactions?: {
        like: number,
        dislike: number,
        love: number,
        fun: number
    };
    comments?: string;
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostModel extends IPost, mongoose.Document { }
