const CartUser = (sequelize, DataTypes) => {
    const alias = "CartUser";
    const cols = {
        cartID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userID: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    };
    const config = {
        tableName: "carts_users",
        timestamps: true
    };
    return sequelize.define(alias, cols, config);
}


module.exports = CartUser