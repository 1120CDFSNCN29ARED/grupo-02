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
}

module.exports = modelsController;