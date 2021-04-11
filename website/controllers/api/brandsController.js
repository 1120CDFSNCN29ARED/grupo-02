const brandsService = require("../../services/brandsService");

const modelsController = {
    all: async (req, res) => {
        const brands = await brandsService.findAll();
        return res.status(200).json(brands);
    },
    byID: async (req, res) => {
        const brand = await brandsService.findByPk(req.params.brandID);
        return res.status(200).json(brand);
    },
    byProductType: async (req, res) => {
        const brands = await brandsService.findByProductType(req.query.productTypes);
        return res.status(200).json(brands);
    },
    byName: async (req, res) => {
        const brands = await brandsService.findByName(req.params.brandName);
        return res.status(200).json(brands);
    },
    byIDIncludeModels: async (req, res) => {
        const brand = await brandsService.findBrandModels(req.params.id);
        return res.status(200).json(brand);
    },
    create: async (req, res) => {
        const brand = {
            brand_name: req.body.brandName,
        }
        if(req.body.brandName !== undefined){
            brand.vehicle_type_car = req.body.brandName
        }
        if(req.body.makes.car !== undefined){
            brand.vehicle_type_car = req.body.makes.car
        }
        if(req.body.makes.motorcycle !== undefined){
            brand.vehicle_type_motorcycle = req.body.makes.motorcycle
        }
        if(req.body.makes.pickup !== undefined){
            brand.vehicle_type_pickup = req.body.makes.pickup
        }
        if(req.body.makes.truck !== undefined){
            brand.vehicle_type_truck = req.body.makes.truck
        }
        if(req.body.makes.part !== undefined){
            brand.makes_parts = req.body.makes.part
        }
        const result = await brandsService.create(brand);
        return res.status(201).json(result);
    },
    update: async (req, res) => {
        const newData = {};
        if(req.body.brandName !== undefined){
            newData.vehicle_type_car = req.body.brandName
        }
        if(req.body.makes.car !== undefined){
            newData.vehicle_type_car = req.body.makes.car
        }
        if(req.body.makes.motorcycle !== undefined){
            newData.vehicle_type_motorcycle = req.body.makes.motorcycle
        }
        if(req.body.makes.pickup !== undefined){
            newData.vehicle_type_pickup = req.body.makes.pickup
        }
        if(req.body.makes.truck !== undefined){
            newData.vehicle_type_truck = req.body.makes.truck
        }
        if(req.body.makes.part !== undefined){
            newData.makes_parts = req.body.makes.part
        }
        const brand = await brandsService.update(req.params.brandID, newData);
        return res.status(202).json(brand);
    },
    delete: async (req, res) => {
        const brand = await brandsService.delete(req.params.brandID,req.params.confirm);
        return res.status(204).json(brand);
    }
}

module.exports = modelsController;