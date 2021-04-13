const provincesServices = require("./../../services/provincesService");

const provincesController = {
    findAll: async (req, res) => {
        const provinces = await provincesServices.findAll();
        return res.status(200).json(provinces);
    },
    findByID: async (req, res) => {
        const province = await provincesServices.findByPk(req.params.provinceID);
        return res.status(200).json(province ? province : {});
    },
    findByName: async (req, res) => {
        const provinces = await provincesServices.findByName(req.params.provinceName);
        return res.status(200).json(provinces);
    },
    findOneByName: async (req, res) => {
        const province = await provincesServices.findOneByName(req.params.provinceName);
        return res.status(200).json(province);
    },
    create: async (req, res) => {
        const province = {
            provinceID: req.body.provinceID,
            province_name: req.body.provinceName,
        }
        const result = await provincesServices.create(province);
        return res.status(200).json(result);
    },
    update: async (req, res) => {
        const province = {}
        if(req.body.provinceName !== undefined){
            province.province_name = req.body.provinceName;
        }
        if(req.body.localityID !== undefined){
            province.localityID = req.body.localityID;
        }
        const result = await provincesServices.update(req.params.provinceID, province);
        return res.status(200).json(result);
    },
    delete: async (req, res) => {
        const result = await provincesServices.delete(req.params.provinceID, req.query.confirm);
        return res.status(202).json(result);
    }
}

module.exports = provincesController;