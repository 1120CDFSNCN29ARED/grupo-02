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
    }
}

module.exports = modelsController;