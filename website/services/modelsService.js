const db = require("../database/models");
const { Op } = require("sequelize");

const modelsService = {
  findAll: async (conditions) => {
    return await db.Model.findAll({
      where: conditions,
      order: [["model_name", "ASC"]],
    }).catch((error) => error);
  },
  findByProductType: async (conditions) => {
    return await modelsService
      .findAll({
        [Op.or]: conditions,
        active: true,
      })
      .catch((error) => error);
  },
  findByPk: async (id) => {
    return await db.Model.findByPk(id).catch((error) => error);
  },
  findByName: async (name) => {
    return await modelsService
      .findAll({ model_name: name, active: true })
      .catch((error) => error);
  },
  findByBrandID: async (id) => {
    return await db.Model.findAll({ brandID: id, active: true }).catch(
      (error) => error
    );
  },
  create: async (data) => {
    return await db.Model.create(data).catch((error) => error);
  },
  update: async (id, data) => {
    const model = await modelsService.findByPk(id);
    await model.update(data).catch((error) => error);
    await model.save().catch((error) => error);
    return model;
  },
  delete: async (id) => {
    const model = await modelsService.update(id, { active: false });
    return model;
  },
};

module.exports = modelsService;
