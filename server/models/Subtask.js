module.exports = (sequelize, DataTypes) => {
    const Subtask = sequelize.define('Subtask', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        orderNumber: DataTypes.INTEGER,
        done: DataTypes.BOOLEAN,
        name: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        }
    })
    Subtask.associate = (models) => {
        Subtask.belongsTo(models.Task, {
            foreignKey: 'taskId',
        })
    }
    return Subtask
}
