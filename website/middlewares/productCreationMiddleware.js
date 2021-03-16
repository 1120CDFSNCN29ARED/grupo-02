const { body, check, oneOf, validationResult } = require('express-validator');
const Vehicle = require('../models/Vehicle');
const Part = require('../models/Part');
const fs = require("fs");
const path = require("path");
const productsController = require('../controllers/productsController');
const { json } = require('express');

const jsonReader = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf-8"));

const vehicleBrandsFilePath = path.join(__dirname,"../json/vehicleBrands.json");
const vehicleModelsFilePath = path.join(__dirname,"../json/vehicleModels.json");
const vehicleVersionsFilePath = path.join(__dirname,"../json/vehicleVersions.json");

const partBrandsFilePath = path.join(__dirname, "../json/partBrands.json");
const partModelsFilePath = path.join(__dirname, "../json/partModels.json");

const productCreationValidator = (req, res, next) => {
    let productValidator = [];
    if(req.params.productType === "vehicle") {
       return productValidator = [
            body("vehicleType").notEmpty().withMessage("Debe seleccionar un tipo de vehiculo"),
            body("vehicleBrand").notEmpty().withMessage("Debe seleccionar una marca"),
            body("vehicleVersion").notEmpty().withMessage("Debe seleccionar una versión"),
            body("vehicleYear").notEmpty().withMessage("Debe seleccionar un año"),
            body("vehicleState").notEmpty().withMessage("Debe seleccionar un estado"),
            body("rating").notEmpty().withMessage("Debe ingresar un rating").bail()
            .isNumeric().withMessage("Debe ingresar un número (entre 0 y 5)").isIn([0,1,2,3,4,5]),
            body("vehicleGearType").notEmpty().withMessage("Debe seleccionar un tipo de caja de cambios"),
            body("vehicleKMs").notEmpty().withMessage("Debe ingresar los kilometros").bail()
            .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: -1 }).withMessage("Debe ingresar un número mayor a cero"),
            body("vehiclePrice").notEmpty().withMessage("Debe ingresar el precio").bail()
            .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
            body("discount").notEmpty().withMessage("Debe ingresar el descuento. Si no desea aplicar un descuento, ingrese 0").bail()
            .isNumeric().withMessage("Debe ingresar un número").bail().isFloat({ gt: 0, lt: 100 }).withMessage("Debe ingresar un número entre 0 y 100"),
            body("vehicleColor").notEmpty().withMessage("Debe seleccionar un color"),
            body("vehicleColorInterior").notEmpty().withMessage("Debe seleccionar un color"),
            body("vehicleProvince").notEmpty().withMessage("Debe ingresar la provincia").bail().isAlpha().withMessage("Debe ingresar una provincia válida"),
            body("vehicleCity").notEmpty().withMessage("Debe ingresar la ciudad"),
            body("vehicleNeighbourhood").notEmpty().withMessage("Debe ingresar el barrio"),
            body("vehiclePostalCode").notEmpty().withMessage("Debe ingresar el código postal"),
            body("vehicleDescription").notEmpty().withMessage("Debe ingresar una descripción"),
            body("vehicleModel").notEmpty().withMessage("Debe seleccionar un modelo"),
        ];
    }
    else if(req.params.productType === "part") {
       return productValidator = [
            body("partTitle").notEmpty().withMessage("Debe ingresar un título"),
            body("partBrand").notEmpty().withMessage("Debe seleccionar una marca"),
            body("partModel").notEmpty().withMessage("Debe seleccionar una versión"),
            body("partID").notEmpty().withMessage("Debe ingresar un número de parte"),
            body("partVehicleType").notEmpty().withMessage("Debe seleccionar al menos un tipo de vehículo al que corresponde la parte"),
            body("rating").notEmpty().withMessage("Debe ingresar un rating").bail()
            .isNumeric().withMessage("Debe ingresar un número (entre 0 y 5)").isIn([0,1,2,3,4,5]),
            body("partState").notEmpty().withMessage("Debe seleccionar un estado"),
            body("partPrice").notEmpty().withMessage("Debe ingresar el precio").bail()
            .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
            body("discount").notEmpty().withMessage("Debe ingresar el descuento. Si no desea aplicar un descuento, ingrese 0").bail()
            .isNumeric().withMessage("Debe ingresar un número").bail().isFloat({ gt: 0, lt: 100 }).withMessage("Debe ingresar un número entre 0 y 100"),
            body("stock").notEmpty().withMessage("Debe ingresar la cantidad de stock"),
            body("partProvince").notEmpty().withMessage("Debe ingresar la provincia").bail().isAlpha().withMessage("Debe ingresar una provincia válida"),
            body("partCity").notEmpty().withMessage("Debe ingresar la ciudad"),
            body("partNeighbourhood").notEmpty().withMessage("Debe ingresar el barrio"),
            body("partPostalCode").notEmpty().withMessage("Debe ingresar el código postal"),
            body("partDescription").notEmpty().withMessage("Debe ingresar una descripción"),
        ];
    }
    //console.log(req.productValidator)
    next()
    //return productValidator;
}
const productCreationValidation = (req, res, next) => {
    console.log("llegue a la segunda funcion")
    console.log(req.productValidator)
    const errors = validationResult(req);
    console.log(errors)
    if (errors.isEmpty()) {
        //return next();
    }
    const validationErrors = errors.mapped();
    if (req.params.productType === "vehicle") {
            brands = jsonReader(vehicleBrandsFilePath);
            models = jsonReader(vehicleModelsFilePath);
            versions = jsonReader(vehicleVersionsFilePath);
            console.log(validationErrors)
            return res.render("createProduct", { brands, models, versions, productType: "vehicle",errors: validationErrors, old: req.body});
    }
    else if (req.params.productType === "vehicle") {
            brands = jsonReader(vehicleBrandsFilePath);
            console.log(validationErrors)
            return res.render("createProduct", { brands, productType: "part",errors: validationErrors, old: req.body});
    }
}

