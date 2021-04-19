const { body, validationResult } = require('express-validator');
const bcryptjs = require("bcryptjs");
const db = require("../database/models");
const path = require('path');

const registrationValidationRules = () => {
	return [
		body("userName")
			.notEmpty()
			.withMessage("Por favor elige un nomber de usaurio")
			.bail()
			.custom((value, { req }) => {
				return db.User.findOne({where:{userName: value}}).then(user => {
					if (user) {
					  return Promise.reject('El usuario ingresado se encuentra en uso');
					}
				})
			}),
		body("first_name")
			.notEmpty()
			.withMessage("Por favor ingrese su nombre")
			.bail()
			.isAlpha("es-ES")
			.withMessage("Por favor solo ingrese letras")
			.bail()
			.isLength({ min: 2, max: undefined })
			.withMessage("Por favor ingrese un nombre con mas de 2 caracteres"),
		body("last_name")
			.notEmpty()
			.withMessage("Por favor ingrese su apellido")
			.bail()
			.isAlpha("es-ES")
			.withMessage("Por favor solo ingrese letras")
			.bail()
			.isLength({ min: 2, max: undefined })
			.withMessage("Por favor ingrese un apellido con mas de 2 caracteres"),
		body(
			"dni",
			"Por favor ingrese su DNI valido de 8 números sin punots ni espacios"
		)
			.notEmpty()
			.withMessage()
			.bail()
			.isNumeric()
			.withMessage()
			.bail()
			.isLength({ min: 8, max: 8 })
			.withMessage(),
		body("email")
			.notEmpty()
			.withMessage("Por favor ingrese un email")
			.bail()
			.isEmail()
			.withMessage("Por favor ingrese un email válido")
			.bail()
			.custom((value, { req }) => {
				return db.User.findOne({where:{email: value}}).then(user => {
					if (user) {
					  return Promise.reject('El email ingresado se encuentra en uso');
					}
				})
			}),
		body("telephone")
			.notEmpty()
			.withMessage("Por favor ingrese su numero de teléfono")
			.bail()
			.isNumeric()
			.withMessage("Por favor ingrese un número de teléfono válido."),
		body("province")
			.notEmpty()
			.withMessage("Por favor ingrese su provincia")
			.bail()
			.isAlpha("es-ES")
			.withMessage("Por favor ingrese una provincia válida"),
		body("city")
			.notEmpty()
			.withMessage("Por favor ingrese su ciudad")
			.bail()
			.isAlpha("es-ES")
			.withMessage("Por favor ingrese una ciudad válida"),
		body("neighbourhood")
			.notEmpty()
			.withMessage("Por favor ingrese su barrio")
			.bail()
			.isAlphanumeric()
			.withMessage("Por favor ingrese un barrio válido"),
		body(
			"postal_code",
			"Por favor ingrese un Código Postal válido de 4 dígitos"
		)
			.notEmpty()
			.withMessage("Por favor ingrese su código postal")
			.bail()
			.isInt()
			.withMessage()
			.bail()
			.isLength({ min: 4, max: 4 })
			.withMessage(),
		body("address")
			.notEmpty()
			.escape()
			.withMessage("Por favor ingrese su dirección")
			.bail(),
		body("password").notEmpty().withMessage("Por favor ingrese una contraseña"),
		body("confirmPassword", "Las contraseñas ingresadas no coinciden.").custom(
			(value, { req }) => value === req.body.password
		),
		body("image").custom((value, { req }) => {
			let file = req.file;
			let acceptedExtensions = [".jpg", ".jpeg", "png", ".gif"];
			if (file) {
				let fileExtension = path.extname(file.originalname);
				if (!acceptedExtensions.includes(fileExtension)) {
					throw new Error(
						`Puede subir los siguientes tipos de imagenes: ${acceptedExtensions.join(
							", "
						)}`
					);
				}
			}
			return true;
		}),
	];
};

const registrationValidation = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		db.Role.findOne({where: {roleName: "user"}})
		.then((role) => {
			let userToCreate = {
				firstName: req.body.first_name,
				lastName: req.body.last_name,
				userName: req.body.userName,
				email: req.body.email,
				telephone: req.body.telephone,
				dni: req.body.dni,
				locationID: 1,
				address: req.body.address,
				postalCode: req.body.postal_code,
				image: req.file ? req.file.filename : "no-image-found.jpeg",
			};
			db.User.create(userToCreate)
			.then((user) => {
				console.log(user);
				let userAccess = {
					userName: user.userName,
					email: user.email,
					password: bcryptjs.hashSync(req.body.password, 10),
					roleID: role.roleID,
				}
				db.UserAccess.create(userAccess).then((userAccessData => {
					db.User.findOne({where: {userName: userAccessData.userName}}).then((user) => {
						req.session.assertUserLogged = user.dataValues;
						req.session.userType = role.role_name;
						req.session.userID = user.userID;
						console.log("session: ",req.session);
					}).then(() => {return next()})					
				}))
			})
		})
		.catch((error) => res.json("error, try again bitch!",error));		
	}
	else{
		const validationErrors = errors.mapped();
		return res.render("register", { errors: validationErrors, old: req.body});
	}	
};

module.exports = { registrationValidationRules, registrationValidation };