const dataSources = require('../../datasources')

const schema = {

    Mutation: {
        addSubtaskForTask(root, { taskId, columnId, content }) {
            console.log('resolver gets data')
            return dataSources.boardService.addSubtaskForTask(taskId, columnId, content,)
        },
        addMemberForSubtask(root, { id, userId }) {
            return dataSources.boardService.addMemberForSubtask(id, userId)
        }
    },

    Subtask: {
        task(root) {
            return dataSources.boardService.getTaskById(root.taskId)
        },
    },
}

module.exports = schema
