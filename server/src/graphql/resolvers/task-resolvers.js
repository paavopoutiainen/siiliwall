/* eslint-disable max-len */
const { withFilter } = require('graphql-subscriptions')
const dataSources = require('../../datasources')
const { pubsub } = require('../pubsub')

const TASK_MUTATED = 'TASK_MUTATED'
const TASK_REMOVED = 'TASK_REMOVED'

const schema = {
    Query: {
        taskById(root, args) {
            return dataSources.boardService.getTaskById(args.id)
        },
    },

    Subscription: {
        taskMutated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(TASK_MUTATED),
                (payload, args) => args.boardId === payload.boardId,
            ),
        },
        taskRemoved: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(TASK_REMOVED),
                (payload, args) => args.boardId === payload.boardId,
            ),
        },
    },

    Mutation: {
        addMemberForTask(root, {
            id, userId,
        }) {
            return dataSources.boardService.addMemberForTask(id, userId)
        },
        async addTaskForColumn(root, {
            boardId, columnId, title, size, ownerId, memberIds, description,
        }) {
            const addedTask = await dataSources.boardService
                .addTaskForColumn(boardId, columnId, title, size, ownerId, memberIds, description)
            pubsub.publish(TASK_MUTATED, {
                boardId,
                taskMutated: {
                    mutationType: 'CREATED',
                    node: addedTask.dataValues,
                },
            })
            return addedTask
        },
        async editTaskById(root, {
            id, title, size, ownerId, oldMemberIds, newMemberIds, description,
        }) {
            const editedTask = await dataSources.boardService.editTaskById(id, title, size, ownerId, oldMemberIds, newMemberIds, description)
            pubsub.publish(TASK_MUTATED, {
                boardId: editedTask.boardId,
                taskMutated: {
                    mutationType: 'UPDATED',
                    node: editedTask,
                },
            })
            return editedTask
        },
        async deleteTaskById(root, { id, columnId, boardId }) {
            const deletedTaskId = await dataSources.boardService.deleteTaskById(id)
            pubsub.publish(TASK_REMOVED, {
                boardId,
                taskRemoved: {
                    mutationType: 'DELETED',
                    removeInfo: { taskId: id, columnId, boardId },
                },
            })
            return deletedTaskId
        },
        archiveTaskById(root, { id }) {
            return dataSources.boardService.archiveTaskById(id)
        },
        restoreTaskById(root, { id }) {
            return dataSources.boardService.restoreTaskById(id)
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
        board(root) {
            return dataSources.boardService.getBoardById(root.boardId)
        },
    },
}

module.exports = schema
