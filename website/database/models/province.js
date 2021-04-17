const Province = (sequelize, DataTypes) => {
    const alias = "Province";
    const cols = {
        provinceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        provinceName: {
            type: DataTypes.STRING,
            allowNull: false,
			field: "province_name"
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    };
    const config = {
          tableName: "provinces",
          timeStamps: true,
    };
    let province = sequelize.define(alias, cols, config);
    province.associate = models => {
        province.hasMany(models.Locality, {foreignKey: "provinceID", as: "localities"});
    }
    return province;
}



module.exports = Province;