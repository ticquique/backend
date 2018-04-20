import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { env } from '../../env';
import { IUserModel } from '../../interfaces/database';

export interface AuthToken {
    sub: string;
    privileges: string;
    role: string;
    iat: number;
    exp: number;
}

export class AuthService {

    private static instance: AuthService;
    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public createToken = (user: IUserModel): string => {
        const payload: AuthToken = {
            // iss: 'my.domain.com',
            sub: user._id,
            privileges: user.privileges,
            role: user.role,
            iat: moment().unix(),
            exp: moment().add(7, 'days').unix(),
        };
        const secretOrKey = env.app.secret;
        const token = jwt.sign(payload, secretOrKey, { algorithm: 'HS256' });
        return token;
    }

    public validateToken = (token: string): Promise<AuthToken> => {
        return new Promise((resolve, reject) => {
            if (typeof token === 'string') {
                const parts = token.split(' ');
                if (parts.length === 2) {
                    const scheme = parts[0];
                    const credentials = parts[1];
                    if (/^Bearer$/i.test(scheme)) {
                        jwt.verify(credentials, env.app.secret, { algorithms: ['HS256'] }, (err, decoded: AuthToken) => {
                            if (err) { reject(err.message); } else {
                                if (env.auth.revoquedTokens.indexOf(decoded.sub) > -1) {
                                    reject(new Error('User banned for some reason, check your email'));
                                } else { resolve(decoded); }
                            }
                        });
                    } else { reject(new Error('Format is Authorization: Bearer [token]')); }
                } else { reject(new Error('Invalid credentials')); }
            } else {
                reject(new Error('Invalid token provided'));
            }
        });
    }
}
