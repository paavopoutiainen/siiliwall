const dataSources  = require("../../datasources")

const schema = {
  Query: {
    allBoards() {
      return dataSources.boardService.getBoards()
    },
    boardById(root, args) {
      return dataSources.boardService.getBoardById(args.id)
    }
  },

  Board: {
    columns(root) {
      return dataSources.boardService.getColumnsByBoardId(root.id)
    },
    columnOrder(root) {
      return dataSources.boardService.getColumnOrderOfBoard(root.id)
    }
  }
}

module.exports = schema