import * as glob from 'glob';
import { env } from '../env';

/**
 * eventDispatchLoader
 * ------------------------------
 * This loads all the created subscribers into the project, so we do not have to
 * import them manually
 */
export const eventDispatchLoader = (settings?) => {
    return new Promise((resolve, reject) => {
        const patterns = env.app.dirs.subscribers;
        patterns.forEach((pattern) => {
            glob(pattern, (err: any, files: string[]) => {
                if (err) { reject(err); }
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0, j = files.length; i < j; i++) {
                    const file = files[i];
                    require(file);
                    if (i === j - 1 ) { resolve('Event dispatch loaded'); }
                }
            });
        });
    });
};
