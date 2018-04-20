import * as mongoose from 'mongoose';
interface IValid {
    email?: string;
    password?: string;
    userID?: string;
    role?: string;
    username?: string;
    vars?: any[];
    token: string;
    created_at?: Date;
    updated_at?: Date;
}
export interface IValidModel extends IValid, mongoose.Document {}
