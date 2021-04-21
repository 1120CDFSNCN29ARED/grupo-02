const db = require('../database/models');
const { Op } = require("sequelize");

const imageUrlsService = {
    findAll: async () => {
        return await db.ImageUrl.findAll().catch(error => error);
    },
    findByPk: async (id) => {
        return await db.ImageUrl.findByPk(id).catch(error => error);
    },
    findByPostID: async (postID) => {
        return await db.ImageUrl.findAll({where: {postID}});
    },
    findByUserID: async (userID) => {
        return await db.ImageUrl.findAll({where: {userID}});
    },
    create: async (data) => {
        return await db.ImageUrl.create(data).catch(error => error);
    },
    update: async (id, data) => {
        const imageUrls = await imageUrlsService.findByPk(id);
        await imageUrls.update(data).catch(error => error);
        await imageUrls.save().catch(error => error);
        return imageUrls;
    },
    delete: async (imageID) => {
        const imageUrls = await db.ImageUrl.destroy({where: {imageID}}).catch(error => error);
        return imageUrls;        
    }
}

module.exports = imageUrlsService;