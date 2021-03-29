const Model = (sequelize, DataTypes) => {
  const alias = "Model";
  const cols = {
		modelID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.INTEGER,
			autoIncrement: true,
		},
		model_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		brandID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		vehicle_type_car: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		vehicle_type_motorcycle: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		vehicle_type_pickup: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		vehicle_type_truck: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	};
  const config = {
		tableName: "models",
		timeStamps: true,
	};

	return sequelize.define(alias, cols, config);
  
};

module.exports = Model;