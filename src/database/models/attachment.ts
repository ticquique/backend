import { Schema, SchemaOptions, model } from 'mongoose';
import { IAttachmentModel } from '../../interfaces/database/attachment';
const attachmentTypes = ['book', 'album', 'photo'];

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};
const AttachmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    relatedId: {
        type: String,
        required: false,
    },
    urls: {
        small: {type: String, required: false},
        medium: {type: String, required: false},
        big: {type: String, required: false},
        low: {type: String, required: false},
        orig: {type: String, required: false},
    },
    type: {
        type: String,
        enum: attachmentTypes,
        required: false,
    },
}, schemaOptions);

export const Attachment = model<IAttachmentModel>('Attachment', AttachmentSchema);
