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
    })/*
    User.associate = (models) => {
        User.hasMany(models.Board, {
            foreignKey: 'userId',
        })
    } */
    User.associate = (models) => {
        User.belongsToMany(models.Board, {
            through: 'user_board',
        })
    }
    return User
}
