'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};


const { version } = require('os');

const populateDB = require("../config/populateDB")

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

sequelize.sync({ force: true }).then(() => {
//Data insert
  populateDB(db);
  /*
  
  */
}).catch((error) => console.log(error))


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
