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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gearType: {
      type: DataTypes.STRING,
      allowNull: false,
			field: "gear_type"
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kilometers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
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