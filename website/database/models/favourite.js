const Favourite = (sequelize, DataTypes) => {
    const alias = "Favourite";
    const cols = {
        favouriteID: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        adID: {
            type: DataTypes.UUID,
            allowNull: false
        }
    };
    const config = {
        tableName: "favourites",
        timestamps: true
    };
    let favourite = sequelize.define(alias, cols, config);
    favourite.associate = models => {
        favourite.belongsTo(models.User, {foreignKey: "userID", as: "user"});
        favourite.belongsTo(models.Post, {foreignKey: "postID", as: "post"});
    
    }

    return favourite;
}

module.exports = Favourite