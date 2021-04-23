const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const usersService = require('../services/usersService.js');
const userAccessService = require('../services/userAccessService.js');
const getFullUser = require("./getFullUser.js");

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

const loginValidation = async (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		try {
			const email = req.body.email;
			const result = await userAccessService.findOne(email);
			const userAccess = result.dataValues;
			let fullUser = {};
			if(bcryptjs.compareSync(req.body.password, userAccess.password)){
				const user = await usersService.findOne(email);
				fullUser = await getFullUser(user);
				req.session.assertUserLogged = fullUser;
				req.session.userType = fullUser.roleName;
				req.session.userID = fullUser.userID;

				if (req.body.keepLogged != undefined) {
					res.cookie("userEmail", user.email, { maxAge: (1000 * 60) * 2 });
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
		} catch (error) {
			const validationErrors = {
				email: {
					value: "",
					msg: 'El usuario y/o contraseña no son validos',
					param: 'email',
					location: 'body'
				}
			  };
			
			res.render("login", { errors: validationErrors, old: req.body })
		};
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
