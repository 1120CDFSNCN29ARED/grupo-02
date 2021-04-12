const db = require("../database/models");
const { Op } = require("sequelize");
const rolesService = require("./rolesService");

const userAccessService = {
  findAll: async () => {
    return await db.UserAccess.findAll().catch(error => error);
  },
  findByPk: async (id) => {
    return await db.UserAccess.findByPk(id).catch(error => error);
  },
  findByRole: async (roleID) => {
    return await db.UserAccess.findAll({
			where: {
				roleID: roleID,
			},
		}).catch((error) => error);
  },
};

module.exports = userAccessService;