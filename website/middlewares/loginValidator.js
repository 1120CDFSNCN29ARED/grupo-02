const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const User = require('../models/User');
const db = require("../database/models");
const { Op } = require("sequelize");

const loginValidationRules = () => {
	return [
		body("email")
			.notEmpty()
			.withMessage("Por favor ingrese su email")
			.bail()
			.isEmail()
			.withMessage("Por favor ingrese un email válido"),
		body("password").notEmpty().withMessage("Por favor ingrese su contraseña"),
	];
};

const loginValidation = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
    //let userToLogin = User.findUserByField('email', req.body.email);

		db.UserAccess.findOne({
				where:{
					[Op.or]: [{userName: req.body.email}, {email: req.body.email}]
				},include: [{model: db.User},{model: db.Role}]
			})
			.then((userAccess) => {
				console.log(userAccess.dataValues);
			if(bcryptjs.compareSync(req.body.password, userAccess.password)){
				db.Role.findOne({where: {roleID: userAccess.roleID}}).then((role) => {
					db.User.findOne({where:{userName: userAccess.userName}}).then((user) => {
						req.session.assertUserLogged = user;
						req.session.userType = role.role_name;
						req.session.userId = user.userID;
						if (req.body.keepLogged != undefined) {
							res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 2 });
						}
						return next();
					});					
				});
			}
		}).catch(error => res.render("login", { errors: validationErrors, old: req.body }));

	
	}
	/*
    if (userToLogin) {
      if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
        delete userToLogin.password;
				req.session.assertUserLogged = userToLogin;
				req.session.userType = userToLogin.category;
				req.session.userId = userToLogin.userID;
        if (req.body.keepLogged != undefined) {
					res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 2 });
				}
        return next();
      }
      return res.render('login', {
        errors: {
          email: {
            msg: "Las credenciales son inválidas."
          }
        }
      });
    }
    return res.render("login", {
			errors: {
				email: {
					msg: "Las credenciales son inválidas.",
				},
			},
		});
	}
	const validationErrors = errors.mapped();
	return res.render("login", { errors: validationErrors, old: req.body });*/
};

module.exports = {
	loginValidationRules,
	loginValidation,
};
