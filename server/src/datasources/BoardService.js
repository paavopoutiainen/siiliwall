class BoardService {
  constructor({db}) {
      this.store = db
      this.sequelize = db.sequelize
  }

  initialize() {}

  async getBoards() {
    try {
      const boardsFromDb = await this.store.Board.findAll()
      return boardsFromDb
    } catch (e) {
      console.error(e)
    }
  }

  async getBoardById(boardId) {
    try {
      const boardFromDb = await this.store.Board.findByPk(boardId)
      return boardFromDb
    } catch (e) {
      console.error(e)
    }
  }

  async getColumnsByBoardId(boardId) { 
    try {
      const columnsByBoardIdFromDb = await this.store.Column.findAll({ where: { boardId: boardId } })
      return columnsByBoardIdFromDb
    } catch(e) {
      console.error(e)
    }
  }

  async getColumnBoardByColumnId(columnId) {
    try {
      const columnFromDb = await this.store.Column.findByPk(columnId)
      const boardFromDb = await this.store.Board.findByPk(columnFromDb.boardId)
      return boardFromDb
    } catch (e) {
      console.error(e)
    }
  }

  async getColumnById(columnId) {
    try {
      const columnFromDb = await this.store.Column.findByPk(columnId)
      return columnFromDb
    } catch (e) {
      console.error(e)
    }
  }

  async getTasksByColumnId(columnId) {
    try {
      const tasksFromDb = await this.store.Task.findAll({ where: { columnId: columnId }})
      return tasksFromDb 
    } catch (e) {
      console.error(e)
    }
  }

  async getTaskById(taskId) {
    try {
      const taskFromDb = await this.store.Task.findByPk(taskId)
      return taskFromDb
    } catch (e) {
      console.error(e)
    }
  }

  async getSubtasksByTaskId(taskId) {
    try {
      const subtasksFromDb = await this.store.Subtask.findAll( { where: { taskId: taskId }})
      return subtasksFromDb
    } catch (e) {
      console.error(e)
    }
  }
  //Gets the order of columns in certain board, returns an array of columnIds in the correct order. This field is for keeping track of the order in which the columns are displayed in the board
  async getColumnOrderOfBoard(boardId) {
    try {
      const columns = await this.store.Column.findAll({ 
        attributes: ["id"], 
        where: { boardId: boardId }, 
        order: this.sequelize.literal("orderNumber ASC")
      })
      const arrayOfIds = columns.map(column => column.dataValues.id)
      return arrayOfIds
    } catch (e) {
      console.error(e)
    }
  }
  //Gets the order of tasks in certain column, returns an array of taskIds in the correct order. This field is for keeping track of the order in which the tasks are displayed in the column
  async getTaskOrderOfColumn(columnId) {
    try {
      const tasks = await this.store.Task.findAll({
        attributes: ["id"],
        where: { columnId: columnId },
        order: this.sequelize.literal("columnOrderNumber ASC")
      })
      const arrayOfIds = tasks.map(task => task.dataValues.id)
      return arrayOfIds
    } catch (e) {
      console.error(e)
    }
  }

  async getSubtaskOrderOfTask(taskId) {
    try {
      const subtasks = await this.store.Subtask.findAll({
        attributes: ["id"],
        where: { taskId: taskId },
        order: this.sequelize.literal("orderNumber ASC")
      })
      const arrayOfIds = subtasks.map(subtask => subtask.dataValues.id)
      return arrayOfIds
    } catch (e) {
      console.error(e)
    }
  }

  async addBoard(boardName) {
    try {
      const addedBoard = await this.store.Board.create({ name: boardName })
      return addedBoard
    } catch(e) {
      console.error(e)
    }
  }

  async addColumnForBoard(boardId, columnName) {
    /*
    At the time of new columns' creation we want to display it as the component in the very right of the board, hence it is given the biggest orderNumber of the board
    */
    try {
      const biggestOrderNumber = await this.store.Column.max("orderNumber", {
        where: { boardId: boardId }
      })
      const addedColumn = await this.store.Column.create({ boardId: boardId, name: columnName, orderNumber: biggestOrderNumber + 1 })
      return addedColumn
    } catch (e) {
      console.error(e)
    }
  }

  async addTaskForColumn(columnId, title) {
    /*
    At the time of new tasks' creation we want to display it as the upper most task in its column, hence it is given the smallest columnOrderNumber of the column 
    */
    try {
      const smallestOrderNumber = await this.store.Task.min("columnOrderNumber", {
        where: { columnId: columnId }
      })
      const addedTask = await this.store.Task.create({ columnId: columnId, title: title, columnOrderNumber: smallestOrderNumber - 1 })
      return addedTask
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports.BoardService = BoardService