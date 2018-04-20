import { Schema, SchemaOptions, model } from 'mongoose';
import { IConversationModel } from '../../../interfaces/database';

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};
// Conversation Schema
const ConversationSchema = new Schema({
    participants: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: true,
    },
}, schemaOptions);

export const Conversation = model<IConversationModel>('Conversation', ConversationSchema);
