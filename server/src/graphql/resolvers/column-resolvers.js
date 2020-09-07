const dataSources  = require("../../datasources")

const schema = {
  Query: {
    columnById(root, args) {
      return dataSources.boardService.getColumnById(args.id)
    }
  },

  Column: {
    board(root) {
      return dataSources.boardService.getColumnBoardByColumnId(root.id)
    },
    tasks(root) {
      return dataSources.boardService.getTasksByColumnId(root.id)
    }
  }
}

module.exports = schema