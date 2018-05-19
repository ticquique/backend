import { ICommentModel } from '../../../interfaces/database';
import * as mongoose from 'mongoose';
import { Comment } from '../../../database/models/actions/comment';

export class CommentService {

    private static instance: CommentService;

    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): CommentService {
        if (!CommentService.instance) {
            CommentService.instance = new CommentService();
        }
        return CommentService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 20, resource?: string, sort?: string, filter?: string, partial?: boolean): Promise<ICommentModel[]> => {
        return new Promise<ICommentModel[]>((resolve, reject) => {
            let query: mongoose.Query<ICommentModel[]> = null;
            if (resource) {
                const resources = resource.split(';');
                const resourcesQuery: any = {};
                resources.forEach((value) => {
                    const elem = value.split('-');
                    if (elem.length === 2) {
                        if (partial) { resourcesQuery[elem[0]] = new RegExp('^' + elem[1]); } else { resourcesQuery[elem[0]] = elem[1]; }
                    } else {
                        reject(new Error('Invalid resource query'));
                    }
                });
                query = Comment.find(resourcesQuery);
            } else {
                query = Comment.find({});
            }
            if (perPage) {
                query.limit(perPage);
            }
            if (page && perPage) {
                query.skip((page - 1) * perPage);
            }
            if (filter) {
                const filters = filter.split(',');
                let arrayFilter = '';
                filters.forEach((filt) => {
                    if (filt.startsWith('-')) {
                        filt = filt.substr(1);
                        arrayFilter = arrayFilter + ` -${filt}`;
                    } else {
                        arrayFilter = arrayFilter + ` ${filt}`;
                    }
                });
                query.select(arrayFilter);
            }
            if (sort) {
                const array = sort.split(',');
                const arraySort = [];
                array.forEach(order => {
                    if (order.startsWith('-')) {
                        order = order.substr(1);
                        arraySort.push([order, -1]);
                    } else {
                        arraySort.push([order, 1]);
                    }
                });
                query.sort(arraySort);
            }
            query.exec((err: Error, conversations) => {
                if (err) { reject(err); } else { resolve(conversations); }
            });
        });
    }

    public create = (comment: ICommentModel): Promise<ICommentModel> => {
        return new Promise<ICommentModel>((resolve, reject) => {
            comment.save((err, newComment) => {
                if (err) { reject(err); }
                resolve(comment);
            });
        });
    }

    public delete = (id: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            Comment.remove({ _id: id }, (err) => {
                if (err) { reject(err); } else {
                    resolve('Correctly deleted conversation');
                }
            });
        });
    }
}
