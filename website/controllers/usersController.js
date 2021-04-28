const bcryptjs = require("bcryptjs");
const localitiesService = require("../services/localitiesService");
const provincesServices = require("../services/provincesService");
const usersService = require("../services/usersService");
const userAccessService = require("../services/userAccessService");
const rolesService = require("../services/rolesService");
const favouritesService = require("../services/favouritesService");

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
		if (req.session.assertUserLogged) {
			let user = req.session.assertUserLogged;
			return res.render("userProfile", {
				user,
				action: "view",
			});
		}
	},
	details: async (req, res, next) => {
		let userID = req.params.userID;
		const user = getFullUser(userID);
		let provinces = await provincesServices.findAll();
		let localities = await localitiesService.findAll();
		res.render("userProfile", { user, provinces, localities, action: "view" });
	},
	create: async (req, res, next) => {
		let provinces = await provincesServices.findAll();

		res.render("register", { provinces });
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
			locationID: req.body.location,
			address: req.body.address,
			postalCode: req.body.postalCode,
			image: req.file ? req.file.filename : "no-image-found.jpeg",
		};
		let userAccess = {};
		const password = bcryptjs.hashSync(req.body.password, 10);
		const roleName = userType;
		const user = await usersService.create(newUser);
		console.log(user);

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
		res.redirect(`/users/profile/${user.userID}`);
	},
	edit: async (req, res, next) => {
		let userID = req.params.userID;
		let userToEdit = await getFullUser(userID);
		let provinces = await provincesServices.findAll();
		let localities = await localitiesService.findByProvinceID(
			userToEdit.provinceID
		);
		res.render("userProfile", {
			user: userToEdit,
			provinces: provinces,
			localities: localities,
			action: "edit",
		});
	},
	update: async (req, res, next) => {
		const userID = req.params.userID;
		let newData = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName,
			email: req.body.email,
			telephone: req.body.telephone,
			dni: req.body.dni,
			locationID: req.body.location,
			address: req.body.address,
			postalCode: req.body.postalCode,
		};

		if (req.file) {
			newData.image = req.file.filename;
		}
		
		const newAccessData = {};
		req.body.password !== ""
			? (newAccessData.password = bcryptjs.hashSync(req.body.password, 10))
			: null;
		req.body.email ? (newAccessData.email = req.body.email) : null;

		const user = await usersService.findByPk(userID);

		if (!user.errors) {
			const updatedUser = await usersService
				.update(userID, newData)
				.catch((error) => error);
			const newUserName = updatedUser.dataValues.userName;

			if (newAccessData != {}) {
				await userAccessService
					.update(newUserName, newAccessData)
					.catch((error) => error);
			}
		}
		req.session.assertUserLogged = await getFullUser(userID);
		res.redirect(`/users/profile/${userID}`);
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

//Helper Functions
const getFullUser = async (userID) => {
	const user = await usersService.findByPk(userID);
	const userAccess = await userAccessService.findOne(user.email);
	const role = await rolesService.findByPk(userAccess.roleID);
	const favourites = await favouritesService.findAll(user.userID);
	const locality = await localitiesService.findByPk(user.locationID);
	const province = await provincesServices.findByPk(locality.provinceID);

	const fullUser = {
		...user.dataValues,
		role: role.roleName,
		favourites,
		provinceID: province.provinceID,
		provinceName: province.provinceName,
		locationName: locality.localityName,
	};
	return fullUser;
};
module.exports = controller;

//Implement carts functionality - DO NOT CHANGE variable names!!!!
//Favourites (Is a nice to have for friday)
