const dataSources = require('../../datasources')

const schema = {

    Mutation: {
        addSubtaskForTask(root, { taskId, columnId, ownerId, memberIds, content }) {
            return dataSources.boardService.addSubtaskForTask(taskId, columnId, content, ownerId, memberIds)
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
