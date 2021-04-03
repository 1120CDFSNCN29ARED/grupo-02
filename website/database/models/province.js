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
  
      return sequelize.define(alias, cols, config);
  }
  
  module.exports = Province;