const bcryptjs = require("bcryptjs");
const usersService = require("../../services/usersService");
const userAccessService = require("../../services/userAccessService");
const favouritesService = require("../../services/favouritesService");
const rolesService = require("../../services/rolesService");
const localitiesService = require("../../services/localitiesService");
const provincesServices = require("../../services/provincesService");

const usersController = {
	loginProcess: async (req, res) => {
		const userID = req.session.userID;
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

		if (!user.errors) {
			const location = await localitiesService.findByPk(user.locationID);

			if (!location.errors) {
				user.dataValues.city = location.localityName;
				const province = await provincesServices.findByPk(location.provinceID);
				if (!province.errors) {
					user.dataValues.province = province.provinceName;
				}
			}

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
	byUserName: async (req, res) => {
		const user = await usersService.findOneByUserName(req.params.userName);
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};
		if (user) {
			result.data = {
				user
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
	byEmail: async (req, res) => {
		const user = await usersService.findOne(req.params.email);
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
		const role = await rolesService.findOneByRoleName(req.params.role);
		let roleID = null;
		if (!role.errors) {
			roleID = role.roleID;
		}
		const users = await usersAccessService.findAllbyRole(roleID);
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};

		if (!users.errors) {
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
	byLocation: async (req, res) => {
		const users = await usersService.findByLocation(req.params.locationID);
		const result = {
			meta: {
				url: req.originalUrl,
			}
		};

		if (!users.errors) {
			result.data = { users, };
			result.meta.status = 200;
			result.meta.count = users.length;
		} else {
			result.meta.status = 409;
			result.meta.count = 0;
			result.error = {
				status: "409",
				message: "No users were found",
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

		if (!user.errors) {
			const role = await rolesService.findOneByRoleName(roleName);
			//Add check if role exists.
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

		if (!user.errors && !userAccess.errors) {
			result.data = {
				user: user,
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
		req.body.password
			? delete newData.password : '';
		req.body.roleID
			? delete newData.roleID : '';
		//delete {password, roleID} newData
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};
		const newAccessData = {};

		req.body.password
			? (newAccessData.password = bcryptjs.hashSync(req.body.password, 10))
			: null;
		req.body.roleID ? (newAccessData.roleID = req.body.roleID) : null;
		req.body.email ? (newAccessData.email = req.body.email) : null;
		const user = await usersService.findByPk(req.params.userID);
		if (user != null) {
			const updatedUser = await usersService
				.update(req.params.userID, newData)
				.catch((error) => error);

			const newUserName = updatedUser.userName;
			
			if (newAccessData != {}) {
				const updateUserAccess = await userAccessService.update(
					newUserName,
					newAccessData
				).catch(error => error);
				
				if (!updateUserAccess.errors) {
					result.data = {
						updatedUser,
						updateUserAccess,
					};
					result.meta.status = 202;
					result.meta.count = 1;
				} else {
					result.meta.status = 400;
					result.meta.count = 0;
					result.error = {
						status: "409",
						message: `No users Updated`,
					};
				}
			} else {
				result.meta.status = 400;
				result.meta.count = 0;
				result.error = {
					status: "409",
					message: `No users Updated`,
				};
			}
		}else {
			result.meta.status = 400;
			result.meta.count = 0;
			result.error = {
				status: "409",
				message: `No users Updated`,
			};
		}
		return res.status(result.meta.status).json(result);
	},
	delete: async (req, res) => {
		const userID = req.params.userID;
		//Check if user has active posts, active cart, active favourites, active anything =>
		//If no active entities related to the user then call usersService.delete(userID) && then call usersAccessService.delete(userName);
		//If related entities are found then raise alert and obtain confirmation => proceed to set all active to false, before calling delete.
	},
	getFavourites: async (req, res) => {
		const userID = req.params.userID;
		const user = await usersService.findByPk(userID);
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};
		if (!user.errors) {
			const favourites = await favouritesService.findAll(userID);
			if (favourites) {
				result.data = {
					favourites,
				};
				result.meta.count = favourites.length;
			}
			result.meta.status = 200;
			result.meta.count = 0;
		} else {
			result.meta.status = 409;
			result.meta.count = 0;
			result.error = {
				status: "409",
				message: `User not found`,
			};
		}

		return res.status(result.meta.status).json(result);
	},
	addFavourites: async (req, res) => {
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};
		const postID = req.params.postID;
		const userID = req.params.userID;

		const user = await usersService.findByPk(userID);
		//const post = await postsService.findByPk(postID);

		if (!user.errors) {
			//add && post to condition check
			const addFavourites = await favouritesService.addFavourite(
				userID,
				postID
			);
			if (!addFavourites.errors) {
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
		} else {
			result.meta.status = 400;
			result.meta.count = 0;
			result.error = {
				status: "409",
				message: `No favourites added`,
			};
		}

		return res.status(result.meta.status).json(result);
	},
	deleteFavourites: async (req, res) => {
		const result = {
			meta: {
				url: req.originalUrl,
			},
		};
		const postID = req.params.postID;
		const userID = req.params.userID;
		//add user check && post check
		const user = await usersService.findByPk(userID);
		//const post = await postsService.findByPk(postID);

		if (!user.errors) {
			//ADD &&post to condition
			const deleteFavourites = await favouritesService.deleteFavourite(
				userID,
				postID
			);
			if (!deleteFavourites.errors) {
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
		} else {
			result.meta.status = 400;
			result.meta.count = 0;
			result.error = {
				status: "400",
				message: `No favourites deleted`,
			};
		}
		return res.status(result.meta.status).json(result);
	},
};

module.exports = usersController;
