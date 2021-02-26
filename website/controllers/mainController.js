const { DH_CHECK_P_NOT_PRIME } = require('constants');
const fs = require('fs');
const path = require("path");

const vehiclesFilePath = path.join(__dirname, '../json/vehicles.json');
const partsFilePath = path.join(__dirname, '../json/parts.json');
const questionsFilePath = path.join(__dirname, '../json/questions.json');
const brandsFilePath = path.join(__dirname, '../json/brands.json');
const mmavFilePath = path.join(__dirname, '../json/mmav.json');


const jsonReader = filePath => JSON.parse(fs.readFileSync(filePath, 'utf-8'));


//const brands = fs.readFileSync(brandsFilePath, 'utf-8');
//const mmav = fs.readFileSync(mmavFilePath, 'utf-8');

/*
const questions = require("../json/questions.json");
const vehicles = require("../json/vehicles.json");
const parts = require("../json/parts.json");
*/
const brands = require("./brands");
const mmav = require("./mmav");


const mainController = {
    index: (req, res) => {   
        const vehicles = jsonReader(vehiclesFilePath);
        publishedVehicles = vehicles.filter(vehicle => vehicle.published === true);
        const parts = jsonReader(partsFilePath);
        publishedParts = parts.filter(part => part.published === true);
        console.log(publishedParts)
        res.render("index", { mmav, brands, vehicles: publishedVehicles, parts: publishedParts});
     },
    login: (req, res) => {
		res.render("login", {});
    },
    register: (req, res) => {
        res.render('register', {});
    },
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
