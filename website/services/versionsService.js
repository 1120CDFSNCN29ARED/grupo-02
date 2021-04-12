const db = require('../database/models');
const { Op } = require("sequelize");

const versionsService = {
    findAll: async () => {
        return await db.VehicleVersion.findAll({order: [["version_name","ASC"]]}).catch(error => error);
    },
    findByPk: async (id) => {
        return await db.VehicleVersion.findByPk(id).catch(error => error);
    },
    findByName: async (name) => {
        return await db.VehicleVersion.findAll({where: {model_name: name}}).catch(error => error);
    },
    findByBrandID: async (id) => {
        return await db.VehicleVersion.findAll({where: {brandID: id}}).catch(error => error);
    },
    findByModelID: async (id) => {
        return await db.VehicleVersion.findAll({where: {modelID: id}}).catch(error => error);
    },
    create: async (data) => {
        return await db.VehicleVersion.create(data).catch(error => error);
    },
    update: async (id, data) => {
        const version = await versionsService.findByPk(id);
        await version.update(data).catch(error => error);
        await version.save().catch(error => error);
        return version;
    },
    delete: async (id, confirm) => {
        const version = await versionsService.findByPk(id).catch(error => error);
        const products = await version.getProducts({where: {active: true}}).catch(error => error);
        console.log(products)
        let errors = {
            message: "This model has associated ",
            status: 409,
            data: {}
        };
        if(products.length > 0){
            errors.message += "products";
            errors.data.products.push(products);
        }
        if(products.length > 0 && confirm === true){
            await version.update({active: false}).catch(error => error);
            return await version.save().catch(error => error);
        }
        else if(products.length == 0){
            await version.update({active: false}).catch(error => error);
            return await version.save().catch(error => error);
        }
        else{
            errors.message += ". Please send the confirm parameter as true"
            return errors
        }
    }
}

module.exports = versionsService;