
import * as express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { PostController } from '../../controllers/postController';
import { getFeedMiddleware } from '../../validators';

module.exports = async () => {
    const postController = PostController.getInstance();
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .post(authMiddleware('basic'), postController.create)
            .get(authMiddleware('basic'), getFeedMiddleware, postController.getFeed);

        if (router) { resolve(router); } else { reject(''); }
    });
};
