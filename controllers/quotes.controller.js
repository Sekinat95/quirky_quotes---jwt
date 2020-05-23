import crypto from 'crypto';

import QuotesModel from '../models/quotes.model';

const QuotesController = {};


QuotesController.insert = (req, res) => {
  QuotesModel.createUser(req.body)
  res.render('dummy', {
    content: `quote of ${req.body.author} saved in database`
  })
};

QuotesController.list = (req, res) => {
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit, 10) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page, 10);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
 QuotesModel.list(limit, page).then((result) => {
    res.status(201).render('quotes', {
      content: result
    });
  });
};

export default QuotesController;