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
    },
}

module.exports = schema
