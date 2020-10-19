/* eslint-disable max-len */
const dataSources = require('../../datasources')

const schema = {
    Query: {
        taskById(root, args) {
            return dataSources.boardService.getTaskById(args.id)
        },
    },

    Mutation: {
        addMemberForTask(root, {
            id, userId,
        }) {
            return dataSources.boardService.addMemberForTask(id, userId)
        },
        addTaskForColumn(root, {
            boardId, columnId, title, size, ownerId, memberIds, description,
        }) {
            return dataSources.boardService
                .addTaskForColumn(boardId, columnId, title, size, ownerId, memberIds, description)
        },
        editTaskById(root, {
            id, title, size, ownerId, oldMemberIds, newMemberIds, description,
        }) {
            return dataSources.boardService.editTaskById(id, title, size, ownerId, oldMemberIds, newMemberIds, description)
        },
        deleteTaskById(root, { id }) {
            return dataSources.boardService.deleteTaskById(id)
        },
        archiveTaskById(root, { id }) {
            return dataSources.boardService.archiveTaskById(id)
        },
        restoreTaskById(root, { id }) {
            return dataSources.boardService.restoreTaskById(id)
        },
        prioritizeTask(root, {
            id, swimlaneOrderNumber, affectedPrioritizedTaskIds, direction,
        }) {
            return dataSources.boardService.prioritizeTask(id, swimlaneOrderNumber, affectedPrioritizedTaskIds, direction)
        },
        unPrioritizeTask(root, { id, prioritizedTaskIds }) {
            return dataSources.boardService.unPrioritizeTask(id, prioritizedTaskIds)
        },
    },

    Task: {
        column(root) {
            return dataSources.boardService.getColumnById(root.columnId)
        },
        subtasks(root) {
            return dataSources.boardService.getSubtasksByTaskId(root.id)
        },
        owner(root) {
            if (!root.ownerId) {
                return null
            }
            return dataSources.boardService.getOwnerById(root.ownerId)
        },
        members(root) {
            return dataSources.boardService.getMembersByTaskId(root.id)
        },
    },
}

module.exports = schema
