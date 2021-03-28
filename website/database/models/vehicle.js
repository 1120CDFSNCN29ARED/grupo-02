const Vehicle = (sequelize, DataTypes) => {
    const alias = "Product";
    const cols = {
        adID: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userID: {
            type: DataTypes.UUID,
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

Vehicle

module.exports = Vehicle