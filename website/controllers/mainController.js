const { DH_CHECK_P_NOT_PRIME } = require('constants');
const fs = require('fs');
const path = require("path");

const vehiclesFilePath = path.join(__dirname, '../json/vehicles.json');
const partsFilePath = path.join(__dirname, '../json/parts.json');
const mmav = require('./mmav.js');
const vehicleBrandsFilePath = path.join(__dirname, "../json/vehicleBrands.json");
const vehicleModelsFilePath = path.join(__dirname, "../json/vehicleModels.json");
const vehicleVersionsFilePath = path.join(__dirname, "../json/vehicleVersions.json");

const partBrandsFilePath = path.join(__dirname, "../json/partBrands.json");
const partModelsFilePath = path.join(__dirname, "../json/partModels.json");

const jsonReader = filePath => JSON.parse(fs.readFileSync(filePath, 'utf-8'));


/*
const questions = require("../json/questions.json");
const vehicles = require("../json/vehicles.json");
const parts = require("../json/parts.json");
*/

const mainController = {
    index: (req, res) => {   
        const vehicles = jsonReader(vehiclesFilePath);
        const publishedVehicles = vehicles.filter(vehicle => vehicle.published === true);
        const parts = jsonReader(partsFilePath);
        const publishedParts = parts.filter(part => part.published === true);
        
        const vehicleBrands = jsonReader(vehicleBrandsFilePath);
        const vehicleModels = jsonReader(vehicleModelsFilePath);
        const vehicleVersions = jsonReader(vehicleVersionsFilePath);

        const partBrands = jsonReader(partBrandsFilePath);
        const partModels = jsonReader(partModelsFilePath);



        res.render("index", { mmav, vehicleBrands, vehicleModels, vehicleVersions, partBrands, partModels, vehicles: publishedVehicles, parts: publishedParts});
     },    
};

module.exports = mainController;
