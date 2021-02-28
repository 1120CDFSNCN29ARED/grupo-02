const { DH_CHECK_P_NOT_PRIME } = require('constants');
const fs = require('fs');
const path = require("path");

const vehiclesFilePath = path.join(__dirname, '../json/vehicles.json');
const partsFilePath = path.join(__dirname, '../json/parts.json');
const questionsFilePath = path.join(__dirname, '../json/questions.json');
const mmav = require('./mmav.js');
const brandsFilePath = path.join(__dirname, '../json/brands.json');
const modelsFilePath = path.join(__dirname, '../json/models.json');
const versionsFilePath = path.join(__dirname, '../json/versions.json');

const jsonReader = filePath => JSON.parse(fs.readFileSync(filePath, 'utf-8'));


const brands = jsonReader(brandsFilePath);
const models = jsonReader(modelsFilePath);
const versions = jsonReader(versionsFilePath);

/*
const questions = require("../json/questions.json");
const vehicles = require("../json/vehicles.json");
const parts = require("../json/parts.json");
*/

const mainController = {
    index: (req, res) => {   
        const vehicles = jsonReader(vehiclesFilePath);
        publishedVehicles = vehicles.filter(vehicle => vehicle.published === true);
        const parts = jsonReader(partsFilePath);
        publishedParts = parts.filter(part => part.published === true);
        console.log(publishedParts)
        res.render("index", { mmav, brands, models, versions, vehicles: publishedVehicles, parts: publishedParts});
     },
    login: (req, res) => {
		res.render("login", {});
    },
    /* register: (req, res) => {
        res.render('register', {});
    }, */
    search: (req,res) => { 
        //Not implemented yet but this needs to return only the vehicles/products that match the query
        const vehicles = jsonReader(vehiclesFilePath);
        publishedVehicles = vehicles.filter(vehicle => vehicle.published === true);
        const parts = jsonReader(partsFilePath);
        publishedParts = parts.filter(part => part.published === true);
        res.render('search', { vehicles: publishedVehicles, parts: publishedParts });
    },    
};

module.exports = mainController;
