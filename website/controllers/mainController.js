const mmav = require("./mmav");
const brands = require("./brands")
const vehicles = require("../json/vehicles.json");
const parts = require("../json/parts.json");
const mainController = {
    index: (req, res) => {                        
        res.render("index", { 'mmav': mmav ,'brands':brands,'vehicles':vehicles,'parts':parts});
     },
    login: (req, res) => {
		res.render("login", {});
    },
    register: (req, res) => {
        res.render('register', {});
    },
    search: (req,res) => { 
        //Not implemented yet but this needs to return only the vehicles/products that match the query
        res.render('search', { 'vehicles': vehicles });
    },    
};

module.exports = mainController;
