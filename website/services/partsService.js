const db = require('../database/models');
const { Op } = require("sequelize");

const partsService = {
    findAll: async () => {
        return await db.Part.findAll().catch(error => error);
    },
    findByPk: async (id) => {
        return await db.Part.findByPk(id).catch(error => error);
    },
    create: async (data) => {
        return await db.Part.create(data).catch(error => error);
    },
    update: async (id, data) => {
        const part = await partsService.findByPk(id);
        await part.update(data).catch(error => error);
        await part.save().catch(error => error);
        return part;
    },
    delete: async (id, confirm) => {
        const part = await partsService.findByPk(id).catch(error => error);
        const products = await part.getProducts({where: {active: true}}).catch(error => error);
        let errors = {
            message: "This part has associated ",
            status: 409,
            data: {}
        };
        if(products.length > 0){
            errors.message += "products";
            errors.data.products.push(products);
        }
        if(products.length > 0 && confirm === true){
            await part.update({active: false}).catch(error => error);
            return await part.save().catch(error => error);
        }
        else if(products.length == 0){
            await part.update({active: false}).catch(error => error);
            return await part.save().catch(error => error);
        }
        else{
            errors.message += ". Please send the confirm parameter as true"
            return errors
        }
    }
}

module.exports = partsService;