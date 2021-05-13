const db = require("../database/models");
const { Op } = require("sequelize");

const partsService = {
  findAll: async (conditions) => {
    return await db.Part.findAll({ where: conditions }).catch((error) => error);
  },
  findByPk: async (id) => {
    return await db.Part.findByPk(id).catch((error) => error);
  },
  create: async (data) => {
    return await db.Part.create(data).catch((error) => error);
  },
  update: async (id, data) => {
    const part = await partsService.findByPk(id);
    await part.update(data).catch((error) => error);
    await part.save().catch((error) => error);
    return part;
  },
  delete: async (id) => {
    const part = await partsService.update(id, { active: false });
    return part;
  },
};

module.exports = partsService;
