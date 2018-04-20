import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import * as passport from 'passport';
import passportFacebook from 'passport-facebook';
import passportGoogle from 'passport-google-oauth';
import passportLocal from 'passport-local';
import passportTwitter from 'passport-twitter';
import { User } from '../database/models/user';
import { env } from '../env';
import { IUserModel } from '../interfaces/database';

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const TwitterStrategy = passportTwitter.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

/**
 * Sign in using Email and Password.
 */

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user: IUserModel) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        if (user.comparePassword(password)) {
            return done(undefined, user);
        } else {
            return done(undefined, false, { message: 'Invalid email or password.' });
        }
    });
}));

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
    clientID: env.auth.faceClient,
    clientSecret: env.auth.faceSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true,
}, (req: any, accessToken, refreshToken, profile, done) => {
    if (req.user) {
        User.findOne({ facebook: profile.id }, (err, existingUser) => {
            if (err) { return done(err); }
            if (existingUser) {
                req.flash('errors', {
                    // tslint:disable-next-line:max-line-length
                    msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.',
                });
                done(err);
            } else {
                User.findById(req.user.id, (error, user: any) => {
                    if (error) { return done(error); }
                    user.facebook = profile.id;
                    user.tokens.push({ kind: 'facebook', accessToken });
                    user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
                    user.profile.gender = user.profile.gender || profile._json.gender;
                    user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
                    user.save((errno: Error) => {
                        req.flash('info', { msg: 'Facebook account has been linked.' });
                        done(errno, user);
                    });
                });
            }
        });
    } else {
        User.findOne({ facebook: profile.id }, (err, existingUser) => {
            if (err) { return done(err); }
            if (existingUser) {
                return done(undefined, existingUser);
            }
            User.findOne({ email: profile._json.email }, (error, existingEmailUser) => {
                if (error) { return done(error); }
                if (existingEmailUser) {
                    req.flash('errors', {
                        // tslint:disable-next-line:max-line-length
                        msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.',
                    });
                    done(error);
                } else {
                    const user: any = new User();
                    user.email = profile._json.email;
                    user.facebook = profile.id;
                    user.tokens.push({ kind: 'facebook', accessToken });
                    user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
                    user.profile.gender = profile._json.gender;
                    user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
                    user.profile.location = (profile._json.location) ? profile._json.location.name : '';
                    user.save((errno: Error) => {
                        done(errno, user);
                    });
                }
            });
        });
    }
}));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split('/').slice(-1)[0];

    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};
