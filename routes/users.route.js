import { Router } from 'express';

import UsersController from '../controllers/users.controller';

const router = new Router();


//router.post('/', UsersController.insert);
router.get('/all', UsersController.list);
// router.get('/:userId', UsersController.getById);

export default router;