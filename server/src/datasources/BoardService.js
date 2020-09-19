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
            tasksFromDb = await this.store.Task.findAll({ where: { columnId } })
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
                where: { columnId },
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
            addedBoard = await this.store.Board.create({ name: boardName })
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
                boardId,
                name: columnName,
                orderNumber: biggestOrderNumber + 1,
            })
        } catch (e) {
            console.error(e)
        }
        return addedColumn
    }

    async addTaskForColumn(columnId, title) {
    /*
      At the time of new tasks' creation we want to display it as the lower most task in its column,
      hence it is given the biggest columnOrderNumber of the column
    */
        let columnFromDb
        try {
            const smallestOrderNumber = await this.store.Task.max('columnOrderNumber', {
                where: { columnId },
            })
            await this.store.Task.create({
                columnId,
                title,
                columnOrderNumber: smallestOrderNumber + 1,
            })
            columnFromDb = await this.store.Column.findByPk(columnId)
        } catch (e) {
            console.error(e)
        }
        return columnFromDb
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
}

module.exports.BoardService = BoardService
