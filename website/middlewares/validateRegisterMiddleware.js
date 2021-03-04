const { body } = require('express-validator');

function validateRegMiddleware(req, res, next) {
  let validations = [
		body("userName")
			.notEmpty()
			.withMessage("Por favor elige un nomber de usaurio"),
		body("first_name").notEmpty().withMessage("Por favor ingrese su nombre"),
		body("last_name").notEmpty().withMessage("Por favor ingrese su apellido"),
		body("id_number").notEmpty().withMessage("Por favor ingrese su DNI").bail().isInt().withMessage('POr favor ingrese un DNI válido.'),
		body("email").notEmpty().withMessage("Por favor ingrese un email").bail()
			.isEmail().withMessage("Por favor ingrese un email válido"),
		body("telephone").notEmpty()
			.withMessage("Por favor ingrese su numero de teléfono").bail().isInt().withMessage("Por favor ingrese un número de teléfono válido."),
		body("province").notEmpty().withMessage("Por favor ingrese su provincia"),
		body("city").notEmpty().withMessage("Por favor ingrese su ciudad"),
		body("neighbourhood").notEmpty().withMessage("Por favor ingrese su barrio"),
		body("postal_code")
			.notEmpty()
			.withMessage("Por favor ingrese su código postal").bail().isInt().withMessage('Por favor ingrese un Código Postal válido de 4 dígitos'),
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
	if (validations) {
		return validations;
	}
	next();
};

module.exports = validateRegMiddleware;