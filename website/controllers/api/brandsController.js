const brandsService = require("../../services/brandsService");
const modelsService = require("../../services/modelsService");

const brandsController = {
    all: async (req, res) => {
        const brands = await brandsService.findAll();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(brands){
            result.data = {
                brands
            }
            result.meta.status = 200;
            result.meta.count = brands.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No brands were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byID: async (req, res) => {
        const brand = await brandsService.findByPk(req.params.brandID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(brand){
            result.data = {
                brand
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No brand was found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byProductType: async (req, res) => {
        let conditions = [];
        if(req.query.productTypes.includes("car")){
            conditions.push({vehicle_type_car: true})
        }
        if(req.query.productTypes.includes("motorcycle")){
            conditions.push({vehicle_type_motorcycle: true})
        }
        if(req.query.productTypes.includes("pickup")){
            conditions.push({vehicle_type_pickup: true})
        }
        if(req.query.productTypes.includes("truck")){
            conditions.push({vehicle_type_truck: true})
        }
        const brands = await brandsService.findByProductType(conditions);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(brands){
            result.data = {
                brands
            }
            result.meta.status = 200;
            result.meta.count = brands.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No brands were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byName: async (req, res) => {
        const brands = await brandsService.findByName(req.params.brandName);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(brands){
            result.data = {
                brands
            }
            result.meta.status = 200;
            result.meta.count = brands.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No brands were found with name ${req.params.brandName}`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byIDIncludeModels: async (req, res) => {
        const brand = await brandsService.findByPk(req.params.id);
        let models = [];
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(brand){
            models = await modelsService.findByBrandID(req.params.id);
            result.data = {
                brand,
                models
            }
            result.meta.status = 200;
            result.meta.count = models.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No brand was found with ID ${req.params.id}`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    create: async (req, res) => {
        const newData = {
            brand_name: req.body.brandName,
        }
        if(req.body.brandName !== undefined){
            newData.vehicle_type_car = req.body.brandName;
        }
        if(req.body.makes){
            if(req.body.makes.car !== undefined){
                newData.vehicle_type_car = req.body.makes.car;
            }
            if(req.body.makes.motorcycle !== undefined){
                newData.vehicle_type_motorcycle = req.body.makes.motorcycle;
            }
            if(req.body.makes.pickup !== undefined){
                newData.vehicle_type_pickup = req.body.makes.pickup;
            }
            if(req.body.makes.truck !== undefined){
                newData.vehicle_type_truck = req.body.makes.truck;
            }
            if(req.body.makes.part !== undefined){
                newData.makes_parts = req.body.makes.part;
            }
        }
        const brand = await brandsService.create(newData);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(brands){
            result.data = {
                brand
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 400;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No brands were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    update: async (req, res) => {
        const newData = {};
        if(req.body.brandName !== undefined){
            newData.brand_name = req.body.brandName;
        }
        if(req.body.makes){
            if(req.body.makes.car !== undefined){
                newData.vehicle_type_car = req.body.makes.car;
            }
            if(req.body.makes.motorcycle !== undefined){
                newData.vehicle_type_motorcycle = req.body.makes.motorcycle;
            }
            if(req.body.makes.pickup !== undefined){
                newData.vehicle_type_pickup = req.body.makes.pickup;
            }
            if(req.body.makes.truck !== undefined){
                newData.vehicle_type_truck = req.body.makes.truck;
            }
            if(req.body.makes.part !== undefined){
                newData.makes_parts = req.body.makes.part;
            }
        }
        const brand = await brandsService.update(req.params.brandID, newData);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(brands){
            result.data = {
                brand
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 400;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No brands were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    delete: async (req, res) => {
        const brand = await brandsService.delete(req.params.brandID, req.query.confirm);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(brands){
            result.data = {
                brand
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 400;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No brands were found`
            }
        }
        return res.status(result.meta.status).json(result);
    }
}

module.exports = brandsController;