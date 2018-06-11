// import { EventDispatcher } from 'event-dispatch';
import { IUserModel } from '../../interfaces/database';
import { UserService } from './UserService';
import { env } from '../../env';
import * as request from 'request-promise-native';
import * as Stripe from 'stripe';
export class DonativeService {

    private static instance: DonativeService;
    private userService: UserService = UserService.getInstance();
    private stripe = new Stripe('sk_test_5E2zoVkkt3usGeb0HCtF3Ril');
    // private eventDispatcher: EventDispatcher;
    private constructor() { }

    // tslint:disable-next-line:member-ordering
    public static getInstance(): DonativeService {
        if (!DonativeService.instance) {
            DonativeService.instance = new DonativeService();
        }
        return DonativeService.instance;
    }

    public createCustomer(id: string, code: string, apiKey?: string): Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            request.post('https://connect.stripe.com/oauth/token', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `client_secret=${env.payments.secretKey}&code=${code}&grant_type=authorization_code`,
                json: true,
            })
                .then(val => {
                    if (val.error) { reject(val.error_description); }
                    const updates: any = {};
                    updates['profile.stripe.stripe_user_id'] = val.stripe_user_id;
                    updates['profile.stripe.refresh_token'] = val.refresh_token;
                    updates['profile.stripe.access_token'] = val.access_token;
                    this.userService.update(id, updates, apiKey || null).then((user) => {
                        resolve(user);
                    }).catch((err: Error) => {
                        reject(err);
                    });
                }).catch(e => reject(e));
        });
    }

    // tslint:disable-next-line:max-line-length
    public donate(account: string, amount: number, donate?: boolean, token?: string, email?: string, userId?: string, userCli?: string): Promise<Stripe.charges.ICharge> {
        return new Promise<Stripe.charges.ICharge>((resolve, reject) => {
            const makeCharge = (customer) => {
                const chargeOptions: Stripe.charges.IChargeCreationOptions = {
                    amount,
                    currency: 'eur',
                    customer,
                    destination: account,
                };
                if (donate) { chargeOptions.application_fee = 0.01 * amount; }
                this.stripe.charges.create(chargeOptions).then(charge => {
                    resolve(charge);
                }).catch(e =>  reject(e));
            };
            if (userCli) {
                this.stripe.customers.retrieve(userCli, (err, customer) => {
                    if (err) { reject(err); }
                    makeCharge(customer.id);
                });
            } else if (token && email) {
                this.stripe.customers.create({
                    source: token,
                    email,
                }).then(val => {
                    if (userId) {
                        this.userService.update(userId, {'profile.stripe.customer_token': val.id}).then(user => {
                            makeCharge(val.id);
                        }).catch(e => reject(e));
                    } else {
                        makeCharge(val.id);
                    }
                });
            } else {
                reject(new Error('Invalid request'));
            }
        });
    }
}
