const usersService = require("../services/usersService");
const provincesService = require("../services/provincesService");
const localitiesService = require("../services/localitiesService");
const brandsService = require("../services/brandsService");
const modelsService = require("../services/modelsService");
const versionsService = require("../services/versionsService");
//const postsService = require("../services/postsService");
const productsService = require("../services/productsService");
const partsService = require("../services/partsService");
const vehiclesService = require("../services/vehiclesService");
const questionsService = require("../services/questionsService");
const imagesService = require("../services/imagesService");

const getPostData = async post => {
    const locality = await localitiesService.findByPk(post.locationID);
    const province = await provincesService.findByPk(locality.provinceID);
    const product = await productsService.findByPk(post.productID);
    const brand = await brandsService.findByPk(product.brandID);
    const model = await modelsService.findByPk(product.modelID);
    const questions = await questionsService.findByPostID(post.postID);
    const images = await imagesService.findByPostID(post.postID);
    const seller = await usersService.findByPk(post.sellerID);
    const plainImages = [];
    for(image of images){
        plainImages.push({
            imageID: image.imageID,
            imageURL: image.imageURL
        })
    }
    const plainQuestions = [];
    for(question of questions){
        const user = await usersService.findByPk(question.userID);
        plainQuestions.push({
            questionID: question.questionID,
            question: question.question,
            userID: user.userID,
            userName: user.userName,
            questionDate: question.questionDate,
            answer: question.answer,
            answerDate: question.answerDate,
        })
    }
    let part = null;
    let vehicle = null;
    let version = null;
    const postData = {
        post: {
            postID: post.postID,
            title: post.title,
            description: post.description,
            productType: product.productType,
            published: post.published,
            publishedDate: post.publishedDate,
            onSale: post.onSale,
            price: post.price,
            discount: post.discount,
            stock: post.stock,
            rating: post.rating,
            state: post.state,
            featured: post.featured,
            brandID: brand.brandID,
            brandName: brand.brandName,
            modelID: model.modelID,
            modelName: model.modelName,
            active: post.active,
        },
        seller: {
            sellerID: seller.userID,
            userName: seller.userName,
            firstName: seller.firstName,
            lastName: seller.lastName,
        },
        location: {
            locationID: locality.localityID,
            localityName: locality.localityName,
            provinceID: province.provinceID,
            provinceName: province.provinceName,
            postalCode: post.postalCode
        },
        questions: plainQuestions,
        images: plainImages,
    }
    if(product.productType === "vehicle"){
        vehicle = await vehiclesService.findByPk(product.vehicleID);
        version = await versionsService.findByPk(vehicle.versionID);
        postData.post.versionID = vehicle.versionID;
        postData.post.versionName = version.versionName;
        postData.post.type = vehicle.type;
        postData.post.gearType = vehicle.gearType;
        postData.post.year = vehicle.year;
        postData.post.kilometers = vehicle.kilometers;
        postData.post.color = vehicle.color;
    }
    else if(product.productType === "part"){
        part = await partsService.findByPk(product.partID);
        postData.post.partSerialNumber = part.partSerialNumber;
        postData.post.car = part.car;
        postData.post.motorcycle = part.motorcycle;
        postData.post.pickup = part.pickup;
        postData.post.truck = part.truck;
    }
    
    return postData;
}

module.exports = getPostData