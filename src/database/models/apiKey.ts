import { Schema, SchemaOptions, model } from 'mongoose';
import { IApiKeyModel } from '../../interfaces/database/apiKey';

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};
const ApiKeySchema = new Schema({
    key_name: {
        type: String,
        required: true,
        unique: true,
    },
    key: {
        type: String,
        required: true,
        unique: true,
    },
}, schemaOptions);

export const ApiKey = model<IApiKeyModel>('apiKey', ApiKeySchema);
