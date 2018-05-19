import { IActionModel } from '../../../interfaces/database';
import * as mongoose from 'mongoose';
import { Action } from '../../../database/models/feed/action';
import { IAction } from '../../../interfaces/database/feed/action';

interface FindAction {
    [value: string]: any;
}

export class ActionService {

    private static instance: ActionService;

    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): ActionService {
        if (!ActionService.instance) {
            ActionService.instance = new ActionService();
        }
        return ActionService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 20, resource?: string | FindAction, sort?: string, filter?: string, partial?: boolean, populate?: any[] | any): Promise<IActionModel[]> => {
        return new Promise<IActionModel[]>((resolve, reject) => {
            let query: mongoose.Query<IActionModel[]> = null;
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
                query = Action.find(resourcesQuery);
            } else if (resource && typeof resource !== 'string') {
                query = Action.find(resource);
            } else {
                query = Action.find({});
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
            query.exec((err: Error, actions) => {
                if (err) {reject(err); } else { resolve(actions); }
            });
        });
    }

    public create = (action: IActionModel, userId?: string, populate?: string): Promise<IActionModel> => {
        return new Promise<IActionModel>((resolve, reject) => {
            if (userId) { action.user = userId; }
            action.save((err, newAction) => {
                if (err) { reject(err); }
                if (populate) {
                    newAction.populate(populate, (e, populated) => {
                        if (e) {reject(e); } else { resolve(populated); }
                    });
                } else {
                    resolve(newAction);
                }
            });
        });
    }

    public update = (action: IActionModel | string, update: IAction): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            let modified = false;
            if (typeof action === 'string') {
                Action.updateOne({_id: action}, update, (err) => {
                    if (err) { reject(err); } else { resolve(); }
                });
            } else {
                Object.keys(update).map(key => {
                    if (action[key] !== undefined && action[key] !== update[key]) {
                        action[key] = update[key];
                        modified = true;
                    }
                });
                if (modified) {
                    action.save(err => {
                        if (err) { reject(err); } else { resolve(); }
                    });
                } else { resolve(); }
            }
        });
    }

    public delete = (id: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            Action.remove({ _id: id }, (err) => {
                if (err) { reject(err); } else {
                    resolve('Correctly deleted action');
                }
            });
        });
    }

}
