const db = require("../models/index.js")
const dummyData = require("../dummyData")
const { closeHttpServer } = require("../src/index.js")

/*
  Drop all the tables, sync the models with the database, insert some testdata and return a promise when everything has resolved
*/
const initializeDb = async () => {
  await db.sequelize.sync({ force: true })
  await Promise.all(
    dummyData.boards.map(async board => {
      return await db.Board.create(board)
    })
  )
  await Promise.all(
    dummyData.columns.map(async column => {
      return await db.Column.create(column)
    })
  )
  await Promise.all(
    dummyData.tasks.map(async task => {
      return await db.Task.create(task)
    })
  )
  await Promise.all(
    dummyData.subtasks.map(async subtask => {
      return await db.Subtask.create(subtask)
    })
  )
return new Promise((resolve) => resolve())
}

const afterTests = async () => {
  closeHttpServer()
  await db.sequelize.drop()
  await db.sequelize.close()
  return new Promise((resolve) => resolve())
}

module.exports = { initializeDb, afterTests }