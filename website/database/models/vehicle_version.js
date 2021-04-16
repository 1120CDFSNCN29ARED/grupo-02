const VehicleVersion = (sequelize, DataTypes) => {
  const alias = "VehicleVersion";
  const cols = {
		versionID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		brandID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		modelID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		versionName: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "version_name"
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		}
	};
  const config = {
		tableName: "vehicle_versions",
		timeStamps: true,
	};
	let vehicleVersion = sequelize.define(alias, cols, config);
	vehicleVersion.associate = models => {
		vehicleVersion.hasMany(models.Vehicle, {foreignKey: "versionID", as: "vehicles"});
		vehicleVersion.belongsTo(models.Brand, {foreignKey: "brandID", as: "brand"});
		vehicleVersion.belongsTo(models.Model, {foreignKey: "modelID", as: "model"});
		vehicleVersion.hasMany(models.Product, {foreignKey: "versionID", as: "products"});
	}
	return vehicleVersion

}



module.exports = VehicleVersion;