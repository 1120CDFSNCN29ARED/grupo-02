const db = require('../database/models');
const { Op } = require("sequelize");

const questionsService = {
    findAll: async () => {
        return await db.Question.findAll().catch(error => error);
    },
    findByPk: async (id) => {
        return await db.Question.findByPk(id).catch(error => error);
    },
    findByPostID: async (postID) => {
        return await db.Question.findAll({where: {postID}});
    },
    findByUserID: async (userID) => {
        return await db.Question.findAll({where: {userID}});
    },
    create: async (data) => {
        return await db.Question.create(data).catch(error => error);
    },
    update: async (id, data) => {
        const question = await questionsService.findByPk(id);
        await question.update(data).catch(error => error);
        await question.save().catch(error => error);
        return question;
    },
    delete: async (questionID) => {
        const question = await db.Question.destroy({where: {questionID}}).catch(error => error);
        return question;        
    },
    countQuestions: async function(userID){
        const result = await this.findByUserID(userID).catch(error => error);
        if (!result.errors) {
        let questionsCount = result.length;
				return questionsCount;    
        } else {
            return 0;
        }
        
    }
}

module.exports = questionsService;