const vehicleCreationValidator = [
    body("vehicleType").notEmpty().withMessage("Debe seleccionar un tipo de vehiculo"),
    body("vehicleBrand").notEmpty().withMessage("Debe seleccionar una marca"),
    body("vehicleVersion").notEmpty().withMessage("Debe seleccionar una versión"),
    body("vehicleYear").notEmpty().withMessage("Debe seleccionar un año"),
    body("vehicleState").notEmpty().withMessage("Debe seleccionar un estado"),
    body("rating").notEmpty().withMessage("Debe ingresar un rating").bail()
    .isNumeric().withMessage("Debe ingresar un número (entre 0 y 5)").isIn([0,1,2,3,4,5]),
    body("vehicleGearType").notEmpty().withMessage("Debe seleccionar un tipo de caja de cambios"),
    body("vehicleKMs").notEmpty().withMessage("Debe ingresar los kilometros").bail()
    .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: -1 }).withMessage("Debe ingresar un número mayor a cero"),
    body("vehiclePrice").notEmpty().withMessage("Debe ingresar el precio").bail()
    .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
    body("discount").notEmpty().withMessage("Debe ingresar el descuento. Si no desea aplicar un descuento, ingrese 0").bail()
    .isNumeric().withMessage("Debe ingresar un número").bail().isFloat({ gt: 0, lt: 100 }).withMessage("Debe ingresar un número entre 0 y 100"),
    body("vehicleColor").notEmpty().withMessage("Debe seleccionar un color"),
    body("vehicleColorInterior").notEmpty().withMessage("Debe seleccionar un color"),
    body("vehicleProvince").notEmpty().withMessage("Debe ingresar la provincia").bail().isAlpha().withMessage("Debe ingresar una provincia válida"),
    body("vehicleCity").notEmpty().withMessage("Debe ingresar la ciudad"),
    body("vehicleNeighbourhood").notEmpty().withMessage("Debe ingresar el barrio"),
    body("vehiclePostalCode").notEmpty().withMessage("Debe ingresar el código postal"),
    body("vehicleDescription").notEmpty().withMessage("Debe ingresar una descripción"),
    body("vehicleModel").notEmpty().withMessage("Debe seleccionar un modelo"),
];

