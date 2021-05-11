const { Op } = require("sequelize");
const db = require("../database/models");

const usersService = {
  findAll: async () => {
    return await db.User.findAll().catch(error => error);
  },
  findByPk: async (id) => {
    return await db.User.findByPk(id).catch(error => error);
  },
  findOne: async (info) => {
    return await db.User.findOne({
			where: {
				[Op.or]: [{ userName: info }, { email: info }]
			},
    }).catch(error => error);
  },
  findOneByUserName: async (userName) => {
    return await db.User.findOne({
      where: {
        userName: userName
      }
    }).catch(error => error);
  },
  findByLocation: async (locationID) => {
    return await db.User.findAll({where: {locationID}}).catch(error=>error);
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