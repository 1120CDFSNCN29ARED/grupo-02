const db = require('../database/models');
const { Op } = require("sequelize");

const provincesServices = {
    findAll: async () => {
        return await db.Province.findAll({order: [["province_name","ASC"]]}).catch(error => error);
    },
    findByPk: async (id) => {
        return await db.Province.findByPk(id).catch(error => error);
    },
    findByName: async (name) => {
        return await db.Province.findAll({
            where: {
                province_name:{
                    [Op.substring]: name
                }
            }
        }).catch(error => error);
    },
    findOneByName: async (name) => {
        return await db.Province.findOne({
            where: {
                province_name: name
            }
        }).catch(error => error);
    },
    create: async (data) => {
        const province = await db.Province.create(data).catch(error => error);
        return province;
    },
    update: async (id, data) => {
        const province = await provincesServices.findByPk(id);
        await province.update(data).catch(error => error);
        await province.save().catch(error => error);
        return province;
    },
    delete: async (id, confirm) => {
        const province = await provincesServices.findByPk(id).catch(error => error);
        const localities = await province.getLocalities().catch(error => error);
        let errors = {
            message: "This province has associated ",
            status: 409,
            data: {}
        };
        if(localities.length > 0){
            errors.message += "localities";
            errors.data.localities.push(localities);
        }
        if(localities.length > 0 && confirm === true){
            await province.update({active: false});
            return await province.save().catch(error => error);
        }
        else if(localities.length == 0){
            await province.update({active: false});
            return await province.save().catch(error => error);
        }
        else{
            errors.message += ". Please send the confirm parameter as true"
            return errors
        }
    }
}

module.exports = provincesServices;