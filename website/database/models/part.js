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
			defaultValue: false,
		},
		vehicle_type_motorcycle: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		vehicle_type_pickup: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		vehicle_type_truck: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
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