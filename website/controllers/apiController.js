const { Op } = require("sequelize");
const db = require('../database/models');

const apiController = {
    versions: (req, res) => {
        if(req.query.brandID){
            db.VehicleVersion.findAll({where: {brandID: req.query.brandID}}).then(versions => {
                res.json(versions);
            }).catch(error => res.json(error));
        }
        else {
            db.VehicleVersion.findAll().then(versions => {
                res.json(versions);
            }).catch(error => res.json(error));
        }
    }
}

module.exports = apiController;