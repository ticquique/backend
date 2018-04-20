import { IPostModel, IReactionModel, IUserModel, IConversationModel, ISubscriptionModel, IValidModel } from './database';

export interface MetaEvents {
    data: IPostModel | IReactionModel | IUserModel | IConversationModel | ISubscriptionModel | IValidModel;
    metadata: {
        hidden: boolean,
        user: string,
        relevancy?: number
    };
}
