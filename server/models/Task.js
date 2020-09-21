module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
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
        size: DataTypes.DOUBLE,
        difficulty: DataTypes.INTEGER,
    })
    Task.associate = (models) => {
        Task.belongsTo(models.Column, {
            foreignKey: 'columnId',
        })
        Task.hasMany(models.Subtask, {
            foreignKey: 'taskId',
        })
    }
    return Task
}
