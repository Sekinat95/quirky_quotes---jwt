import { Router } from 'express';
import userRouter from './users.route';
import pagesController from '../controllers/pages.controller';
import authController from '../controllers/auth.controller';

const router = Router();

//pages
router.get('', pagesController.goHome);
router.get('/login', pagesController.getLogin);

//auth
router.post('/login', authController.login)

//routes
router.use('/users', userRouter);

export default router;