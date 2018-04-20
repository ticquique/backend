import * as mongoose from 'mongoose';

interface IReaction {
    type: 'like' | 'dislike' | 'love' | 'fun';
    user?: string;
    related?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IReactionModel extends IReaction, mongoose.Document {}
