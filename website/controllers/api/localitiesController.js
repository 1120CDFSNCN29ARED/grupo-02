const localitiesService = require("./../../services/localitiesService");

const localitiesController = {
    findAll: async (req, res) => {
        const localities = await localitiesService.findAll();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(localities){
            result.data = {
                localities
            }
            result.meta.status = 200;
            result.meta.count = localities.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No provinces were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    findByID: async (req, res) => {
        const locality = await localitiesService.findByPk(req.params.localityID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(locality){
            result.data = {
                locality
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No localities were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    findByName: async (req, res) => {
        const localities = await localitiesService.findByName(req.params.localityName);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(localities){
            result.data = {
                localities
            }
            result.meta.status = 200;
            result.meta.count = localities.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No localities were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    findOneByName: async (req, res) => {
        const locality = await localitiesService.findOneByName(req.params.localityName);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(locality){
            result.data = {
                locality
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No localities were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    create: async (req, res) => {
        const newLocality = {
            provinceID: req.body.provinceID,
            localityName: req.body.localityName,
        }
        const locality = await localitiesService.create(newLocality);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(locality){
            result.data = {
                locality
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No localities were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    update: async (req, res) => {
        const newLocality = {}
        if(req.body.localityName !== undefined){
            newLocality.localityName = req.body.localityName;
        }
        if(req.body.provinceID !== undefined){
            newLocality.provinceID = req.body.provinceID;
        }
        const locality = await localitiesService.update(req.params.localityID, newLocality);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(locality){
            result.data = {
                locality
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No localities were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    delete: async (req, res) => {
        const result = await localitiesService.delete(req.params.localityID, req.query.confirm);
        return res.status(202).json(result);
    }
}

module.exports = localitiesController;