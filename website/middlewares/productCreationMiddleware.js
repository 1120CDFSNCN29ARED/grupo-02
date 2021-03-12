const { body, validationResult } = require('express-validator');
const Vehicle = require('../models/Vehicle');
const fs = require("fs");
const path = require("path");
const productsController = require('../controllers/productsController');

const jsonReader = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf-8"));

const vehicleBrandsFilePath = path.join(__dirname,"../json/vehicleBrands.json");
const vehicleModelsFilePath = path.join(__dirname,"../json/vehicleModels.json");
const vehicleVersionsFilePath = path.join(__dirname,"../json/vehicleVersions.json");

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
    const errors = validationResult(req);
    if (errors.isEmpty()) {
		return next();
	}
    brands = jsonReader(vehicleBrandsFilePath);
    models = jsonReader(vehicleModelsFilePath);
    versions = jsonReader(vehicleVersionsFilePath);
	const validationErrors = errors.mapped();
    console.log(validationErrors)
	return res.render("createProduct", { brands, models, versions, productType: "vehicle",errors: validationErrors, old: req.body});
}

//console.log(vehicleCreationValidator)
module.exports = {vehicleCreationValidator, vehicleCreationValidation};