module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Role.associate = (models) => {
        Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
    };

    return Role;
};
