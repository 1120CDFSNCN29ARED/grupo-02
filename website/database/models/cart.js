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
    return sequelize.define(alias, cols, config);
}

module.exports = Cart