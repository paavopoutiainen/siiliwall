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
                (payload, args) => (args.boardId === payload.boardId && args.eventId !== payload.eventId),
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
        async addTaskForColumn(root, {
            boardId, columnId, title, size, ownerId, memberIds, description, eventId,
        }) {
            let addedTask
            try {
                addedTask = await dataSources.boardService
                    .addTaskForColumn(boardId, columnId, title, size, ownerId, memberIds, description)
                pubsub.publish(TASK_MUTATED, {
                    boardId,
                    eventId,
                    taskMutated: {
                        mutationType: 'CREATED',
                        node: addedTask.dataValues,
                    },
                })
            } catch (e) {
                console.log(e)
            }

            return addedTask
        },
        async editTaskById(root, {
            id, title, size, ownerId, oldMemberIds, newMemberIds, description, eventId,
        }) {
            let editedTask
            try {
                editedTask = await dataSources.boardService.editTaskById(id, title, size, ownerId, oldMemberIds, newMemberIds, description)
                pubsub.publish(TASK_MUTATED, {
                    boardId: editedTask.boardId,
                    eventId,
                    taskMutated: {
                        mutationType: 'UPDATED',
                        node: editedTask,
                    },
                })
            } catch (e) {
                console.log(e)
            }
            return editedTask
        },
        async deleteTaskById(root, { id, columnId, boardId }) {
            let deletedTaskId
            try {
                deletedTaskId = await dataSources.boardService.deleteTaskById(id)
                pubsub.publish(TASK_REMOVED, {
                    boardId,
                    taskRemoved: {
                        removeType: 'DELETED',
                        removeInfo: { taskId: id, columnId, boardId },
                    },
                })
            } catch (e) {
                console.log(e)
            }
            return deletedTaskId
        },
        async archiveTaskById(root, { id, columnId, boardId }) {
            try {
                await dataSources.boardService.archiveTaskById(id)
                pubsub.publish(TASK_REMOVED, {
                    boardId,
                    taskRemoved: {
                        removeType: 'ARCHIVED',
                        removeInfo: { taskId: id, columnId, boardId },
                    },
                })
            } catch (e) {
                console.log(e)
            }

            return { taskId: id, columnId, boardId }
        },
        restoreTaskById(root, { id }) {
            return dataSources.boardService.restoreTaskById(id)
        },
        addMemberForTask(root, {
            id, userId,
        }) {
            return dataSources.boardService.addMemberForTask(id, userId)
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
