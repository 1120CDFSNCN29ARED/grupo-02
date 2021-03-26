const User = require('../models/User');

function userLoggedMiddleware(req, res, next) {  
  res.locals.isLogged = false;
  
  let userEmailInCookie = req.cookies.userEmail;
  let userFromCookie = User.findUserByField("email", userEmailInCookie);
  
  if (userFromCookie) {
    req.session.assertUserLogged = userFromCookie;
  }

  if (req.session.assertUserLogged) {
    res.locals.isLogged = true;
    res.locals.assertUserLogged = req.session.assertUserLogged;    
  }
  
  next();

};
module.exports = userLoggedMiddleware;  