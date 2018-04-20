import * as mongoose from 'mongoose';

interface ISubscription {
    subscriber?: string;
    subscribable?: string;
}

export interface ISubscriptionModel extends ISubscription, mongoose.Document {}
