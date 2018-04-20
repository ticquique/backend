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

export class UserController {

    private static instance: UserController;
    private userService: UserService = UserService.getInstance();
    private authService: AuthService = AuthService.getInstance();
    private constructor() {}
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

}
