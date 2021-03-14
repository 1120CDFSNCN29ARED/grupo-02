const { EDESTADDRREQ } = require("constants");
const fs = require("fs");
const path = require("path");
const fuse = require("fuse.js");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");

const Vehicle = require("../models/Vehicle");
const vehiclesFilePath = path.join(__dirname, "../json/vehicles.json");
const partsFilePath = path.join(__dirname, "../json/parts.json");
const questionsFilePath = path.join(__dirname, "../json/questions.json");
const vehicleBrandsFilePath = path.join(__dirname,"../json/vehicleBrands.json");
const vehicleModelsFilePath = path.join(__dirname,"../json/vehicleModels.json");
const vehicleVersionsFilePath = path.join(__dirname,"../json/vehicleVersions.json");

const partBrandsFilePath = path.join(__dirname, "../json/partBrands.json");
const partModelsFilePath = path.join(__dirname, "../json/partModels.json");

const jsonReader = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf-8"));

let product = {};
const productsController = {
	details: (req, res) => {
		//const vehicles = Vehicle.findAll();
		const parts = jsonReader(partsFilePath);
		let brands = "";
		let models = "";
		let versions = "";
		let version = "";
		const questions = jsonReader(questionsFilePath);
		const productID = parseInt(req.params.productID, 10);
		const productQuestions = questions.filter(question => question.adID === productID);
		if (req.params.productType === "vehicle") {
			product = Vehicle.findVehicleByPk(productID);
			if (!product) {
				res.redirect("/");
			}
			brands = jsonReader(vehicleBrandsFilePath);
			models = jsonReader(vehicleModelsFilePath);
			versions = jsonReader(vehicleVersionsFilePath);
			version = versions.find((e) => e.versionID === product.versionID);
		} else if (req.params.productType === "part") {
			product = parts.find(part => part.adID === productID);
			if (!product) {
				res.redirect("/");
			}
			brands = jsonReader(partBrandsFilePath);
			models = jsonReader(partModelsFilePath);
		}
		const brand = brands.find(e => e.brandID === product.brandID);
		const model = models.find(e => e.modelID === product.modelID);
		console.log(req.session.assertUserLogged.userID === product.userID)
		console.log(product)
		res.render("productDetails", {
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
		const questionDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

		const newQuestion = {
			questionID: newID,
			adID: productID,
			userName: "santi", //change to logged in user
			question: req.body.question,
			questionDate: questionDate,
			answer: "",
			answerDate: "",
		};
		questions.push(newQuestion);
		fs.writeFileSync(questionsFilePath, JSON.stringify(questions, null, 4));
		res.redirect("/products/details/" + req.params.productType + "/" + productID);
	},
	create: (req, res) => {
		let brands = "";
		let models = "";
		let versions = "";
		const productType = req.params.productType;
		if (productType === "vehicle") {
			brands = jsonReader(vehicleBrandsFilePath);
			models = jsonReader(vehicleModelsFilePath);
			versions = jsonReader(vehicleVersionsFilePath);
		} else if (productType === "part") {
			brands = jsonReader(partBrandsFilePath);
			models = jsonReader(partModelsFilePath);
		}

		res.render("createProduct", {
			brands,
			models,
			versions,
			productType: req.params.productType,
			product: {},
		});
	},
	storeVehicle: (req, res) => {
		const vehicles = Vehicle.findAll();
		let imageURLs = [];
		if (req.files.productImages) {
			if (req.files.productImages.length < 5) {
				for (let i = 0; i < req.files.productImages.length; i++) {
					imageURLs.push(req.files.productImages[i].filename);
				}
			} else {
				for (let i = 0; i < 5; i++) {
					imageURLs.push(req.files.productImages[i].filename);
				}
			}
		} else {
			imageURLs.push("no-image-found.jpeg");
		}
			const newID = vehicles.length > 0 ? vehicles[vehicles.length - 1].adID + 1 : 1;
			let published = "";
			let publishedDate = "";
			let onSaleStatus = "";
			let onSaleDiscount = "";
			if (req.body.submit === "publish") {
				published = true;
				publishedDate = new Date();
			} else if (req.body.submit === "save") {
				published = false;
				publishedDate = "";
			}

			if (Number(req.body.discount) > 0) {
				onSaleStatus = true;
				onSaleDiscount = Number(req.body.discount);
			} else {
				onSaleStatus = false;
				onSaleDiscount = 0;
			}
			let product = {
				adID: newID,
				userID: req.session.assertUserLogged.userID,
				type: req.body.vehicleType,
				published: published,
				publishedDate: publishedDate,
				featured: false,
				onSale: {
					status: onSaleStatus,
					discount: onSaleDiscount,
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
				imageURLs: imageURLs,
				price: Number(req.body.vehiclePrice),
				description: req.body.vehicleDescription,
			};
			if(req.files.productImages && req.files.productImages.length - imageURLs.length > 0){
				req.files.productImages.forEach((image) => {
					if (!imageURLs.includes(image.filename)) {
						fs.unlinkSync(
							path.join(__dirname, `../public/img/products/${image.filename}`)
						);
					}
				});
			}
			vehicles.push(product);

			//console.log(product)
			fs.writeFileSync(vehiclesFilePath, JSON.stringify(vehicles, null, 4));
			res.redirect("/products/details/" + req.params.productType + "/" + newID);
	},
	storePart: (req, res) => {
		const parts = jsonReader(partsFilePath);
		let imageURLs = [];
		if (req.files.productImages) {
			if (req.files.productImages.length < 5) {
				for (let i = 0; i < req.files.productImages.length; i++) {
					imageURLs.push(req.files.productImages[i].filename);
				}
			} else {
				for (let i = 0; i < 5; i++) {
					imageURLs.push(req.files.productImages[i].filename);
				}
			}
		} else {
			imageURLs.push("no-image-found.jpeg");
		}
		const newID = parts.length > 0 ? parts[parts.length - 1].adID + 1 : 1;
			let published = "";
			let publishedDate = "";
			let onSaleStatus = "";
			let onSaleDiscount = "";
			if (req.body.submit === "publish") {
				published = true;
				publishedDate = new Date();
			} else if (req.body.submit === "save") {
				published = false;
			}

			if (Number(req.body.discount) > 0) {
				onSaleStatus = true;
				onSaleDiscount = Number(req.body.discount);
			} else {
				onSaleStatus = false;
				onSaleDiscount = 0;
			}
			let product = {
				adID: newID,
				userID: req.session.assertUserLogged.userID,
				type: "part",
				published: published,
				publishedDate: publishedDate,
				onSale: {
					status: onSaleStatus,
					discount: onSaleDiscount,
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
				imageURLs: imageURLs,
				price: Number(req.body.partPrice),
				description: req.body.partDescription,
			};

			parts.push(product);
			//console.log(product)
			fs.writeFileSync(partsFilePath, JSON.stringify(parts, null, 4));
			res.redirect("/products/details/" + req.params.productType + "/" + newID);
	},
	store: (req, res) => {
		const vehicles = jsonReader(vehiclesFilePath);
		const parts = jsonReader(partsFilePath);
		const productType = req.params.productType;
		let imageURLs = [];
		if (req.files.productImages) {
			if (req.files.productImages.length < 5) {
				for (let i = 0; i < req.files.productImages.length; i++) {
					imageURLs.push(req.files.productImages[i].filename);
				}
			} else {
				for (let i = 0; i < 5; i++) {
					imageURLs.push(req.files.productImages[i].filename);
				}
			}
		} else {
			imageURLs.push("no-image-found.jpeg");
		}
		if (productType === "vehicle") {
			const newID = vehicles.length > 0 ? vehicles[vehicles.length - 1].adID + 1 : 1;
			let published = "";
			let publishedDate = "";
			let onSaleStatus = "";
			let onSaleDiscount = "";
			if (req.body.submit === "publish") {
				published = true;
				publishedDate = new Date();
			} else if (req.body.submit === "save") {
				published = false;
				publishedDate = "";
			}

			if (Number(req.body.discount) > 0) {
				onSaleStatus = true;
				onSaleDiscount = Number(req.body.discount);
			} else {
				onSaleStatus = false;
				onSaleDiscount = 0;
			}
			let product = {
				adID: newID,
				userID: req.session.assertUserLogged.userID,
				type: req.body.vehicleType,
				published: published,
				publishedDate: publishedDate,
				featured: false,
				onSale: {
					status: onSaleStatus,
					discount: onSaleDiscount,
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
				imageURLs: imageURLs,
				price: Number(req.body.vehiclePrice),
				description: req.body.vehicleDescription,
			};
			if(req.files.productImages && req.files.productImages.length - imageURLs.length > 0){
				req.files.productImages.forEach((image) => {
					if (!imageURLs.includes(image.filename)) {
						fs.unlinkSync(
							path.join(__dirname, `../public/img/products/${image.filename}`)
						);
					}
				});
			}
			vehicles.push(product);

			//console.log(product)
			fs.writeFileSync(vehiclesFilePath, JSON.stringify(vehicles, null, 4));
			res.redirect("/products/details/" + req.params.productType + "/" + newID);
		} else if (productType === "part") {
			const newID = parts.length > 0 ? parts[parts.length - 1].adID + 1 : 1;
			let published = "";
			let publishedDate = "";
			let onSaleStatus = "";
			let onSaleDiscount = "";
			if (req.body.submit === "publish") {
				published = true;
				publishedDate = new Date();
			} else if (req.body.submit === "save") {
				published = false;
			}

			if (Number(req.body.discount) > 0) {
				onSaleStatus = true;
				onSaleDiscount = Number(req.body.discount);
			} else {
				onSaleStatus = false;
				onSaleDiscount = 0;
			}
			let product = {
				adID: newID,
				userID: req.session.assertUserLogged.userID,
				type: "part",
				published: published,
				publishedDate: publishedDate,
				onSale: {
					status: onSaleStatus,
					discount: onSaleDiscount,
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
				imageURLs: imageURLs,
				price: Number(req.body.partPrice),
				description: req.body.partDescription,
			};

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
		const productType = req.params.productType;

		let brands = "";
		let models = "";
		let versions = "";

		if (productType === "vehicle") {
			product = vehicles.find((vehicle) => vehicle.adID === productID);
			if (!product) {
				res.redirect("/");
			}
			brands = jsonReader(vehicleBrandsFilePath);
			models = jsonReader(vehicleModelsFilePath);
			versions = jsonReader(vehicleVersionsFilePath);
		} else if (productType === "part") {
			product = parts.find((part) => part.adID === productID);
			if (!product) {
				res.redirect("/");
			}
			brands = jsonReader(partBrandsFilePath);
			models = jsonReader(partModelsFilePath);
		}

		res.render("editProduct", {
			productType,
			productID,
			product,
			brands,
			models,
			versions,
		});
	},
	update: (req, res) => {
		const vehicles = jsonReader(vehiclesFilePath);
		const parts = jsonReader(partsFilePath);
		const productID = parseInt(req.params.productID, 10);
		const productType = req.params.productType;
		let published = "";
		let publishedDate = "";

		if (productType === "vehicle") {
			product = vehicles.find((vehicle) => vehicle.adID === productID);
			let imageURLs = product.imageURLs;
			const imageIndex = product.imageURLs.findIndex(
				(image) => image === "no-image-found.jpeg"
			);
			if (imageIndex > -1) {
				product.imageURLs.splice(imageIndex, 1);
			}
			if (req.files.productImages) {
				if (
					product.imageURLs.length === 0 &&
					req.files.productImages.length < 5
				) {
					for (let i = 0; i < req.files.productImages.length; i++) {
						imageURLs.push(req.files.productImages[i].filename);
					}
				} else if (product.imageURLs.length > 0) {
					if (req.files.productImages.length === 1) {
						imageURLs.push(req.files.productImages[0].filename);
					} else {
						for (let i = 0; i <= 5 - imageURLs.length; i++) {
							imageURLs.push(req.files.productImages[i].filename);
						}
					}
				} else if (
					product.imageURLs.length === 0 &&
					req.files.productImages.length > 5
				) {
					for (let i = 0; i < 5; i++) {
						imageURLs.push(req.files.productImages[i].filename);
					}
				}
			} else if (product.imageURLs.length === 0 || !req.files.productImages) {
				imageURLs.push("no-image-found.jpeg");
			}

			if (
				req.files.productImages &&
				req.files.productImages.length - product.imageURLs.length > 0
			) {
				req.files.productImages.forEach((image) => {
					if (!imageURLs.includes(image.filename)) {
						fs.unlinkSync(
							path.join(__dirname, `../public/img/products/${image.filename}`)
						);
					}
				});
			}

			product.type = req.body.vehicleType;
			if (req.body.submit === "publish") {
				published = true;
				publishedDate = new Date();
			} else if (req.body.submit === "save") {
				published = false;
				publishedDate = product.publishedDate;
			}
			if (req.body.discount >= 0) {
				product.onSale.status = true;
				product.onSale.discount = Number(req.body.discount);
			} else {
				product.onSale.status = false;
				product.onSale.discount = 0;
			}
			product.brandID = Number(req.body.vehicleBrand);
			product.modelID = Number(req.body.vehicleModel);
			product.versionID = Number(req.body.vehicleVersion);
			product.gearType = req.body.vehicleGearType; //
			product.year = req.body.vehicleYear;
			product.state = req.body.vehicleState;
			product.publishedDate = publishedDate;
			product.rating = req.body.rating;
			product.kilometers = Number(req.body.vehicleKMs);
			product.color = req.body.vehicleColor;
			product.location.province = req.body.vehicleProvince;
			product.location.city = req.body.vehicleCity;
			product.location.neighbourhood = req.body.vehicleNeighbourhood;
			product.location.postalCode = req.body.vehiclePostalCode;
			product.imageURLs = imageURLs;
			product.price = Number(req.body.vehiclePrice);
			product.description = req.body.vehicleDescription;

			fs.writeFileSync(vehiclesFilePath, JSON.stringify(vehicles, null, 4));
		} else if (productType === "part") {
			product = parts.find((part) => part.adID === productID);
			let imageURLs = product.imageURLs;
			const imageIndex = product.imageURLs.findIndex(
				(image) => image === "no-image-found.jpeg"
			);
			if (imageIndex > -1) {
				product.imageURLs.splice(imageIndex, 1);
			}
			if (req.files.productImages) {
				if (
					product.imageURLs.length === 0 &&
					req.files.productImages.length < 5
				) {
					for (let i = 0; i < req.files.productImages.length; i++) {
						imageURLs.push(req.files.productImages[i].filename);
					}
				} else if (product.imageURLs.length > 0) {
					if (req.files.productImages.length === 1) {
						imageURLs.push(req.files.productImages[0].filename);
					} else {
						for (let i = 0; i <= 5 - imageURLs.length; i++) {
							imageURLs.push(req.files.productImages[i].filename);
						}
					}
				} else if (
					product.imageURLs.length === 0 &&
					req.files.productImages.length > 5
				) {
					for (let i = 0; i < 5; i++) {
						imageURLs.push(req.files.productImages[i].filename);
					}
				}
			} else if (product.imageURLs.length === 0 || !req.files.productImages) {
				imageURLs.push("no-image-found.jpeg");
			}

			if (
				req.files.productImages &&
				req.files.productImages.length - product.imageURLs.length > 0
			) {
				req.files.productImages.forEach((image) => {
					if (!imageURLs.includes(image.filename)) {
						fs.unlinkSync(
							path.join(__dirname, `../public/img/products/${image.filename}`)
						);
					}
				});
			}

			product.type = "part";
			if (req.body.submit === "publish") {
				published = true;
				publishedDate = new Date();
			} else if (req.body.submit === "save") {
				published = false;
				publishedDate = product.publishedDate;
			}
			if (req.body.discount >= 0) {
				product.onSale.status = true;
				product.onSale.discount = Number(req.body.discount);
			} else {
				product.onSale.status = false;
				product.onSale.discount = 0;
			}
			product.published = published;
			product.publishedDate = publishedDate;
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
			product.imageURLs = imageURLs;
			product.price = Number(req.body.partPrice);
			product.description = req.body.partDescription;

			fs.writeFileSync(partsFilePath, JSON.stringify(parts, null, 4));
		}

		//console.log(product);

		res.redirect("/products/details/" + productType + "/" + productID);
	},
	deleteImage: (req, res) => {
		const productID = parseInt(req.params.productID, 10);
		const productType = req.params.productType;
		let products = [];
		if (productType === "vehicle") {
			products = jsonReader(vehiclesFilePath);
		} else if (productType === "part") {
			products = jsonReader(partsFilePath);
		}

		const product = products.find((e) => e.adID === productID);

		const imageIndex = product.imageURLs.findIndex(
			(image) => image === req.query.image
		);
		product.imageURLs.splice(imageIndex, 1);

		//console.log(product);

		if (productType === "vehicle") {
			fs.writeFileSync(vehiclesFilePath, JSON.stringify(products, null, 4));
		} else if (productType === "part") {
			fs.writeFileSync(partsFilePath, JSON.stringify(products, null, 4));
		}

		if (
			req.query.image !== "no-image-found.jpeg" &&
			!req.query.image.includes("http")
		) {
			fs.unlinkSync(
				path.join(__dirname, `../public/img/products/${req.query.image}`)
			);
		}
		res.redirect(`/products/edit/${productType}/${productID}`);
	},
	delete: (req, res) => {
		const productType = req.params.productType;
		let products = "";
		//console.log(productType)
		if (productType === "vehicle") {
			products = jsonReader(vehiclesFilePath);
		} else if (productType === "part") {
			products = jsonReader(partsFilePath);
		}

		const productIndex = products.findIndex(
			(product) => product.adID === parseInt(req.params.productID, 10)
		);
		const product = products.find(
			(e) => e.adID === parseInt(req.params.productID, 10)
		);
		product.imageURLs.forEach((image) => {
			if (image !== "no-image-found.jpeg" && !image.includes("http")) {
				fs.unlinkSync(path.join(__dirname, `../public/img/products/${image}`));
			}
		});
		products.splice(productIndex, 1);
		if (productType === "vehicle") {
			fs.writeFileSync(vehiclesFilePath, JSON.stringify(products, null, 4));
		} else if (productType === "part") {
			fs.writeFileSync(partsFilePath, JSON.stringify(products, null, 4));
		}
		res.redirect("/");
	},
	search: (req, res) => {
		/*const vehicles = jsonReader(vehiclesFilePath);
		const publishedVehicles = vehicles.filter(
			(vehicle) => vehicle.published === true
		);*/
		const publishedVehicles = Vehicle.filterVehiclesByField("published", true);
		const parts = jsonReader(partsFilePath);
		const publishedParts = parts.filter((part) => part.published === true);

		let foundProducts = [];
		let foundVehicles = [];
		let foundParts = [];
		const queryParameters = Object.getOwnPropertyNames(req.query);
		const excludedParameters = [
			"productType",
			"vehicleType",
			"vehicleSearchList",
		];
		if (req.query.productType) {
			if (req.query.productType === "vehicle") {
				if (req.query.vehicleType) {
					foundVehicles = publishedVehicles.filter(
						(vehicle) => vehicle.type === req.query.vehicleType
					);
				} else {
					foundVehicles = publishedVehicles;
				}
				queryParameters.forEach((parameter) => {
					if (!excludedParameters.includes(parameter)) {
						foundVehicles = foundVehicles.filter(
							(vehicle) => vehicle[parameter] == req.query[parameter]
						);
					}
				});
			}
			if (req.query.productType === "part") {
				foundParts = publishedParts;
				queryParameters.forEach((parameter) => {
					if (!excludedParameters.includes(parameter)) {
						foundParts = foundParts.filter(
							(part) => part[parameter] == req.query[parameter]
						);
					}
				});
			}
		} else {
			foundVehicles = publishedVehicles;
			foundProducts = publishedParts;
		}

		foundVehicles.forEach((vehicle) => foundProducts.push(vehicle));
		foundParts.forEach((part) => foundProducts.push(part));
		//console.log(req.query.productType)

		//console.log(foundVehicles)
		//console.log(foundProducts)

		const vehicleBrands = jsonReader(vehicleBrandsFilePath);
		const vehicleModels = jsonReader(vehicleModelsFilePath);
		const vehicleVersions = jsonReader(vehicleVersionsFilePath);

		const partBrands = jsonReader(partBrandsFilePath);
		const partModels = jsonReader(partModelsFilePath);

		res.render("search", {
			vehicleBrands,
			vehicleModels,
			vehicleVersions,
			partBrands,
			partModels,
			products: foundProducts,
		});
	},
    searchBar: (req, res, next) => {
		/*const vehicles = jsonReader(vehiclesFilePath);
		const publishedVehicles = vehicles.filter(
			(vehicle) => vehicle.published === true
		);*/
		const publishedVehicles = Vehicle.filterVehiclesByField("published", true);
		const parts = jsonReader(partsFilePath);
		const publishedParts = parts.filter((part) => part.published === true);
		const publishedProducts = publishedVehicles.concat(publishedParts);

		const vehicleBrands = jsonReader(vehicleBrandsFilePath);
		const vehicleModels = jsonReader(vehicleModelsFilePath);
		const vehicleVersions = jsonReader(vehicleVersionsFilePath);

		const partBrands = jsonReader(partBrandsFilePath);
		const partModels = jsonReader(partModelsFilePath);

		//Obtain search string from searchBar
		const searchQuery = req.query.searchValue;
		if (!searchQuery) {
				return res.render("search", {
					vehicleBrands,
					vehicleModels,
					vehicleVersions,
					partBrands,
					partModels,
					products: publishedProducts,
				});
		}
		let filteredList = searchBar(
			searchQuery,
			publishedProducts,
			vehicleBrands,
			vehicleModels,
			vehicleVersions,
			partBrands,
			partModels
		);
		
        
		res.render("search", {
			vehicleBrands,
			vehicleModels,
			vehicleVersions,
			partBrands,
			partModels,
			products: filteredList,
		});
	},
};

function searchBar(
	searchQuery,
	publishedProducts,
	vehicleBrands,
	vehicleModels,
	vehicleVersions,
	partBrands,
	partModels
) {
	//Tokenize the search terms in order to use regEx later to create matches.
	let tokens = searchQuery
		.toLowerCase()
		.split(" ")
		.filter(function (token) {
			return token.trim() !== "";
		});

	/* Creater regEx from tokens
        https://javascript.info/regexp-introduction
            g - global flag,    i - case insensitive,   m - multiline mode */

	let searchTermRegex = new RegExp(tokens.join("|"), "gim");

	let filteredList = publishedProducts.filter(function (publishedProduct) {
		//create a string to compare against form the product object
		let productString = "";
		for (let key in publishedProduct) {
			if (
				publishedProduct.hasOwnProperty(key) &&
				publishedProduct[key] != "" &&
				publishedProduct[key] != null
			) {
				productString += JSON.stringify(publishedProduct);
				if (publishedProduct.productType === "vehicle") {
					productString += " " + JSON.stringify(vehicleBrands.find((e) => e.brandID === publishedProduct.brandID)) + " ";
					productString +=
						JSON.stringify(vehicleModels.find(e => e.modelID === publishedProduct.modelID)) + " ";
					productString += JSON.stringify(vehicleVersions.find(
						(e) => e.versionID === publishedProduct.versionID
					)) + " ";
				} else if (publishedProduct.productType === "part") {	
					productString += " " + JSON.stringify(partBrands.find(e => e.brandID === publishedProduct.brandID)) + " ";
					productString += " " + JSON.stringify(partModels.find(e => e.modelID === publishedProduct.modelID)) + " ";
        } 				
			}
		}
		return productString.match(searchTermRegex);
	});
	let searchResults = filteredList;
	//Need to update the id generation of adds as they overlap between parts and vehicles.
	//let searchResults = _.uniqBy(filteredList, 'adID');
	return searchResults;
}

module.exports = productsController;
