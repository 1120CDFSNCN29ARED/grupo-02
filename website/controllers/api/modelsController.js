const modelsService = require("../../services/modelsService");

const modelsController = {
    all: async (req, res) => {
        const models = await modelsService.findAll();
        return res.status(200).json(models);
    },
    byID: async (req, res) => {
        const model = await modelsService.findByPk(req.params.modelID);
        return res.status(200).json(model);
    },
    byProductType: async (req, res) => {
        const models = await modelsService.findByProductType(req.query.productTypes);
        return res.status(200).json(models);
    },
    byBrandID: async (req, res) => {
        const models = await modelsService.findByBrandID(req.params.brandID);
        return res.status(200).json(models);
    },
    create: async (req, res) => {
        const newData = {
            model_name: req.body.modelName,
            brandID: req.body.brandID,
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
        const result = await modelsService.create(newData);
        return res.status(201).json(result);
    },
    update: async (req, res) => {
        const newData = {};
        if(req.body.modelName !== undefined){
            newData.model_name = req.body.modelName;
        }
        if(req.body.brandID !== undefined){
            newData.brandID = req.body.brandID;
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
        const result = await modelsService.update(req.params.modelID, newData);
        return res.status(202).json(result);
    },
    delete: async (req, res) => {
        const result = await modelsService.delete(req.params.modelID, req.query.confirm);
        return res.status(202).json(result);
    }
}

module.exports = modelsController;