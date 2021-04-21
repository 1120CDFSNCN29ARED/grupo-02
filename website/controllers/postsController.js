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
        if(req.params.productType === "vehicle"){
            conditions.push({car: true},{motorcycle: true},{pickup: true},{truck: true})
        }
        else if(req.params.productType === "part"){
            conditions.push({makesParts: true})
        }
        if(req.params.productType === "vehicle" || req.params.productType === "part"){
			brands = await brandsService.findByProductType(conditions);
		}
		return res.render("createPost", {
			brands,
			productType: req.params.productType,
			post: {},
		});
    }
};

module.exports = postsController