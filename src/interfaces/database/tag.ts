import * as mongoose from 'mongoose';

interface ITag {
    title?: string;
}

export interface ITagModel extends ITag, mongoose.Document {}
