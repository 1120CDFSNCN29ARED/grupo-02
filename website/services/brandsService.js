const db = require('../database/models');
const { Op } = require("sequelize");

const brandsService = {
    findAll: async () => {
        return await db.Brand.findAll({order: [["brand_name","ASC"]]}).catch(error => error);
    },
    findByProductType: async (productType) => {
        if(productType === "vehicle"){
            return await db.Brand.findAll({
                where:{
                    [Op.or]: [{vehicle_type_car: true}, {vehicle_type_motorcycle: true}, {vehicle_type_pickup: true}, {vehicle_type_truck: true}]
                },
                order: [["brand_name","ASC"]],
            })
            .catch(error => error);
        }
        else if(req.params.productType === "part") {
			brands = await db.Brand.findAll({
				where:{
					makes_parts: true
				},
                order: [["brand_name","ASC"]],
            })
            .catch(error => error);
		}
    },
    findByPk: async (id) => {
        return await db.Brand.findByPk(id).catch(error => error);
    },
    findByName: async (name) => {
        return await db.Brand.findAll({
            where: {
                brand_name:{
                    [Op.substring]: name
                }
            }
        }).catch(error => error);
    },
}

module.exports = brandsService;