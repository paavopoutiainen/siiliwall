module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
        },
        columnOrderNumber: {
            type: DataTypes.INTEGER,
        },
        swimlaneOrderNumber: DataTypes.INTEGER,
        color: DataTypes.STRING,
        size: DataTypes.INTEGER,
        difficulty: DataTypes.INTEGER,
        deletedAt: DataTypes.DATE,
    })
    Task.associate = (models) => {
        Task.belongsTo(models.Column, {
            foreignKey: 'columnId',
        })
        Task.hasMany(models.Subtask, {
            foreignKey: 'taskId',
        })
        // Task has one creator user
        Task.belongsTo(models.User, {
            foreignKey: 'ownerId',
        })
        // Task may have multiple users working on it
        Task.belongsToMany(models.User, {
            through: models.UserTask,
            foreignKey: 'taskId',
        })
    }
    return Task
}
