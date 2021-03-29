const Brand = (sequelize, DataTypes) => {
	const alias = "Brand";
	const cols = {
		brandID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
      defaultValue: DataTypes.INTEGER,
      autoIncrement: true
		},
		brand_name: {
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
    makes_parts: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
	};
	const config = {
		tableName: "brands",
		timeStamps: true,
	};

	return sequelize.define(alias, cols, config);
};

module.exports = Brand;
