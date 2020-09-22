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
    }
    /* Board.associate = (models) => {
        Board.belongsTo(models.User, {
            foreignKey: 'userId',
        })
    } */
    Board.associate = (models) => {
        Board.belongsToMany(models.User, {
            through: 'user_board',
        })
    }
    return Board
}
