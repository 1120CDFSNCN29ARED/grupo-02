const db = require('../database/models');
const { Op } = require("sequelize");

const modelsService = {
    findAll: async () => {
        return await db.Model.findAll({order: [["model_name","ASC"]]}).catch(error => error);
    },
    findByProductType: async (productTypes) => {
        let conditions = [];
        if(productTypes.includes("car")){
            conditions.push({vehicle_type_car: true})
        }
        if(productTypes.includes("motorcycle")){
            conditions.push({vehicle_type_motorcycle: true})
        }
        if(productTypes.includes("pickup")){
            conditions.push({vehicle_type_pickup: true})
        }
        if(productTypes.includes("truck")){
            conditions.push({vehicle_type_truck: true})
        }
        console.log(conditions)
        return await db.Model.findAll({
            where:{
                [Op.or]: conditions
            },
            order: [["model_name","ASC"]],
        })
        .catch(error => error);
    },
    findByPk: async (id) => {
        return await db.Model.findByPk(id).catch(error => error);
    },
    findByName: async (name) => {
        return await db.Model.findAll({where: {model_name: name}}).catch(error => error);
    },
    findByBrandID: async (id) => {
        return await db.Model.findAll({where: {brandID: id}}).catch(error => error);
    },
}

module.exports = modelsService;