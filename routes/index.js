import { Router } from 'express';
import userRouter from './users.route';
import pagesController from '../controllers/pages.controller';
import authController from '../controllers/auth.controller';
import quotesRouter from './quotes.route';

const router = Router();

//pages
router.get('', pagesController.goHome);
router.get('/login', pagesController.getLogin);
router.get('/signup', pagesController.goHome);

//auth
router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.delete('/logout', authController.logout)
//routes
router.use('/users', userRouter);
router.use('/quotes', quotesRouter);


export default router;