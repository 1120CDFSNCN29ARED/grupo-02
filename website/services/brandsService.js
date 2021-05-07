const db = require("../database/models");
const { Op } = require("sequelize");

const brandsService = {
  findAll: async () => {
    return await db.Brand.findAll({ order: [["brand_name", "ASC"]] }).catch(
      (error) => error
    );
  },
  findByProductType: async (conditions) => {
    return await db.Brand.findAll({
      where: {
        [Op.or]: conditions,
      },
      order: [["brand_name", "ASC"]],
    }).catch((error) => error);
  },
  findByPk: async (id) => {
    return await db.Brand.findByPk(id).catch((error) => error);
  },
  findByName: async (name) => {
    return await db.Brand.findAll({
      where: {
        brand_name: {
          [Op.substring]: name,
        },
      },
    }).catch((error) => error);
  },
  create: async (data) => {
    const brand = await db.Brand.create(data).catch((error) => error);
    return brand;
  },
  update: async (id, data) => {
    const brand = await brandsService.findByPk(id);
    await brand.update(data).catch((error) => error);
    await brand.save().catch((error) => error);
    return brand;
  },
  delete: async (id) => {
    const brand = await brandsService.update(id, { active: false });
    return brand;
  },
};

module.exports = brandsService;
