
import * as express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { ReactionController } from '../../controllers/reactionController';
import { createReactionMiddleware, getReactionMiddleware } from '../../validators/joi/reaction';

module.exports = async () => {
    const reactionController = ReactionController.getInstance();
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .post(authMiddleware('basic'), createReactionMiddleware, reactionController.react)
            .get(getReactionMiddleware, reactionController.find);

        if (router) { resolve(router); } else { reject(''); }
    });
};
