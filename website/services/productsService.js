const db = require("../database/models");
const { Op } = require("sequelize");

const productsService = {
  findAll: async () => {
    return await db.Product.findAll().catch((error) => error);
  },
  findByPk: async (id) => {
    return await db.Product.findByPk(id).catch((error) => error);
  },
  findProductTypes: async () => {
    return await db.Product.findAll({
      attributes: ["product_type"],
      distinct: true,
    });
  },
  findByProductType: async (productType) => {
    return await db.Product.findAll({ where: { productType } });
  },
  findByBrandID: async (brandID) => {
    return await db.Product.findAll({ where: { brandID } });
  },
  findByModelID: async (modelID) => {
    return await db.Product.findAll({ where: { modelID } });
  },
  findByVehicleID: async (vehicleID) => {
    return await db.Product.findAll({ where: { vehicleID } });
  },
  findByProductID: async (partID) => {
    return await db.Product.findAll({ where: { partID } });
  },
  create: async (data) => {
    return await db.Product.create(data).catch((error) => error);
  },
  update: async (id, data) => {
    const product = await productsService.findByPk(id);
    await product.update(data).catch((error) => error);
    await product.save().catch((error) => error);
    return product;
  },
  delete: async (id) => {
    const product = await productsService.update(id, { active: false });
    return product;
  },
};

module.exports = productsService;
