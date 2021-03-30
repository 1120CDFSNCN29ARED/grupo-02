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

  return sequelize.define(alias, cols, config);
}

module.exports = Product;