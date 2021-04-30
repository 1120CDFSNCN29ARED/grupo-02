const Role = (sequelize, DataTypes) => {
    const alias = "Role";
    const cols = {
        roleID: {
            type: DataTypes.TINYINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
			field: "role_name"
        },
        roleDescription: {
            type: DataTypes.STRING,
            allowNull: false,
			field: "role_description"
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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