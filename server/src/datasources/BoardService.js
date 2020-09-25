/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
const { v4: uuid } = require('uuid')

class BoardService {
    constructor({ db }) {
        this.store = db
        this.sequelize = db.sequelize
    }

    initialize() {}

    async getBoards() {
        let boardsFromDb
        try {
            boardsFromDb = await this.store.Board.findAll()
        } catch (e) {
            console.error(e)
        }
        return boardsFromDb
    }

    async getBoardById(boardId) {
        let boardFromDb
        try {
            boardFromDb = await this.store.Board.findByPk(boardId)
        } catch (e) {
            console.error(e)
        }
        return boardFromDb
    }

    async getColumnsByBoardId(boardId) {
        let columnsByBoardIdFromDb
        try {
            columnsByBoardIdFromDb = await this.store.Column.findAll({ where: { boardId } })
        } catch (e) {
            console.error(e)
        }
        return columnsByBoardIdFromDb
    }

    async getColumnBoardByColumnId(columnId) {
        let boardFromDb
        try {
            const columnFromDb = await this.store.Column.findByPk(columnId)
            boardFromDb = await this.store.Board.findByPk(columnFromDb.boardId)
        } catch (e) {
            console.error(e)
        }
        return boardFromDb
    }

    async getColumnById(columnId) {
        let columnFromDb
        try {
            columnFromDb = await this.store.Column.findByPk(columnId)
        } catch (e) {
            console.error(e)
        }
        return columnFromDb
    }

    async deleteColumnById(columnId) {
        try {
            await this.store.Column.destroy({
                where: { id: columnId },
            })
        } catch (e) {
            console.error(e)
        }
        return columnId
    }

    async getTasksByColumnId(columnId) {
        let tasksFromDb
        try {
            tasksFromDb = await this.store.Task.findAll({ where: { columnId, deletedAt: null } })
        } catch (e) {
            console.error(e)
        }
        return tasksFromDb
    }

    async getTaskById(taskId) {
        let taskFromDb
        try {
            taskFromDb = await this.store.Task.findByPk(taskId)
        } catch (e) {
            console.error(e)
        }
        return taskFromDb
    }

    async getSubtasksByTaskId(taskId) {
        let subtasksFromDb
        try {
            subtasksFromDb = await this.store.Subtask.findAll({ where: { taskId } })
        } catch (e) {
            console.error(e)
        }
        return subtasksFromDb
    }

    async editTaskById(taskId, title, size, owner) {
        let task
        try {
            task = await this.store.Task.findByPk(taskId)
            task.title = title
            task.size = size
            task.owner = owner
            await task.save()
        } catch (e) {
            console.error(e)
        }
        return task
    }

    async deleteTaskById(taskId) {
        try {
            await this.store.Task.destroy({
                where: { id: taskId },
            })
        } catch (e) {
            console.error(e)
        }
        return taskId
    }

    /*
    Gets the order of columns in certain board, returns an array of columnIds in the correct order.
    This field is for keeping track of the order in which the columns are displayed in the board
  */
    async getColumnOrderOfBoard(boardId) {
        let arrayOfIds
        try {
            const columns = await this.store.Column.findAll({
                attributes: ['id'],
                where: { boardId },
                order: this.sequelize.literal('orderNumber ASC'),
            })
            arrayOfIds = columns.map((column) => column.dataValues.id)
        } catch (e) {
            console.error(e)
        }
        return arrayOfIds
    }

    /*
    Gets the order of tasks in certain column, returns an array of taskIds in the correct order.
    This field is for keeping track of the order in which the tasks are displayed in the column
  */
    async getTaskOrderOfColumn(columnId) {
        let arrayOfIds
        try {
            const tasks = await this.store.Task.findAll({
                attributes: ['id'],
                where: { columnId, deletedAt: null },
                order: this.sequelize.literal('columnOrderNumber ASC'),
            })
            arrayOfIds = tasks.map((task) => task.dataValues.id)
        } catch (e) {
            console.error(e)
        }
        return arrayOfIds
    }

    async getSubtaskOrderOfTask(taskId) {
        let arrayOfIds
        try {
            const subtasks = await this.store.Subtask.findAll({
                attributes: ['id'],
                where: { taskId },
                order: this.sequelize.literal('orderNumber ASC'),
            })
            arrayOfIds = subtasks.map((subtask) => subtask.dataValues.id)
        } catch (e) {
            console.error(e)
        }
        return arrayOfIds
    }

    async addBoard(boardName) {
        let addedBoard
        try {
            const biggestOrderNumber = await this.store.Board.max('orderNumber')
            addedBoard = await this.store.Board.create({
                id: uuid(),
                name: boardName,
                orderNumber: biggestOrderNumber + 1,
            })
        } catch (e) {
            console.error(e)
        }
        return addedBoard
    }

    async addColumnForBoard(boardId, columnName) {
        /*
          At the time of new columns' creation we want to display it as
          the component in the very right of the board,
          hence it is given the biggest orderNumber of the board
        */
        let addedColumn
        try {
            const biggestOrderNumber = await this.store.Column.max('orderNumber', {
                where: { boardId },
            })
            addedColumn = await this.store.Column.create({
                id: uuid(),
                boardId,
                name: columnName,
                orderNumber: biggestOrderNumber + 1,
            })
        } catch (e) {
            console.error(e)
        }
        return addedColumn
    }

    async addTaskForColumn(columnId, title, size, owner, content) {
        /*
          At the time of new tasks' creation we want to display it as the lower most task in its column,
          hence it is given the biggest columnOrderNumber of the column
        */
        let addedTask
        try {
            const smallestOrderNumber = await this.store.Task.max('columnOrderNumber', {
                where: { columnId },
            })
            addedTask = await this.store.Task.create({
                id: uuid(),
                columnId,
                title,
                size,
                owner,
                content,
                columnOrderNumber: smallestOrderNumber + 1,
            })
        } catch (e) {
            console.error(e)
        }
        return addedTask
    }

    // Loop through tasks and set the new columnOrderNumber for each using the index of the array
    async reOrderTasksOfColumn(newOrderArray, columnId) {
        let column
        try {
            await Promise.all(newOrderArray.map(async (id, index) => {
                const task = await this.store.Task.findByPk(id)
                task.columnOrderNumber = index
                await task.save()
            }))
            column = await this.store.Column.findByPk(columnId)
        } catch (e) {
            console.log(e)
        }
        return column
    }

    async changeTasksColumnId(taskId, columnId) {
        const task = await this.store.Task.findByPk(taskId)
        task.columnId = columnId
        await task.save()
    }

    async reOrderColumns(columnOrder) {
        try {
            await Promise.all(columnOrder.map(async (id, index) => {
                const column = await this.store.Column.findByPk(id)
                column.orderNumber = index
                await column.save()
            }))
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers() {
        let usersFromDb
        try {
            usersFromDb = await this.store.User.findAll()
        } catch (e) {
            console.error(e)
        }
        return usersFromDb
    }

    async archiveTaskById(taskId) {
        try {
            const task = await this.store.Task.findByPk(taskId)
            task.deletedAt = new Date()
            await task.save()
        } catch (e) {
            console.log(e)
        }
        return taskId
    }

    async restoreTaskById(taskId) {
        let updatedTask
        try {
            const task = await this.store.Task.findByPk(taskId)
            task.deletedAt = null
            updatedTask = await task.save()
        } catch (e) {
            console.log(e)
        }
        return updatedTask
    }
}

module.exports.BoardService = BoardService
