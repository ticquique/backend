import { Schema, SchemaOptions, model } from 'mongoose';
import { ITagModel } from '../../interfaces/database/tag';

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};
// Conversation Schema
const TagSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
}, schemaOptions);

export const Tag = model<ITagModel>('Tag', TagSchema);
