const Product = (sequelize, DataTypes) => {
  const alias ="Product";
  const cols = {
		productID: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		product_type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		partID: {
			type: DataTypes.UUID,
			allowNull: true,
		},
		vehicleID: {
			type: DataTypes.UUID,
			allowNull: true,
		},
		brandID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		modelID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	};

  	const config = {
        tableName: "products",
        timeStamps: true
	};
	let product = sequelize.define(alias, cols, config);
	product.associate = models => {
		product.hasOne(models.Post, {foreignKey: "productID", as: "post"});
		product.belongsTo(models.Part, {foreignKey: "partID", as: "part"});
		product.belongsTo(models.Vehicle, {foreignKey: "vehicleID", as: "vehicle"});
		product.belongsTo(models.Brand, {foreignKey: "brandID", as: "brand"});
	}
	
	return product;
}


module.exports = Product;