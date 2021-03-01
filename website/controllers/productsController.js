const fs = require('fs');
const path = require("path");

const vehiclesFilePath = path.join(__dirname, '../json/vehicles.json');
const partsFilePath = path.join(__dirname, '../json/parts.json');
const questionsFilePath = path.join(__dirname, '../json/questions.json');
const vehicleBrandsFilePath = path.join(__dirname, "../json/vehicleBrands.json");
const vehicleModelsFilePath = path.join(__dirname, "../json/vehicleModels.json");
const vehicleVersionsFilePath = path.join(__dirname, "../json/vehicleVersions.json");

const partBrandsFilePath = path.join(__dirname, "../json/partBrands.json");
const partModelsFilePath = path.join(__dirname, "../json/partModels.json");


const jsonReader = filePath => JSON.parse(fs.readFileSync(filePath, 'utf-8'));


let product = {};
const productsController = {
    details: (req, res) => {
        const vehicles = jsonReader(vehiclesFilePath);
        const parts = jsonReader(partsFilePath);
        let brands = "";
        let models = "";
        let versions = "";
        let version = "";
        const questions = jsonReader(questionsFilePath);
        const productID = parseInt(req.params.productID, 10);
        const productQuestions = questions.filter(question => question.adID === productID);
        if(req.params.productType === "vehicle"){
            product = vehicles.find(vehicle => vehicle.adID === productID);
            brands = jsonReader(vehicleBrandsFilePath);
            models = jsonReader(vehicleModelsFilePath);
            versions = jsonReader(vehicleVersionsFilePath);
            version = versions.find(e => e.versionID === product.versionID);
        }
        else if(req.params.productType === "part"){
            product = parts.find(part => part.adID === productID);
            brands = jsonReader(vehicleBrandsFilePath);
            models = jsonReader(vehicleModelsFilePath);
        }
        const brand = brands.find(e => e.brandID === product.brandID);
        const model = models.find(e => e.modelID === product.modelID);
        res.render("productDetails",
        {
            productType: req.params.productType,
            productID: productID,
            product,
            questions: productQuestions,
            brand,
            model,
            version,
        });
    },
    question: (req, res) => {
        const questions = jsonReader(questionsFilePath);
        const productID = parseInt(req.params.productID, 10);
        
        const newID = questions.length > 0 ? questions[questions.length - 1].questionID + 1 : 1;
        const date = new Date();
        const questionDate = date.getDate() + "/" + date.getMonth() + "/" +  date.getFullYear();

		const newQuestion = {
			questionID: newID,
			adID: productID,
            userName: "santi",//change to logged in user
			question: req.body.question,
            questionDate: questionDate,
			answer: "",
            answerDate: ""
		}
		questions.push(newQuestion);
		fs.writeFileSync(questionsFilePath, JSON.stringify(questions, null, 4));
		res.redirect("/products/details/" + req.params.productType + "/" + productID);
    },
    create: (req, res) => {        
        const brands = jsonReader(brandsFilePath);
        const models = jsonReader(modelsFilePath);
        const versions = jsonReader(versionsFilePath);
        res.render("createProduct", {
            brands,
            models,
            versions,
            productType: req.params.productType,
            product: {},
        });
    },
    store: (req, res) => {
        const vehicles = jsonReader(vehiclesFilePath);
        const parts = jsonReader(partsFilePath);
        const productType = req.params.productType
        if(productType === "vehicle"){
            const newID = vehicles.length > 0 ? vehicles[vehicles.length - 1].adID + 1 : 1;
            let published = "";
            let publishedDate = "";
            let onSaleStatus = "";
            let onSaleDiscount = "";
            if(req.body.submit === "publish"){
                published = true;
                let date = new Date()
                publishedDate = date.getDate() + "/" + date.getMonth() + "/" +  date.getFullYear();
            }
            else if(req.body.submit === "save") {
                published = false;
            }
            
            if(Number(req.body.discount) > 0){
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
                publishedDate: publishedDate,
                featured: false,
                onSale: {
                    status: onSaleStatus,
                    discount: onSaleDiscount
                },
                brandID: Number(req.body.vehicleBrand),
                modelID: Number(req.body.vehicleModel),
                versionID: Number(req.body.vehicleVersion),
                gearType: req.body.vehicleGearType,
                year: Number(req.body.vehicleYear),
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

            fs.writeFileSync(vehiclesFilePath, JSON.stringify(vehicles, null, 4));
            res.redirect("/products/details/" + req.params.productType + "/" + newID);

        }
        else if(productType === "part"){
            const newID = parts.length > 0 ? parts[parts.length - 1].adID + 1 : 1;
            let published = "";
            let publishedDate = "";
            let onSaleStatus = "";
            let onSaleDiscount = "";
            if(req.body.submit === "publish"){
                published = true;
                let date = new Date()
                publishedDate = date.getDate() + "/" + date.getMonth() + "/" +  date.getFullYear();
            }
            else if(req.body.submit === "save") {
                published = false;
            }
            
            if(Number(req.body.discount) > 0){
                onSaleStatus = true;
                onSaleDiscount = Number(req.body.discount);
            }
            else {
                onSaleStatus = false;
                onSaleDiscount = 0;
            }
            let product = {
                adID: newID,
                type: "part",
                published: published,
                publishedDate: publishedDate,
                onSale: {
                    status: onSaleStatus,
                    discount: onSaleDiscount
                },
                brandID: Number(req.body.brand),
                modelID: Number(req.body.model),
                stock: Number(req.body.stock),
                title: req.body.partTitle,
                state: req.body.partState,
                rating: req.body.rating,
                partID: req.body.partID,
                vehicleType: {
                    car: req.body.partVehicleTypeCar,
                    pickup: req.body.partVehicleTypePickup,
                    motorcycle: req.body.partVehicleTypeMotorcycle,
                    truck: req.body.partVehicleTypeTruck,
                },
                location: {
                    province: req.body.partProvince,
                    city: req.body.partCity,
                    neighbourhood: req.body.partNeighbourhood,
                    postalCode: req.body.partPostalCode,
                },
                imageURLs: [req.body.partImage1, req.body.partImage2, req.body.partImage3],
                price: Number(req.body.partPrice),
                description: req.body.partDescription,
            }
            

            parts.push(product);
            //console.log(product)
            fs.writeFileSync(partsFilePath, JSON.stringify(parts, null, 4));
            res.redirect("/products/details/" + req.params.productType + "/" + newID);
            
        }
    },
    edit: (req, res) => {
        const vehicles = jsonReader(vehiclesFilePath);
        const parts = jsonReader(partsFilePath);
        const productID = parseInt(req.params.productID, 10);
        const productType = req.params.productType

        let brands = "";
        let models = "";
        let versions = "";

        if(productType === "vehicle"){
            product = vehicles.find(vehicle => vehicle.adID === productID);
            brands = jsonReader(vehicleBrandsFilePath);
            models = jsonReader(vehicleModelsFilePath);
            versions = jsonReader(vehicleVersionsFilePath);
        }
        else if(productType === "part"){
            product = parts.find(part => part.adID === productID);
            brands = jsonReader(partBrandsFilePath);
            models = jsonReader(partModelsFilePath);
        }
        
        res.render("editProduct",
        {
            productType: productType,
            product: product,
            brands: brands,
            models: models,
            versions: versions
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
                published = true;
                let date = new Date();
                publishedDate = date.getDate() + "/" + date.getMonth() + "/" +  date.getFullYear();
            }
            else if(req.body.submit === "save") {
                published = false;
                publishedDate = product.publishedDate;
            }
            if(req.body.discount >= 0){
                product.onSale.status = true;
                product.onSale.discount = Number(req.body.discount);
            }
            else {
                product.onSale.status = false;
                product.onSale.discount = 0;
            }
            product.brandID = Number(req.body.vehicleBrand);
            product.modelID = Number(req.body.vehicleModel);
            product.versionID = Number(req.body.vehicleVersion);
            product.gearType = req.body.vehicleGearType;//
            product.year = req.body.vehicleYear;
            product.state = req.body.vehicleState;
            //product.rating = req.body.rating;
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
            
            fs.writeFileSync(vehiclesFilePath, JSON.stringify(vehicles, null, 4));
        }
        else if(productType === "part"){
            product = parts.find(part => part.adID === productID);
            product.type = "part";
            if(req.body.submit === "publish"){
                published = true;
                let date = new Date();
                publishedDate = date.getDate() + "/" + date.getMonth() + "/" +  date.getFullYear();
            }
            else if(req.body.submit === "save") {
                published = product.published;
                publishedDate = product.publishedDate;
            }
            if(req.body.discount >= 0){
                product.onSale.status = true;
                product.onSale.discount = Number(req.body.discount);
            }
            else {
                product.onSale.status = false;
                product.onSale.discount = 0;
            }
            product.brandID = Number(req.body.brand);
            product.modelID = Number(req.body.model);
            product.stock = Number(req.body.stock);
            product.title = req.body.partTitle;
            product.state = req.body.partState;
            product.rating = req.body.rating;
            product.partID = req.body.partID;
            product.vehicleType.car = req.body.partVehicleTypeCar;
            product.vehicleType.pickup = req.body.partVehicleTypePickup;
            product.vehicleType.motorcycle = req.body.partVehicleTypeMotorcycle;
            product.vehicleType.truck = req.body.partVehicleTypeTruck;
            product.location.province = req.body.partProvince;
            product.location.city = req.body.partCity;
            product.location.neighbourhood = req.body.partNeighbourhood;
            product.location.postalCode = req.body.partPostalCode;
            product.imageURLs[0] = req.body.partImage1;
            product.imageURLs[1] = req.body.partImage2;
            product.imageURLs[2] = req.body.partImage3;
            product.price = Number(req.body.partPrice);
            product.description = req.body.partDescription;

            fs.writeFileSync(partsFilePath, JSON.stringify(parts, null, 4));
        }
        
        res.redirect("/products/details/" + productType + "/" + productID);
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
            fs.writeFileSync(vehiclesFilePath, JSON.stringify(products, null, 4));
        }
        else if(productType === "part"){
            fs.writeFileSync(partsFilePath, JSON.stringify(products, null, 4));
        }
		res.redirect("/");
    }
}

module.exports = productsController;