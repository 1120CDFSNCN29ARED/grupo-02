'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = /*process.env.NODE_ENV || */'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const bcryptjs = require('bcryptjs');

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
db.User.hasMany(db.Favourite, {foreignKey: "userID"})
//db.User.belongsTo(db.UserAccess, {foreignKey: "userName"});

//favourites
db.Favourite.belongsTo(db.User, {foreignKey: "userID"});


sequelize.sync({force:true}).then(() => {
//Data insert
  db.Role.create({role_name: "user", role_description: "standard user access"}).catch();
  db.User.create({first_name: "test", last_name: "test", userName: "test", dni: 12345678, email: "test@test.com",
                  telephone: 12345678, image: "no-image-found.jpeg", locationID: 1})
  .then(user => {
    db.Role.findOne({where:{role_name: "user"}}).then((role) => {
      db.UserAccess.create({userName: user.userName, email: user.email, password: bcryptjs.hashSync("test", 10), roleID: role.roleID })
      .catch();
    }).catch();
  }).catch();
  
}).then(() => {
  db.UserAccess.findAll({include: [{model: db.Role}]}).then((query => console.log(query)))
})
.catch((error) => console.log(error))


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
