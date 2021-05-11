const db = require("../database/models");
const { Op } = require("sequelize");

const postsService = {
  findAll: async (conditions) => {
    return await db.Post.findAll({
      where: conditions,
      order: [["price", "ASC"]],
    }).catch((error) => error);
  },
  findByPk: async (id) => {
    return await db.Post.findByPk(id).catch((error) => error);
  },
  published: async () => {
    return await postsService.findAll({ published: true, active: true });
  },
  onSale: async () => {
    return await postsService.findAll({
      onSale: true,
      published: true,
      active: true,
    });
  },
  findBySellerID: async (sellerID) => {
    return await postsService.findAll({
      sellerID,
      published: true,
      active: true,
    });
  },
  findByLocalityID: async (localityID) => {
    return await postsService.findAll({
      locationID: localityID,
      published: true,
      active: true,
    });
  },
  create: async (data) => {
    return await db.Post.create(data).catch((error) => error);
  },
  update: async (id, data) => {
    const post = await postsService.findByPk(id);
    await post.update(data).catch((error) => error);
    await post.save().catch((error) => error);
    return post;
  },
  delete: async (id) => {
    const post = await postsService.update(id, { active: false });
    return post;
  },
};

module.exports = postsService;
