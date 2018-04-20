import { connect } from 'mongoose';
import { env } from '../env';

export const mongooseLoader = (settings?): Promise<any> => {
    return new Promise((resolve, reject) => {
        const uri = `mongodb://${env.db.username}:${env.db.password}@${env.db.host}/${env.db.database}?${env.db.query}`;
        return connect(uri, {
            config: {
                autoIndex: false,
            },
        }).then(
            (result) => { resolve(`Database loaded`); },
            (reason) => { reject (reason); }
        );
    });
};
