const PagesController = {};

PagesController.goHome = (req, res) => {
  return res.render('signin');
}

PagesController.getLogin = (req, res) => {
  return res.render('login');
}

export default PagesController;