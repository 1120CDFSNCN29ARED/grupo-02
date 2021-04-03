const Role = (sequelize, DataTypes) => {
    const alias = "Role";
    const cols = {
        roleID: {
            type: DataTypes.TINYINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    const config = {
        tableName: "roles",
        timestamps: true
    };
    let role = sequelize.define(alias, cols, config);
    role.associate = models => {
        role.hasMany(models.UserAccess, {foreignKey: "roleID", as: "userAccesses"});
    }
    return role;
}

module.exports = Role