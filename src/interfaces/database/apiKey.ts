import * as mongoose from 'mongoose';

interface IApiKey {
    key_name: string;
    key: string;
}
export interface IApiKeyModel extends IApiKey, mongoose.Document  {}
