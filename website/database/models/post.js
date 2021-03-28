const Post = (sequelize, DataTypes) => {
    const alias = "Post";
    const cols = {
        postID: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        publishedDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        onSale: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        featured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        sellerID: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        locationID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productID: {
            type: DataTypes.UUID,
            allowNull: false,
        },

    };
    const config = {
        tableName: "posts",
        timeStamps: true
    };
    return sequelize.define(alias, cols, config);
}

module.exports = Post