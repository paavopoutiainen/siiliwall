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
        },
<<<<<<< HEAD
        content: {
            type: DataTypes.STRING,
        }
=======
        description: {
            type: DataTypes.STRING,
        },
        deletedAt: DataTypes.DATE,
>>>>>>> 5d75791d19e88271b072c9536cf0ca7604c48158
    })
    Subtask.associate = (models) => {
        Subtask.belongsTo(models.Task, {
            foreignKey: 'taskId',
        })
        Subtask.belongsTo(models.Column, {
            foreignKey: 'columnId',
        })
        // Subtask has one creator user
        Subtask.belongsTo(models.User, {
            foreignKey: 'ownerId',
        })
        // Subtask may have multiple users working on it
        Subtask.belongsToMany(models.User, {
            through: models.UserSubtask,
            foreignKey: 'subtaskId',
        })
    }
    return Subtask
}
