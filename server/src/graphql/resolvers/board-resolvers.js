const dataSources = require('../../datasources')

const schema = {
    Query: {
        allBoards() {
            return dataSources.boardService.getBoards()
        },
        boardById(root, args) {
            return dataSources.boardService.getBoardById(args.id)
        },
    },

    Mutation: {
        addBoard(root, args) {
            return dataSources.boardService.addBoard(args.name)
        },
    },

    Board: {
        columns(root) {
            return dataSources.boardService.getColumnsByBoardId(root.id)
        },
        columnOrder(root) {
            return dataSources.boardService.getColumnOrderOfBoard(root.id)
        },
        swimlaneOrder(root) {
            return dataSources.boardService.getSwimlaneOrderOfBoard(root.id)
        }
    },
}

module.exports = schema
