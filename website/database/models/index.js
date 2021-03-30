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
//user_accesses
db.UserAccess.belongsTo(db.Role, {foreignKey: "roleID"});
db.UserAccess.belongsTo(db.User, {foreignKey: "userName", targetKey: "userName"});
db.UserAccess.belongsTo(db.User, {foreignKey: "email", targetKey: "email"});

//roles
db.Role.hasMany(db.UserAccess, {foreignKey: "roleID"});

//users
db.User.hasMany(db.Favourite, {foreignKey: "userID"});
db.User.hasMany(db.Cart, {foreignKey: "userID"});
db.User.hasMany(db.Favourite, { foreignKey: "userID" })
db.User.hasMany(db.Post, { foreignKey: "sellerID", targetKey: "userID" });
db.User.hasMany(db.Question, { foreignKey: "userID" });

//carts
db.Cart.belongsTo(db.User, {foreignKey: "userID"});

//cart_items
db.CartItem.belongsTo(db.Cart, {foreignKey: "cartID"});

//favourites
db.Favourite.belongsTo(db.User, {foreignKey: "userID"});
db.Favourite.belongsTo(db.Post, {foreignKey: "postID"});

//Posts
db.Post.belongsTo(db.Product, { foreignKey: "productID" });
db.Post.hasMany(db.Question, { foreignKey: "postID" });
db.Post.hasMany(db.Favourite, { foreignKey: "postID"});
db.Post.belongsTo(db.User, { foreignKey: "sellerID", targetKey: "userID" });
db.Post.hasMany(db.Image_url, { foreignKey: "postID"});

//Questions
db.Question.belongsTo(db.Post, { foreignKey: "postID" });
db.Question.belongsTo(db.User, { foreignKey: "userID" });

//Products
db.Product.hasOne(db.Post, {foreignKey: "postID"});
db.Product.belongsTo(db.Part, { foreignKey: "partID"});
db.Product.belongsTo(db.Vehicle, { foreignKey: "vehicleID" });
db.Product.belongsTo(db.Brand, { foreignKey: "brandID" });

//Parts
db.Part.hasOne(db.Product, { foreignKey: "productID"});

//Vehicles
db.Vehicle.hasOne(db.Product, { foreignKey: "productID" });
db.Vehicle.belongsTo(db.Vehicle_version, { foreignKey: "versionID" });

//Image_urls
db.Image_url.belongsTo(db.Post, { foreignKey: "postID" });

//Locations
  //db.location.belongsTo(db.Post);

//Brands
db.Brand.hasMany(db.Product, { foreignKey: "brandID" });
db.Brand.hasMany(db.Model, { foreignKey: "brandID"});

//Models
db.Model.belongsTo(db.Brand, { foreignKey: "brandID" });
db.Model.hasMany(db.Product, { foreignKey: "modelID" });

//vehicle_versions
db.Vehicle_version.hasMany(db.Vehicle, { foreignKey: "versionID" });
db.Vehicle_version.belongsTo(db.Brand, { foreignKey: "brandID" });
db.Vehicle_version.belongsTo(db.Model, { foreignKey: "modelID" });


sequelize.sync({ force: true }).then(() => {
//Data insert
  db.Role.create({role_name: "user", role_description: "standard user access"}).catch();
  db.User.create({first_name: "test", last_name: "test", userName: "test", dni: 12345678, email: "test@test.com",
                  telephone: 12345678,address:"calle falsa 123", postal_code: 1234, image: "no-image-found.jpeg", locationID: 1})
  .then(user => {
    db.Role.findOne({where:{role_name: "user"}}).then((role) => {
      console.log("roleID: ",role.roleID)
      db.UserAccess.create({userName: user.userName, email: user.email, password: bcryptjs.hashSync("test", 10), roleID: role.roleID })
      .then(() => {
        db.Brand.create({brand_name: "BMW", vehicle_type_car: true, vehicle_type_motorcycle: true, vehicle_type_pickup: true, vehicle_type_truck: false,})
        .then(brand => {
          console.log("brandID: ",brand.brandID)
          db.Model.create({model_name: "Serie 1", brandID: brand.brandID, vehicle_type_car: true})
          .then(model => {
            db.Vehicle_version.create({brandID: brand.brandID, modelID: model.modelID, version_name: "118i Advantage 5P"})
            .then(vehicle_version => {
              db.Vehicle.create({versionID: vehicle_version.versionID, gear_type: "automática", year: 2021, kilometers: 0, color: "black"})
              .then(vehicle => {
                db.Product.create({product_type: "vehicle", vehicleID: vehicle.vehicleID, brandID: brand.brandID, modelID: model.modelID})
                .then(product => {
                  db.Post.create({title: "Test Title", description: "Test Description", published: true, publishedDate: new Date(), price: 123456,
                                  onSale: true, discount: 20, stock: 1, rating: 4, state: "Nuevo", featured: true, sellerID: user.userID, locationID: 1,
                                  productID: product.productID
                  }).catch((error) => console.log("failed at product",error));
                }).catch((error) => console.log("failed at vehicle",error));
              }).catch((error) => console.log("failed at vehicle_version",error));
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
