const _ = require("lodash");

const usersService = require("../../services/usersService");
const provincesService = require("../../services/provincesService");
const localitiesService = require("../../services/localitiesService");
const brandsService = require("../../services/brandsService");
const modelsService = require("../../services/modelsService");
const versionsService = require("../../services/versionsService");
const postsService = require("../../services/postsService");
const productsService = require("../../services/productsService");
const partsService = require("../../services/partsService");
const vehiclesService = require("../../services/vehiclesService");
const questionsService = require("../../services/questionsService");
const imagesService = require("../../services/imagesService");

const getPostData = require("../../middlewares/getPostData");


const postsController = {
    all: async (req, res) => {
        const posts = await postsService.findAll();
        
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(!_.isEmpty(posts)){
            result.data = [];
            for(post of posts) {
                //
                const postData = await getPostData(post);
                result.data.push(postData);
            };
            result.meta.status = 200;
            result.meta.count = posts.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No posts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byID: async (req, res) => {
        const post = await postsService.findByPk(req.params.postID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(post){
            const postData = await getPostData(post);
            result.data = {
                postData
            }
            result.meta.status = 200;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No posts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    published: async (req, res) => {
        const posts = await postsService.published();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(!_.isEmpty(posts)){
            result.data = [];
            for(post of posts){
                const postData = await getPostData(post);
                result.data.push(postData);
            }
            result.meta.status = 200;
            result.meta.count = posts.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No posts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    onSale: async (req, res) => {
        const posts = await postsService.onSale();
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(!_.isEmpty(posts)){
            result.data = [];
            for(post of posts){
                const postData = await getPostData(post);
                result.data.push(postData);
            }
            result.meta.status = 200;
            result.meta.count = posts.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No posts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    bySellerID: async (req, res) => {
        const errors = {};
        const seller = await usersService.findByPk(req.params.sellerID);
        if(!seller){
            errors.seller = `No seller was found with the ID ${req.params.sellerID}`;
        }
        const posts = await postsService.findBySellerID(req.params.sellerID);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(!_.isEmpty(posts)){
            result.data = [];
            for(post of posts){
                const postData = await getPostData(post);
                result.data.push(postData);
            }
            result.meta.status = 200;
            result.meta.count = posts.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No posts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byProvinceID: async (req, res) => {
        const errors = {}
        let count = 0;
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        const province = await provincesService.findByPk(req.params.provinceID);
        if(!province){
            errors.province = "Invalid provinceID";
        }
        if(_.isEmpty(errors)){
            const localities = await localitiesService.findByProvinceID(req.params.provinceID);
            console.log(localities);
            result.data = {};
            for(locality of localities){
                const localityName = locality.localityName;
                const posts = await postsService.findByLocalityID(locality.localityID);
                const postDataArray = []
                if(!_.isEmpty(posts)){
                    for(post of posts){
                        const postData = await getPostData(post);
                        postDataArray.push(postData);
                    }
                    result.data[localityName] = postDataArray;
                    count += posts.length
                }
            }
            result.meta.status = 200;
            result.meta.count = count;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No posts were found`,
                errors
            }
        }
        return res.status(result.meta.status).json(result);
    },
    byLocalityID: async (req, res) => {
        const errors = {}
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        const locality = await localitiesService.findByPk(req.params.localityID);
        if(!locality){
            errors.locality = "Invalid localityID";
        }
        const posts = await postsService.findByLocalityID(req.params.localityID);
        if(!_.isEmpty(posts)){
            result.data = [];
            for(post of posts){
                const postData = await getPostData(post);
                result.data.push(postData);
            }
            result.meta.status = 200;
            result.meta.count = posts.length;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No posts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    create: async (req, res) => {
        const result = {
            meta: {}
        };
        const errors = {};
        let brand = null;
        let model = null;
        let version = null;
        const newPart = {};
        let part = null;
        const newVehicle = {}
        let vehicle = null;
        const newProduct = {};
        let product = null;
        const newPost = {};
        let post = null;
        let locality = null;
        let province = null;
        //const productTypes = await productsService.findPostTypes();
        const productTypes = ["vehicle","part"];
        if(!productTypes.includes(req.body.productType)){
            errors.postType = "Invalid post type, please enter: " + productTypes.join(", ");
        }
        else{
            if(req.body.productType === "part"){
                brand = await brandsService.findByPk(req.body.brandID);
                if(!brand || brand.makesParts === false){
                    errors.brandID = "Invalid brandID";
                }
                else {
                    model = await modelsService.findByPk(req.body.modelID);
                    if(!model || model.brandID !== brand.brandID || (model.car === false || model.pickup === false || model.motorcycle === false || model.truck === false)){
                        errors.modelID = "Invalid modelD";
                    }
                    else{
                        newProduct.modelID = model.modelID;
                        newPart.partSerialNumber = req.body.partSerialNumber;
                        newPart.car = req.body.car;
                        newPart.motorcycle = req.body.motorcycle;
                        newPart.pickup = req.body.pickup;
                        newPart.truck = req.body.truck;
                        part = await partsService.create(newPart);
                    }
                }
            }
            else if(req.body.productType === "vehicle"){
                brand = await brandsService.findByPk(req.body.brandID);
                if(!brand || (brand.car === false && brand.pickup === false && brand.motorcycle === false && brand.truck === false)){
                    errors.brandID = "Invalid brandID";
                }
                else {
                    model = await modelsService.findByPk(req.body.modelID);
                    if(!model || model.brandID !== brand.brandID  || (model.car === false && model.pickup === false && model.motorcycle === false && model.truck === false)){
                        errors.modelID = "Invalid modelID";
                    }
                    else{
                        version = await versionsService.findByPk(req.body.versionID);
                        if(!version || version.modelID !== model.modelID){
                            errors.versionID = "Invalid versionID";
                        }
                        else{
                            newVehicle.versionID = version.versionID;
                            newVehicle.gearType = req.body.gearType;
                            newVehicle.year = req.body.year;
                            newVehicle.kilometers = req.body.kilometers;
                            newVehicle.color = req.body.color;
                            vehicle = await vehiclesService.create(newVehicle);
                        }
                    }
                }
            }
        }
        locality = await localitiesService.findByPk(req.body.locationID);
        if(!locality){
            errors.location = "Invalid locationID";
        }
        else{
            province = await provincesService.findByPk(locality.provinceID);
        }
        let seller = await usersService.findByPk(req.body.sellerID);
        if(!seller){
            errors.sellerID = "Invalid sellerID";
        }
        if(_.isEmpty(errors)){
            newProduct.productType = req.body.productType;
            if(req.body.productType === "part"){
                newProduct.partID = part.partID;
            }
            if(req.body.productType === "vehicle"){
                newProduct.vehicleID = vehicle.vehicleID;
            }
            newProduct.brandID = req.body.brandID;
            newProduct.modelID = req.body.modelID;
            product = await productsService.create(newProduct);

            newPost.title = req.body.title;
            newPost.description = req.body.description;            
            if(req.body.published){
                newPost.published = req.body.published;
                newPost.published = new Date();
            }
            if(req.body.published){
                newPost.onSale = req.body.onSale;
                newPost.published = new Date();
            }            
            newPost.price = req.body.price;
            newPost.discount = req.body.discount;
            newPost.stock = req.body.stock;
            newPost.rating = req.body.rating;
            newPost.state = req.body.state;
            newPost.featured = req.body.featured;
            newPost.sellerID = req.body.sellerID;
            newPost.locationID = locality.localityID;
            newPost.productID = product.productID;

            post = await postsService.create(newPost);
            
            result.meta = {
                url: req.originalUrl
            };
            if(post){
                const postData = await getPostData(post);
                result.data = postData;
                result.meta.status = 201;
                result.meta.count = 1;
            }
        }
        
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: "Post not created",
                errors
            }
        }       
        return res.status(result.meta.status).json(result);
    },
    update: async (req, res) => {
        const newData = {};
        if(req.body.postSerialNumber !== undefined){
            newData.postSerialNumber = req.body.postSerialNumber;
        }        
        if(req.body.makes){
            if(req.body.makes.car !== undefined){
                newData.car = req.body.makes.car;
            }
            if(req.body.makes.motorcycle !== undefined){
                newData.motorcycle = req.body.makes.motorcycle;
            }
            if(req.body.makes.pickup !== undefined){
                newData.pickup = req.body.makes.pickup;
            }
            if(req.body.makes.truck !== undefined){
                newData.truck = req.body.makes.truck;
            }
        }
        const post = await postsService.update(req.params.postID, newData);
        const result = {
            meta: {
                url: req.originalUrl
            }
        };
        if(post){
            result.data = {
                post
            }
            result.meta.status = 201;
            result.meta.count = 1;
        }
        else{
            result.meta.status = 409;
            result.meta.count = 0;
            result.error= {
                status: "409",
                message: `No posts were found`
            }
        }
        return res.status(result.meta.status).json(result);
    },
    delete: async (req, res) => {
        const result = await postsService.delete(req.params.postID, req.params.confirm);
        return res.status(202).json(result);
    }
}

module.exports = postsController;