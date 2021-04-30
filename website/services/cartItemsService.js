const { Op } = require("sequelize");
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
    findByCartID: async (cartID) => {
        const result = db.CartItem.findAll({where:{cartID}});
        return result;
    },
	findByPostID: async (postID) => {
        const result = db.CartItem.findAll({where: {postID}});
        return result;
    },
    findByCartAndItemID: async (cartID, postID) => {
        const result = db.CartItem.findAll({
            where: {
                [Op.and]: [{ cartID }, { postID }]
            }
        });
        return result;
    },
    add: async (data) => {
        const result = await db.CartItem.create(data);
        return result;
    },
    update: async (data) => {        
        const cartInfo = await cartItemsService.findByCartAndItemID(data.cartID, data.postID);
        const cartItemID = cartInfo[0].dataValues.cartItemID;
        console.log("DATA TO UPDATE: ",data);
        console.log("CARTITEMID: ", cartItemID);
        const result = await cartItemsService.findByPk(cartItemID);
        console.log("<-------------------------->");
        console.log(result);
        
        await result.update(data).catch(error => error);
        await result.save().catch(error => error);
        console.log("updatedResult");
        const updatedResult = await cartItemsService.findByPk(cartItemID);
        console.log(updatedResult);
        console.log("<-------------------------->");
        return result;
    },
	delete: async (cartItemID) => {
		/* const cartInfo = await cartItemsService.findByCartAndItemID(
			data.cartID,
			data.postID
		);
		const cartItemID = cartInfo[0].dataValues.cartItemID; */
        const result = db.CartItem.destroy({ where: { cartItemID } }).catch(
			(error) => error
		);
		return result;
	},
};

module.exports = cartItemsService;
