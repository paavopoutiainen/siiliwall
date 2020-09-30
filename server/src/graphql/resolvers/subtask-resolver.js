const dataSources = require('../../datasources')

const schema = {

    Mutation: {
        addSubtaskForTask(root, { taskId, columnId, content }) {
            return dataSources.boardService.addSubtaskForTask(taskId, columnId, content)
        }
    },

    Subtask: {
        // task(root) {
        task() {
            return dataSources.boardService.get
        },
    },
}

module.exports = schema
