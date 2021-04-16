const Part = (sequelize, DataTypes) => {
  const alias = "Part";
  const cols = {
		partID: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		partSerialNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "part_serial_number"
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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
	};
  const config = {
		tableName: "parts",
		timeStamps: true,
	};
	let part = sequelize.define(alias, cols, config);
	part.associate = models => {
		part.hasOne(models.Product, {foreignKey: "partID", as: "product"});
	}

	return part;
};



module.exports = Part;