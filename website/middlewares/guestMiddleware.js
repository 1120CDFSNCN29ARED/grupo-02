function guestMiddleware(req,res,next) {
  if (req.session.assertUserLogged) {
    return res.redirect('/user/profile');
  }
  next();
};
module.exports = guestMiddleware;