const db = require('../models/index.js')
const dummyData = require('../dummyData')
const { closeHttpServer } = require('../src/index.js')

/*
  Drop all the tables, sync the models with the database,
  insert some testdata and return a promise when everything has resolved
*/
const initializeDb = async () => {
    try {
        await db.sequelize.sync({ force: true })
        await Promise.all(
            dummyData.boards.map(async (board) => {
                const resolved = await db.Board.create(board)
                return resolved
            }),
        )
        await Promise.all(
            dummyData.columns.map(async (column) => {
                const resolved = await db.Column.create(column)
                return resolved
            }),
        )
        await Promise.all(
            dummyData.tasks.map(async (task) => {
                const resolved = await db.Task.create(task)
                return resolved
            }),
        )
        await Promise.all(
            dummyData.subtasks.map(async (subtask) => {
                const resolved = await db.Subtask.create(subtask)
                return resolved
            }),
        )
    } catch (e) {
        console.log(e)
    }

    return new Promise((resolve) => resolve())
}

const afterTests = async () => {
    closeHttpServer()
    try {
        await db.sequelize.drop()
        await db.sequelize.close()
    } catch (e) {
        console.log(e)
    }
    return new Promise((resolve) => resolve())
}

const boardsInTheDb = async () => {
    try {
        const boardsInTheDatabase = await db.Board.findAll()
        return boardsInTheDatabase
    } catch (e) {
        console.log(e)
    }
}

const columnsOfBoardInTheDb = async (id) => {
    try {
        const columns = await db.Column.findAll({ where: { boardId: id } })
        return columns
    } catch (e) {
        console.log(e)
    }
}

const initialBoards = dummyData.boards

module.exports = {
    initializeDb, afterTests, boardsInTheDb, initialBoards, columnsOfBoardInTheDb,
}
