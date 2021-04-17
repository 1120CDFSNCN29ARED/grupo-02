const CartItem = (sequelize, DataTypes) => {
    const alias = "CartItem";
    const cols = {
        cartItemID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
			field: "cart_itemID"
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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    };
    const config = {
        tableName: "cart_items",
        timestamps: true
    };
    let cartItem = sequelize.define(alias, cols, config);
    cartItem.associate = models => {
        cartItem.belongsTo(models.Cart, {foreignKey: "cartID", as: "cart"});
        cartItem.belongsTo(models.Post, {foreignKey: "postID", as: "post"});
    }

    return cartItem;
}

module.exports = CartItem