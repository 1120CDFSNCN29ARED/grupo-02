const vehiclesService = require("../../services/vehiclesService");
const versionsService = require("../../services/versionsService");

const vehiclesController = {
    all: async (req, res) => {
        const vehicles = await vehiclesService.findAll();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(vehicles){
            result.data = {
                vehicles
            }
            result.meta.status = 200;
            result.meta.count = vehicles.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No vehicles were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byID: async (req, res) => {
        const vehicle = await vehiclesService.findByPk(req.params.vehicleID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(vehicle){
            result.data = {
                vehicle
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No vehicles were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byVersionID: async (req, res) => {
        const vehicles = await vehiclesService.findByVersionID(req.params.versionID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(vehicles){
            result.data = {
                vehicles
            }
            result.meta.status = 200;
            result.meta.count = vehicles.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No vehicles were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    create: async (req, res) => {
        const version = await versionsService.findByPk(req.body.versionID);
        const result = {}
        if(version){
            const newData = {
                versionID: req.body.versionID,
                versionName: req.body.versionName,
                gearType: req.body.gearType,
                year: req.body.year,
                kilometers: req.body.kilometers,
                color: req.body.color,
            }
            const vehicle = await vehiclesService.create(newData);
            result.meta = {
                url: req.originalUrl
            };
            if(vehicle){
                result.data = {
                    vehicle
                }
                result.meta.status = 201;
                result.meta.count = 1;
            }
            else{
                result.meta.status = 409;
                result.meta.count = 0;
                result.error= {
                    status: "409",
                    message: `No vehicles were found`
                }
            }
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `Invalid version ID found`
            }
        }
        
        return res.status(result.meta.status).json(result);
    },
    update: async (req, res) => {
        const newData = {};
        let version = {};
        if(req.body.versionID !== undefined){
            version = await versionsService.findByPk(req.body.versionID);
            if(version){
                newData.versionID = req.body.versionID;
            }
            else {
                return res.status(400).json({
                    meta: {
                        url: req.params.url,
                        status: 400,
                        count: 0
                    },
                    error: {
                        status: 400,
                        message: "Invalid version ID"
                    }
                });
            }
        }
        if(req.body.gearType !== undefined){
            newData.gearType = req.body.gearType;
        }
        if(req.body.year !== undefined){
            newData.year = req.body.year;
        }
        if(req.body.kilometers !== undefined){
            newData.kilometers = req.body.kilometers;
        }
        const vehicle = await vehiclesService.update(req.params.vehicleID, newData);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(vehicle){
            result.data = {
                vehicle
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No vehicles were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    delete: async (req, res) => {
        const result = await vehiclesService.delete(req.params.vehicleID, req.params.confirm);
        return res.status(202).json(result);
    }
}

module.exports = vehiclesController;