const db = require("../database/models");
const { Op } = require("sequelize");

const provincesServices = {
  findAll: async (conditions) => {
    return await db.Province.findAll({
      where: conditions,
      order: [["province_name", "ASC"]],
    }).catch((error) => error);
  },
  findByPk: async (id) => {
    return await db.Province.findByPk(id).catch((error) => error);
  },
  findByName: async (name) => {
    return await provincesServices
      .findAll({
        province_name: {
          [Op.substring]: name,
        },
        active: true,
      })
      .catch((error) => error);
  },
  findOneByName: async (name) => {
    return await db.Province.findOne({
      where: {
        province_name: name,
        active: true,
      },
    }).catch((error) => error);
  },
  create: async (data) => {
    const province = await db.Province.create(data).catch((error) => error);
    return province;
  },
  update: async (id, data) => {
    const province = await provincesServices.findByPk(id);
    await province.update(data).catch((error) => error);
    await province.save().catch((error) => error);
    return province;
  },
  delete: async (id) => {
    const province = provincesServices.update(id, { active: false });
    return province;
  },
};

module.exports = provincesServices;
