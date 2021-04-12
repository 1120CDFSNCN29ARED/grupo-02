const db = require("../database/models");
const { Op } = require("sequelize");
const rolesService = require("./rolesService");
const userAccessService = require('./userAccessService')

const usersService = {
  findAll: async () => {
    return await db.User.findAll().catch(error => error);
  },
  findByPk: async (id) => {
    return await db.User.findByPk(id).catch(error => error);
  },
  findAllByRoleName: async (roleName) => {
    const role = await rolesService.findByRoleName(roleName);
    const roleID = role.roleID;
    const usersWithRole = await userAccessService.findByRole(roleID);
    const users = usersWithRole;
    return users;
  }
};

module.exports = usersService;