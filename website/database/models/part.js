const Part = (sequelize, DataTypes) => {
  const alias = "Part";
  const cols = {
		partID: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		part_serial_number: {
			type: DataTypes.STRING,
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
		tableName: "parts",
		timeStamps: true,
	};

	return sequelize.define(alias, cols, config);
};

module.exports = Part;