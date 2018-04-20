import { Schema, SchemaOptions, model } from 'mongoose';
import { ICommentModel } from '../../../interfaces/database';

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};

// Conversation Schema
const CommentSchema = new Schema({
    discussionId: {
        type: Schema.Types.ObjectId, ref: 'Post',
        required: true,
    },
    size: {
        type: Number,
        required: false,
        default: 0,
    },
    comments: [{
        author: {
            type: {
                id: { type: Schema.Types.ObjectId, ref: 'User', required: false },
                name: { type: String, required: false },
            },
            required: false,
        },
        text: {
            type: String, required: false,
        },
        comments: {
            type: Schema.Types.ObjectId, ref: 'Comment',
            required: false,
        },
    }],
}, schemaOptions);

export const Comment = model<ICommentModel>('Comment', CommentSchema);
