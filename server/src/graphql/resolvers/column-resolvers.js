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
        deleteColumnById(root, { id }) {
            return dataSources.boardService.deleteColumnById(id)
        },
        moveTaskInColumn(root, args) {
            return dataSources.boardService.reOrderTasksOfColumn(args.newOrder, args.columnId)
        },
        async moveTaskFromColumn(root, {
            taskId, sourceColumnId, destColumnId, sourceTaskOrder, destTaskOrder,
        }) {
            await dataSources.boardService.changeTasksColumnId(taskId, destColumnId)
            const sourceColumn = await dataSources.boardService.reOrderTasksOfColumn(sourceTaskOrder, sourceColumnId)
            const destColumn = await dataSources.boardService.reOrderTasksOfColumn(destTaskOrder, destColumnId)
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
        taskOrder(root) {
            return dataSources.boardService.getTaskOrderOfColumn(root.id)
        },
        subtaskOrder(root) {
            return dataSources.boardService.getSubtaskOrderOfColumn(root.id)
        },
    },
}

module.exports = schema
