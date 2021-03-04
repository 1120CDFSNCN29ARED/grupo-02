const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const path = require('path');

/* No me funciona cuando no encuentre que el userName o email ya existe - tire un error de valro invalido que es el mesnaje de rror por default. */
const registrationValidationRules = () => {
	return [
		body("userName")
			.notEmpty()
			.withMessage("Por favor elige un nomber de usaurio").bail()/* .custom((value, { req }) => {
				if(User.findUserByField("userName", value)){ 
					throw new Error('El usuario ya se encuentre en uso');
				}
			}) */,
		body("first_name").notEmpty().withMessage("Por favor ingrese su nombre"),
		body("last_name").notEmpty().withMessage("Por favor ingrese su apellido"),
		body("id_number")
			.notEmpty()
			.withMessage("Por favor ingrese su DNI")
			.bail()
			.isInt()
			.withMessage("Por favor ingrese un DNI válido."),
		body("email")
			.notEmpty()
			.withMessage("Por favor ingrese un email")
			.bail()
			.isEmail()
			.withMessage("Por favor ingrese un email válido").bail()/* .custom((value, { req }) => {
				if(User.findUserByField("email", value)){
						throw new Error('El email ya se encuentre registrado');
					}
				}) */,
		body("telephone")
			.notEmpty()
			.withMessage("Por favor ingrese su numero de teléfono")
			.bail()
			.isInt()
			.withMessage("Por favor ingrese un número de teléfono válido."),
		body("province").notEmpty().withMessage("Por favor ingrese su provincia"),
		body("city").notEmpty().withMessage("Por favor ingrese su ciudad"),
		body("neighbourhood").notEmpty().withMessage("Por favor ingrese su barrio"),
		body("postal_code")
			.notEmpty()
			.withMessage("Por favor ingrese su código postal")
			.bail()
			.isInt()
			.withMessage("Por favor ingrese un Código Postal válido de 4 dígitos"),
		body("password").notEmpty().withMessage("Por favor ingrese una contraseña"),
		body("confirmPassword", "Las contraseñas ingresadas no coinciden.").custom(
			(value, { req }) => value === req.body.password
		),
		body("image").custom((value, { req }) => {
			let file = req.file;
			let acceptedExtensions = [".jpg", ".jpeg", "png", ".gif"];
			if (!file) {
				throw new Error("Por favor subir una imagen");
			} else {
				let fileExtension = path.extname(file.originalname);
				if (!acceptedExtensions.includes(fileExtension)) {
					throw new Error(
						`Las extensiones de archvo permitido son: ${acceptedExtensions.join(
							", "
						)}`
					);
				}
			}
			return true;
		}),
	];
};

const validation = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const validationErrors = errors.mapped();
	return res.render("register", { errors: validationErrors, old: req.body });
};

module.exports = { registrationValidationRules, validation };