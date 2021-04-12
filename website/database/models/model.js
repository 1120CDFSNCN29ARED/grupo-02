const Model = (sequelize, DataTypes) => {
  const alias = "Model";
  const cols = {
		modelID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		model_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		active:  {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		brandID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		vehicle_type_car: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		vehicle_type_motorcycle: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		vehicle_type_pickup: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		vehicle_type_truck: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
	};
  const config = {
		tableName: "models",
		timeStamps: true,
	};
	let model = sequelize.define(alias, cols, config);
	model.associate = models => {
		model.belongsTo(models.Brand, {foreignKey: "brandID", as: "brand"});
		model.hasMany(models.Product, {foreignKey: "modelID", as: "product"});
		model.hasMany(models.VehicleVersion, {foreignKey: "modelID", as: "versions"});
	}
	return model;
  
};

module.exports = Model;