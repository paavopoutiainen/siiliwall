const dataSources = require('../../datasources')

const schema = {

    Subtask: {
        task(root) {
            return dataSources.boardService.getTaskById(root.taskId)
        },
    },
}

module.exports = schema
