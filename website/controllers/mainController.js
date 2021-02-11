const mmav = require("./mmav");
const brands = require("./brands")

const vehicles = require("../json/vehicles.json");
const mainController = {
    index: (req, res) => {                        
        res.render("index", { 'mmav': mmav ,'brands':brands,'vehicles':vehicles});
     },
    login: (req, res) => {
		res.render("login", {});
    },
    register: (req, res) => {
        res.render('register', {});
    },
    search: (req,res) => { 
        res.render('search', {});
    },
};

module.exports = mainController;
