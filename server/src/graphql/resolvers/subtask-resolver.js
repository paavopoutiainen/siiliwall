const dataSources = require('../../datasources')

const schema = {

    Mutation: {
        addSubtaskForTask(root, { taskId, columnId, content }) {
            return dataSources.boardService.addSubtaskForTask(taskId, columnId, content)
        },
        addMemberForSubtask(root, { id, userId }) {
            return dataSources.boardService.addMemberForSubtask(id, userId)
        },
        deleteSubtaskById(root, { id }) {
            return dataSources.boardService.deleteTaskById(id)
        },
        archiveSubtaskById(root, { id }) {
            return dataSources.boardService.archiveTaskById(id)
        },
    },

    Subtask: {
        task(root) {
            return dataSources.boardService.getTaskById(root.taskId)
        },
    },
}

module.exports = schema
