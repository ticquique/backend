import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
// import * as monitor from 'express-status-monitor';
import * as fs from 'fs';
import * as helmet from 'helmet';
import { Server, createServer } from 'https';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import * as path from 'path';
import * as sio from 'socket.io';
import { Router } from '../api/routes/router';
import { ChatService } from '../api/services/ChatService';
import { env } from '../env';
import { Logger } from '../lib/logger';

export const expressLoader = (settings?) => {
    return new Promise(async (resolve, reject) => {
        try {
            const log = new Logger(__dirname);
            const router = new Router();
            const app = express();
            const options = {
                key: fs.readFileSync(env.app.sslkey),
                cert: fs.readFileSync(env.app.sslcert),
                passphrase: env.app.sslkeypass,
            };
            const server: Server = createServer(options, app);

            const io = sio(server);
            const chatService: ChatService = ChatService.getInstance(io);
            // io.path(env.app.socketPath);
            // io.origins(env.app.allowedOrigins);
            app.use(compression());
            app.use(bodyParser.json({ type: 'application/json' }));
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(methodOverride());
            app.use(morgan(env.log.output, { stream: { write: log.http.bind(log) } }));
            app.use(cors({origin: env.app.allowedOrigins, optionsSuccessStatus: env.api.success, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}));
            app.use(helmet({hidePoweredBy: true, frameguard: true, noSniff: true }));
            app.set('views', path.join(__dirname, '../../views'));
            app.set('view engine', 'pug');
            app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));
            server.listen(env.app.port, () => { resolve(`App is running at ${env.app.schema}://${env.app.host}:${env.app.port}`); });
            // app.use(monitor());
            router.initialize().then(() => { app.use(router.getRouter()); }, () => { reject(''); }
            );
        } catch (e) {
            reject(e);
        }

        // const expressApp: Application = createExpressServer({
        //     cors: true,
        //     classTransformer: true,
        //     routePrefix: env.app.routePrefix,
        //     defaultErrorHandler: false,
        //     /**
        //      * We can add options about how routing-controllers should configure itself.
        //      * Here we specify what controllers should be registered in our express server.
        //      */
        //     controllers: env.app.dirs.controllers,
        //     middlewares: env.app.dirs.middlewares,
        //     interceptors: env.app.dirs.interceptors,

        //     /**
        //      * Authorization features
        //      */
        //     authorizationChecker: authorizationChecker(connection),
        //     currentUserChecker: currentUserChecker(connection),
        // });

        // // Run application to listen on given port
        // if (!env.isTest) {
        //     const server = expressApp.listen(env.app.port);
        //     settings.setData('express_server', server);
        // }

        // // Here we can set the data for other loaders
        // settings.setData('express_app', expressApp);
    });
};
