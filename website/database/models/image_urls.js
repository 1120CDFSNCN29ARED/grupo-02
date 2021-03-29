const Image_url = (sequelize, DataTypes) => {
  const alias = 'Image_url';
  const cols = {
		imageID: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postID: {
      type: DataTypes.UUID,
      allowNull: false
    },
	};
  const config = {
    tableName: "image_urls",
    timeStamps: true
  };

  return sequelize.define(alias, cols, config);
};

module.exports = Image_url;