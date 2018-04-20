'use strict';
import * as express from 'express';
import * as glob from 'glob';
import * as path from 'path';
import { env } from '../../env';
import { ErrorHandlerMiddleware } from '../middlewares/errorHandlerMiddleware';

export class Router {
    private routes: string[];
    private router: express.Router;
    constructor() {
        this.router = express.Router();
    }

    public getRouter = () => {
        return this.router;
    }

    public initialize = () => {
        return new Promise(async (resolve, reject) => {
            const routes = await this.routeSingleton();
            routes.forEach(async route => {
                const dir = `${env.app.routePrefix}/${route.replace(path.basename(route), '')}${path.parse(route).name}`;
                require(`./${route}`)().then((value) => {
                    this.router.use(dir, value);
                    this.router.use(ErrorHandlerMiddleware);
                }).catch((err) => { reject(); });
            });
            resolve();
        });
    }

    private routeSingleton = (): Promise<string[]> => {
        return new Promise<string[]>(async (resolve, reject) => {
            resolve(this.routes || (this.routes = await this.getRoutes()));
        });
    }

    private getRoutes = (): Promise<string[]> => {
        return new Promise((resolve, reject) => {
            const routes = [];
            const routePaths = env.app.dirs.routes;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < routePaths.length; i++) {
                const currentPath = routePaths[i];
                glob(currentPath, { ignore: '**/router.ts' }, (err, match) => {
                    // tslint:disable-next-line:prefer-for-of
                    for (let j = 0; j < match.length; j++) {
                        const singleRoute = match[j];
                        const way = path.relative(__dirname, singleRoute).replace(/\\/g, '/');
                        routes.push(way);
                        if (i === routePaths.length - 1 && j === match.length - 1) {
                            resolve(routes);
                        }
                    }
                });
            }
        });
    }

}
