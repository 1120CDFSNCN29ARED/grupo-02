const usersService = require("../../services/usersService");
const bcryptjs = require("bcryptjs");
const userAccessService = require("../../services/userAccessService");
const favouritesService = require("../../services/favouritesService");
const rolesService = require("../../services/rolesService");

const usersController = {
	loginProcess: async (req, res) => {
		const userID = req.session.userID
		const user = await usersService.findByPk(userID);
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};
		if (user) {
			result.data = {
				user,
			};
			result.meta.status = 200;
			result.meta.count = 1;
		} else {
			result.meta.status = 409;
			result.meta.count = 0;
			result.error = {
				status: "409",
				message: `No user was found`,
			};
		}
		return res.status(result.meta.status).json(result);
	},
	all: async (req, res) => {
		const users = await usersService.findAll();
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};

		if (users) {
			result.data = {
				users,
			};
			result.meta.status = 200;
			result.meta.count = users.length;
		} else {
			result.meta.status = 409;
			result.meta.count = 0;
			result.error = {
				status: "409",
				message: `No users were found`,
			};
		}

		return res.status(result.meta.status).json(result);
	},
	byID: async (req, res) => {
		const user = await usersService.findByPk(req.params.userID);
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};

		if (user) {
			result.data = {
				user,
			};
			result.meta.status = 200;
			result.meta.count = 1;
		} else {
			result.meta.status = 409;
			result.meta.count = 0;
			result.error = {
				status: "409",
				message: `No user was found`,
			};
		}
		return res.status(result.meta.status).json(result);
	},
	byRole: async (req, res) => {
		const users = await usersService.findAllByRoleName(req.params.role);
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};

		if (users) {
			result.data = {
				users,
			};
			result.meta.status = 200;
			result.meta.count = users.length;
		} else {
			result.meta.status = 409;
			result.meta.count = 0;
			result.error = {
				status: "409",
				message: `No users were found`,
			};
		}

		return res.status(result.meta.status).json(result);
	},
	create: async (req, res) => {
		const newUser = {
			...req.body,
		};
		delete newUser.password;
		delete newUser.role;

		let userAccess = {};
		const password = bcryptjs.hashSync(req.body.password, 10);
		const roleName = req.body.role;

		const user = await usersService.create(newUser);

		if (user) {
			const role = await rolesService.findOneByRoleName(roleName);
			const roleID = role.roleID;
			let newUserAccess = {
				userName: user.userName,
				email: user.email,
				active: user.active,
				roleID,
				password,
			};
			userAccess = await userAccessService.create(newUserAccess);
		}
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};

		if (user && userAccess) {
			result.data = {
				user: user,
				userAccess: userAccess,
			};
			result.meta.status = 201;
			result.meta.count = 1;
		} else {
			result.meta.status = 400;
			result.meta.count = 0;
			result.error = {
				status: "400",
				message: `No user was created`,
			};
		}
		return res.status(result.meta.status).json(result);
	},
	update: async (req, res) => {
		const newData = {
			...req.body,
		};
		delete newData.password;
		delete newData.roleID;
		//delete {password, roleID} newData

		const newAccessData = {};
		req.body.password
			? (newAccessData.password = bcryptjs.hashSync(req.body.password, 10))
			: null;
		req.body.roleID ? (newAccessData.roleID = req.body.roleID) : null;

		const result = await usersService
			.update(req.params.userID, newData)
			.catch((error) => error);

		const newUserName = result.userName;
		if (newAccessData != {}) {
			console.log("Updating the UserAcess Logs");
			const updateUserAccess = await userAccessService.update(
				newUserName,
				newAccessData
			);
		}
		return res.status(202).json(result);
	},
	delete: async (req, res) => {
		const userID = req.params.userID;
		//Check if user has active posts, active cart, active favourites, active anything =>
		//If no active entities related to the user then call usersService.delete(userID) && then call usersAccessService.delete(userName);
		//If related entities are found then raise alert and obtain confirmation => proceed to set all active to false, before calling delete.
	},
	getFavourites: async (req, res) => {
		const userID = req.params.userID;
		const favourites = await favouritesService.findAll(userID);
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};
		if (favourites) {
			result.data = {
				favourites,
			};
			result.meta.status = 200;
			result.meta.count = favourites.length;
		} else {
			result.meta.status = 409;
			result.meta.count = 0;
			result.error = {
				status: "409",
				message: `No favourites found`,
			};
		}
		return res.status(result.meta.status).json(result);
	},
	updateFavourites: async (req, res) => {
		const event = req.params.event;
		const postID = req.params.postID;
		const userID = req.params.userID;
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};
		if (event == "add") {
			const addFavourites = await favouritesService.addFavourite(
				userID,
				postID
			);
			if (addFavourites) {
				result.data = {
					addFavourites,
				};
				result.meta.status = 201;
				result.meta.count = 1;
			} else {
				result.meta.status = 400;
				result.meta.count = 0;
				result.error = {
					status: "409",
					message: `No favourites added`,
				};
			}
			return res.status(result.meta.status).json(result);
		}
		if (event == "delete") {
			const deleteFavourites = await favouritesService.deleteFavourite(
				userID,
				postID
			);
			if (deleteFavourites) {
				result.data = {
					deleteFavourites,
				};
				result.meta.status = 204;
				result.meta.count = 1;
			} else {
				result.meta.status = 400;
				result.meta.count = 0;
				result.error = {
					status: "400",
					message: `No favourites deleted`,
				};
			}
			return res.status(result.meta.status).json(result);
		}
	},
};

module.exports = usersController;
