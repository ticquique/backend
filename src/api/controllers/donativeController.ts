
'use strict';
import { Request, Response, NextFunction } from 'express';
import { env } from '../../env';
import { DonativeService } from '../services/DonativeService';
import { UserService } from '../services/UserService';

export class DonativeController {

    private static instance: DonativeController;
    private donativeService: DonativeService = DonativeService.getInstance();
    private userService: UserService = UserService.getInstance();
    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): DonativeController {
        if (!DonativeController.instance) {
            DonativeController.instance = new DonativeController();
        }
        return DonativeController.instance;
    }

    public createCustomer = (req: Request, res: Response, next: NextFunction): void => {
        const donativeService = this.donativeService;
        const id = req.get('api_key') ? req.body.userid : res.locals.user.sub;
        const code = req.body.code;
        // const scope = req.body.scope;
        donativeService.createCustomer(id, code).then(val => {
            res.status(env.api.success).json(val);
            next();
        }).catch(e => {
            next(e);
        });
    }
    public createCharge = (req: Request, res: Response, next: NextFunction): void => {
        const donativeService = this.donativeService;
        const account = req.body.account;
        const donate = req.body.donate ? req.body.donate : false;
        const token = req.body.token ? req.body.token : false;
        const email = req.body.email ? req.body.email : false;
        const amount = req.body.amount;
        const userId = res.locals.user ? res.locals.user.sub : null;
        if (userId) {
            this.userService.find(1, 1, {_id: userId}).then(val => {
                if (val && val.length) {
                    const userCli = val[0].profile.stripe ? val[0].profile.stripe.customer_token ? val[0].profile.stripe.customer_token : null : null;
                    donativeService.donate(account, amount, donate, token, email, userId, userCli).then(donative => {
                        res.status(env.api.success).json(donative);
                        next();
                    }).catch(e => {
                        next(e);
                    });
                } else {next(new Error('user not found')); }
            }).catch(e => next(e));
        } else {
            donativeService.donate(account, amount, donate, token, email, userId).then(val => {
                res.status(env.api.success).json(val);
                next();
            }).catch(e => {
                next(e);
            });
        }
    }
}
