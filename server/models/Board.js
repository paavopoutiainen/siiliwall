module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  })
  Board.associate = function(models) {
    Board.hasMany(models.Column, {
      foreignKey: "boardId"
    })
  };
  return Board;
};