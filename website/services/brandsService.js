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
    findBrandModels: async (id) => {
        const brand = await brandsService.findByPk(id);
        const models = await modelsService.findByBrandID(id);
        const result = {
            brand,
            data: {
                count: models.length,
                models
            }
        }
        return result;
    },
    create: async (data) => {
        const brand = await db.Brand.create(data).catch(error => error);
        return brand;
    },
    update: async (id, data) => {
        const brand = await brandsService.findByPk(id);
        await brand.update(data).catch(error => error);
        await brand.save().catch(error => error);
        return brand;
    },
    delete: async (id, confirm) => {
        const brand = await brandsService.findByPk(id).catch(error => error);
        const models = await brand.getModels().catch(error => error);
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

module.exports = brandsService;