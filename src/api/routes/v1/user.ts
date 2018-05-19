
import * as express from 'express';
import { UserController } from '../../controllers/userController';
import { authMiddleware } from '../../middlewares/authMiddleware';
// tslint:disable-next-line:max-line-length
import { createUserMiddleware, deleteRegistryMiddleware, deleteUserMiddleware, getTokenMiddleware, listUsersMiddleware, listValidsMiddleware, registerUserMiddleware, updateUserMiddleware, validateRegisterMiddleware, updatePasswordMiddleware } from '../../validators';

const userController = UserController.getInstance();

module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .get(listUsersMiddleware, userController.find)
            .post(authMiddleware('admin'), createUserMiddleware, userController.create)
            .put(authMiddleware('basic'), updatePasswordMiddleware, userController.updatePassword)
            .patch(authMiddleware('basic'), updateUserMiddleware, userController.updateUser)
            .delete(authMiddleware('basic'), deleteUserMiddleware, userController.deleteUser);

        router.route('/registry')
            .post(registerUserMiddleware, userController.register);

        router.route('/validation')
            .get(authMiddleware('admin'), listValidsMiddleware, userController.findValids)
            .post(validateRegisterMiddleware, userController.validate)
            .delete(authMiddleware('admin'), deleteRegistryMiddleware, userController.deleteValid);

        router.route('/auth')
            .post(getTokenMiddleware, userController.getAuthentication)
            .get(authMiddleware('basic'), (req, res, next) => { res.json(true); });

        if (router) { resolve(router); } else { reject(''); }
    });
};
