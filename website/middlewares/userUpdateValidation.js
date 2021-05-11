const { body, validationResult } = require("express-validator");
const path = require("path");
const localitiesService = require("../services/localitiesService");
const provincesServices = require("../services/provincesService");
const usersService = require("../services/usersService");

const userUpdateValidationRules = () => {
	return [
		body("userName")
			.notEmpty()
			.withMessage("Requerido")
			.bail()
			.isLength({ min: 4, max: 10 })
			.withMessage(
				"Por favor ingrese un nombre de usuario entre 4 y 10 caracteres"
			)
			.bail()
			.custom(async (value, { req }) => {
				if (value !== req.session.assertUserLogged.userName) {
					const user = await usersService
						.findOneByUserName(value)
						.catch((error) => error);
					if (user !== null) {
						return Promise.reject("El usuario ingresado se encuentra en uso");
					}
					return true;
				} else {
					return true;
				}
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
			.withMessage("Requerido")
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
				if (value !== req.session.assertUserLogged.email) {
					const user = await usersService
						.findOne(value)
						.catch((error) => error);
					if (user !== null) {
						return Promise.reject("El email ingresado se encuentra en uso");
					}
					return true;
				} else {
					return true;
				}
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
		body("postalCode", "Por favor ingrese un Código Postal válido de 4 dígitos")
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
		body("password")
			.if(body("password").notEmpty())
			.isStrongPassword({
				minLength: 8,
				minLowercase: 2,
				minUppercase: 2,
				minNumbers: 2,
				minSymbols: 2,
			})
			.withMessage(
				"Por favor incluir al menos dos Mayusculas, dos minisculas, 2 numeros y dos simbolos"
			),
		body("confirmPassword", "Las contraseñas ingresadas no coinciden.")
			.optional()
			.if(body("password").notEmpty())
			.custom((value, { req }) => value === req.body.password),
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

const userUpdateValidation = async (req, res, next) => {
	let errors = validationResult(req);
	console.log(errors);

	if (errors.isEmpty()) {
		return next();
		/* let formUserName = req.body.userName;
		let formEmail = req.body.email;
		let password = req.body.password !== "" ? req.body.password : null;
		let confirmPassword =
			req.body.confirmPassword !== "" ? req.body.confirmPassword : null; */

		/* if (req.session.assertUserLogged.userName !== formUserName) {
			const userByUserName = await usersService
				.findOneByUserName(formUserName)
				.catch((error) => error);
			console.log(
				"UserName Testing (Null shows the user does not already exist):",
				userByUserName
			);

			if (userByUserName !== null) {
				errors.push({
					value: formUserName,
					msg: "El usuario ingresado se encuentra en uso",
					param: "userName",
					location: "body",
				});
			}
		} */

		/* if (req.session.assertUserLogged.email !== formEmail) {
			const userByEmail = await usersService
				.findOne(formEmail)
				.catch((error) => error);
			console.log(
				"UserEmail Testing (Null shows the Email does not already exist):",
				userByEmail
			);
			if (userByEmail !== null) {
				errors.push({
					value: formEmail,
					msg: "El email ingresado se encuentra en uso",
					param: "email",
					location: "body",
				});
			}
		} */

		/* if (password && confirmPassword) {
			if (password !== confirmPassword) {
				errors.push({
					value: confirmPassword,
					msg: "Las constraseñas ingresadas no coinciden",
					param: "confirmPassword",
					location: "body",
				});
			}
		} */

		/* if (errors.isEmpty()) {
			return next();
		} else {
			const provinces = await provincesServices.findAll();
			const localities = await localitiesService.findAll();
			const validationErrors = errors.mapped();
			return res.render("editUser", {
				errors: validationErrors,
				old: req.body,
				provinces,
				localities,
				user: req.session.assertUserLogged,
			});
		} */
	} else {
		const provinces = await provincesServices.findAll();
		const localities = await localitiesService.findAll();
		const validationErrors = errors.mapped();
		return res.render("editUser", {
			errors: validationErrors,
			old: req.body,
			provinces,
			localities,
			user: req.session.assertUserLogged,
		});
	}
};

module.exports = { userUpdateValidationRules, userUpdateValidation };
