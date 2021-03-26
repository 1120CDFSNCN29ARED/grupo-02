const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const path = require('path');

const registrationValidationRules = () => {
	return [
		body("userName")
			.notEmpty()
			.withMessage("Por favor elige un nomber de usaurio")
			.bail()
			.custom((value, { req }) => {
				if (User.findUserByField("userName", value)) {
					throw new Error("El usuario ya se encuentre en uso");
				}
				return true;
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
			"id_number",
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
				if (User.findUserByField("email", value)) {
					throw new Error("El email ya se encuentre registrado");
				}
				return true;
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
		return next();
	}
	const validationErrors = errors.mapped();
	return res.render("register", { errors: validationErrors, old: req.body});
};

module.exports = { registrationValidationRules, registrationValidation };