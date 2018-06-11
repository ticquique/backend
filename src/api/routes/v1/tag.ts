import * as express from 'express';
import { TagController } from '../../controllers/tagController';

const tagController = TagController.getInstance();

module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .get(tagController.find);

        if (router) { resolve(router); } else { reject(''); }
    });
};
