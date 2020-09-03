const dataSources  = require("../../datasources")

const schema = {
  Query: {
    taskById(root, args) {
      return dataSources.boardService.getColumnById(args.id)
    }
  },

  Task: {
    column(root) {
     
      return dataSources.boardService.getColumnById(root.columnId)
    },
    subtasks(root) {
      console.log("rootssss", root)
      return dataSources.boardService.getSubtasksByTaskId(root.id)
    }
  }
}

module.exports = schema