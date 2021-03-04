const User = require('../models/User');

function userLoggedMiddleware(req, res, next) {  
  res.locals.isLogged = false;
  
  let userEmailInCookie = req.cookies.userEmail;
  let userFromCookie = User.findUserByField("email", userEmailInCookie);
  
  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;    
  }
  
  next();

};
module.exports = userLoggedMiddleware;  