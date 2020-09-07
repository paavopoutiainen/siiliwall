module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define("Column", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  Column.associate = function(models) {
    Column.belongsTo(models.Board, {
      foreignKey: "boardId"
    })
    Column.hasMany(models.Task, {
      foreignKey: "columnId"
    })
  }
  return Column
}