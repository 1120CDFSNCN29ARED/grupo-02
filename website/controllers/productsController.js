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


let product = "";
const productsController = {
    details: (req, res) => {
        const vehicles = jsonReader(vehiclesFilePath);
        const parts = JSON.parse(fs.readFileSync(partsFilePath, 'utf-8'));
        const questions = JSON.parse(fs.readFileSync(questionsFilePath, 'utf-8'));
        const productID = parseInt(req.params.productID, 10);
        const productQuestions = questions.filter(question => question.adID === productID);
        if(req.params.productType === "vehicle"){
            product = vehicles.find(vehicle => vehicle.adID === productID);
        }
        else if(req.params.productType === "part"){
            product = parts.find(part => part.adID === productID);
        }
        res.render("productDetails",
        {
            productType: req.params.productType,
            productID: productID,
            product: product,
            questions: productQuestions
        });
    },
    question: (req, res) => {
        const questions = JSON.parse(fs.readFileSync(questionsFilePath, 'utf-8'));
        const productID = parseInt(req.params.productID, 10);
        const newID = questions.length > 0 ? questions[questions.length - 1].questionID + 1 : 1;
		const newQuestion = {
			questionID: newID,
			adID: productID,
            userName: "santi",//change to logged in user
			question: req.body.question,
			answer: ""
		}
		questions.push(newQuestion);
		
		fs.writeFileSync(questionsFilePath, JSON.stringify(questions));

		res.redirect("/products/details/" + req.params.productType + "/" + productID);
    },
    create: (req, res) => {        
        res.render("createProduct", { brands:brands, mmav:mmav, productType: req.params.productType, product: {}});
    },
    store: (req, res) => {
        res.send("guardado de producto nuevo");
    },
    edit: (req, res) => {
        const vehicles = JSON.parse(fs.readFileSync(vehiclesFilePath, 'utf-8'));
        const parts = JSON.parse(fs.readFileSync(partsFilePath, 'utf-8'));
        const productID = parseInt(req.params.productID, 10);
        const productType = req.params.productType
        if(productType === "vehicle"){
            product = vehicles.find(vehicle => vehicle.adID === productID);
        }
        else if(productType === "part"){
            product = parts.find(part => part.adID === productID);
        }
        
        res.render("editProduct",
        {
            productType: productType,
            product: product,
            brands: brands,
            mmav: mmav
        });
    },
    update: (req, res) => {
        const vehicles = JSON.parse(fs.readFileSync(vehiclesFilePath, 'utf-8'));
        const parts = JSON.parse(fs.readFileSync(partsFilePath, 'utf-8'));
        const productID = parseInt(req.params.productID, 10);
        const productType = req.params.productType
        /*if(productType === "vehicle"){
            product = vehicles.find(vehicle => vehicle.adID === productID);
            product.type = req.body.vehicleType;
            product.published = req.body.;
            product.onSale.status = req.body.;
            product.onSale.discount = req.body.;
            product.brand = req.body.vehicleBrand;
            product.model = req.body.vehicleModel;
            product.version = req.body.vehicleVersion;
            product.gearType = req.body.;
            product.year = req.body.vehicleYear;
            product.state = req.body.vehicleState;
            product.rating = req.body.rating;
            product.kilometers = req.body.vehicelKMs;
            product.color = req.body.vehicleColor;
            product.location.province = req.body.vehicleProvince;
            product.location.city = req.body.vehicleCity;
            product.location.neighbourhood = req.body.vehicleNeighbourhood;
            product.location.postalCode = req.body.vehiclePostalCode;
            product.imageURLs[0] = req.body.vehicleImage1;
            product.imageURLs[1] = req.body.vehicleImage2;
            product.imageURLs[2] = req.body.vehicleImage3;
            product.price = req.body.vehicelPrice;
            product.description = req.body.vehicleDescription;
        }
        else if(productType === "part"){
            product = parts.find(part => part.adID === productID);
        }*/
        

        res.redirect("/products/details/" + req.params.productType + "/" + productID);
    },
}

module.exports = productsController;