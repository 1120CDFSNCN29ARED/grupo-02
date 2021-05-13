const db = require("../database/models");

const favouritesService = {
  findAll: async (userID) => {
    const result = await db.Favourite.findAll({
      where: { userID },
    }).catch((error) => error);

    return result;
  },
  findByUserAndPost: async (userID, postID) => {
    const result = await db.Favourite.findOne({ where: { userID, postID } });
    return result;
  },
  findByUser: async (userID) => {
    const result = await db.Favourite.findAll({ where: { userID } });
    return result;
  },
  findByPost: async (postID) => {
    const result = await db.Favourite.findAll({ where: { postID } });
    return result;
  },
  add: async (userID, postID) => {
    const result = await db.Favourite.create({
      userID: userID,
      postID: postID,
    }).catch((error) => error);

    return result;
  },
  delete: async (favouriteID) => {
    const result = await db.Favourite.destroy({ where: { favouriteID } }).catch(
      (error) => error
    );

    return result;
  },
};

module.exports = favouritesService;
