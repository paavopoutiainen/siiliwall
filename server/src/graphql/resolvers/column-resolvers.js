/* eslint-disable max-len */
const { withFilter } = require('graphql-subscriptions')
const dataSources = require('../../datasources')
const { pubsub } = require('../pubsub')

const TICKET_MOVED_IN_COLUMN = 'TICKET_MOVED_IN_COLUMN'
const TICKET_MOVED_FROM_COLUMN = 'TICKET_MOVED_FROM_COLUMN'

const schema = {
    Query: {
        columnById(root, args) {
            return dataSources.boardService.getColumnById(args.id)
        },
    },

    Subscription: {
        ticketMovedInColumn: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(TICKET_MOVED_IN_COLUMN),
                (payload, args) => args.boardId === payload.boardId,
            ),
        },
    },

    Mutation: {
        addColumnForBoard(root, { boardId, columnName }) {
            return dataSources.boardService.addColumnForBoard(boardId, columnName)
        },
        editColumnById(root, {
            id, name,
        }) {
            return dataSources.boardService.editColumnById(id, name)
        },
        deleteColumnById(root, { id }) {
            return dataSources.boardService.deleteColumnById(id)
        },
        async moveTicketInColumn(root, {
            newOrder, columnId, boardId,
        }) {
            const modifiedColumn = await dataSources.boardService.reOrderTicketsOfColumn(newOrder, columnId)
            pubsub.publish(TICKET_MOVED_IN_COLUMN, {
                boardId,
                ticketMovedInColumn: {
                    newOrder,
                    columnId,
                },
            })
            return modifiedColumn
        },
        async moveTicketFromColumn(root, {
            type, ticketId, sourceColumnId, destColumnId, sourceTicketOrder, destTicketOrder,
        }) {
            await dataSources.boardService.changeTicketsColumnId(type, ticketId, destColumnId)
            const sourceColumn = await dataSources.boardService.reOrderTicketsOfColumn(sourceTicketOrder, sourceColumnId)
            const destColumn = await dataSources.boardService.reOrderTicketsOfColumn(destTicketOrder, destColumnId)
            return [sourceColumn, destColumn]
        },
        async moveColumn(root, { boardId, newColumnOrder }) {
            await dataSources.boardService.reOrderColumns(newColumnOrder)
            return boardId
        },
    },

    Column: {
        board(root) {
            return dataSources.boardService.getColumnBoardByColumnId(root.id)
        },
        stories(root) {
            return dataSources.boardService.getStoriesByColumnId(root.id)
        },
        tasks(root) {
            return dataSources.boardService.getTasksByColumnId(root.id)
        },
        subtasks(root) {
            return dataSources.boardService.getSubtasksByColumnId(root.id)
        },
        ticketOrder(root) {
            return dataSources.boardService.getTicketOrderOfColumn(root.id)
        },
    },
}

module.exports = schema
