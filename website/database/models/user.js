const User = (sequelize, DataTypes) => {
    const alias = "User";
    const cols = {
        userID: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field:"first_name"
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field:"last_name"
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "user_name"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        locationID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postalCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:"postal_code"
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }
    const config = {
        tableName: "users",
        timestamps: true
    }
    let user = sequelize.define(alias, cols, config);
    user.associate = models => {
        user.hasMany(models.Favourite, {foreignKey: "userID", as: "favourites"});
        user.hasMany(models.Cart, {foreignKey: "userID", as: "cart"});
        user.hasMany(models.Post, {foreignKey: "sellerID", targetKey: "userID", as: "posts"});
        user.hasMany(models.Question, {foreignKey: "userID", as: "questions"});
        user.belongsTo(models.Locality, { foreignKey: "locationID", targetKey: "localityID", as: "locality" });
        user.hasOne(models.UserAccess, { foreignKey: 'userName', sourceKey: 'userName'});
    }
    return user;
}

module.exports = User