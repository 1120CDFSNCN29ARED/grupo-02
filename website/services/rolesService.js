const db = require("../database/models");
const { Op } = require("sequelize");

const rolesService = {
	findAll: async () => {
		return await db.Role.findAll().catch((error) => error);
	},
	findByPk: async (roleID) => {
		return await db.Role.findByPk(roleID).catch((error) => error);
	},
	findOneByRoleName: async (roleName) => {
		return await db.Role.findOne({
			where: {
				role_name: roleName,
			},
		}).catch((error) => error);
	},
  findAllByRoleName: async (roleName) =>{
    return await db.Role.findAll({
      where: {
        role_name: {
          [Op.substring]: roleName
        }
      }
    }).catch((error => error));
  }
};

module.exports = rolesService;