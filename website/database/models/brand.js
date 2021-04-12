const Brand = (sequelize, DataTypes) => {
	const alias = "Brand";
	const cols = {
		brandID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		brand_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
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
		makes_parts: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
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
