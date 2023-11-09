import {Router} from 'express';
import authController from '../controller/auth';

const router: Router = Router();

router.post('/auth/signin', authController.signin);
router.post('/auth/signup', authController.signup);

export {router};