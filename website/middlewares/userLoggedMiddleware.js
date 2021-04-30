
const usersService = require('../services/usersService');

function userLoggedMiddleware(req, res, next) {  
  res.locals.isLogged = false;
  
  let userEmailInCookie = req.cookies.userEmail;
  
  let userFromCookie = usersService.findOne(userEmailInCookie).datavalues;
  
  if (userFromCookie) {

    req.session.assertUserLogged = getFullUser(userFromCookie);
  }

  if (req.session.assertUserLogged) {
    res.locals.isLogged = true;
    res.locals.assertUserLogged = req.session.assertUserLogged;    
  }
  
  next();

};
module.exports = userLoggedMiddleware;  