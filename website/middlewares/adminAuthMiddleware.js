//Check if user logged in and if admin....
//IF not logged in then show login screen
//IF not admin then on login redirect to profile and show message that they are not admin? OR do not let them login to the admin site?
function adminAuthMiddleware(req, res, next) {  
	if (!req.session.assertUserLogged) {
		return res.redirect("/users/login");
  }
  if (req.session.userType !== 'admin') {
    return res.send("No tenes los permisos para acceder a esta pagina");
  }
	next();
}

module.exports = adminAuthMiddleware;