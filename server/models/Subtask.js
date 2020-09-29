module.exports = (sequelize, DataTypes) => {
    const Subtask = sequelize.define('Subtask', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        columnOrderNumber: DataTypes.INTEGER,
        done: DataTypes.BOOLEAN,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        deletedAt: DataTypes.DATE,
    })
    Subtask.associate = (models) => {
        Subtask.belongsTo(models.Task, {
            foreignKey: 'taskId',
        })
        Subtask.belongsTo(models.Column, {
            foreignKey: 'columnId',
        })
    }
    return Subtask
}
