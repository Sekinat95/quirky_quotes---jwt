import crypto from 'crypto';

import UsersModel from '../models/users.model';

const UsersController = {};


UsersController.insert = (req, res) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
  req.body.password = `${salt}$${hash}`;
  UsersModel.createUser(req.body)
  res.render('home', {
    content: `welcome ${req.body.name}`
  })
};

UsersController.list = (req, res) => {
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit, 10) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page, 10);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  UsersModel.list(limit, page).then((result) => {
    res.status(201).send(result);
  });
};

UsersController.getById = (req, res) => {
  UsersModel.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};



export default UsersController;
