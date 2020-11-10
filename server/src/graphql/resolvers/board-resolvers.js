const { withFilter } = require('graphql-subscriptions')
const dataSources = require('../../datasources')
const { pubsub } = require('../pubsub')

const SWIMLANE_MOVED = 'SWIMLANE_MOVED'

const schema = {
    Query: {
        allBoards() {
            return dataSources.boardService.getBoards()
        },
        boardById(root, args) {
            return dataSources.boardService.getBoardById(args.id)
        },
    },

    Subscription: {
        swimlaneMoved: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(SWIMLANE_MOVED),
                (payload, args) => (args.boardId === payload.boardId && args.eventId !== payload.eventId),
            ),
        },
    },

    Mutation: {
        addBoard(root, args) {
            return dataSources.boardService.addBoard(args.name, args.prettyId)
        },
        moveSwimlane(root, {
            boardId, newSwimlaneOrder, swimlaneOrder, eventId,
        }) {
            pubsub.publish(SWIMLANE_MOVED, {
                boardId,
                eventId,
                swimlaneMoved: {
                    boardId,
                    newSwimlaneOrder,
                    swimlaneOrder,
                },
            })
            return dataSources.boardService.updateSwimlaneOrderNumbers(boardId, newSwimlaneOrder)
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
        },
    },
}

module.exports = schema
