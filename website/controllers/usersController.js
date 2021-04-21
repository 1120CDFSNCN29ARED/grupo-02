const bcryptjs = require("bcryptjs");

const localitiesService = require("../services/localitiesService");
const provincesServices = require("../services/provincesService");
const usersService = require("../services/usersService");
const userAccessService = require("../services/userAccessService");
const rolesService = require("../services/rolesService");

const controller = {
	login: (req, res) => {
		res.render("login", {});
	},
	loginProcess: (req, res) => {
		let userID = req.session.userID;
		if (req.session.userType === "admin") {
			return res.redirect("/admin/");
		}
		console.log(`Returning the ${userID}`);
		return res.redirect(`/users/profile/${userID}`);
	},
	index: async (req, res, next) => {
		const users = await usersService.findAll().catch((error) => error);
		res.render("users", { users });
	},
	profile: async (req, res, next) => {
		if (req.params.userID) {
			const userID = req.params.userID;
			const user = await usersService.findByPk(userID);
			if (user) {
				const location = await localitiesService.findByPk(user.locationID);
				console.log(location);
				if (location) {
					user.city = location.localityName;
					console.log(`Getting the location: ${user.city}`);
					const province = await provincesServices.findByPk(
						location.provinceID
					);
					if (province) {
						user.province = province.provinceName;
						console.log(user.province);
					}
				}
			}
			return res.render("userProfile", { user, action: "view" });
		}
		const user = req.session.assertUserLogged;
		res.render("userProfile", { user, action: "view" });
	},
	details: async (req, res, next) => {
		let userID = req.params.userID;
		const user = await usersService.findByPk(userID);
		res.render("userProfile", { user, action: "view" });
	},
	create: (req, res, next) => {
		res.render("register", {});
	},
	createProcess: async (req, res, next) => {
		let role = null;
		const userType = req.body.role ? req.body.role : "user";
		let newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName,
			email: req.body.email,
			telephone: req.body.telephone,
			dni: req.body.dni,
			locationID: 1,
			address: req.body.address,
			postalCode: req.body.postalCode,
			image: req.file ? req.file.filename : "no-image-found.jpeg",
		};
		let userAccess = {};
		const password = bcryptjs.hashSync(req.body.password, 10);
		const roleName = userType;
		const user = await usersService.create(newUser);


		if (!user.errors) {
			role = await rolesService.findOneByRoleName(roleName);
			//Add check if role exists.
			const roleID = role.dataValues.roleID;
			let newUserAccess = {
				userName: user.userName,
				email: user.email,
				active: user.active,
				roleID,
				password,
			};
			userAccess = await userAccessService.create(newUserAccess);
		}

		if (!user.errors && !userAccess.errors) {
			req.session.assertUserLogged = user.dataValues;
			req.session.userType = role.dataValues.roleName;
			req.session.userID = user.userID;
			console.log("session: ", req.session);
		}

		res.render("userProfile", { user: user, action: "view" });
	},
	edit: async (req, res, next) => {
		let userID = req.params.userID;
		let userToEdit = await usersService.findByPk(userID);
		if (userToEdit) {
			const location = await localitiesService.findByPk(userToEdit.locationID);
			if (location) {
				userToEdit.city = location.localityName;
				const province = await provincesServices.findByPk(location.provinceID);
				if (province) {
					userToEdit.province = province.provinceName;
				}
			}
		}
		res.render("userProfile", { user: userToEdit, action: "edit" });
	},
	update: (req, res, next) => {
		///no tengo la pantalla de Edicion armada
		res.send(`Edit USERS Not Implemented Yet.`);
	},
	destroy: async (req, res, next) => {
		//No tengo la pantalla de usuarios ni admin armado
		const userID = req.params.userID;
		const user = await usersService.findByPk(userID);
		let result = null;
		if (user) {
			result = userService.delete(userID);
		}
		//need to add in the deleting of the picture if we implement it!
		res.render("/users", { users });
	},
	logout: (req, res, next) => {
		res.clearCookie("userEmail");
		req.session.destroy();
		return res.redirect("/");
	},
};

module.exports = controller;
