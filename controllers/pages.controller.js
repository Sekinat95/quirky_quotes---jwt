const PagesController = {};

PagesController.goHome = (req, res) => {
  return res.render('signup');
}

PagesController.getLogin = (req, res) => {
  return res.render('login');
}

export default PagesController;