const Model = (sequelize, DataTypes) => {
  const alias = "Model";
  const cols = {
		modelID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		modelName: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "model_name"
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
		car: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: "vehicle_type_car"
		},
		motorcycle: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: "vehicle_type_motorcycle"
		},
		pickup: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: "vehicle_type_pickup"
		},
		truck: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: "vehicle_type_truck"
		},
		part: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: "is_part"
		}
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