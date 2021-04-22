const { body, validationResult } = require('express-validator');
const brandsService = require('../services/brandsService');
const modelsService = require('../services/modelsService');
const localitiesService = require('../services/localitiesService');
const versionsService = require('../services/versionsService');
const getPostData = require('./getPostData');
const { registrationValidation } = require('./registrationValidator');

const postCreationValidator = (req, res, next) => {
    console.log(req.body)
    const postCreationValidator = [
        body("title").isEmpty().withMessage("Debe ingresar un título"),
        body("description").isEmpty().withMessage("Debe ingresar una descripción"),
        body("brandID").isEmpty().withMessage("Debe seleccionar una marca").bail()
            .custom(async (value, { req }) => {
                const brand = await brandsService.findByPk(value).catch(error => error);
                if (!brand) {
                    return Promise.reject("La marca es inválida");
                }
                return brand;
        }),
        body("modelID").isEmpty().withMessage("Debe seleccionar un modelo").bail()
            .custom(async (value, { req }) => {
                const model = await modelsService.findByPk(value).catch(error => error);
                if (!model || model.brandID !== req.body.brandID) {
                    return Promise.reject("El modelo es inválido");
                }
                return model;
        }).bail(),
        body("state").isEmpty().withMessage("Debe seleccionar un estado"),
        body("stock").isEmpty().withMessage("Debe ingresar la cantidad de stock").isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
        body("rating").isEmpty().withMessage("Debe ingresar un rating").bail()
        .isNumeric().isIn([0,1,2,3,4,5]).withMessage("Debe ingresar un número (entre 0 y 5)"),
        body("price").isEmpty().withMessage("Debe ingresar el precio").bail()
        .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
        body("discount").isEmpty().withMessage("Debe ingresar el descuento. Si no desea aplicar un descuento, ingrese 0").bail()
        .isNumeric().withMessage("Debe ingresar un número").bail().isFloat({ gt: 0, lt: 100 }).withMessage("Debe ingresar un número entre 0 y 100"),
        body("locationID").isEmpty().withMessage("Debe ingresar la ciudad").bail()
            .custom(async (value, { req }) => {
                const locality = await localitiesService.findByPk(value).catch(error => error);
                if (!locality) {
                    return Promise.reject("La ciudad ingresada es inválida");
                }
                return locality;
        }).bail(),
        body("postalCode").isEmpty().withMessage("Debe ingresar el código postal"),
    ];
    if(req.params.productType === "vehicle"){
        postCreationValidator.push(
            body("type").isEmpty().withMessage("Debe seleccionar un tipo de vehiculo"),
            body("versionID").isEmpty().withMessage("Debe seleccionar una versión").bail()
                .custom(async (value, { req }) => {
                    const version = await versionsService.findByPk(value).catch(error => error);
                    if (!version || version.modelID !== req.body.modelID) {
                        return Promise.reject("La versión ingresada es inválida");
                    }
                    return version;
            }).bail(),
            body("year").isEmpty().withMessage("Debe seleccionar un año"),
            body("gearType").isEmpty().withMessage("Debe seleccionar un tipo de caja de cambios").bail().isAlpha().isIn(["automática", "manual"]).withMessage("Debe ingresar automática o manual"),
            body("color").isEmpty().withMessage("Debe seleccionar un color"),
            body("kilometers").isEmpty().withMessage("Debe ingresar los kilometros").bail()
            .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: -1 }).withMessage("Debe ingresar un número mayor a cero"),
        );
    }
    else if(req.params.productType === "part"){
        postCreationValidator.push(
            body("partSerialNumber").isEmpty().withMessage("Debe ingresar un número de parte"),
            body("vehicleType").isEmpty().withMessage("Debe seleccionar al menos un tipo de vehículo al que corresponde la parte"),
        );
    }
    return postCreationValidator;
    next();
}

const postCreationValidation = async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (errors.isEmpty()) {
		return next();
	}
    else{
        if(req.url.includes("create")){
            const brands = await brandsService.findAll();
            return res.render("createPost", { brands, productType: req.params.productType, errors: validationErrors, old: req.body});
        }
        else if(req.url.includes("edit")){
            const post = getPostData(req.params.postID);
            const brands = await brandsService.findAll();
            return res.render("editPost", { brands, productType: req.params.productType, errors: validationErrors, post});
        }
    }
}

module.exports = {postCreationValidator, postCreationValidation};