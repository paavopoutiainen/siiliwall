module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    })
    User.associate = (models) => {
        // User may have created multiple tasks
        User.hasMany(models.Task, {
            foreignKey: 'ownerId',
        })
        // User may be working on multiple tasks
        User.belongsToMany(models.Task, {
            through: models.UserTask,
            foreignKey: 'userId',
        })
    }

    return User
}
