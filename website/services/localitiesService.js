const db = require('../database/models');
const { Op } = require("sequelize");

const localitiesService = {
    findAll: async () => {
        return await db.Locality.findAll({order: [["locality_name","ASC"]]}).catch(error => error);
    },
    findByPk: async (id) => {
        return await db.Locality.findByPk(id).catch(error => error);
    },
    findByName: async (name) => {
        return await db.Locality.findAll({
            where: {
                locality_name:{
                    [Op.substring]: name
                }
            }
        }).catch(error => error);
    },
    create: async (data) => {
        const locality = await db.Locality.create(data).catch(error => error);
        return locality;
    },
    update: async (id, data) => {
        const locality = await localitiesService.findByPk(id);
        await locality.update(data).catch(error => error);
        await locality.save().catch(error => error);
        return locality;
    },
    delete: async (id, confirm) => {
        const locality = await localitiesService.findByPk(id).catch(error => error);
        const users = await brand.getUsers().catch(error => error);
        const products = await brand.getProducts().catch(error => error);
        let errors = {
            message: "This brand has associated ",
            status: 409,
            data: {}
        };
        if(models.length > 0){
            errors.message += "models";
            errors.data.models.push(models);
        }
        if(products.length > 0 && models.length > 0){
            errors.message += " and products";
            errors.data.products.push(products);
        }
        else if(products.length > 0){
            errors.message += "products";
            errors.data.products.push(products);
        }
        if((models.length > 0 || products.length > 0) && confirm === true){
            await brand.update({active: false});
            return await brand.save().catch(error => error);
        }
        else if((models.length == 0 && products.length == 0)){
            await brand.update({active: false});
            return await brand.save().catch(error => error);
        }
        else{
            errors.message += ". Please send the confirm parameter as true"
            return errors
        }
    }
}

module.exports = localitiesService;