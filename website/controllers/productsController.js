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
        const parts = jsonReader(partsFilePath);
        const questions = jsonReader(questionsFilePath);
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
        const questions = jsonReader(questionsFilePath);
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
        const vehicles = jsonReader(vehiclesFilePath);
        const parts = jsonReader(partsFilePath);
        const productType = req.params.productType
        if(productType === "vehicle"){
            const newID = vehicles.length > 0 ? vehicles[vehicles.length - 1].adID + 1 : 1;
            let published = "";
            let onSaleStatus = "";
            let onSaleDiscount = "";
            if(req.body.submit === "publish"){
                published = true;
            }
            else if(req.body.submit === "save") {
                published = false;
            }
            
            if(req.body.discount >= 0){
                onSaleStatus = true;
                onSaleDiscount = Number(req.body.discount);
            }
            else {
                onSaleStatus = false;
                onSaleDiscount = 0;
            }

            let product = {
                adID: newID,
                type: req.body.vehicleType,
                published: published,
                onSale: {
                    status: onSaleStatus,
                    discount: onSaleDiscount
                },
                brand: req.body.vehicleBrand,
                model: req.body.vehicleModel,
                version: req.body.vehicleVersion,
                gearType: req.body.vehicleGearType,
                year: req.body.vehicleYear,
                state: req.body.vehicleState,
                rating: req.body.rating,
                kilometers: Number(req.body.vehicleKMs),
                color: req.body.vehicleColor,
                location: {
                    province: req.body.vehicleProvince,
                    city: req.body.vehicleCity,
                    neighbourhood: req.body.vehicleNeighbourhood,
                    postalCode: req.body.vehiclePostalCode,
                },
                imageURLs: [req.body.vehicleImage1, req.body.vehicleImage2, req.body.vehicleImage3],
                price: Number(req.body.vehiclePrice),
                description: req.body.vehicleDescription,
            };

            vehicles.push(product);
            console.log(product)
            //fs.writeFileSync(vehiclesFilePath, JSON.stringify(vehicles));

            //res.redirect("/products/details/" + req.params.productType + "/" + newID);

        }
        else if(productType === "part"){
            let product = {};
            const newID = parts.length > 0 ? parts[parts.length - 1].adID + 1 : 1;
            product.adID = newID
            product.type = "part";
            if(req.body.submit === "publish"){
                product.published = true;
            }
            else if(req.body.submit === "save") {
                product.published = false;
            }
            if(req.body.discount >= 0){
                product.onSale.status = true;
                product.onSale.discount = Number(req.body.discount);
            }
            else {
                product.onSale.status = false;
                product.onSale.discount = 0;
            }
            product.partBrand = req.body.partBrand;
            product.partModel = req.body.partModel;
            product.stock = req.body.stock;
            product.title = req.body.partTitle;
            product.state = req.body.partState;
            product.rating = req.body.rating;
            product.partID = req.body.partID;
            product.vehicleType.car = req.body.partVehicleTypeCar;
            product.vehicleType.pickup = req.body.partVehicleTypePickup;
            product.vehicleType.motorcycle = req.body.partVehicleTypeMotorcycle;
            product.vehicleType.truck = req.body.partVehicleTypeTruck;
            product.location.province = req.body.partProvince;
            product.imageURLs[1] = req.body.partCity;
            product.location.city = req.body.partNeighbourhood;
            product.location.neighbourhood = req.body.partPrice;
            product.location.postalCode = req.body.partPostalCode;
            product.imageURLs[0] = req.body.partImage1;
            product.imageURLs[1] = req.body.partImage2;
            product.imageURLs[2] = req.body.partImage3;
            product.price = Number(req.body.partPrice);
            product.description = req.body.partDescription;

            parts.push(product);
            console.log(product)
            res.redirect("/products/details/" + req.params.productType + "/" + newID);
            //fs.writeFileSync(partsFilePath, JSON.stringify(parts));
        }
        
        
    },
    edit: (req, res) => {
        const vehicles = jsonReader(vehiclesFilePath);
        const parts = jsonReader(partsFilePath);
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
        const vehicles = jsonReader(vehiclesFilePath);
        const parts = jsonReader(partsFilePath);
        const productID = parseInt(req.params.productID, 10);
        const productType = req.params.productType
        if(productType === "vehicle"){
            product = vehicles.find(vehicle => vehicle.adID === productID);
            product.type = req.body.vehicleType;
            if(req.body.submit === "publish"){
                product.published = true;
            }
            else if(req.body.submit === "save") {
                product.published = false;
            }
            if(req.body.discount >= 0){
                product.onSale.status = true;
                product.onSale.discount = Number(req.body.discount);
            }
            else {
                product.onSale.status = false;
                product.onSale.discount = 0;
            }
            product.brand = req.body.vehicleBrand;
            product.model = req.body.vehicleModel;
            product.version = req.body.vehicleVersion;
            product.gearType = req.body.vehicleGearType;//
            product.year = req.body.vehicleYear;
            product.state = req.body.vehicleState;
            product.rating = req.body.rating;
            product.kilometers = Number(req.body.vehicleKMs);
            product.color = req.body.vehicleColor;
            product.location.province = req.body.vehicleProvince;
            product.location.city = req.body.vehicleCity;
            product.location.neighbourhood = req.body.vehicleNeighbourhood;
            product.location.postalCode = req.body.vehiclePostalCode;
            product.imageURLs[0] = req.body.vehicleImage1;
            product.imageURLs[1] = req.body.vehicleImage2;
            product.imageURLs[2] = req.body.vehicleImage3;
            product.price = Number(req.body.vehiclePrice);
            product.description = req.body.vehicleDescription;
            
            //fs.writeFileSync(vehiclesFilePath, JSON.stringify(vehicles));

        }
        else if(productType === "part"){
            product = parts.find(part => part.adID === productID);
            product.type = "part";
            if(req.body.submit === "publish"){
                product.published = true;
            }
            else if(req.body.submit === "save") {
                product.published = false;
            }
            if(req.body.discount >= 0){
                product.onSale.status = true;
                product.onSale.discount = Number(req.body.discount);
            }
            else {
                product.onSale.status = false;
                product.onSale.discount = 0;
            }
            product.partBrand = req.body.partBrand;
            product.partModel = req.body.partModel;
            product.stock = req.body.stock;
            product.title = req.body.partTitle;
            product.state = req.body.partState;
            product.rating = req.body.rating;
            product.partID = req.body.partID;
            product.vehicleType.car = req.body.partVehicleTypeCar;
            product.vehicleType.pickup = req.body.partVehicleTypePickup;
            product.vehicleType.motorcycle = req.body.partVehicleTypeMotorcycle;
            product.vehicleType.truck = req.body.partVehicleTypeTruck;
            product.location.province = req.body.partProvince;
            product.imageURLs[1] = req.body.partCity;
            product.location.city = req.body.partNeighbourhood;
            product.location.neighbourhood = req.body.partPrice;
            product.location.postalCode = req.body.partPostalCode;
            product.imageURLs[0] = req.body.partImage1;
            product.imageURLs[1] = req.body.partImage2;
            product.imageURLs[2] = req.body.partImage3;
            product.price = Number(req.body.partPrice);
            product.description = req.body.partDescription;
            //fs.writeFileSync(partsFilePath, JSON.stringify(parts));
        }
        

        //res.redirect("/products/details/" + req.params.productType + "/" + productID);
    },
    delete: (req, res) => {
        const productType = req.params.productType
        let products = ""
        console.log(productType)
        if(productType === "vehicle"){
            products = jsonReader(vehiclesFilePath);
        }
        else if(productType === "part"){
            products = jsonReader(partsFilePath);
        }        

		const productIndex = products.findIndex(product => product.adID === parseInt(req.params.productID, 10))

		products.splice(productIndex, 1);
        if(productType === "vehicle"){
            //fs.writeFileSync(vehiclesFilePath, JSON.stringify(products));
        }
        else if(productType === "part"){
            //fs.writeFileSync(vehiclesFilePath, JSON.stringify(products));
        }
		console.log(products)
		res.redirect("/");
    }
}

module.exports = productsController;