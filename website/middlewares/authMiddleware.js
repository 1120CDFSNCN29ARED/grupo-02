function authMiddleware(req, res, next) {
  if (!req.session.assertUserLogged) {
    return res.redirect('/users/login');    
  }
  next();
}

module.exports = authMiddleware;