const dataSources = require('../../datasources')

const schema = {

    Mutation: {
        addSubtaskForTask(root, {
            taskId, columnId, name, content, size, ownerId, memberIds, ticketOrder,
        }) {
            return dataSources.boardService.addSubtaskForTask(taskId, columnId, name, content, size, ownerId, memberIds, ticketOrder)
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
        editSubtaskById(root, {
            id, name, content, size, ownerId, oldMemberIds, newMemberIds
        }) {
            return dataSources.boardService.editSubtaskById(id, name, content, size, ownerId, oldMemberIds, newMemberIds)
        }
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
