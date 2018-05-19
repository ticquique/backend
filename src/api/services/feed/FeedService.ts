import { IFeedModel, IActionModel } from '../../../interfaces/database';

import * as mongoose from 'mongoose';
import { Feed } from '../../../database/models/feed/feed';
import { ActionService } from './ActionService';

interface FindAction {
    [value: string]: any;
}

export class FeedService {

    private static instance: FeedService;
    private actionService: ActionService = ActionService.getInstance();

    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): FeedService {
        if (!FeedService.instance) {
            FeedService.instance = new FeedService();
        }
        return FeedService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 20, resource?: string | FindAction, sort?: string, filter?: string, partial?: boolean, populate?: FindAction[] | FindAction): Promise<IFeedModel[]> => {
        return new Promise<IFeedModel[]>((resolve, reject) => {
            let query: mongoose.Query<IFeedModel[]> = null;
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
                query = Feed.find(resourcesQuery);
            } else if (resource && typeof resource !== 'string') {
                query = Feed.find(resource);
            } else {
                query = Feed.find({});
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
                } else {
                    query.populate(populate);
                }
            }
            query.exec((err: Error, feeds) => {
                if (err) { reject(err); } else { resolve(feeds); }
            });
        });
    }

    public create = (feed: IFeedModel, userId?: string, populate?: string): Promise<IFeedModel> => {
        return new Promise<IFeedModel>((resolve, reject) => {
            if (userId) { feed.user = userId; }
            this.actionService.find(1, 350, null).then(actions => {
                feed.actions = actions.map(value => value._id);
                feed.save((err, newFeed) => {
                    if (err) { reject(err); }
                    if (populate) {
                        newFeed.populate(populate, (e, populated) => {
                            if (e) {reject(e); } else { resolve(populated); }
                        });
                    } else {
                        resolve(newFeed);
                    }
                });
            }).catch(e => reject(e));
        });
    }

    public update = (action: IActionModel[], userId: string, populate?: string): Promise<IFeedModel> => {
        return new Promise<IFeedModel>((resolve, reject) => {
            Feed.findOneAndUpdate({ user: userId }, {
                $push: {
                    actions: {
                        $each: action,
                        $position: 0,
                        $slice: 350,
                    },
                },
            }, (err, feed) => {
                if (err) { reject(err); }
                if (populate) {
                    feed.populate(populate, (e, populated) => {
                        if (e) {reject(e); } else { resolve(populated); }
                    });
                } else {
                    resolve(feed);
                }
            });
        });
    }

    public delete = (id: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            Feed.remove({ _id: id }, (err) => {
                if (err) { reject(err); } else {
                    resolve('Correctly deleted feed');
                }
            });
        });
    }
}
