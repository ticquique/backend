import { IPostModel } from '../../../interfaces/database';

import * as mongoose from 'mongoose';
import { Post } from '../../../database/models/actions/post';
import { EventDispatcher } from 'event-dispatch';
import { events } from '../../subscribers/events';

interface FindPost {
    [value: string]: any;
}
export class PostService {

    private static instance: PostService;
    private eventDispatcher: EventDispatcher;

    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): PostService {
        if (!PostService.instance) {
            PostService.instance = new PostService();
        }
        return PostService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 20, resource?: string | FindPost, sort?: string, filter?: string, partial?: boolean, populate?: any[] | any): Promise<IPostModel[]> => {
        return new Promise<IPostModel[]>((resolve, reject) => {
            let query: mongoose.Query<IPostModel[]> = null;
            if (resource && typeof resource === 'string') {
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
                query = Post.find(resourcesQuery);
            } else if (resource && typeof resource !== 'string') {
                query = Post.find(resource);
            } else {
                query = Post.find({});
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
            if (populate) {
                if (populate instanceof Array) {
                    populate.forEach(populatedField => {
                        query.populate(populatedField);
                    });
                } else if (typeof populate === 'string') {
                    const array = populate.split(',');
                    array.forEach(populatedField => {
                        query.populate(populatedField);
                    });
                } else {
                    query.populate(populate);
                }
            }
            query.exec((err: Error, conversations) => {
                if (err) { reject(err); } else { resolve(conversations); }
            });
        });
    }

    public updateReaction = (id, type: 'like'| 'dislike'| 'love'| 'fun', amount: number) => {
        Post.find({_id: id}).limit(1).exec((err, posts) => {
            if (posts && posts.length) {
                const post = posts[0];
                post.reactions[type] = post.reactions[type] + amount;
                post.markModified('reactions');
                post.save();
            }
        });
    }

    public create = (post: IPostModel, userId?: string, populate?: string, meta = { hidden: false }): Promise<IPostModel> => {
        this.getDispatcherService();
        return new Promise<IPostModel>((resolve, reject) => {
            if (userId) { post.author = userId; }
            post.save((err, newPost) => {
                if (err) { reject(err); }
                if (populate) {
                    newPost.populate(populate, (e, populated) => {
                        if (e) { reject(e); } else {
                            this.eventDispatcher.dispatch(events.post.created, { data: newPost, metadata: { hidden: meta.hidden, user: populated.author } });
                            resolve(newPost);
                        }
                    });
                } else {
                    this.eventDispatcher.dispatch(events.post.created, { data: newPost, metadata: { hidden: meta.hidden, user: newPost.author } });
                    resolve(newPost);
                }
            });
        });
    }

    public delete = (id: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            Post.remove({ _id: id }, (err) => {
                if (err) { reject(err); } else {
                    resolve('Correctly deleted conversation');
                }
            });
        });
    }

    private getDispatcherService = (): EventDispatcher => {
        return this.eventDispatcher || (this.eventDispatcher = new EventDispatcher());
    }
}
