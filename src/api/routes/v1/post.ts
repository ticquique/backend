
import * as express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { PostController } from '../../controllers/postController';
import { getPostMiddleware } from '../../validators';

module.exports = async () => {
    const postController = PostController.getInstance();
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .post(authMiddleware('basic'), postController.create)
            .get(getPostMiddleware, postController.find);

        if (router) { resolve(router); } else { reject(''); }
    });
};
