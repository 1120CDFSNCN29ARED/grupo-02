//REFACTOR so as not to cross services!!!!
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
    const role = await rolesService.findOneByRoleName(roleName);
    const roleID = role.roleID;
    return await userAccessService.findAllByRole(roleID);
  },
  create: async (data) => {
    const result = await db.User.create(data).catch(error => error);
    return result;
  },
  update: async (id, data) => {
    const result = await usersService.findByPk(id);
    await result.update(data).catch(error => error);
    return await result.save().catch((error) => error);
  },
  delete: async (userID) => {
    const data = { active: false };
    return await usersService.update(userID, data);
  }
};

module.exports = usersService;