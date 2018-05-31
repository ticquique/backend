
import * as express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { CommentController } from '../../controllers/commentController';
import { getCommentMiddleware, createCommentMiddleware } from '../../validators/joi/comment';

module.exports = async () => {
    const commentController = CommentController.getInstance();
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .get(getCommentMiddleware, commentController.find)
            .post(authMiddleware('basic'), createCommentMiddleware, commentController.newComment);

        if (router) { resolve(router); } else { reject(''); }
    });
};
