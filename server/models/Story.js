module.exports = (sequelize, DataTypes) => {
    const Story = sequelize.define('Story', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,
        size: DataTypes.DOUBLE,
        deletedAt: DataTypes.DATE,
    })
    Story.associate = (models) => {
        Story.belongsTo(models.Column, {
            foreingKey: 'columnId',
        })
        Story.belongsTo(models.User, {
            foreingKey: 'ownerId',
        })
        Story.belongsTo(models.Board, {
            foreingKey: 'boardId',
        })
    }
}
