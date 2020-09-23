module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    Board.associate = (models) => {
        Board.hasMany(models.Column, {
            foreignKey: 'boardId',
        })
        // Board has one creator user
        Board.belongsTo(models.User, {
            foreignKey: 'creatorId',
        })
    }
    return Board
}
