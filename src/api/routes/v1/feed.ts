
import * as express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { PostController } from '../../controllers/postController';
import { getFeedMiddleware } from '../../validators';

module.exports = async () => {
    const postController = PostController.getInstance();
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .get(authMiddleware('basic'), getFeedMiddleware, postController.getFeed);
        router.route('/prev')
            .get(authMiddleware('basic'), getFeedMiddleware, postController.getPreviousActions);

        if (router) { resolve(router); } else { reject(''); }
    });
};
