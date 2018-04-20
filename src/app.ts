import 'reflect-metadata';
import { banner } from './lib/banner';
import { Logger } from './lib/logger';
import { eventDispatchLoader } from './loaders/eventDispatchLoader';
import { expressLoader } from './loaders/expressLoader';
// import { graphqlLoader } from './loaders/graphqlLoader';
// import { homeLoader } from './loaders/homeLoader';
// import { iocLoader } from './loaders/iocLoader';
// import { monitorLoader } from './loaders/monitorLoader';
// import { publicLoader } from './loaders/publicLoader';
// import { swaggerLoader } from './loaders/swaggerLoader';
import { mongooseLoader } from './loaders/mongooseLoader';

const log = new Logger(__filename);
const promises: Array<() => Promise<any>> = [
    mongooseLoader,
    eventDispatchLoader,
    expressLoader,
];

const resolvePromises = (array, count) => {
    if (count < array.length) {
        array[count]().then(
            (result) => {
                log.info(result);
                count = count + 1;
                resolvePromises(array, count);
            }
        ).catch(
            (reason) => { log.error(reason); }
        );
    }
};

resolvePromises(promises, 0);

banner(log);
