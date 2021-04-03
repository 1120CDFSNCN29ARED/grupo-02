const Cart = (sequelize, DataTypes) => {
    const alias = "Cart";
    const cols = {
        cartID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    const config = {
        tableName: "carts",
        timestamps: true
    };
    let cart = sequelize.define(alias, cols, config);
    cart.associate = models => {
        cart.belongsTo(models.User, {foreignKey: "userID", as: "user"});
        cart.hasMany(models.CartItem, {foreignKey: "cartID", as: "cartItems"});
    }

    return cart;
}

module.exports = Cart