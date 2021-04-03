const Locality = (sequelize, DataTypes) => {
    const alias = "Locality";
    const cols = {
          localityID: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
          },
          locality_name: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          provinceID: {
              type: DataTypes.INTEGER,
              allowNull: false
          }
      };
    const config = {
          tableName: "localities",
          timeStamps: true,
      };
  
      return sequelize.define(alias, cols, config);
  }
  
  module.exports = Locality;