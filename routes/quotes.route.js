import { Router } from 'express';

import QuotesController from '../controllers/quotes.controller';

const router = new Router();


router.post('/', QuotesController.insert);
router.get('/all',QuotesController.list);


export default router;