import { EventDispatcher } from 'event-dispatch';
import { IReactionModel } from '../../interfaces/database';
import * as mongoose from 'mongoose';
import { Reaction } from '../../database/models/feed/reaction';
import { events } from '../subscribers/events';

interface FindReaction {
    [value: string]: any;
}
export class ReactionService {

    private static instance: ReactionService;
    private eventDispatcher: EventDispatcher;

    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): ReactionService {
        if (!ReactionService.instance) {
            ReactionService.instance = new ReactionService();
        }
        return ReactionService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 20, resource?: string | FindReaction, sort?: string, filter?: string, partial?: boolean, populate?: any[] | any): Promise<IReactionModel[]> => {
        return new Promise<IReactionModel[]>((resolve, reject) => {
            let query: mongoose.Query<IReactionModel[]> = null;
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
                query = Reaction.find(resourcesQuery);
            } else if (resource && typeof resource !== 'string') {
                query = Reaction.find(resource);
            } else {
                query = Reaction.find({});
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
            query.exec((err: Error, reactions) => {
                if (err) { reject(err); } else { resolve(reactions); }
            });
        });
    }

    public react = (reaction: IReactionModel, userId?: string, populate?: string, meta = { hidden: false }): Promise<IReactionModel> => {
        this.getDispatcherService();
        return new Promise<IReactionModel>((resolve, reject) => {
            if (userId) { reaction.user = userId; }
            Reaction.findOneAndRemove({ user: reaction.user, related: reaction.related }, (err, removed) => {
                if (err) { reject(err); }
                reaction.save((e, newReaction) => {
                    if (e) { reject(e); }
                    if (removed) {
                        this.eventDispatcher.dispatch(events.reaction.deleted, {
                            data: newReaction, metadata: { hidden: meta.hidden, user: removed.user },
                        });
                        if (removed.type === reaction.type) {
                            if (populate) {
                                removed.populate(populate, (error, populated) => {
                                    if (error) { reject(error); } else {
                                        this.eventDispatcher.dispatch(events.reaction.deleted, {
                                            data: removed, metadata: { hidden: meta.hidden, user: populated.user },
                                        });
                                        resolve(removed);
                                    }
                                });
                            } else {
                                this.eventDispatcher.dispatch(events.reaction.deleted, {
                                    data: removed, metadata: { hidden: meta.hidden, user: removed.user },
                                });
                                resolve(removed);
                            }
                        } else {
                            if (populate) {
                                newReaction.populate(populate, (error, populated) => {
                                    if (error) { reject(error); } else {
                                        this.eventDispatcher.dispatch(events.reaction.created, {
                                            data: newReaction, metadata: { hidden: meta.hidden, user: populated.user },
                                        });
                                        resolve(newReaction);
                                    }
                                });
                            } else {
                                this.eventDispatcher.dispatch(events.reaction.created, {
                                    data: newReaction, metadata: { hidden: meta.hidden, user: newReaction.user },
                                });
                                resolve(newReaction);
                            }
                        }
                    } else {
                        if (populate) {
                            newReaction.populate(populate, (error, populated) => {
                                if (error) { reject(error); } else {
                                    this.eventDispatcher.dispatch(events.reaction.created, {
                                        data: newReaction, metadata: { hidden: meta.hidden, user: populated.user },
                                    });
                                    resolve(newReaction);
                                }
                            });
                        } else {
                            this.eventDispatcher.dispatch(events.reaction.created, {
                                data: newReaction, metadata: { hidden: meta.hidden, user: newReaction.user },
                            });
                            resolve(newReaction);
                        }
                    }
                });
            });
        });
    }

    private getDispatcherService = (): EventDispatcher => {
        return this.eventDispatcher || (this.eventDispatcher = new EventDispatcher());
    }
}
