const productsService = require("../../services/productsService");

const productsController = {
    all: async (req, res) => {
        const products = await productsService.findAll();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(products){
            result.data = {
                products
            }
            result.meta.status = 200;
            result.meta.count = products.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No products were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byID: async (req, res) => {
        const product = await productsService.findByPk(req.params.productID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(product){
            result.data = {
                product
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No products were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byProductType: async (req, res) => {
        const product = await productsService.findByProductType(req.params.productType);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(product){
            result.data = {
                product
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No products were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byBrandID: async (req, res) => {
        const product = await productsService.findByBrandID(req.params.brandID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(product){
            result.data = {
                product
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No products were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byModelID: async (req, res) => {
        console.log("modelID: ",req.params.modelID)
        const product = await productsService.findByModelID(req.params.modelID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(product){
            result.data = {
                product
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No products were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byVehicleID: async (req, res) => {
        const product = await productsService.findByVehicleID(req.params.vehicleID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(product){
            result.data = {
                product
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No products were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byPartID: async (req, res) => {
        const product = await productsService.findByPartID(req.params.partID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(product){
            result.data = {
                product
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No products were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    create: async (req, res) => {
        const result = {}
        const newData = {
            productSerialNumber: req.body.productSerialNumber,
        }
        if(req.body.makes){
            if(req.body.makes.car !== undefined){
                newData.car = req.body.makes.car;
            }
            if(req.body.makes.motorcycle !== undefined){
                newData.car = req.body.makes.motorcycle;
            }
            if(req.body.makes.pickup !== undefined){
                newData.car = req.body.makes.pickup;
            }
            if(req.body.makes.truck !== undefined){
                newData.car = req.body.makes.truck;
            }
        }
        const product = await productsService.create(newData);
        result.meta = {
            url: req.originalUrl
        };
        if(product){
            result.data = {
                product
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No products were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    update: async (req, res) => {
        const newData = {};
        if(req.body.productSerialNumber !== undefined){
            newData.productSerialNumber = req.body.productSerialNumber;
        }        
        if(req.body.makes){
            if(req.body.makes.car !== undefined){
                newData.car = req.body.makes.car;
            }
            if(req.body.makes.motorcycle !== undefined){
                newData.motorcycle = req.body.makes.motorcycle;
            }
            if(req.body.makes.pickup !== undefined){
                newData.pickup = req.body.makes.pickup;
            }
            if(req.body.makes.truck !== undefined){
                newData.truck = req.body.makes.truck;
            }
        }
        const product = await productsService.update(req.params.productID, newData);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(product){
            result.data = {
                product
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No products were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    delete: async (req, res) => {
        const result = await productsService.delete(req.params.productID, req.params.confirm);
        return res.status(202).json(result);
    }
}

module.exports = productsController;