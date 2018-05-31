import { Schema, SchemaOptions, model } from 'mongoose';
import { IPostModel } from '../../../interfaces/database';

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};

// Conversation Schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    attachments: {
        type: [{
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'Attachment',
        }],
        required: false,
    },
    comments: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Comment',
    },
    reactions: {
        type: {
            like: Number,
            dislike: Number,
            love: Number,
            fun: Number,
        },
        required: false,
        default: 0,
    },
    text: {
        type: String,
        required: false,
    },
}, schemaOptions);

export const Post = model<IPostModel>('Post', PostSchema);
