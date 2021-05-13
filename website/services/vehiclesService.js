const db = require("../database/models");
const { Op } = require("sequelize");

const vehiclesService = {
  findAll: async (conditions) => {
    return await db.Vehicle.findAll({ where: conditions }).catch(
      (error) => error
    );
  },
  findByPk: async (id) => {
    return await db.Vehicle.findByPk(id).catch((error) => error);
  },
  findByVersionID: async (id) => {
    return await vehiclesService.findAll({ versionID: id });
  },
  create: async (data) => {
    return await db.Vehicle.create(data).catch((error) => error);
  },
  update: async (id, data) => {
    const vehicle = await vehiclesService.findByPk(id);
    await vehicle.update(data).catch((error) => error);
    await vehicle.save().catch((error) => error);
    return vehicle;
  },
  delete: async (id) => {
    const vehicle = await vehiclesService.update(id, { active: true });
    return vehicle;
  },
};

module.exports = vehiclesService;