const vehicleCreationValidation = (req, res, next) => {
    console.log("llegue a validacion")
    const errors = validationResult(req);
    if (errors.isEmpty()) {
		return next();
	}
    brands = jsonReader(vehicleBrandsFilePath);
    models = jsonReader(vehicleModelsFilePath);
    versions = jsonReader(vehicleVersionsFilePath);
	const validationErrors = errors.mapped();
    //console.log(req)
    console.log(req.url)
    //console.log(validationErrors)
    if(req.url.includes("create")){
        return res.render("createProduct", { brands, models, versions, productType: "vehicle",errors: validationErrors, old: req.body});
    }
	else if(req.url.includes("edit")){
        const vehicle = Vehicle.findVehicleByPk(parseInt(req.params.productID, 10))
        console.log("llegue aca")
        return res.render("editProduct", { brands, models, versions, productType: "vehicle",errors: validationErrors, product: vehicle});
    }
}

const partCreationValidator = [
    body("partTitle").notEmpty().withMessage("Debe ingresar un título"),
    body("partBrand").notEmpty().withMessage("Debe seleccionar una marca"),
    body("partModel").notEmpty().withMessage("Debe seleccionar una versión"),
    body("partID").notEmpty().withMessage("Debe ingresar un número de parte"),
    body("rating").notEmpty().withMessage("Debe ingresar un rating").bail()
    .isNumeric().withMessage("Debe ingresar un número (entre 0 y 5)").isIn([0,1,2,3,4,5]),
    body("partState").notEmpty().withMessage("Debe seleccionar un estado"),
    body("partPrice").notEmpty().withMessage("Debe ingresar el precio").bail()
    .isNumeric().withMessage("Debe ingresar un número").bail().isInt({ gt: 0 }).withMessage("Debe ingresar un número mayor a cero"),
    body("discount").notEmpty().withMessage("Debe ingresar el descuento. Si no desea aplicar un descuento, ingrese 0").bail()
    .isNumeric().withMessage("Debe ingresar un número").bail().isFloat({ gt: -1, lt: 100 }).withMessage("Debe ingresar un número entre 0 y 100"),
    body("stock").notEmpty().withMessage("Debe ingresar la cantidad de stock"),
    body("partProvince").notEmpty().withMessage("Debe ingresar la provincia").bail().isAlpha().withMessage("Debe ingresar una provincia válida"),
    body("partCity").notEmpty().withMessage("Debe ingresar la ciudad"),
    body("partNeighbourhood").notEmpty().withMessage("Debe ingresar el barrio"),
    body("partPostalCode").notEmpty().withMessage("Debe ingresar el código postal"),
    body("partDescription").notEmpty().withMessage("Debe ingresar una descripción"),
    oneOf([
        body("partVehicleTypeCar").exists(),
        body("partVehicleTypePickup").exists(),
        body("partVehicleTypeMotorcycle").exists(),
        body("partVehicleTypeTruck").exists(),
    ])
];

const partCreationValidation = (req, res, next) => {
    const brands = jsonReader(partBrandsFilePath);
    const models = jsonReader(partModelsFilePath);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
		return next();
	}
	const validationErrors = errors.mapped();
	if(req.url.includes("create")){
        return res.render("createProduct", { brands, models, versions, productType: "part", productID: req.params.productID, errors: validationErrors, old: req.body});
    }
	else if(req.url.includes("edit")){
        const part = Part.findPartByPk(parseInt(req.params.productID, 10));        
        return res.render("editProduct", { brands, models, productType: "part", productID: req.params.productID, errors: validationErrors, product: part});
    }
}

//console.log(vehicleCreationValidator)
module.exports = {vehicleCreationValidator, vehicleCreationValidation, partCreationValidator, partCreationValidation};