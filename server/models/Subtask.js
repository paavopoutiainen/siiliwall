module.exports = (sequelize, DataTypes) => {
  const Subtask = sequelize.define("Subtask", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    orderNumber: DataTypes.INTEGER,
    done: DataTypes.BOOLEAN,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  Subtask.associate = function(models) {
    Subtask.belongsTo(models.Task, {
      foreignKey: "taskId"
    })
  }
  return Subtask
}