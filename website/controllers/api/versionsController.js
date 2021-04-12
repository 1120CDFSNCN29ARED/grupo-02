const versionsService = require("../../services/versionsService");

const versionsController = {
    all: async (req, res) => {
        const versions = await versionsService.findAll();
        return res.status(200).json(versions);
    },
    byID: async (req, res) => {
        console.log(req.params.versionID)
        const version = await versionsService.findByPk(req.params.versionID);
        return res.status(200).json(version);
    },
    byBrandID: async (req, res) => {
        const versions = await versionsService.findByBrandID(req.params.brandID);
        return res.status(200).json(versions);
    },
    byModelID: async (req, res) => {
        const versions = await versionsService.findByModelID(req.params.modelID);
        return res.status(200).json(versions);
    },
    create: async (req, res) => {
        const newData = {
            version_name: req.body.versionName,
            brandID: req.body.brandID,
            modelID: req.body.modelID
        }
        const result = await versionsService.create(newData);
        return res.status(201).json(result);
    },
    update: async (req, res) => {
        const newData = {};
        if(req.body.versionName !== undefined){
            newData.version_name = req.body.versionName;
        }
        if(req.body.modelID !== undefined){
            newData.modelID = req.body.modelID;
        }
        if(req.body.brandID !== undefined){
            newData.brandID = req.body.brandID;
        }
        const result = await versionsService.update(req.params.versionID, newData);
        return res.status(202).json(result);
    },
    delete: async (req, res) => {
        const result = await versionsService.delete(req.params.versionID, req.params.confirm);
        return res.status(202).json(result);
    }
}

module.exports = versionsController;