const db = require("../database/models");
const { Op } = require("sequelize");

const localitiesService = {
  findAll: async (conditions) => {
    return await db.Locality.findAll({
      where: conditions,
      order: [["locality_name", "ASC"]],
    }).catch((error) => error);
  },
  findByPk: async (id) => {
    return await db.Locality.findByPk(id).catch((error) => error);
  },
  findByName: async (name) => {
    return await localitiesService
      .findAll({
        locality_name: {
          [Op.substring]: name,
        },
        active: true,
      })
      .catch((error) => error);
  },
  findOneByName: async (name) => {
    return await db.Locality.findOne({
      where: {
        locality_name: name,
      },
    }).catch((error) => error);
  },
  findByProvinceID: async (provinceID) => {
    return await localitiesService
      .findAll({ provinceID })
      .catch((error) => error);
  },
  create: async (data) => {
    const locality = await db.Locality.create(data).catch((error) => error);
    return locality;
  },
  update: async (id, data) => {
    const locality = await localitiesService.findByPk(id);
    await locality.update(data).catch((error) => error);
    await locality.save().catch((error) => error);
    return locality;
  },
  delete: async (id) => {
    const locality = await localitiesService.update(id, { active: false });
    return locality;
  },
};

module.exports = localitiesService;
