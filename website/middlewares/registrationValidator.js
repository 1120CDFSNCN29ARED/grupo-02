const { body, validationResult } = require('express-validator');
const path = require('path');
const provincesServices = require('../services/provincesService');
const usersService = require('../services/usersService');

const registrationValidationRules = () => {
	return [
		body("userName")
			.notEmpty()
			.withMessage("Por favor elige un nomber de usaurio")
			.bail()
			.custom(async (value, { req }) => {
				const user = await usersService.findOneByUserName(value).catch(error => error);
				console.log("UserName Testing (Null shows the user does not already exist):", user);
				if (user!==null) {
					return Promise.reject("El usuario ingresado se encuentra en uso");
				}
				return user;
			}),
		body("firstName")
			.notEmpty()
			.withMessage("Por favor ingrese su nombre")
			.bail()
			.isAlpha("es-ES")
			.withMessage("Por favor solo ingrese letras")
			.bail()
			.isLength({ min: 2, max: undefined })
			.withMessage("Por favor ingrese un nombre con mas de 2 caracteres"),
		body("lastName")
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
			"Por favor ingrese su DNI valido de 8 números sin puntos ni espacios"
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
			.custom(async (value, { req }) => {
				const user = await usersService.findOne(value).catch(error => error);
				console.log("Email Error Testing: ", user);
				if (user!==null) {
					return Promise.reject("El email ingresado se encuentra en uso");
				}
				return user;
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
			.isNumeric()
			.withMessage("Por favor ingrese una provincia válida"),
		body("location")
			.notEmpty()
			.withMessage("Por favor ingrese su ciudad")
			.bail()
			.isNumeric()
			.withMessage("Por favor ingrese una ciudad válida"),
		body(
			"postalCode",
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

const registrationValidation = async (req, res, next) => {
	const errors = validationResult(req);
	console.log(errors)
	if (errors.isEmpty()) {
		return next();
	} else {
		let provinces = await provincesServices.findAll();
		const validationErrors = errors.mapped();
		return res.render("register", { errors: validationErrors, old: req.body, provinces });
	}
};

module.exports = { registrationValidationRules, registrationValidation };