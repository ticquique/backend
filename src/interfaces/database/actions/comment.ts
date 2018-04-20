import * as mongoose from 'mongoose';

interface IComment {
    discussionId: string;
    size?: number;
    comments?: [{
        text?: string;
        author?: {
            name: string,
            id: string,
        };
        comments?: string;
    }];
}

export interface ICommentModel extends IComment, mongoose.Document {}
