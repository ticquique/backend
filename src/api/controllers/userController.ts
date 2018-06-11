'use strict';

import { UserService } from '../services/UserService';
import { Request, Response, NextFunction } from 'express';
import { env } from '../../env';
import { HttpError } from '../../interfaces/errors/HttpError';
import { Error } from 'mongoose';
import { User } from '../../database/models/user';
import { Valid } from '../../database/models/valid';
import { IValidModel } from '../../interfaces/database';
import { AuthService } from '../services/AuthService';
import { FileData, Size, UploadedFile } from '../../interfaces';
import * as Busboy from 'busboy';
import { UploadService } from '../services/UploadService';
import { updateMiddleware } from '../validators';

export class UserController {

    private static instance: UserController;
    private userService: UserService = UserService.getInstance();
    private authService: AuthService = AuthService.getInstance();
    private uploadService: UploadService = UploadService.getInstance();

    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    public find = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const resources = req.query.resource || null;
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || null;
        userService.find(page, perPage, resources, sort, filter, partial)
            .then((users) => {
                res.status(env.api.success).json(users);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public findValids = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const resources = req.query.resource || null;
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || null;
        userService.findValids(page, perPage, resources, sort, filter, partial)
            .then((valids) => {
                res.status(env.api.success).json(valids);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public create = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const user = new User(req.body);
        userService.create(user)
            .then((newUser) => {
                res.status(env.api.success).json(newUser);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public register = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const valid: IValidModel = new Valid(req.body);
        userService.register(valid)
            .then((newValid) => {
                res.status(env.api.success).json(newValid);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public validate = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const authService = this.authService;
        userService.validate(req.body.token).then((user) => {
            res.status(env.api.success).json(authService.createToken(user));
        }).catch((err: Error) => {
            const e = new HttpError(401, err.message);
            next(e);
        });
    }

    public getAuthentication = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const authService = this.authService;
        userService.getToken(req.body.username, req.body.password).then((user) => {
            res.status(env.api.success).json(authService.createToken(user));
        }).catch((err: Error) => {
            const e = new HttpError(401, err.message);
            next(e);
        });
    }

    public updateUser = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const userId = req.get('api_key') ? req.query.userid : res.locals.user.sub;
        userService.update(userId, req.body, req.get('api_key') || null).then((user) => {
            res.status(env.api.success).json(user);
        }).catch((err: Error) => {
            const e = new HttpError(401, err.message);
            next(e);
        });
    }

    public updatePassword = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const userId = req.get('api_key') ? req.query.userid : res.locals.user.sub;
        userService.updatePassword(userId, req.body, req.get('api_key') || null).then((user) => {
            res.status(env.api.success).json(user);
        }).catch((err: Error) => {
            const e = new HttpError(401, err.message);
            next(e);
        });
    }

    public deleteUser = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const userId = req.get('api_key') ? req.body.id : res.locals.user.sub;
        userService.delete(userId, req.get('api_key') || null).then((user) => {
            res.status(env.api.success).json(user);
        }).catch((err: Error) => {
            const e = new HttpError(401, err.message);
            next(e);
        });
    }

    public deleteValid = (req: Request, res: Response, next: NextFunction): void => {
        const userService = this.userService;
        const valid = req.body.id;
        userService.deleteValid(valid, req.get('api_key')).then((result) => {
            res.status(env.api.success).json(result);
        }).catch((err: Error) => {
            const e = new HttpError(401, err.message);
            next(e);
        });
    }

    public updateProfile = (req: Request, res: Response, next: NextFunction) => {
        let busboy;
        let userId: string;
        const updates: any = {};
        const promisesUpload: Array<Promise<UploadedFile>> = [];
        try {
            busboy = new Busboy({
                headers: req.headers,
                limits: { files: 20, fileSize: 1024 * 1024 * 100 },
                preservePath: true,
            });
            busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                if (!filename) { file.resume(); }
                if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(filename)) {
                    const params: FileData = { originalname: filename, encoding, mimetype, fieldname };
                    let sizes: Size[] = [{ name: 'big', prefix: 'big-', size: 1920 },
                    { name: 'medium', prefix: 'medium-', size: 1280 },
                    { name: 'small', prefix: 'small-', size: 720 },
                    { name: 'low', prefix: 'low-', size: 320 }];
                    if (fieldname === 'picture') {
                        sizes = [{ name: 'big', prefix: 'big-', size: 720 },
                        { name: 'medium', prefix: 'medium-', size: 300 },
                        { name: 'small', prefix: 'small-', size: 120 },
                        { name: 'low', prefix: 'low-', size: 60 }];
                    }
                    promisesUpload.push(this.uploadService.uploadSingle(file, params, res.locals.user.sub, sizes));
                } else { file.resume(); }
            });
            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
                if (fieldname === 'userId') { userId = val; } else { updates[fieldname] = val; }
            });
            busboy.on('error', (err) => { next(err); });
            busboy.on('partsLimit', () => { next(new Error('upload parts limit reached')); });
            busboy.on('filesLimit', () => { next(new Error('upload files limit reached')); });
            busboy.on('fieldsLimit', () => { next(new Error('upload fields limit reached')); });
            busboy.on('finish', () => {
                req.unpipe(busboy);
                busboy.removeAllListeners();
                if (req.get('api_key')) {
                    userId = updates.userId;
                } else {
                    userId = res.locals.user.sub;
                }
                const validator = updateMiddleware(userId, updates);
                if (validator === true) {
                    if (promisesUpload.length > 0) {
                        Promise.all(promisesUpload).then((values) => {
                            if (values && values.length) {
                                values.forEach(value => {
                                    if (value.params.fieldname && value.params.fieldname === 'picture') {
                                        updates['profile.picture'] = value.urls;
                                    } else if (value.params.fieldname && value.params.fieldname === 'profilePicture') {
                                        updates['profile.profilePicture'] = value.urls;
                                    }
                                });
                            }
                            this.userService.update(userId, updates, req.get('api_key') || null).then((user) => {
                                res.status(env.api.success).json(user);
                            }).catch((err: Error) => {
                                const e = new HttpError(401, err.message);
                                next(e);
                            });
                        }).catch((err) => {
                            next(err);
                        });
                    } else {
                        this.userService.update(userId, updates, req.get('api_key') || null).then((user) => {
                            res.status(env.api.success).json(user);
                        }).catch((err: Error) => {
                            const e = new HttpError(401, err.message);
                            next(e);
                        });
                    }
                } else {
                    next(validator);
                }
            });
            req.pipe(busboy);
        } catch (err) {
            userId = req.get('api_key') ? req.query.userid : res.locals.user.sub;
            this.userService.update(userId, req.body, req.get('api_key') || null).then((user) => {
                res.status(env.api.success).json(user);
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
            // return next(err);
        }
    }

}
