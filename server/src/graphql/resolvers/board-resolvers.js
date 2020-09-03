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
      console.log("root", root)
      return dataSources.boardService.getBoardColumns(root.id)
    }
  }
}

module.exports = schema