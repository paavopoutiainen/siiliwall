const dataSources = require('../../datasources')

const schema = {

    Mutation: {
        addSubtaskForTask(root, {
            taskId, columnId, content, ownerId, memberIds, ticketOrder,
        }) {
            return dataSources.boardService.addSubtaskForTask(taskId, columnId, content, ownerId, memberIds, ticketOrder)
        },
        addMemberForSubtask(root, { id, userId }) {
            return dataSources.boardService.addMemberForSubtask(id, userId)
        },
        deleteSubtaskById(root, { id }) {
            return dataSources.boardService.deleteSubtaskById(id)
        },
        archiveSubtaskById(root, { id }) {
            return dataSources.boardService.archiveSubtaskById(id)
        },
    },

    Subtask: {
        task(root) {
            return dataSources.boardService.getTaskById(root.taskId)
        },
        column(root) {
            return dataSources.boardService.getColumnById(root.columnId)
        },
        owner(root) {
            if (!root.ownerId) {
                return null
            }
            return dataSources.boardService.getOwnerById(root.ownerId)
        },
        members(root) {
            return dataSources.boardService.getMembersBySubtaskId(root.id)
        },
    },
}

module.exports = schema
