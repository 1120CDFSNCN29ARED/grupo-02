const sequelize = require("sequelize");
const Role = require('./role');
const Vehicle = (sequelize, DataTypes) => {
    const alias = "Product";
    const cols = {
        adID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        neighbourhood: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleID: {
            type: DataTypes.TINYINT,
            allowNull: false,
            references: {
                model: Role,
                key: 'roleID'
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    const config = {
        tableName: "vehicles",
        timeStamps: true
    };
    return sequelize.define(alias, cols, config);
}


module.exports = Vehicle