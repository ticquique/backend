import * as mongoose from 'mongoose';

export interface IMessage {
    conversation?: string;
    body?: string[];
    author?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMessageModel extends IMessage, mongoose.Document {}
