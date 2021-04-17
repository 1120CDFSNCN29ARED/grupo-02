const db = require("../database/models");

const favouritesService = {
	findAll: async (userID) => {
		const result = db.Favourite.findAll({
			where: { userID },
		}).catch((error) => error);

		return result;
	},
	addFavourite: async (userID, postID) => {
    const result = db.Favourite.create({ userID:userID, postID:postID }).catch((error) => error);

		return result;
	},
	deleteFavourite: async (userID, postID) => {
		const result = db.Favourite.destroy({ where: { userID, postID } }).catch(
			(error) => error
		);

		return result;
	},
};

module.exports = favouritesService;
