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
    const usersWithRole = await userAccessService.findAllByRole(roleID);
    const users = usersWithRole;
    return users;
  },
  create: async (data, roleName, password) => {
    const newUser = await db.User.create(data).catch(error => error);
    const { userName, email, active } = newUser;
    const role = await rolesService.findOneByRoleName(roleName);
    const roleID = role.roleID;
    const newUserAccess = {
      userName,
      email,
      active,
      roleID,
      password
    }
    const newUserAccessCreated = await userAccessService.create(newUserAccess);
    const created = { newUser, newUserAccessCreated };
    return created;
  },
  update: async (id, data) => {
    const result = await usersService.findByPk(id);
    await result.update(data).catch(error => error);
    await result.save().catch((error) => error);
    return result;
  },
  delete: async (userID) => {
    const data = { active: false };
    const result = await usersService.update(userID, data);
    return result;
  }
};

module.exports = usersService;