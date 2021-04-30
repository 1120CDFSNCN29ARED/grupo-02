const Brand = (sequelize, DataTypes) => {
	const alias = "Brand";
	const cols = {
		brandID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		brandName: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "brand_name"
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
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
		makesParts: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: "makes_parts"
		}
	};
	const config = {
		tableName: "brands",
		timeStamps: true,
	};
	let brand = sequelize.define(alias, cols, config);
	brand.associate = models => {
		brand.hasMany(models.Product, {foreignKey: "brandID", as: "products"});
		brand.hasMany(models.Model, {foreignKey: "brandID", as: "models"});
	}
	return brand
};

module.exports = Brand;
