const { Op } = require("sequelize");
const db = require("../database/models");

const userAccessService = {
	findAll: async () => {
		return await db.UserAccess.findAll().catch((error) => error);
	},
	findByPk: async (id) => {
		return await db.UserAccess.findByPk(id).catch((error) => error);
	},
	findOne: async (email) => {
		return await db.UserAccess.findOne({
			where: {
				[Op.or]: [{ userName: email }, { email: email }]
			},
		}).catch(error => error);
	},
	findAllByRole: async (roleID) => {
		return await db.UserAccess.findAll({
			where: {
				roleID: roleID,
			},
		}).catch((error) => error);
	},
	create: async (data) => {
		return await db.UserAccess.create(data).catch((error) => error);
	},
	update: async (userName, newAccessData) => {
		console.log(newAccessData);
		const userAccess = await db.UserAccess.findOne({
			where: {
				userName: userName,
			},
		}).catch((error) => error);
		console.log(userAccess);

		return await userAccess.update(newAccessData).catch((error) => error);
	},
	delete: async (userName) => {
		const data = { active: false };
		const result = await usersAccessService.update(userName, data);
		return result;
	},
};

module.exports = userAccessService;