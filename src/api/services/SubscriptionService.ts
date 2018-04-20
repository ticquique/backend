
import { EventDispatcher } from 'event-dispatch';
import { Query } from 'mongoose';
import { Subscription } from '../../database/models/subscription';
import { ISubscriptionModel, IUserModel } from '../../interfaces/database';
import { events } from '../subscribers/events';
import { UserService } from './UserService';

export class SubscriptionService {

    private static instance: SubscriptionService;
    private eventDispatcher: EventDispatcher;
    private userService: UserService = UserService.getInstance();

    private constructor() { }

    // tslint:disable-next-line:member-ordering
    public static getInstance(): SubscriptionService {
        if (!SubscriptionService.instance) {
            SubscriptionService.instance = new SubscriptionService();
        }
        return SubscriptionService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 20, resource?: string, sort?: string, filter?: string, partial?: boolean, optional?: string): Promise<ISubscriptionModel[]> => {
        return new Promise((resolve, reject) => {
            let query: Query<ISubscriptionModel[]> = null;
            if (resource) {
                const resources = resource.split(';');
                const resourcesQuery: { [prop: string]: string | RegExp } = {};
                resources.forEach((value) => {
                    const elem = value.split('-');
                    if (elem.length === 2) {
                        if (partial) { resourcesQuery[elem[0]] = new RegExp('^' + elem[1]); } else { resourcesQuery[elem[0]] = elem[1]; }
                    } else {
                        reject(new Error('Incorrect reource query'));
                    }
                });
                query = Subscription.find(resourcesQuery);
                if (resourcesQuery.id || resourcesQuery.email || resourcesQuery.username) {
                    query.limit(1);
                }
            } else {
                query = Subscription.find({});
                query.limit(perPage).skip((page - 1) * perPage);
            }
            if (optional) {
                query.or([{ subscriber: optional }, { subscribable: optional }]);
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
            query.exec((err: Error, subscriptions) => {
                if (err) { reject(err); } else { resolve(subscriptions); }
            });
        });
    }

    public create = (subscription: ISubscriptionModel, meta: {hidden: boolean} = {hidden: false}, populate?: any): Promise<ISubscriptionModel> => {
        this.getDispatcherService();
        const userService = this.userService;
        return new Promise<ISubscriptionModel>((resolve, reject) => {
            if (subscription.subscribable.toString() === subscription.subscriber.toString()) {
                reject(new Error('A user can´t subscribe to himself'));
            } else {
                this.find(null, null, `subscriber-${subscription.subscriber};subscribable-${subscription.subscribable}`, null, null).then((subscriptions) => {
                    if (subscriptions.length) {
                        subscriptions[0].remove((err, deletedSubscription) => {
                            this.eventDispatcher.dispatch(events.subscription.unsubscribed, {data: deletedSubscription, metadata: {
                                hidden: meta.hidden, user: deletedSubscription.subscriber,
                            }});
                            resolve(deletedSubscription);
                        });
                    } else {
                        userService.find(null, null, `_id-${subscription.subscribable}`).then((user) => {
                            if (user.length) {
                                subscription.save((err, newSubscription) => {
                                    if (err) { reject(err); } else {
                                        if (populate) {
                                            newSubscription.populate(populate, (e, populated) => {
                                                if (e) { reject(e); } else {
                                                    this.eventDispatcher.dispatch(events.subscription.subscribed, {
                                                        data: populated, metadata: {hidden: meta.hidden, user: populated.subscriber},
                                                    });
                                                    resolve(newSubscription);
                                                }
                                            });
                                        } else {
                                            this.eventDispatcher.dispatch(events.subscription.subscribed, {
                                                data: newSubscription, metadata: {hidden: meta.hidden, user: newSubscription.subscriber},
                                            });
                                            resolve(newSubscription);
                                        }
                                    }
                                });
                            } else { reject(new Error(`User with id ${subscription.subscribable} doesn't exist`)); }
                        }).catch((error) => { reject(error); });
                    }
                }).catch((err: Error) => {
                    reject(err);
                });
            }
        });
    }

    public delete = (subscription: string, userId?: string): Promise<IUserModel> => {
        const userService = this.userService;
        this.getDispatcherService();
        return new Promise<IUserModel>((resolve, reject) => {
            let resources = `_id-${subscription}`;
            if (userId) { resources = `${resources};subscribable-${userId}`; }
            this.find(null, null, resources, null, null).then((subscriptions) => {
                if (subscriptions.length) {
                    subscriptions[0].remove();
                    userService.find(null, null, `_id-${subscriptions[0].subscriber}`).then((user) => {
                        resolve(user[0]); // Add user to the blacklist
                        this.eventDispatcher.dispatch(events.subscription.deleted, user[0]);
                    }).catch((error) => { reject(error); });
                } else {
                    reject(new Error('No subscription found'));
                }
            }).catch((err: Error) => {
                reject(err);
            });
        });
    }

    private getDispatcherService = (): EventDispatcher => {
        return this.eventDispatcher || (this.eventDispatcher = new EventDispatcher());
    }

}
