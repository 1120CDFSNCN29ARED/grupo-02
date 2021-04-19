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
    let part = null;
    let vehicle = null;
    let version = null;
    const postData = {
        post: {
            postID: post.postID,
            title: post.title,
            description: post.description,
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
        },
        questions,
        images,
    }
    if(product.productType === "vehicle"){
        vehicle = await vehiclesService.findByPk(product.vehicleID);
        console.log("vehicle: ",vehicle)
        version = await versionsService.findByPk(vehicle.versionID);
        postData.post.versionID = version.versionID;
        postData.post.versionName = version.versionName;
        postData.post.gearType = version.gearType;
        postData.post.year = version.year;
        postData.post.kilometers = version.kilometers;
        postData.post.color = version.color;
    }
    else if(product.productType === "part"){
        part = await partsService.findByPk(product.partID);
        postData.post.versionID = version.versionID;
        postData.post.partSerialNumber = version.partSerialNumber;
        postData.post.car = version.car;
        postData.post.motorcycle = version.motorcycle;
        postData.post.pickup = version.pickup;
        postData.post.truck = version.truck;
    }
    //console.log(postData)
    return postData;
}

module.exports = getPostData