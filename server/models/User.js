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
        // User may have created multiple boards
        User.hasMany(models.Board, {
            foreignKey: 'creatorId',
        })
        // User may be working on multiple boards
        User.belongsToMany(models.Board, {
            through: 'user_board',
        })
        // User may have created multiple tasks
        User.hasMany(models.Task, {
            foreignKey: 'creatorId',
        })
        // User may be working on multiple tasks
        User.belongsToMany(models.Task, {
            through: 'user_task',
        })
    }

    return User
}
