const versionsService = require("../../services/versionsService");

const versionsController = {
    all: async (req, res) => {
        const versions = await versionsService.findAll();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(versions){
            result.data = {
                versions
            }
            result.meta.status = 200;
            result.meta.count = versions.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No versions were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byID: async (req, res) => {
        const version = await versionsService.findByPk(req.params.versionID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(version){
            result.data = {
                version
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No versions were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byBrandID: async (req, res) => {
        const versions = await versionsService.findByBrandID(req.params.brandID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(versions){
            result.data = {
                versions
            }
            result.meta.status = 200;
            result.meta.count = versions.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No versions were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byModelID: async (req, res) => {
        const versions = await versionsService.findByModelID(req.params.modelID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(versions){
            result.data = {
                versions
            }
            result.meta.status = 200;
            result.meta.count = versions.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No versions were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    create: async (req, res) => {
        const newData = {
            version_name: req.body.versionName,
            brandID: req.body.brandID,
            modelID: req.body.modelID
        }
        const version = await versionsService.create(newData);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(version){
            result.data = {
                version
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No versions were found`
            }
        }
        return res.status(result.meta.status).json(result);
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
        const version = await versionsService.update(req.params.versionID, newData);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(version){
            result.data = {
                version
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No versions were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    delete: async (req, res) => {
        const result = await versionsService.delete(req.params.versionID, req.params.confirm);
        return res.status(202).json(result);
    }
}

module.exports = versionsController;