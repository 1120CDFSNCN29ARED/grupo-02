const Locality = (sequelize, DataTypes) => {
    const alias = "Locality";
    const cols = {
        localityID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        localityName: {
            type: DataTypes.STRING,
            allowNull: false,
			field: "locality_name"
        },
        provinceID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    };
    const config = {
          tableName: "localities",
          timeStamps: true,
    };
    let locality = sequelize.define(alias, cols, config);
    locality.associate = models => {
        locality.belongsTo(models.Province, {foreignKey: "provinceID", as: "province"});
        locality.hasMany(models.User, {foreignKey: "locationID", targetKey: "localityID", as: "users"});
    }

    return locality;
}

module.exports = Locality;