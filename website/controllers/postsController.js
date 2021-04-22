const _ = require("lodash");

const usersService = require("../services/usersService");
const provincesService = require("../services/provincesService");
const localitiesService = require("../services/localitiesService");
const brandsService = require("../services/brandsService");
const modelsService = require("../services/modelsService");
const versionsService = require("../services/versionsService");
const postsService = require("../services/postsService");
const productsService = require("../services/productsService");
const partsService = require("../services/partsService");
const vehiclesService = require("../services/vehiclesService");
const questionsService = require("../services/questionsService");
const imagesService = require("../services/imagesService");

const getPostData = require("../middlewares/getPostData");


const postsController = {
    create: async (req, res) => {
        let brands = [];
        let conditions = [];
        let provinces = [];
        if(req.params.productType === "vehicle"){
            conditions.push({car: true},{motorcycle: true},{pickup: true},{truck: true})
        }
        else if(req.params.productType === "part"){
            conditions.push({makesParts: true})
        }
        if(req.params.productType === "vehicle" || req.params.productType === "part"){
			brands = await brandsService.findByProductType(conditions);
            provinces = await provincesService.findAll();
		}
		return res.render("createPost", {
			brands,
            provinces,
			productType: req.params.productType,
			post: {},
		});
    },
    storePost: async (req, res) => {
        const postData = {};
        return res.json(req.body);
        //return res.redirect("/posts/" + postData.postID);
    },
    details: async (req, res) => {
        const post = await postsService.findByPk(req.params.postID)
        if(post){
            const fullPost = await getPostData(post);
            return res.render("postDetails", {fullPost});

        }
        else{
            return res.redirect("/");
        }
    }
};

module.exports = postsController