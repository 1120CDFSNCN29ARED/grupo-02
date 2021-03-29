const Vehicle_version = (sequelize, DataTypes) => {
  const alias = "Vehicle_version";
  const cols = {
		versionID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.INTEGER,
			autoIncrement: true,
		},
		brandID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		modelID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
    version_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
	};
  const config = {
		tableName: "vehicle_versions",
		timeStamps: true,
	};

	return sequelize.define(alias, cols, config);

}

module.exports = Vehicle_version;