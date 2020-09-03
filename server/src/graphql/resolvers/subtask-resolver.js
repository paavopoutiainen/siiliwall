const dataSources  = require("../../datasources")

const schema = {

  Subtask: {
    task(root) {
      return dataSources.boardService.get
    }
  }
}

module.exports = schema