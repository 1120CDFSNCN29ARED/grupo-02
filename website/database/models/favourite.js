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
    return sequelize.define(alias, cols, config);
}


module.exports = Favourite