const db = require("../database/models");
const { Op } = require("sequelize");


const userAccessService = {
  findAll: async () => {
    return await db.UserAccess.findAll().catch(error => error);
  },
  findByPk: async (id) => {
    return await db.UserAccess.findByPk(id).catch(error => error);
  },
  findAllByRole: async (roleID) => {
    return await db.UserAccess.findAll({
			where: {
				roleID: roleID,
			},
		}).catch((error) => error);
  },
  create: async (data) => {
    return await db.UserAccess.create(data).check(error => error);
  }
};

module.exports = userAccessService;