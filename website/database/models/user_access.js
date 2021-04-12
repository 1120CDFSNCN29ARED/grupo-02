const UserAccess = (sequelize, DataTypes) => {
    const alias = "UserAccess";
    const cols = {
        userAccessID: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleID: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    }
    const config = {
        tableName: "user_access",
        timestamps: true
    }
    let userAccess = sequelize.define(alias, cols, config);
    userAccess.associate = models => {
        userAccess.belongsTo(models.Role, {foreignKey: "roleID", as: "role"});
        userAccess.belongsTo(models.User, {foreignKey: "userName", targetKey: "userName", as: "user"});
    }
    return userAccess
}

module.exports = UserAccess