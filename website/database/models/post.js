const Post = (sequelize, DataTypes) => {
  const alias = "Post";
  const cols = {
    postID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    publishedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    onSale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sellerID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    locationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "postal_code",
    },
    productID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  };
  const config = {
    tableName: "posts",
    timeStamps: true,
  };
  let post = sequelize.define(alias, cols, config);
  post.associate = (models) => {
    post.belongsTo(models.Product, { foreignKey: "productID", as: "product" });
    post.hasMany(models.Question, { foreignKey: "postID", as: "questions" });
    post.hasMany(models.Favourite, { foreignKey: "postID", as: "favourites" });
    post.belongsTo(models.User, {
      foreignKey: "sellerID",
      targetKey: "userID",
      as: "user",
    });
    post.hasMany(models.ImageUrl, { foreignKey: "postID", as: "images" });
    post.hasMany(models.CartItem, { foreignKey: "postID", as: "cartItems" });
    post.belongsTo(models.Locality, {
      foreignKey: "locationID",
      targetKey: "localityID",
      as: "locality",
    });
  };

  return post;
};

module.exports = Post;
