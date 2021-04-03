'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const bcryptjs = require('bcryptjs');
const { version } = require('os');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

let sql_string = fs.readFileSync(path.join(__dirname, "../config/schema.sql"), "utf-8");
sequelize.query(sql_string);

//Foreign Keys

//JSON data

const localities = JSON.parse(fs.readFileSync(path.join(__dirname, "../../json/localities.json"), "utf-8"));
const provinces = JSON.parse(fs.readFileSync(path.join(__dirname, "../../json/provinces.json"), "utf-8"));


sequelize.sync({ force: true }).then(() => {
//Data insert
  
  db.Province.bulkCreate(provinces).then(db.Locality.bulkCreate(localities).catch(error => console.log(error)));
  db.Role.create({role_name: "user", role_description: "standard user access"}).catch();
  db.User.create({first_name: "test", last_name: "test", userName: "test", dni: 12345678, email: "test@test.com",
                  telephone: 12345678,address:"calle falsa 123", postal_code: 1234, image: "no-image-found.jpeg", locationID: 1})
  .then(user => {
    db.Role.findOne({where:{role_name: "user"}}).then((role) => {
      db.UserAccess.create({userName: user.userName, email: user.email, password: bcryptjs.hashSync("test", 10), roleID: role.roleID })
      .then(() => {
        db.Brand.create({brand_name: "BMW", vehicle_type_car: true, vehicle_type_motorcycle: true, vehicle_type_pickup: true, vehicle_type_truck: false,})
        .then(brand => {
          db.Model.create({model_name: "Serie 1", brandID: brand.brandID, vehicle_type_car: true})
          .then(model => {
            db.VehicleVersion.create({brandID: brand.brandID, modelID: model.modelID, version_name: "118i Advantage 5P"})
            .then(vehicleVersion => {
              db.Vehicle.create({versionID: vehicleVersion.versionID, gear_type: "automática", year: 2021, kilometers: 0, color: "black"})
              .then(vehicle => {
                db.Product.create({product_type: "vehicle", vehicleID: vehicle.vehicleID, brandID: brand.brandID, modelID: model.modelID})
                .then(product => {
                  db.Post.create({title: "Test Title", description: "Test Description", published: true, publishedDate: new Date(), price: 123456,
                                  onSale: true, discount: 20, stock: 1, rating: 4, state: "Nuevo", featured: true, sellerID: user.userID, locationID: 1,
                                  productID: product.productID})
                  .then(post => {
                    db.ImageUrl.create({imageURL: "no-image-found.jpeg", postID: post.postID})
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
}).catch((error) => console.log(error))


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
