/* eslint-disable consistent-return */
const supertest = require('supertest')
const db = require('../models/index.js')
const dummyData = require('../dummyData')
const { closeHttpServer } = require('../src/index.js')
const { app } = require('../src/index.js')

const request = supertest(app)

/*
  Drop all the tables, sync the models with the database,
  insert some testdata and return a promise when everything has resolved
*/
const initializeDb = async () => {
    try {
        await db.sequelize.sync({ force: true })
        await Promise.all(
            dummyData.users.map(async (user) => {
                const resolved = await db.User.create(user)
                return resolved
            }),
        )
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
        await Promise.all(
            dummyData.stories.map(async (story) => {
                const resolved = await db.Column.create(story)
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

const columnsInTheDb = async () => {
    try {
        const columns = await db.Column.findAll()
        return columns
    } catch (e) {
        console.log(e)
    }
}

const storiesOfColumnInTheDb = async (id) => {
    try {
        const stories = await db.Story.findAll({ where: { columnId: id } })
        return stories
    } catch (e) {
        console.log(e)
    }
}

const storiesInTheDb = async () => {
    try {
        const stories = await db.Story.findAll()
        return stories
    } catch (e) {
        console.log(e)
    }
}

const storyById = async (id) => {
    let story
    try {
        story = await db.Story.findByPk(id)
    } catch (e) {
        console.log(e)
    }
    return story
}

const tasksOfColumnInTheDb = async (id) => {
    try {
        const tasks = await db.Task.findAll({ where: { columnId: id } })
        return tasks
    } catch (e) {
        console.log(e)
    }
}

const tasksInTheDb = async () => {
    try {
        const tasks = await db.Task.findAll()
        return tasks
    } catch (e) {
        console.log(e)
    }
}

const taskById = async (id) => {
    let task
    try {
        task = await db.Task.findByPk(id)
    } catch (e) {
        console.log(e)
    }
    return task
}

const getTaskOrderOfColumn = async (columnId) => {
    let arrayOfIds
    try {
        const tasks = await db.Task.findAll({
            attributes: ['id'],
            where: { columnId },
            order: db.sequelize.literal('columnOrderNumber ASC'),
        })
        arrayOfIds = tasks.map((task) => task.dataValues.id)
    } catch (e) {
        console.log(e)
    }
    return arrayOfIds
}

const subtasksOfTaskInTheDb = async (taskId) => {
    let subtasks
    try {
        subtasks = await db.Subtask.findAll({
            where: { taskId },
        })
        return subtasks
    } catch (e) {
        console.log(e)
    }
}

const subtasksInTheDb = async () => {
    let subtasks
    try {
        subtasks = await db.Subtask.findAll()
        return subtasks
    } catch (e) {
        console.log(e)
    }
}

const initialBoards = dummyData.boards

const testCall = (query) => request
    .post('/graphql')
    .send({ query })

/* const taskOrderAtStart = await getTaskOrderOfColumn('7bce34e5-385b-41e6-acd3-ceb4bd57b4f6')
        const newTaskOrderArray = [
            '6e766c63-0684-4cf2-8a46-868cfaf84033',
            'b8d2d626-d6a8-4c9a-89f3-a77796d2b2f3',
            'e12d6ed1-c275-4047-8f3c-b50050bada6d',
        ]
        expect(newTaskOrderArray).not.toStrictEqual(taskOrderAtStart)
        const response = await testCall(`mutation {
                moveTaskInColumn(newOrder: [
                    "6e766c63-0684-4cf2-8a46-868cfaf84033",
                    "b8d2d626-d6a8-4c9a-89f3-a77796d2b2f3",
                    "e12d6ed1-c275-4047-8f3c-b50050bada6d",
                ], columnId: "7bce34e5-385b-41e6-acd3-ceb4bd57b4f6") {id taskOrder}
        }`)
        // expect taskOrder in mutation's response to be the same we asked for
        expect(response.body.data.moveTaskInColumn.taskOrder).toStrictEqual(newTaskOrderArray)

        const taskOrderAtEnd = await getTaskOrderOfColumn('7bce34e5-385b-41e6-acd3-ceb4bd57b4f6')
        // expect taskOrder to have changed
        expect(taskOrderAtEnd).not.toStrictEqual(taskOrderAtStart)
        // expect the tasks of certain column to have the same
        // taskOrder the mutation was set to change it into
        expect(taskOrderAtEnd).toStrictEqual(newTaskOrderArray) */

module.exports = {
    initializeDb,
    afterTests,
    boardsInTheDb,
    initialBoards,
    columnsOfBoardInTheDb,
    columnsInTheDb,
    storiesOfColumnInTheDb,
    storiesInTheDb,
    storyById,
    tasksOfColumnInTheDb,
    testCall,
    tasksInTheDb,
    taskById,
    getTaskOrderOfColumn,
    subtasksOfTaskInTheDb,
    subtasksInTheDb,
}
