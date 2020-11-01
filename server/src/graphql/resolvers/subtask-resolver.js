const { withFilter } = require('graphql-subscriptions')
const dataSources = require('../../datasources')
const { pubsub } = require('../pubsub')

const SUBTASK_MUTATED = 'SUBTASK_MUTATED'
const SUBTASK_REMOVED = 'SUBTASK_REMOVED'

const schema = {

    Subscription: {
        subtaskMutated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(SUBTASK_MUTATED),
                (payload, args) => args.boardId === payload.boardId,
            ),
        },
    },

    Mutation: {
        async addSubtaskForTask(root, {
            taskId, columnId, boardId, name, content, size, ownerId, memberIds, ticketOrder,
        }) {
            const addedSubtask = await dataSources.boardService.addSubtaskForTask(taskId, columnId, boardId, name, content, size, ownerId, memberIds, ticketOrder)
            pubsub.publish(SUBTASK_MUTATED, {
                boardId,
                subtaskMutated: {
                    mutationType: 'CREATED',
                    subtask: addedSubtask.dataValues,
                },
            })
            console.log('tääällä', addedSubtask)
            return addedSubtask
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
            id, name, content, size, ownerId, oldMemberIds, newMemberIds,
        }) {
            return dataSources.boardService.editSubtaskById(id, name, content, size, ownerId, oldMemberIds, newMemberIds)
        },
    },

    Subtask: {
        task(root) {
            return dataSources.boardService.getTaskById(root.taskId)
        },
        column(root) {
            return dataSources.boardService.getColumnById(root.columnId)
        },
        board(root) {
            return dataSources.boardService.getBoardById(root.boardId)
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
