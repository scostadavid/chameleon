import {Router} from 'express';
import { auth, signup } from '../middleware';
import authController from '../controller/auth';
import userController from '../controller/user';

const router: Router = Router();

router.post('/auth/signin', authController.signin);
router.post(
  '/auth/signup',
  [
    signup.isADuplicatedEmail,
    signup.isADuplicatedUsername
  ],
  authController.signup
);

router.get(
  '/users',
  [auth.isAuthenticated],
  userController.index
);

router.delete(
  '/users/:id',
  [
    auth.isAuthenticated,
    auth.isOwner
  ],
  userController.destroy
);

export {router};