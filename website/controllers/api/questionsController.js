const _ = require("lodash");

const questionsService = require("../../services/questionsService");
const postsService = require("../../services/postsService");
const usersService = require("../../services/usersService");

const questionsController = {
    all: async (req, res) => {
        const questions = await questionsService.findAll();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(questions){
            result.data = {
                questions
            }
            result.meta.status = 200;
            result.meta.count = questions.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No questions were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byID: async (req, res) => {
        const question = await questionsService.findByPk(req.params.questionID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(question){
            result.data = {
                question
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No questions were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byPostID: async (req, res) => {
        const questions = await questionsService.findByPostID(req.params.postID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(questions){
            result.data = {
                questions
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No questions were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byUserID: async (req, res) => {
        const questions = await questionsService.findByUserID(req.params.userID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(questions){
            result.data = {
                questions
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No questions were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    create: async (req, res) => {
        const result = {
            meta: {}
        };
        const errors = {};
        const newData = {};
        const post = await postsService.findByPk(req.body.postID);
        if(!post){
            errors.postID = "Invalid postID";
        }
        const user = await usersService.findByPk(req.body.userID);
        if(!user){
            errors.userID = "Invalid userID";
        }
        if(!req.body.question){
            errors.question = "Please provide a valid question";
        }
        let question = null;
        if(_.isEmpty(errors)){
            newData.postID = req.body.postID;
            newData.userID = req.body.userID;
            newData.question = req.body.question;
            question = await questionsService.create(newData);
            result.meta = {
                url: req.originalUrl
            };
        }        
        if(question){
            result.data = {
                question
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: "Question not created",
                errors
            }
        }       
        return res.status(result.meta.status).json(result);
    },
    update: async (req, res) => {
        const result = {
            meta: {}
        };
        const errors = {};
        const newData = {};
        let post = null;
        let question = null;
        let user = null;
        question = await questionsService.findByPk(req.params.questionID);
        
        if(!question){
            console.log("question",question)
            errors.questionID = `Question with ID ${req.params.questionID} not found`;
        }
        if(req.params.postID){
            post = await postsService.findByPk(req.body.postID);
            if(!post){
                errors.postID = "Invalid postID";
            }
            else{
                newData.postID = req.params.postID;
            }
        }
        if(req.params.userID){
            user = await usersService.findByPk(req.body.userID);
            if(!user){
                errors.userID = "Invalid userID";
            }
            else{
                newData.userID = req.params.userID;
            }
        }
        if(req.body.question){
            newData.question = req.body.question;
        }
        if(req.body.answer){
            newData.answer = req.body.answer;
            newData.answerDate = new Date();
        }
        if(_.isEmpty(errors)){
            question = await questionsService.update(req.params.questionID, newData);
            result.meta = {
                url: req.originalUrl
            };
        }        
        if(question){
            result.data = {
                question
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: "Question not updated",
                errors
            }
        }       
        return res.status(result.meta.status).json(result);
    },
    delete: async (req, res) => {
        const result = await questionsService.delete(req.params.questionID);
        return res.status(202).json(result);
    }
}

module.exports = questionsController;