import * as dotenv from 'dotenv';
import * as glob from 'glob';
import * as path from 'path';
import * as uuid from 'uuid/v4';

// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json');
import { getOsEnv, normalizePort, toBool, toNumber } from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env`) });

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        banner: toBool(getOsEnv('APP_BANNER')),
        allowedOrigins: [getOsEnv('FRONT_URL'), '127.0.0.1'],
        secret:  'holayosoyquienquieroser',
        pubkey: path.join(process.cwd(), 'keys', getOsEnv('APP_PUB_KEY')),
        sslkeypass: getOsEnv('APP_SSL_KEY_PASS'),
        sslkey: path.join(process.cwd(), 'keys', getOsEnv('APP_SSL_KEY')),
        sslcert: path.join(process.cwd(), 'keys', getOsEnv('APP_SSL_CERT')),
        socketPath: getOsEnv('APP_SOCKET_PATH'),
        dirs: {
            entities: [path.relative(path.join(process.cwd()), path.join(__dirname, 'api/**/models/*{.js,.ts}'))],
            subscribers: [path.join(__dirname, 'api/**/*Subscriber{.js,.ts}')],
            controllers: [path.join(__dirname, 'api/**/*Controller{.js,.ts}')],
            middlewares: [path.join(__dirname, 'api/**/*Middleware{.js,.ts}')],
            interceptors: [path.join(__dirname, 'api/**/*Interceptor{.js,.ts}')],
            queries: [path.join(__dirname, 'api/**/*Query{.js,.ts}')],
            mutations: [path.join(__dirname, 'api/**/*Mutation{.js,.ts}')],
            routes: [path.join(__dirname, 'api/routes/**/*{.js,.ts}')],
        },
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnv('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
    auth: {
        route: getOsEnv('AUTH_ROUTE'),
        faceClient: getOsEnv('AUTH_FACEBOOK_ID'),
        faceSecret: getOsEnv('AUTH_FACEBOOK_SECRET'),
        twitterClient: getOsEnv('AUTH_TWITTER_ID'),
        twitterSecret: getOsEnv('AUTH_TWITTER_SECRET'),
        googleClient: getOsEnv('AUTH_GOOGLE_ID'),
        googleSecret: getOsEnv('AUTH_GOOGLE_SECRET'),
        revoquedTokens: [],
    },
    db: {
        type: getOsEnv('DB_TYPE'),
        host: getOsEnv('DB_HOST'),
        port: toNumber(getOsEnv('DB_PORT')),
        username: getOsEnv('DB_USERNAME'),
        password: getOsEnv('DB_PASSWORD'),
        database: getOsEnv('DB_DATABASE'),
        query: getOsEnv('DB_QUERY'),
        salt: toNumber(getOsEnv('DB_PASSWORD_SALT')),
    },
    graphql: {
        enabled: toBool(getOsEnv('GRAPHQL_ENABLED')),
        route: getOsEnv('GRAPHQL_ROUTE'),
        editor: toBool(getOsEnv('GRAPHQL_EDITOR')),
    },
    swagger: {
        enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
        route: getOsEnv('SWAGGER_ROUTE'),
        file: getOsEnv('SWAGGER_FILE'),
        username: getOsEnv('SWAGGER_USERNAME'),
        password: getOsEnv('SWAGGER_PASSWORD'),
    },
    monitor: {
        enabled: toBool(getOsEnv('MONITOR_ENABLED')),
        route: getOsEnv('MONITOR_ROUTE'),
        username: getOsEnv('MONITOR_USERNAME'),
        password: getOsEnv('MONITOR_PASSWORD'),
    },
    api: {
        error: toNumber(getOsEnv('API_ERROR')),
        success: toNumber(getOsEnv('API_SUCCESS')),
    },
    sendgrid: {
        apikey: (getOsEnv('SENDGRID_API_KEY')),
        accounts: getOsEnv('SENDGRID_ACCOUNTS_MAIL'),
    },
    upload: {
        accessKey: getOsEnv('AMAZONS3ACCESS'),
        secretKey: getOsEnv('AMAZONS3SECRET'),
        bucket: getOsEnv('AMAZONS3BUCKET'),
        region: getOsEnv('AMAZONS3REGION'),
        apiVersion: getOsEnv('AMAZONS3APIVERSION'),
    },
    frontend: {
        url: getOsEnv('FRONT_URL'),
        password_recover: getOsEnv('FRONT_PASSWORD_RECOVER'),
    },
};
