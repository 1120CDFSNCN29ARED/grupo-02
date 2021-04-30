const provincesServices = require("./../../services/provincesService");

const provincesController = {
    findAll: async (req, res) => {
        const provinces = await provincesServices.findAll();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(provinces){
            result.data = {
                provinces
            }
            result.meta.status = 200;
            result.meta.count = provinces.length;
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
        const province = await provincesServices.findByPk(req.params.provinceID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(province){
            result.data = {
                province
            }
            result.meta.status = 200;
            result.meta.count = 1;
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
    findByName: async (req, res) => {
        const provinces = await provincesServices.findByName(req.params.provinceName);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(provinces){
            result.data = {
                provinces
            }
            result.meta.status = 200;
            result.meta.count = provinces.length;
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
    findOneByName: async (req, res) => {
        const province = await provincesServices.findOneByName(req.params.provinceName);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(province){
            result.data = {
                province
            }
            result.meta.status = 200;
            result.meta.count = 1;
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
    create: async (req, res) => {
        const newProvince = {
            provinceID: req.body.provinceID,
            provinceName: req.body.provinceName,
        }
        const province = await provincesServices.create(newProvince);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(province){
            result.data = {
                province
            }
            result.meta.status = 201;
            result.meta.count = 1;
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
    update: async (req, res) => {
        const newProvince = {}
        if(req.body.provinceName !== undefined){
            newProvince.provinceName = req.body.provinceName;
        }
        if(req.body.localityID !== undefined){
            newProvince.localityID = req.body.localityID;
        }
        const province = await provincesServices.update(req.params.provinceID, newProvince);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(province){
            result.data = {
                province
            }
            result.meta.status = 200;
            result.meta.count = 1;
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
    delete: async (req, res) => {
        const result = await provincesServices.delete(req.params.provinceID, req.query.confirm);
        return res.status(202).json(result);
    }
}

module.exports = provincesController;