const Province = (sequelize, DataTypes) => {
    const alias = "Province";
    const cols = {
        provinceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        province_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };
    const config = {
          tableName: "provinces",
          timeStamps: true,
    };
    let province = sequelize.define(alias, cols, config);
    province.associate = models => {
        province.hasMany(models.Locality, {foreignKey: "provinceID", as: "locality"});
    }
    return province;
}



module.exports = Province;