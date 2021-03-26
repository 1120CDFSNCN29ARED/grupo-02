const sequelize = require("sequelize");

const Role = (sequelize, DataTypes) => {
    const alias = "Role";
    const cols = {
        roleID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    const config = {
        tableName: "roles",
        timeStamps: true
    };
    return sequelize.define(alias, cols, config);
}


module.exports = Role