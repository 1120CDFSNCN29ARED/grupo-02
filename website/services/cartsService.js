const db = require("../database/models");

const cartsService = {
  findAll: async () => {
    const result = await db.Cart.findAll({ include: ["cartItems"] }).catch(
      (error) => error
    );
    return result;
  },
  active: async () => {
    const result = await db.Cart.findAll({
      where: { active: true },
      include: ["cartItems"],
    }).catch((error) => error);
    return result;
  },
  findByPk: async (cartID) => {
    const result = await db.Cart.findByPk(cartID);
    return result;
  },
  findByUserID: async (userID) => {
    const result = db.Cart.findAll({
      where: { userID },
      include: ["cartItems"],
    });
    return result;
  },
  create: async (userID) => {
    let newCartData = {
      userID,
      status: "open",
      active: true,
    };
    const result = await db.Cart.create(newCartData);
    return result;
  },
  update: async (cartID, data) => {
    const result = await cartsService.findByPk(cartID);
    await result.update({ data }).catch((error) => error);
    await result.save().catch((error) => error);
    return result;
  },
  disable: async (cartID) => {
    const result = await cartsService.update(cartID, { active: false });
    return result;
  },
  delete: async (userID, postID) => {
    const result = await db.Cart.destroy({ where: { userID, postID } }).catch(
      (error) => error
    );
    return result;
  },
};

module.exports = cartsService;
