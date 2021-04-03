const ImageUrl = (sequelize, DataTypes) => {
  const alias = 'ImageUrl';
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
  let imageUrl = sequelize.define(alias, cols, config);
  imageUrl.associate = models => {
    imageUrl.belongsTo(models.Post, {foreignKey: "postID", as: "post"});
  }

  return imageUrl
};



module.exports = ImageUrl;