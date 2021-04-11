const { Op } = require("sequelize");
const db = require('../../database/models');
const apiController = {
    brands: (req, res) => {
        if(req.params.brandID){
            db.Brand.findByPk(req.params.brandID).then(brand => {
                res.json(brand);
            }).catch(error => res.json(error));
        }
        else {
            db.Brand.findAll().then(brands => {
                res.json(brands);
            }).catch(error => res.json(error));
        }
    },
    models: (req, res) => {
        if(req.params.modelID){
            db.Brand.findByPk(req.params.modelID).then(model => {
                res.json(model);
            }).catch(error => res.json(error));
        }
        else {
            db.Model.findAll().then(models => {
                res.json(models);
            }).catch(error => res.json(error));
        }
    },
    modelsByBrand: (req, res) => {
        db.Model.findAll({where: {brandID: req.params.brandID}}).then(models => {
            res.json(models);
        }).catch(error => res.json(error));
    },
    versions: (req, res) => {
        if(req.params.versionID){
            db.VehicleVersion.findAll({where: {brandID: req.params.versionID}}).then(versions => {
                res.json(versions);
            }).catch(error => res.json(error));
        }
        else {
            db.VehicleVersion.findAll().then(versions => {
                res.json(versions);
            }).catch(error => res.json(error));
        }
    },
    versionsByModel: (req, res) => {
        db.VehicleVersion.findAll({where: {modelID: req.params.modelID}}).then(versions => {
            res.json(versions);
        }).catch(error => res.json(error));
    },
}

module.exports = apiController;