import { ActionService } from './ActionService';
import { Notification } from './../../../database/models/feed/notification';
import { INotificationModel, IActionModel } from '../../../interfaces/database';
import * as mongoose from 'mongoose';

interface FindAction {
    [value: string]: any;
}

export class NotificationService {

    private static instance: NotificationService;
    private actionService: ActionService = ActionService.getInstance();
    private constructor() { }

    // tslint:disable-next-line:member-ordering
    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (
        page: number = 1,
        perPage: number = 20,
        resource?: string | FindAction,
        sort?: string, filter?: string,
        partial?: boolean,
        populate?: string[] | string | string,
        view?: boolean,
        actionFilter?: string,
        populateAction?: string
    ): Promise<INotificationModel[]> => {
        return new Promise<INotificationModel[]>((resolve, reject) => {
            let query: mongoose.Query<INotificationModel[]> = null;
            let actionsPopulated = false;
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
                query = Notification.find(resourcesQuery);
            } else if (resource && typeof resource !== 'string') {
                query = Notification.find(resource);
            } else {
                query = Notification.find({});
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
                        if (populatedField === 'actions') {
                            actionsPopulated = true;
                        } else {
                            query.populate(populatedField);
                        }
                    });
                } else if (typeof populate === 'string') {
                    const array = populate.split(',');
                    array.forEach(populatedField => {
                        if (populatedField === 'actions') {
                            actionsPopulated = true;
                        } else {
                            query.populate(populatedField);
                        }
                    });
                } else {
                    query.populate(populate);
                }
            }
            query.exec(async (err: Error, notifications: INotificationModel[]) => {
                if (err) { reject(err); } else if (notifications.length) {
                    let actions: any = notifications[0].actions;
                    const actionQuery: any = {_id: { $in: notifications[0].actions }};
                    if (actionFilter) {
                        const filt = actionFilter.split(';');
                        filt.forEach((value) => {
                            const elem = value.split('-');
                            if (elem.length === 2 && elem[1] !== '_id') {
                                const arraySubelements = elem[1].split(',');
                                if (arraySubelements.length > 1) {
                                    actionQuery[elem[0]] = { $in: arraySubelements};
                                } else {
                                    actionQuery[elem[0]] = elem[1];
                                }
                            } else {
                                reject(new Error('Invalid resource query'));
                            }
                        });
                    }
                    if (populateAction || actionsPopulated || actionFilter) {
                        actions = await this.actionService.find(null, null, actionQuery);
                    }
                    if (populateAction) {
                        const array = populateAction.split(',');
                        let arrayPromises: Array<Promise<IActionModel>> = [];
                        populateAction = array.join(' ');
                        arrayPromises = actions.map((val: IActionModel) => {
                            return val.populate(populateAction).execPopulate();
                        });
                        actions = await Promise.all(arrayPromises);
                    }
                    if (actionFilter && !actionsPopulated && !populateAction) {
                        actions = actions.map(val => val._id);
                    }
                    notifications[0].actions = actions;
                    if (view) {
                        const arrayPromises: Array<Promise<IActionModel>> = [];
                        notifications[0].actions.map(val => {
                            if (!actionsPopulated) { val = val.toString(); }
                            arrayPromises.push(this.actionService.update(val, { notified: true }));
                        });
                        Promise.all(arrayPromises).then(val => resolve(notifications)).catch(e => reject(e));
                    } else {
                        resolve(notifications);
                    }
                } else { resolve([]); }
            });
        });
    }

    public create = (notification: INotificationModel, userId?: string, populate?: string): Promise<INotificationModel> => {
        return new Promise<INotificationModel>((resolve, reject) => {
            if (userId) { notification.user = userId; }
            notification.save((err, newNotification) => {
                if (err) { reject(err); }
                if (populate) {
                    newNotification.populate(populate, (e, populated) => {
                        if (e) { reject(e); } else { resolve(populated); }
                    });
                } else {
                    resolve(newNotification);
                }
            });
        });
    }

    public update = (actions: IActionModel[], userId: string, populate?: string): Promise<INotificationModel> => {
        return new Promise<INotificationModel>((resolve, reject) => {
            Notification.findOneAndUpdate({ user: userId }, {
                $push: {
                    actions: {
                        $each: actions,
                        $position: 0,
                        $slice: 350,
                    },
                },
            }, (err, notification) => {
                if (err) { reject(err); }
                if (notification) {
                    if (populate) {
                        notification.populate(populate, (e, populated) => {
                            if (e) { reject(e); } else { resolve(populated); }
                        });
                    } else {
                        resolve(notification);
                    }
                } else {
                    const newNotification: INotificationModel = new Notification({ actions, user: userId });
                    this.create(newNotification, userId).then(val => {
                        if (populate) {
                            val.populate(populate, (e, populated) => {
                                if (e) { reject(e); } else { resolve(populated); }
                            });
                        } else {
                            resolve(val);
                        }
                    }).catch(e => reject(e));
                }
            });
        });
    }

    public delete = (id: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            Notification.remove({ _id: id }, (err) => {
                if (err) { reject(err); } else {
                    resolve('Correctly deleted notification');
                }
            });
        });
    }

}
