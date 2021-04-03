const Vehicle = (sequelize, DataTypes) => {
  const alias = "Vehicle";
  const cols = {
		vehicleID: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
    versionID: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    gear_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    kilometers: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    color: {
      type: DataTypes.STRING,
      allowNull:false
    },
	};
  const config = {
		tableName: "vehicles",
		timeStamps: true,
	};
  let vehicle = sequelize.define(alias, cols, config);
  vehicle.associate = models => {
    vehicle.hasOne(models.Product, {foreignKey: "vehicleID", as: "product"});
    vehicle.belongsTo(models.VehicleVersion, {foreignKey: "versionID", as: "version"});
  }
	return vehicle;

}

module.exports = Vehicle;