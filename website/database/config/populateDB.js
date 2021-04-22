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
	await db.VehicleVersion.bulkCreate(versions).catch((error) => console.log(error.message, error.values));
	await db.Province.bulkCreate(provinces).catch((error) => console.log(error));
	await db.Locality.bulkCreate(localities).catch((error) => console.log(error));
	const role = await db.Role.create({roleName: "user", roleDescription: "standard user access",}).catch((error) => console.log(error));
	const user = await db.User.create({firstName: "test", lastName: "test", userName: "test", dni: 12345678, email: "test@test.com", telephone: 12345678,
		address: "calle falsa 123",	postalCode: 1234, image: "no-image-found.jpeg",	locationID: 1,}).catch((error) => console.log(error));
	const userAccess = user.createUserAccess({email: user.email, password: bcryptjs.hashSync("test", 10), roleID: role.roleID}).catch((error) => console.log(error));
	const brand = await db.Brand.create({brandName: "BMW Test", car: true, motorcycle: true, pickup: true, truck: false,})
	const model = await db.Model.create({modelName: "Serie 1", brandID: brand.brandID, car: true,})
	const version = await db.VehicleVersion.create({brandID: brand.brandID, modelID: model.modelID, versionName: "118i Advantage 5P",})
	const vehicle = await db.Vehicle.create({versionID: version.versionID, gearType: "automática", type: "car", year: 2021, kilometers: 0, color: "black"})
	const product = await db.Product.create({productType: "vehicle", vehicleID: vehicle.vehicleID, brandID: brand.brandID, modelID: model.modelID})											
	const post = await db.Post.create({title: "Test Title", description: "Test Description", published: true,publishedDate: new Date(), price: 123456,onSale: true,
		discount: 20, stock: 1, rating: 4, state: "Nuevo", featured: true, sellerID: user.userID, locationID: 1, productID: product.productID})
	const image = await db.ImageUrl.create({imageURL: "no-image-found.jpeg", postID: post.postID})
	const favourite = await db.Favourite.create({userID: user.userID, postID: post.postID});
	const question = await db.Question.create({question: "Test question", questionDate: new Date(), userID: user.userID, postID: post.postID})
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
