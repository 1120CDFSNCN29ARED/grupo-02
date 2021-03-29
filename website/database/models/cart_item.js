const CartItem = (sequelize, DataTypes) => {
    const alias = "CartItem";
    const cols = {
        cart_itemID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cartID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        postID: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    };
    const config = {
        tableName: "cart_items",
        timestamps: true
    };
    return sequelize.define(alias, cols, config);
}


module.exports = CartItem