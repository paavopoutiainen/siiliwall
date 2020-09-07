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
}

module.exports.BoardService = BoardService