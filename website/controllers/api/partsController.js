const partsService = require("../../services/partsService");
const versionsService = require("../../services/versionsService");

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
            part_serial_number: req.body.partSerialNumber,
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
        if(req.body.makes.car !== undefined){
            newData.part_serial_number = req.body.partSerialNumber;
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