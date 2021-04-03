const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
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
		db.UserAccess.findOne({
			where:{
				[Op.or]: [{userName: req.body.email}, {email: req.body.email}]
			},include: ["user", "role"]
		})
		.then((userAccess) => {
				
			if(bcryptjs.compareSync(req.body.password, userAccess.password)){
				req.session.assertUserLogged = userAccess.user.dataValues;
				req.session.userType = userAccess.role.role_name;
				req.session.userId = userAccess.user.userID;
				if (req.body.keepLogged != undefined) {
					res.cookie("userEmail", userAccess.email, { maxAge: (1000 * 60) * 2 });
				}
				return next();
			}
			else {
				const validationErrors = {
					email: {
					value: "",
					msg: 'El usuario y/o contraseña no son validos',
					param: 'email',
					location: 'body'
					}
				};
				res.render("login", { errors: validationErrors, old: req.body })
			}
		}).catch(error => {
			const validationErrors = {
				email: {
				  value: "",
				  msg: 'El usuario y/o contraseña no son validos',
				  param: 'email',
				  location: 'body'
				}
			  };
			
			res.render("login", { errors: validationErrors, old: req.body })
		});	
	}
	else {
		const validationErrors = errors.mapped();
		console.log(validationErrors)
		return res.render("login", { errors: validationErrors, old: req.body });
	}	
};

module.exports = {
	loginValidationRules,
	loginValidation,
};
