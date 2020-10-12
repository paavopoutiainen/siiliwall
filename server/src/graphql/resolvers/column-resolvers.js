/* eslint-disable max-len */
const dataSources = require('../../datasources')

const schema = {
    Query: {
        columnById(root, args) {
            return dataSources.boardService.getColumnById(args.id)
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
        /* moveTaskInColumn(root, args) {
            return dataSources.boardService.reOrderTasksOfColumn(args.newOrder, args.columnId)
        }, */
        moveTicketInColumn(root, args) {
            return dataSources.boardService.reOrderTicketsOfColumn(args.newOrder, args.columnId)
        },
        /* async moveTaskFromColumn(root, {
            taskId, sourceColumnId, destColumnId, sourceTaskOrder, destTaskOrder,
        }) {
            await dataSources.boardService.changeTasksColumnId(taskId, destColumnId)
            const sourceColumn = await dataSources.boardService.reOrderTasksOfColumn(sourceTaskOrder, sourceColumnId)
            const destColumn = await dataSources.boardService.reOrderTasksOfColumn(destTaskOrder, destColumnId)
            return [sourceColumn, destColumn]
        }, */
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
        tasks(root) {
            return dataSources.boardService.getTasksByColumnId(root.id)
        },
        subtasks(root) {
            return dataSources.boardService.getSubtasksByColumnId(root.id)
        },
        taskOrder(root) {
            return dataSources.boardService.getTaskOrderOfColumn(root.id)
        },
        subtaskOrder(root) {
            return dataSources.boardService.getSubtaskOrderOfColumn(root.id)
        },
        ticketOrder(root) {
            return dataSources.boardService.getTicketOrderOfColumn(root.id)
        },
    },
}

module.exports = schema
