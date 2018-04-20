import * as mongoose from 'mongoose';

export interface IConversation {
    participants?: string[];
    ip?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IConversationModel extends IConversation, mongoose.Document {}
