const dataSources  = require("../../datasources")

const schema = {
  Query: {
    allBoards() {
      return dataSources.boardService.getBoards()
    },
    boardById(root, args) {
      console.log("rootAtBoardById", root)
      return dataSources.boardService.getBoardById(args.id)
    }
  },

  Board: {
    columns(root) {
      return dataSources.boardService.getColumnsByBoardId(root.id)
    }
  }
}

module.exports = schema