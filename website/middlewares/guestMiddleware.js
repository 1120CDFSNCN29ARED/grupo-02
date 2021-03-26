function guestMiddleware(req,res,next) {
  if (req.session.assertUserLogged) {
    return res.redirect('/users/profile');
  }
  next();
};
module.exports = guestMiddleware;