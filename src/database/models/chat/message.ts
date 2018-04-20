import { Schema, SchemaOptions, model } from 'mongoose';
import { IMessageModel } from '../../../interfaces/database';

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};
// Conversation Schema
const MessageSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId, ref: 'Conversation',
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, schemaOptions);

export const Message = model<IMessageModel>('Message', MessageSchema);
