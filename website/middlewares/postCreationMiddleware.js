const { body, validationResult } = require('express-validator');
const brandsService = require('../services/brandsService');
const modelsService = require('../services/modelsService');
const localitiesService = require('../services/localitiesService');
const versionsService = require('../services/versionsService');
const getPostData = require('./getPostData');
const provincesServices = require('../services/provincesService');

const vehiclePostCreationValidator = () => {
    const postCreationValidator = [
        body("title").notEmpty().withMessage("Debe ingresar un título"),
        body("description").notEmpty().withMessage("Debe ingresar una descripción"),
        body("brandID").notEmpty().withMessage("Debe seleccionar una marca").bail()
            .custom(async (value) => {
                const brand = await brandsService.findByPk(value).catch(error => error);
                if (!brand) {
                    return Promise.reject("La marca es inválida");
                }
                return brand;
        }),
        body("modelID").notEmpty().withMessage("Debe seleccionar un modelo").bail()
            .custom(async (value) => {
                const model = await modelsService.findByPk(value).catch(error => error);
                if (!model) {
                    return Promise.reject("El modelo es inválido");
                }
                return model;
        }).bail(),
        body("state").notEmpty().withMessage("Debe seleccionar un estado"),
        body("stock").notEmpty().withMessage("Debe ingresar la cantidad de stock").isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
        body("rating").notEmpty().withMessage("Debe ingresar un rating").bail()
        .isNumeric().isIn([0,1,2,3,4,5]).withMessage("Debe ingresar un número (entre 0 y 5)"),
        body("price").notEmpty().withMessage("Debe ingresar el precio").bail()
        .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
        body("discount").notEmpty().withMessage("Debe ingresar el descuento. Si no desea aplicar un descuento, ingrese 0").bail()
        .isNumeric().withMessage("Debe ingresar un número").bail().isFloat({ gt: -1, lt: 100 }).withMessage("Debe ingresar un número entre 0 y 100"),
        body("provinceID").notEmpty().withMessage("Debe ingresar la provincia").bail(),
        body("locationID").notEmpty().withMessage("Debe ingresar la ciudad").bail()
            .custom(async (value) => {
                const locality = await localitiesService.findByPk(value).catch(error => error);
                if (!locality) {
                    return Promise.reject("La ciudad ingresada es inválida");
                }
                return locality;
        }).bail(),
        body("postalCode").notEmpty().withMessage("Debe ingresar el código postal"),
        body("type").notEmpty().withMessage("Debe seleccionar un tipo de vehiculo"),
        body("versionID").notEmpty().withMessage("Debe seleccionar una versión").bail()
            .custom(async (value) => {
                const version = await versionsService.findByPk(value).catch(error => error);
                if (!version) {
                    return Promise.reject("La versión ingresada es inválida");
                }
                return version;
        }).bail(),
        body("year").notEmpty().withMessage("Debe seleccionar un año"),
        body("gearType").notEmpty().withMessage("Debe seleccionar un tipo de caja de cambios").bail().isIn(["automática","manual"]).withMessage("Debe ingresar automática o manual"),
        body("color").notEmpty().withMessage("Debe seleccionar un color"),
        body("kilometers").notEmpty().withMessage("Debe ingresar los kilometros").bail()
        .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: -1 }).withMessage("Debe ingresar un número mayor a cero"),
    ];
    return postCreationValidator;
}

const vehiclePostCreationValidation = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
		return next();
	}
    else{
        if(req.url.includes("create")){
            const brands = await brandsService.findAll();
            const provinces = await provincesServices.findAll();
            return res.render("createPost", { brands, provinces, productType: "vehicle", errors: errors.mapped(), old: req.body});
        }
        else if(req.url.includes("edit")){
            const post = await getPostData(req.params.postID);
            const brands = await brandsService.findAll();
            const provinces = await provincesServices.findAll();
            return res.render("editPost", { brands, provinces, productType: "vehicle", errors: errors.mapped(), post});
        }
    }
}

const partPostCreationValidator = () => {
    const postCreationValidator = [
        body("title").notEmpty().withMessage("Debe ingresar un título"),
        body("description").notEmpty().withMessage("Debe ingresar una descripción"),
        body("brandID").notEmpty().withMessage("Debe seleccionar una marca").bail()
            .custom(async (value) => {
                const brand = await brandsService.findByPk(value).catch(error => error);
                if (!brand) {
                    return Promise.reject("La marca es inválida");
                }
                return brand;
        }),
        body("modelID").notEmpty().withMessage("Debe seleccionar un modelo").bail()
            .custom(async (value) => {
                const model = await modelsService.findByPk(value).catch(error => error);
                if (!model) {
                    return Promise.reject("El modelo es inválido");
                }
                return model;
        }).bail(),
        body("state").notEmpty().withMessage("Debe seleccionar un estado"),
        body("stock").notEmpty().withMessage("Debe ingresar la cantidad de stock").isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
        body("rating").notEmpty().withMessage("Debe ingresar un rating").bail()
        .isNumeric().isIn([0,1,2,3,4,5]).withMessage("Debe ingresar un número (entre 0 y 5)"),
        body("price").notEmpty().withMessage("Debe ingresar el precio").bail()
        .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
        body("discount").notEmpty().withMessage("Debe ingresar el descuento. Si no desea aplicar un descuento, ingrese 0").bail()
        .isNumeric().withMessage("Debe ingresar un número").bail().isFloat({ gt: -1, lt: 100 }).withMessage("Debe ingresar un número entre 0 y 100"),
        body("locationID").notEmpty().withMessage("Debe ingresar la ciudad").bail()
            .custom(async (value) => {
                const locality = await localitiesService.findByPk(value).catch(error => error);
                if (!locality) {
                    return Promise.reject("La ciudad ingresada es inválida");
                }
                return locality;
        }).bail(),
        body("postalCode").notEmpty().withMessage("Debe ingresar el código postal"),
        body("partSerialNumber").notEmpty().withMessage("Debe ingresar un número de parte"),
        //body("vehicleType").notEmpty().withMessage("Debe seleccionar al menos un tipo de vehículo al que corresponde la parte"),
    ];
    return postCreationValidator;
}

const partPostCreationValidation = async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (errors.isEmpty()) {
		return next();
	}
    else{
        if(req.url.includes("create")){
            const brands = await brandsService.findByProductType({makesParts: true});
            return res.render("createPost", { brands, productType: "part", errors: validationErrors, old: req.body});
        }
        else if(req.url.includes("edit")){
            const post = getPostData(req.params.postID);
            const brands = await brandsService.findByProductType({makesParts: true});
            return res.render("editPost", { brands, productType: "part", errors: validationErrors, post});
        }
    }
}

module.exports = {vehiclePostCreationValidator, vehiclePostCreationValidation, partPostCreationValidator, partPostCreationValidation};