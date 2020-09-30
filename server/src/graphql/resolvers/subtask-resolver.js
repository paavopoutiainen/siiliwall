const dataSources = require('../../datasources')

const schema = {

    Mutation: {
        addSubtaskForTask(root, { taskId, columnId, content }) {
            return dataSources.boardService.addSubtaskForTask(taskId, columnId, content)
        }
    },

    Subtask: {
        task(root) {
            return dataSources.boardService.getTaskById(root.taskId)
        },
    },
}

module.exports = schema
