import * as mongoose from 'mongoose';
import * as uuid from 'uuid/v4';
import { ApiKey } from '../database/models/apiKey';
import { env } from '../env';

const uri = `mongodb://${env.db.username}:${env.db.password}@${env.db.host}/${env.db.database}?${env.db.query}`;
mongoose.connect(uri, {
    config: {
        autoIndex: false,
    },
}).then(
    (result) => {
        const key = new ApiKey({
            key_name: 'admin',
            key: uuid(),
        });
        key.save((err, product) => {
            if (err) { console.log(err); } else { console.log(product); }
        });
     },
    (reason) => { console.log(reason); }
);
