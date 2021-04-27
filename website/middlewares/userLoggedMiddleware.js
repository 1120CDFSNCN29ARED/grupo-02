
const usersService = require('../services/usersService');

function userLoggedMiddleware(req, res, next) {  
  res.locals.isLogged = false;
  
  let userEmailInCookie = req.cookies.userEmail;
  //let userFromCookie = User.findUserByField("email", userEmailInCookie); //Fue la forma con models de hacer la llamada.
  let userFromCookie = usersService.findOne(userEmailInCookie).datavalues;
  //let userFromCookie = getFullUser(userEmailInCookie); //=> No funcion aporque llamo este middleware en app.use!!!
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