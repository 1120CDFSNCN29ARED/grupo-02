const db = require("../database/models");

const cartItemsService = {
	findAll: async () => {
		const result = db.CartItem.findAll().catch((error) => error);
		return result;
	},
    findByPk: async (carItemID) => {
        const result = db.CartItem.findByPk(carItemID);
        return result;
    },
	findByPostID: async (postID) => {
        const result = db.CartItem.findAll({where: {postID}});
        return result;
	},
    add: async (data) => {
        const result = await db.CartItem.create(data);
        return result;
    },
    update: async (carItemID, data) => {
        const result = await cartItemsService.findByPk(carItemID);
        await result.update({data}).catch(error => error);
        await result.save().catch(error => error);
        return result;
    },
	delete: async (cartItemID) => {
		const result = db.CartItem.destroy({ where: { cartItemID } }).catch(
			(error) => error
		);
		return result;
	},
};

module.exports = cartItemsService;
