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
			if(bcryptjs.compareSync(req.body.password, userAccess.password)){
				req.session.assertUserLogged = userAccess.User.dataValues;
				req.session.userType = userAccess.Role.role_name;
				req.session.userId = userAccess.User.userID;
				if (req.body.keepLogged != undefined) {
					res.cookie("userEmail", userAccess.email, { maxAge: (1000 * 60) * 2 });
				}
				return next();
			}
			console.log(errors);
			
		}).catch(error => res.render("login", { errors, old: req.body }));	
	}
	const validationErrors = errors.mapped();
	return res.render("login", { errors: validationErrors, old: req.body });
};

module.exports = {
	loginValidationRules,
	loginValidation,
};
