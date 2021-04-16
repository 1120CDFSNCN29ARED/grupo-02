const db = require('../database/models');
const { Op } = require("sequelize");

const vehiclesService = {
    findAll: async () => {
        return await db.Vehicle.findAll().catch(error => error);
    },
    findByPk: async (id) => {
        return await db.Vehicle.findByPk(id).catch(error => error);
    },
    findByVersionID: async (id) => {
        return await db.Vehicle.findAll({where: {versionID: id}}).catch(error => error);
    },
    create: async (data) => {
        return await db.Vehicle.create(data).catch(error => error);
    },
    update: async (id, data) => {
        const vehicle = await vehiclesService.findByPk(id);
        await vehicle.update(data).catch(error => error);
        await vehicle.save().catch(error => error);
        return vehicle;
    },
    delete: async (id, confirm) => {
        const vehicle = await vehiclesService.findByPk(id).catch(error => error);
        const products = await vehicle.getProducts({where: {active: true}}).catch(error => error);
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
            await vehicle.update({active: false}).catch(error => error);
            return await vehicle.save().catch(error => error);
        }
        else if(products.length == 0){
            await vehicle.update({active: false}).catch(error => error);
            return await vehicle.save().catch(error => error);
        }
        else{
            errors.message += ". Please send the confirm parameter as true"
            return errors
        }
    }
}

module.exports = vehiclesService;