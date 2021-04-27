const _ = require("lodash");
const fs = require("fs");
const path = require("path");

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
const provincesServices = require("../services/provincesService");
const cartsService = require("../services/cartsService");
const cartItemsService = require("../services/cartItemsService");


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
        let part = null;
        let vehicle = null;
        const newVehicle = {};
        const newPart = {};
        const newProduct = {};
        let product = null;
        const newPost = {};
        let post = null;

        
        if(req.url.includes("part")){
            newProduct.productType = "part";
            newProduct.modelID = req.body.modelID;
            newPart.partSerialNumber = req.body.partSerialNumber;
            newPart.car = req.body.car;
            newPart.motorcycle = req.body.motorcycle;
            newPart.pickup = req.body.pickup;
            newPart.truck = req.body.truck;
            part = await partsService.create(newPart);
            newProduct.partID = part.partID;
        }
        if(req.url.includes("vehicle")){
            newProduct.productType = "vehicle";
            newVehicle.versionID = req.body.versionID;
            newVehicle.type = req.body.type;
            newVehicle.gearType = req.body.gearType;
            newVehicle.year = req.body.year;
            newVehicle.kilometers = req.body.kilometers;
            newVehicle.color = req.body.color;
            vehicle = await vehiclesService.create(newVehicle);
            newProduct.vehicleID = vehicle.vehicleID;
        }
        newProduct.brandID = req.body.brandID;
        newProduct.modelID = req.body.modelID;
        product = await productsService.create(newProduct);

        newPost.title = req.body.title;
        newPost.description = req.body.description; 
        if(req.body.submit === "publish"){
            newPost.published = true;
            newPost.publishedDate = new Date();
        }
        if(req.body.discount > 0){
            newPost.onSale = true;
            newPost.discount = req.body.discount;
        }            
        newPost.price = req.body.price;
        newPost.discount = req.body.discount;
        newPost.stock = req.body.stock;
        newPost.rating = req.body.rating;
        newPost.state = req.body.state;
        newPost.sellerID = req.session.assertUserLogged.userID;
        newPost.locationID = req.body.locationID;
        newPost.postalCode = req.body.postalCode;
        newPost.productID = product.productID;

        post = await postsService.create(newPost);
        
        if(post){
            if(req.files.images){
                if (req.files.images.length < 5) {
                    for (let i = 0; i < req.files.images.length; i++) {
                        const newImage = {
                            postID: post.postID,
                            imageURL: req.files.images[i].filename
                        }
                        await imagesService.create(newImage);
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        const newImage = {
                            postID: post.postID,
                            imageURL: req.files.images[i].filename
                        }
                        await imagesService.create(newImage);
                    }
                }
            }
            const postData = await getPostData(post);
            return res.redirect("/posts/details/" + postData.post.postID);
        }
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
    },
    edit: async (req, res) => {
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
        const post = await postsService.findByPk(req.params.postID);
        if(post){
            const postData = await getPostData(post);
            return res.render("editPost", {post: postData, productType: req.params.productType, brands, provinces})
        }else{
            return res.redirect("/");
        }
    },
    update: async (req, res) => {
        let post = await postsService.findByPk(req.params.postID);
        let newPost = {};
        let newProduct = {};
        let vehicle = null;
        let newVehicle = {};
        let part = null;
        let newPart = {};
        if(!post){
            return res.redirect("/");
        }
        product = await productsService.findByPk(post.productID);
            if(product.productType === "vehicle"){
                if(req.body.gearType && (req.body.gearType === "automática" || req.body.gearType === "manual")){
                    newVehicle.gearType = req.body.gearType;
                }
                if(req.body.year){
                    newVehicle.year = req.body.year;
                }
                if(req.body.kilometers){
                    newVehicle.kilometers = req.body.kilometers;
                }
                if(req.body.color){
                    newVehicle.color = req.body.color;
                }
                if(req.body.versionID){
                    newVehicle.versionID = req.body.versionID;
                }
                if(!_.isEmpty(newVehicle)){
                    vehicle = await vehiclesService.update(product.vehicleID,newVehicle);
                }
            }
            else if(product.productType === "part"){
                if(req.body.partSerialNumber){
                    newPart.partSerialNumber = req.body.partSerialNumber;
                }
                if(req.body.car){
                    newPart.car = req.body.car;
                }
                if(req.body.motorcycle){
                    newPart.motorcycle = req.body.motorcycle;
                }
                if(req.body.pickup){
                    newPart.pickup = req.body.pickup;
                }
                if(req.body.truck){
                    newPart.truck = req.body.truck;
                }
                if(!_.isEmpty(newPart)){
                    part = await partsService.update(product.partID,newPart);
                }
            }

            if(req.body.brandID){
                newProduct.brandID = req.body.brandID;
            }
            if(req.body.modelID){
                newProduct.modelID = req.body.modelID;
            }
            if(!_.isEmpty(newProduct)){
                product = await productsService.update(product.productID,newProduct);
            }

            if(req.body.title){
                newPost.title = req.body.title;
            }
            if(req.body.description){
                newPost.description = req.body.description;
            }
            if(req.body.state){
                newPost.state = req.body.state;
            }
            if(req.body.published){
                newPost.published = req.body.published;
                newPost.publishedDate = new Date();
            }
            newPost.discount = req.body.discount;
            if(req.body.discount > 0){
                newPost.onSale = true;
            }
            if(req.body.price){
                newPost.price = req.body.price;
            }
            if(req.body.stock){
                newPost.stock = req.body.stock;
            }
            if(req.body.rating){
                newPost.rating = req.body.rating;
            }
            if(req.body.locationID){
                newPost.locationID = req.body.locationID;
            }
            if(!_.isEmpty(newPost)){
                post = await postsService.update(post.postID,newPost);
            }
            if(post){
                if(req.files.images){
                    const images = await imagesService.findByPostID(post.postID);
                    if(images.length === 0 &&  req.files.images.length < 5){
                        for (let i = 0; i < req.files.images.length; i++) {
                            const newImage = {
                                postID: post.postID,
                                imageURL: req.files.images[i].filename
                            }
                            await imagesService.create(newImage);
                        }
                    }else if (images.length > 0) {
                        for (let i = 0; i <= 5 - images.length; i++) {
                            if(req.files.images[i]){
                                const newImage = {
                                    postID: post.postID,
                                    imageURL: req.files.images[i].filename
                                }
                                await imagesService.create(newImage);
                            }
                        }
                    } else if (images.length === 0 && req.files.images.length > 5) {
                        for (let i = 0; i < 5; i++) {
                            const newImage = {
                                postID: post.postID,
                                imageURL: req.files.images[i].filename
                            }
                            await imagesService.create(newImage);
                        }
                    }
                }
                return res.redirect(`/posts/details/${post.postID}`)
            }
    },
    delete: async (req, res) => {
        const post = await postsService.findByPk(req.params.postID);
        if(!post){
            return res.redirect("/");
        }
        await postsService.update(req.params.postID, {active: false, published: false});
        const product = await productsService.update(post.productID, {active: false});
        let vehicle = null;
        let part = null;
        if(product.productType === "part"){
            part = await partsService.findByPk(product.partID, {active: false});
        }
        else if(product.productType === "vehicle"){
            vehicle = await vehiclesService.update(product.vehicleID, {active: false});
        }
        const carts = cartsService.active();
        if(carts.length > 0){
            for(cart of carts){
                for(cartItem of cart.cartItems){
                    if(cartItem.postID === req.params.postID){
                        await cartItemsService.delete(cartItem.cartItemID);
                    }
                }
            }
        }        
        return res.redirect("/");
    },
    question: async (req, res) => {
		const newQuestion = {
			postID: req.params.postID,
			userID: req.session.assertUserLogged.userID,
			question: req.body.question,
			questionDate: new Date()
		}
        const question = await questionsService.create(newQuestion);
		return res.redirect(`/posts/details/${req.params.postID}`);
	},
    deleteImage: async (req, res) => {
		const images = await imagesService.findByPostID(req.params.postID);
        for(image of images){
            if(image.imageURL === req.query.image){
                await imagesService.delete(image.imageID)
                if(image.imageURL !== "no-image-found.jpeg"){
                    fs.unlinkSync(
                        path.join(__dirname, `../public/img/posts/${req.query.image}`)
                    );
                }
            }
        }
		res.redirect(`/posts/edit/${req.params.productType}/${req.params.postID}`);
	},
    search: async (req, res) => {
        const publishedPosts = await postsService.published();
        const fullPostsData = [];
        const brands = await brandsService.findAll();
        const provinces = await provincesServices.findAll();
        let matchedPosts = [];
        for(post of publishedPosts){
            const fullData = await getPostData(post);
            fullPostsData.push(fullData);
        }
        if(req.query){
            /*const queryParameters = Object.getOwnPropertyNames(req.query);
            queryParameters.forEach(parameter => {
                matchedPosts.push(fullPostsData.filter(post => post[parameter] === req.query[parameter]));
            });*/
            if(req.query.productType){
                matchedPosts = fullPostsData.filter(post => post.post.productType === req.query.productType);
                if(req.query.productType === "vehicle"){
                    if(req.query.inputKMFrom){
                        matchedPosts = fullPostsData.filter(post => post.post.kilometers >= req.query.inputKMFrom);
                    }
                    if(req.query.inputKMTo){
                        matchedPosts = fullPostsData.filter(post => post.post.kilometers <= req.query.inputKMTo);
                    }
                    if(req.query.inputYearFrom){
                        matchedPosts = fullPostsData.filter(post => post.post.year >= req.query.inputYearFrom);
                    }
                    if(req.query.inputYearTo){
                        matchedPosts = fullPostsData.filter(post => post.post.year <= req.query.inputYearTo);
                    }
                    if(req.query.type){
                        matchedPosts = fullPostsData.filter(post => post.post.type === req.query.type);
                    }
                }
            }
            if(req.query.type){
                matchedPosts = fullPostsData.filter(post => post.post.type === req.query.type);
            }
            if(req.query.inputPriceFrom){
                matchedPosts = fullPostsData.filter(post => post.post.price >= req.query.inputPriceFrom);
            }
            if(req.query.inputPriceTo){
                matchedPosts = fullPostsData.filter(post => post.post.price <= req.query.inputPriceTo);
            }
            if(req.query.brand){
                matchedPosts = fullPostsData.filter(post => post.post.brandID == req.query.brand);
            }            
            if(req.query.model){
                matchedPosts = fullPostsData.filter(post => post.post.modelID == req.query.model);
            }
            if(req.query.state){
                matchedPosts = fullPostsData.filter(post => post.post.state == req.query.state);
            }
        }
        else{
            matchedPosts = fullPostsData;
        }
        return res.render("search", {posts: matchedPosts, brands, provinces});
        
    },
};

module.exports = postsController