import * as mongoose from 'mongoose';

interface IFeed {
    user?: string;
    actions?: string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface IFeedModel extends IFeed, mongoose.Document {}
