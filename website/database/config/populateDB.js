const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");

//JSON data
const localities = JSON.parse(
	fs.readFileSync(path.join(__dirname, "../../json/localities.json"), "utf-8")
);
const provinces = JSON.parse(
	fs.readFileSync(path.join(__dirname, "../../json/provinces.json"), "utf-8")
);
const brands = JSON.parse(
	fs.readFileSync(
		path.join(__dirname, "../../json/_real_cars_1_brands__202104181951.json"),
		"utf-8"
	)
);
const models = JSON.parse(
	fs.readFileSync(
		path.join(__dirname, "../../json/_real_cars_01_models__202104181955.json"),
		"utf-8"
	)
);
const versions = JSON.parse(
	fs.readFileSync(
		path.join(
			__dirname,
			"../../json/_real_cars_01_vehicle_versions_noYear__202104190004.json"
		),
		"utf-8"
	)
);
async function populateDB(db) {
	await db.Brand.bulkCreate(brands).catch((error) => console.log(error));
	await db.Model.bulkCreate(models).catch((error) => console.log(error));
	await db.VehicleVersion.bulkCreate(versions).catch((error) =>
		console.log(error.message, error.values)
	);
	await db.Province.bulkCreate(provinces).catch((error) => console.log(error));
	await db.Locality.bulkCreate(localities).catch((error) => console.log(error));
	const role = await db.Role.create({
		roleName: "user",
		roleDescription: "standard user access",
	}).catch((error) => console.log(error));
	const user = await db.User.create({
		firstName: "test",
		lastName: "test",
		userName: "test",
		dni: 12345678,
		email: "test@test.com",
		telephone: 12345678,
		address: "calle falsa 123",
		postalCode: 1234,
		image: "default-profile.png",
		locationID: 1,
	}).catch((error) => console.log(error));
	const userAccess = user
		.createUserAccess({
			email: user.email,
			password: bcryptjs.hashSync("test", 10),
			roleID: role.roleID,
		})
		.catch((error) => console.log(error));
	const brand = await db.Brand.create({
		brandName: "BMW Test",
		car: true,
		motorcycle: true,
		pickup: true,
		truck: false,
		makesParts: true,
	});
	const model = await db.Model.create({
		modelName: "Serie 1",
		brandID: brand.brandID,
		car: true,
	});
	const partModel = await db.Model.create({
		modelName: "Test Part Model",
		brandID: brand.brandID,
		car: true,
		part: true,
	});
	const part = await db.Part.create({ partSerialNumber: "abc123", car: true });
	const partProduct = await db.Product.create({
		productType: "part",
		partID: part.partID,
		brandID: brand.brandID,
		modelID: partModel.modelID,
	});
	const partPost = await db.Post.create({
		title: "Test Part Title",
		description: "Test Description",
		published: true,
		publishedDate: new Date(),
		price: 1234,
		onSale: true,
		discount: 10,
		stock: 10,
		rating: 3,
		state: "nuevo",
		featured: true,
		sellerID: user.userID,
		locationID: 1,
		postalCode: 1234,
		productID: partProduct.productID,
	});
	const version = await db.VehicleVersion.create({
		brandID: brand.brandID,
		modelID: model.modelID,
		versionName: "118i Advantage 5P",
	});
	const vehicle = await db.Vehicle.create({
		versionID: version.versionID,
		gearType: "automática",
		type: "car",
		year: 2021,
		kilometers: 0,
		color: "black",
	});
	const product = await db.Product.create({
		productType: "vehicle",
		vehicleID: vehicle.vehicleID,
		brandID: brand.brandID,
		modelID: model.modelID,
	});
	const post = await db.Post.create({
		title: "Test Title",
		description: "Test Description",
		published: true,
		publishedDate: new Date(),
		price: 123456,
		onSale: true,
		discount: 20,
		stock: 1,
		rating: 4,
		state: "nuevo",
		featured: true,
		sellerID: user.userID,
		locationID: 1,
		postalCode: 1234,
		productID: product.productID,
	});
	const image = await db.ImageUrl.create({
		imageURL: "no-image-found.jpeg",
		postID: post.postID,
	});
	const favourite = await db.Favourite.create({
		userID: user.userID,
		postID: post.postID,
	});
	const cart = await db.Cart.create({
		userID: user.userID,
		status: "active",
		active: true,
	}).catch((error) => error);
	const cartItem = await db.CartItem.create({
		cartID: cart.cartID,
		postID: post.postID,
		quantity: 1,
		price: 100,
		active: true,
	}).catch((error) => error);
	const question = await db.Question.create({
		question: "Test question",
		questionDate: new Date(),
		userID: user.userID,
		postID: post.postID,
	});
	/* Generar otro auto de prueba*/
	const version2 = await db.VehicleVersion.create({
		brandID: brand.brandID,
		modelID: model.modelID,
		versionName: "120D Advantage 5P",
	});
	const vehicle2 = await db.Vehicle.create({
		versionID: version2.versionID,
		gearType: "automática",
		type: "car",
		year: 2021,
		kilometers: 0,
		color: "black",
	});
	const product2 = await db.Product.create({
		productType: "vehicle",
		vehicleID: vehicle2.vehicleID,
		brandID: brand.brandID,
		modelID: model.modelID,
	});
	const post2 = await db.Post.create({
		title: "Test Car 2",
		description: "Nuevo Serie 1",
		published: true,
		publishedDate: new Date(),
		price: 123456,
		onSale: true,
		discount: 20,
		stock: 1,
		rating: 4,
		state: "nuevo",
		featured: true,
		sellerID: user.userID,
		locationID: 1,
		postalCode: 1234,
		productID: product2.productID,
	});
	/* Generar otro auto de prueba*/
	const version3 = await db.VehicleVersion.create({
		brandID: brand.brandID,
		modelID: model.modelID,
		versionName: "330D Advantage 5P",
	});
	const vehicle3 = await db.Vehicle.create({
		versionID: version3.versionID,
		gearType: "automática",
		type: "car",
		year: 2021,
		kilometers: 0,
		color: "black",
	});
	const product3 = await db.Product.create({
		productType: "vehicle",
		vehicleID: vehicle3.vehicleID,
		brandID: brand.brandID,
		modelID: model.modelID,
	});
	const post3 = await db.Post.create({
		title: "Test Car 3",
		description: "Nuevo 330D advantage",
		published: true,
		publishedDate: new Date(),
		price: 123456,
		onSale: true,
		discount: 20,
		stock: 1,
		rating: 4,
		state: "nuevo",
		featured: true,
		sellerID: user.userID,
		locationID: 1,
		postalCode: 1234,
		productID: product3.productID,
	});
	/* Generar otro auto de prueba*/
	const version4 = await db.VehicleVersion.create({
		brandID: brand.brandID,
		modelID: model.modelID,
		versionName: "440D Advantage 2P",
	});
	const vehicle4 = await db.Vehicle.create({
		versionID: version4.versionID,
		gearType: "automática",
		type: "car",
		year: 2021,
		kilometers: 0,
		color: "black",
	});
	const product4 = await db.Product.create({
		productType: "vehicle",
		vehicleID: vehicle4.vehicleID,
		brandID: brand.brandID,
		modelID: model.modelID,
	});
	const post4 = await db.Post.create({
		title: "Brand New 440D",
		description: "Un auto listo para la revolucióñ",
		published: true,
		publishedDate: new Date(),
		price: 123456,
		onSale: true,
		discount: 20,
		stock: 1,
		rating: 4,
		state: "nuevo",
		featured: true,
		sellerID: user.userID,
		locationID: 1,
		postalCode: 1234,
		productID: product4.productID,
	});
	try {
		await db.Role.create({
			roleName: "admin",
			roleDescription: "admin user access",
		});
		const user = await db.User.create({
			firstName: "admin",
			lastName: "test",
			userName: "admin",
			dni: 12345679,
			email: "admin@test.com",
			telephone: 12345678,
			address: "calle falsa del Rey 123",
			postalCode: 1234,
			image: "no-image-found.jpeg",
			locationID: 1,
		});
		const role = await db.Role.findOne({ where: { roleName: "admin" } });
		user.createUserAccess({
			email: user.email,
			password: bcryptjs.hashSync("test", 10),
			roleID: role.roleID,
		});
	} catch (error) {
		console.error(error);
		console.log(error);
	}
}

module.exports = populateDB;
