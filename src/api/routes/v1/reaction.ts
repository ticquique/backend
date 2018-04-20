
import * as express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { ReactionController } from '../../controllers/reactionController';

module.exports = async () => {
    const reactionController = ReactionController.getInstance();
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .post(authMiddleware('basic'), reactionController.react)
            .get(authMiddleware('basic'), reactionController.find);

        if (router) { resolve(router); } else { reject(''); }
    });
};
