const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

//JSON data
const localities = JSON.parse(fs.readFileSync(path.join(__dirname, "../../json/localities.json"), "utf-8"));
const provinces = JSON.parse(fs.readFileSync(path.join(__dirname, "../../json/provinces.json"), "utf-8"));
const brands = JSON.parse(fs.readFileSync(path.join(__dirname, "../../json/real_cars_brands__202104111952.json"), "utf-8"));
const models = JSON.parse(fs.readFileSync(path.join(__dirname, "../../json/real_cars_models__202104112044.json"), "utf-8"));
const versions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../json/real_cars_versions_part1.json"), "utf-8"));
async function populateDB(db) {
    await db.Brand.bulkCreate(brands).catch(error => console.log(error));
    await db.Model.bulkCreate(models).catch(error => console.log(error));
    //await db.VehicleVersion.bulkCreate(versions).catch(error => console.log(error.message,error.values));
    await db.Province.bulkCreate(provinces).catch(error => console.log(error));
    await db.Locality.bulkCreate(localities).catch(error => console.log(error));
    await db.Role.create({roleName: "user", roleDescription: "standard user access"}).catch();
    await db.User.create({first_name: "test", last_name: "test", userName: "test", dni: 12345678, email: "test@test.com",
                    telephone: 12345678,address:"calle falsa 123", postal_code: 1234, image: "no-image-found.jpeg", locationID: 1})
    .then(user => {
        db.Role.findOne({where:{roleName: "user"}}).then((role) => {
        user.createUserAccess({email: user.email, password: bcryptjs.hashSync("test", 10), roleID: role.roleID })
        .then(() => {
            db.Brand.create({brandName: "BMW Test", car: true, motorcycle: true, pickup: true, truck: false,})
            .then(brand => {
            db.Model.create({modelName: "Serie 1", brandID: brand.brandID, car: true})
            .then(model => {
                db.VehicleVersion.create({brandID: brand.brandID, modelID: model.modelID, versionName: "118i Advantage 5P"})
                .then(vehicleVersion => {
                db.Vehicle.create({versionID: vehicleVersion.versionID, gearType: "automática", year: 2021, kilometers: 0, color: "black"})
                .then(vehicle => {
                    db.Product.create({productType: "vehicle", vehicleID: vehicle.vehicleID, brandID: brand.brandID, modelID: model.modelID})
                    .then(product => {
                    db.Post.create({title: "Test Title", description: "Test Description", published: true, publishedDate: new Date(), price: 123456,
                                    onSale: true, discount: 20, stock: 1, rating: 4, state: "Nuevo", featured: true, sellerID: user.userID, locationID: 1,
                                    productID: product.productID})
                    .then(post => {
                        db.ImageUrl.create({ imageURL: "no-image-found.jpeg", postID: post.postID })
                            .then(() => {
                                db.Favourite.create({userID:user.userID, postID:post.postID})
                            }).catch(error => console.log("FAILED AT FAVOURITE"));
                    })
                    .catch((error) => console.log("failed at product",error));
                    }).catch((error) => console.log("failed at vehicle",error));
                }).catch((error) => console.log("failed at vehicleVersion",error));
                }).catch((error) => console.log("failed at model",error));
            }).catch((error) => console.log("failed at brand",error));
            }).catch((error) => console.log("failed at user_access",error));
        }).catch((error) => console.log("failed at role",error));
        }).catch((error) => console.log("failed at user",error));
    }).catch((error) => console.log("failed at role",error));
}

module.exports = populateDB;