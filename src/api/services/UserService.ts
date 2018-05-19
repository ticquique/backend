import { EventDispatcher } from 'event-dispatch';
import { Error, Query } from 'mongoose';
import { ApiKey } from '../../database/models/apiKey';
import { User } from '../../database/models/user';
import { Valid } from '../../database/models/valid';
import { IValidModel } from '../../interfaces/database';
import { IUserModel } from '../../interfaces/database/user';
import { events } from '../subscribers/events';

interface FindAction {
    [value: string]: any;
}

export class UserService {

    private static instance: UserService;
    private eventDispatcher: EventDispatcher;
    private constructor() { }

    // tslint:disable-next-line:member-ordering
    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 20, resource?: string | FindAction, sort?: string, filter?: string, partial?: boolean, populate?: any[] | any): Promise<IUserModel[]> => {
        return new Promise((resolve, reject) => {
            let query: Query<IUserModel[]> = null;
            if (resource && typeof resource === 'string') {
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
                query = User.find(resourcesQuery);
                if (resourcesQuery.id) {
                    query.limit(1);
                } else {
                    if (perPage) {
                        query.limit(perPage);
                    }
                    if (page && perPage) {
                        query.skip((page - 1) * perPage);
                    }
                }
            } else if (resource && typeof resource !== 'string') {
                query = User.find(resource);
                if (resource.id || resource.email || resource.username) {
                    query.limit(1);
                } else {
                    if (perPage) {
                        query.limit(perPage);
                    }
                    if (page && perPage) {
                        query.skip((page - 1) * perPage);
                    }
                }
            } else {
                query = User.find({});
                if (perPage) {
                    query.limit(perPage);
                }
                if (page && perPage) {
                    query.skip((page - 1) * perPage);
                }
            }
            if (filter) {
                const filters = filter.split(',');
                let arrayFilter = '';
                filters.forEach((order) => {
                    if (order.startsWith('-')) {
                        order = order.substr(1);
                        arrayFilter = arrayFilter + ` -${order}`;
                    } else {
                        arrayFilter = arrayFilter + ` ${order}`;
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
            query.exec((err: Error, users) => {
                if (err) { reject(err); } else { resolve(users); }
            });
        });
    }

    // tslint:disable-next-line:max-line-length
    public findValids = (page: number = 1, perPage: number = 20, resource?: string | FindAction, sort?: string, filter?: string, partial?: boolean, populate?: any[] | any): Promise<IValidModel[]> => {
        return new Promise((resolve, reject) => {
            let query: Query<IValidModel[]> = null;
            if (resource && typeof resource === 'string') {
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
                query = Valid.find(resourcesQuery);
                if (resourcesQuery.id || resourcesQuery.email || resourcesQuery.username) {
                    query.limit(1);
                } else {
                    if (perPage) {
                        query.limit(perPage);
                    }
                    if (page && perPage) {
                        query.skip((page - 1) * perPage);
                    }
                }
            } else if (resource && typeof resource !== 'string') {
                query = Valid.find(resource);
                if (resource.id || resource.email || resource.username) {
                    query.limit(1);
                } else {
                    if (perPage) {
                        query.limit(perPage);
                    }
                    if (page && perPage) {
                        query.skip((page - 1) * perPage);
                    }
                }
            } else {
                query = Valid.find({});
                if (perPage) {
                    query.limit(perPage);
                }
                if (page && perPage) {
                    query.skip((page - 1) * perPage);
                }
            }
            if (filter) {
                const filters = filter.split(',');
                let arrayFilter = '';
                filters.forEach((order) => {
                    if (order.startsWith('-')) {
                        order = order.substr(1);
                        arrayFilter = arrayFilter + ` -${order}`;
                    } else {
                        arrayFilter = arrayFilter + ` ${order}`;
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
            query.exec((err: Error, valids) => {
                if (err) { reject(err); } else { resolve(valids); }
            });
        });
    }

    public register = (valid: IValidModel): Promise<IValidModel> => {
        this.getDispatcherService();
        return new Promise<IValidModel>((resolve, reject) => {
            Valid.findOne({ $or: [{ email: valid.email }, { username: valid.username }] }, (error, existingValid) => {
                if (error) { reject(error); }
                if (existingValid) {
                    let reason = '';
                    if (existingValid.email === valid.email) { reason = reason + `email ${valid.email} is used yet `; }
                    if (existingValid.username === valid.username) { reason = reason + `name ${valid.username} is used yet`; }
                    reject(new Error(reason));
                } else {
                    User.findOne({ $or: [{ email: valid.email }, { username: valid.username }] }, (err, existingUser) => {
                        if (err) { reject(err); }
                        if (existingUser) {
                            let reason = '';
                            if (existingUser.email === valid.email) { reason = reason + `email ${valid.email} is used yet `; }
                            if (existingUser.username === valid.username) { reason = reason + `name ${valid.username} is used yet`; }
                            reject(new Error(reason));
                        } else {
                            valid.save((e, newValid) => {
                                if (e) { reject(e); } else {
                                    this.eventDispatcher.dispatch(events.user.registered, newValid);
                                    resolve(newValid);
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    public validate = (token: string): Promise<IUserModel> => {
        return new Promise<IUserModel>((resolve, reject) => {
            Valid.findOneAndRemove({ token }, (error, valid) => {
                if (error) {
                    reject(error);
                } else if (valid) {
                    const user: IUserModel = new User({
                        email: valid.email,
                        username: valid.username,
                        password: valid.password,
                        role: valid.role,
                    });
                    this.create(user).then(value => resolve(value)).catch(err => reject(err));
                } else {
                    reject(new Error('Invalid token provided'));
                }
            });
        });
    }

    public create = (user: IUserModel): Promise<IUserModel> => {
        this.getDispatcherService();
        return new Promise<IUserModel>((resolve, reject) => {
            User.findOne({ $or: [{ email: user.email }, { username: user.username }] }, (error, existingUser) => {
                if (error) { reject(error); }
                if (existingUser) {
                    let reason = '';
                    if (existingUser.email === user.email) { reason = reason + `email ${user.email} is used yet `; }
                    if (existingUser.username === user.username) { reason = reason + `name ${user.username} is used yet`; }
                    reject(new Error(reason));
                } else {
                    user.save((err, newUser) => {
                        if (err) { reject(err); } else {
                            this.eventDispatcher.dispatch(events.user.created, newUser);
                            resolve(newUser);
                        }
                    });
                }
            });
        });
    }

    public getToken = (username: string, password: string): Promise<IUserModel> => {
        return new Promise<IUserModel>((resolve, reject) => {
            User.findOne({ $or: [{ email: username }, { username }] }, '+password').exec((error, existingUser) => {
                if (error) {
                    reject(error);
                }
                if (existingUser) {
                    if (existingUser.comparePassword(password)) {
                        resolve(existingUser);
                    } else {
                        reject(new Error('Incorrect password'));
                    }
                } else {
                    reject(new Error('user not found'));
                }
            });
        });
    }

    public update = (userId: string, data: any, key?: string): Promise<IUserModel> => {
        return new Promise<IUserModel>((resolve, reject) => {
            const execQuery = () => {
                User.findOne({ _id: userId }, (err, user) => {
                    if (err) { reject(err); } else if (user) {
                        if (data.email || data.username) {
                            const query = { $or: [] };
                            if (data.email) { query.$or.push({ email: data.email }); }
                            if (data.username) { query.$or.push({ username: data.username }); }
                            User.findOne(query, (error, existingUser) => {
                                if (error) { reject(error); }
                                if (existingUser) {
                                    let reason = '';
                                    if (existingUser.email === data.email) { reason = reason + `email ${data.email} is used yet `; }
                                    if (existingUser.username === data.username) { reason = reason + `name ${data.username} is used yet`; }
                                    reject(new Error(reason));
                                } else {
                                    user.set(data);
                                    user.save((e, newUser) => {
                                        if (error) { reject(e); }
                                        if (newUser) { resolve(newUser); }
                                    });
                                }
                            });
                        } else {
                            user.set(data);
                            user.save((error, newUser) => {
                                if (error) { reject(error); }
                                if (newUser) { resolve(newUser); }
                            });
                        }
                    } else {
                        reject(new Error('No user found'));
                    }
                });
            };
            if (data.privileges || data.password || key) {
                if (!key) { reject(new Error('Permision denied')); } else {
                    ApiKey.find({ key }, (err, doc) => {
                        if (err || !doc.length) {
                            reject(new Error('Permision denied'));
                        } else { execQuery(); }
                    });
                }
            } else { execQuery(); }
        });
    }

    public updatePassword(userId: string, data: any, key?: string): Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            const execQuery = () => {
                User.findOne({ _id: userId }, '+password', (err, user) => {
                    if (err) { reject(err); } else if (user) {
                        if (!key && user.comparePassword(data.lastPassword)) {
                            data.password = data.newPassword;
                            delete data.newPassword;
                            delete data.lastPassword;
                            delete data.rePassword;
                            if (data.email || data.username) {
                                const query = { $or: [] };
                                if (data.email) { query.$or.push({ email: data.email }); }
                                if (data.username) { query.$or.push({ username: data.username }); }
                                User.findOne(query, (error, existingUser) => {
                                    if (error) { reject(error); }
                                    if (existingUser) {
                                        let reason = '';
                                        if (existingUser.email === data.email) { reason = reason + `email ${data.email} is used yet `; }
                                        if (existingUser.username === data.username) { reason = reason + `name ${data.username} is used yet`; }
                                        reject(new Error(reason));
                                    } else {
                                        user.set(data);
                                        user.save((e, newUser) => {
                                            if (error) { reject(e); }
                                            if (newUser) { resolve(newUser); }
                                        });
                                    }
                                });
                            } else {
                                user.set(data);
                                user.save((error, newUser) => {
                                    if (error) { reject(error); }
                                    if (newUser) { resolve(newUser); }
                                });
                            }
                        } else {
                            reject(new Error('No user found'));
                        }
                    } else {
                        reject(new Error('Invalid password'));
                    }
                });
            };
            if (data.lastPassword && data.rePassword && data.newPassword) {
                if (data.rePassword !== data.newPassword) {
                    reject(new Error('Not equal passwords'));
                } else if (data.newPassword === data.lastPassword) {
                    reject(new Error('If you want to change password please insert a different one'));
                } else if (key) {
                    ApiKey.find({ key }, (err, doc) => {
                        if (err || !doc.length) {
                            reject(new Error('Permision denied'));
                        } else { execQuery(); }
                    });
                } else {
                    execQuery();
                }
            } else {
                reject(new Error('Complete all the form'));
            }
        });
    }

    public delete(id: string, key?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (key) {
                ApiKey.find({ key }, (err, doc) => {
                    if (err || !doc.length) {
                        reject(new Error('Permision denied'));
                    }
                });
            }
            User.remove({ _id: id }, (err) => {
                if (err) { reject(err); } else {
                    resolve('Correctly deleted user');
                }
            });
        });
    }

    public deleteValid(id: string, key: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            ApiKey.find({ key }, (err, doc) => {
                if (err || !doc.length) {
                    reject(new Error('Permision denied'));
                } else {
                    Valid.remove({ _id: id }, (error) => {
                        if (error) { reject(error); } else {
                            resolve('Valid correctly removed');
                        }
                    });
                }
            });
        });
    }

    private getDispatcherService = (): EventDispatcher => {
        return this.eventDispatcher || (this.eventDispatcher = new EventDispatcher());
    }

}
