const partsService = require("../../services/partsService");

const partsController = {
    all: async (req, res) => {
        const parts = await partsService.findAll();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(parts){
            result.data = {
                parts
            }
            result.meta.status = 200;
            result.meta.count = parts.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No parts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byID: async (req, res) => {
        const part = await partsService.findByPk(req.params.partID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(part){
            result.data = {
                part
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No parts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    create: async (req, res) => {
        const result = {}
        const newData = {
            partSerialNumber: req.body.partSerialNumber,
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
        const part = await partsService.create(newData);
        result.meta = {
            url: req.originalUrl
        };
        if(part){
            result.data = {
                part
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No parts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    update: async (req, res) => {
        const newData = {};
        if(req.body.partSerialNumber !== undefined){
            newData.partSerialNumber = req.body.partSerialNumber;
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
        const part = await partsService.update(req.params.partID, newData);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(part){
            result.data = {
                part
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No parts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    delete: async (req, res) => {
        const result = await partsService.delete(req.params.partID, req.params.confirm);
        return res.status(202).json(result);
    }
}

module.exports = partsController;