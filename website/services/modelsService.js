const db = require('../database/models');
const { Op } = require("sequelize");

const modelsService = {
    findAll: async () => {
        return await db.Model.findAll({order: [["model_name","ASC"]]}).catch(error => error);
    },
    findByProductType: async (conditions) => {
        return await db.Model.findAll({
            where:{
                [Op.or]: conditions
            },
            order: [["model_name","ASC"]],
        })
        .catch(error => error);
    },
    findByPk: async (id) => {
        return await db.Model.findByPk(id).catch(error => error);
    },
    findByName: async (name) => {
        return await db.Model.findAll({where: {model_name: name}}).catch(error => error);
    },
    findByBrandID: async (id) => {
        return await db.Model.findAll({where: {brandID: id}}).catch(error => error);
    },
    create: async (data) => {
        return await db.Model.create(data).catch(error => error);
    },
    update: async (id, data) => {
        const model = await modelsService.findByPk(id);
        await model.update(data).catch(error => error);
        await model.save().catch(error => error);
        return model;
    },
    delete: async (id, confirm) => {
        const model = await modelsService.findByPk(id).catch(error => error);
        const versions = await model.getVersions().catch(error => error);
        let errors = {
            message: "This model has associated ",
            status: 409,
            data: {}
        };
        if(versions.length > 0){
            errors.message += "versions";
            errors.data.models.push(models);
        }
        if(versions.length > 0 && confirm === true){
            await model.update({active: false}).catch(error => error);
            return await model.save().catch(error => error);
        }
        else if(versions.length == 0){
            await model.update({active: false}).catch(error => error);
            return await model.save().catch(error => error);
        }
        else{
            errors.message += ". Please send the confirm parameter as true"
            return errors
        }
    }
}

module.exports = modelsService;