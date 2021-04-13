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
    //Ask Pablo how granular and isolated we should make our services. Can we use sequlieze includes here?
    const role = await rolesService.findOneByRoleName(roleName);
    const roleID = role.roleID;
    const usersWithRole = await userAccessService.findAllByRole(roleID);
    const users = usersWithRole;
    return users;
  },
  create: async (data, roleName, password) => {
    const newUser = await db.User.create(data).catch(error => error);
    const { email, active } = newUser;
    const role = await rolesService.findOneByRoleName(roleName);
    console.log(role);
    const roleID = role.roleID;
    console.log(roleID);
    const newUserAccess = {
      email,
      active,
      roleID,
      password
    }
    console.log(newUser);
    const newUserAccessCreated = await newUser.createUserAccess(newUserAccess).catch(error => error);
    console.log(newUserAccessCreated);
    return newUser;
  },
  update: async (id, data) => {
    const user = await usersService.findByPk(id);
    await user.update(data).catch(error => error);
    await user.save().catch((error) => error);
    return user;
  }
};

module.exports = usersService;