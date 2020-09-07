class BoardService {
  constructor({db}) {
      this.store = db
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
}

module.exports.BoardService = BoardService