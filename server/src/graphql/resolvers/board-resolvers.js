const { withFilter } = require('graphql-subscriptions')
const dataSources = require('../../datasources')
const { pubsub } = require('../pubsub')

const SWIMLANE_MOVED = 'SWIMLANE_MOVED'
const BOARD_ADDED = 'BOARD_ADDED'

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
        boardAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(BOARD_ADDED),
                (payload, args) => args.eventId !== payload.eventId,
            ),
        },
    },

    Mutation: {
        async addBoard(root, args) {
            let addedBoard
            try {
                addedBoard = await dataSources.boardService.addBoard(args.name, args.prettyId)
                pubsub.publish(BOARD_ADDED, {
                    eventId: args.eventId,
                    boardAdded: {
                        mutationType: 'CREATED',
                        board: addedBoard.dataValues
                    }
                })
            } catch (e) {
                console.log(e)
            }
            return addedBoard
        },

        moveSwimlane(root, {
            boardId, affectedSwimlanes, swimlaneOrder, eventId,
        }) {
            pubsub.publish(SWIMLANE_MOVED, {
                boardId,
                eventId,
                swimlaneMoved: {
                    boardId,
                    affectedSwimlanes,
                    swimlaneOrder,
                },
            })
            return dataSources.boardService.updateSwimlaneOrderNumbers(boardId, affectedSwimlanes)
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
        project(root) {
            return dataSources.boardService.getProjectByBoardId(root.id)
        }
    },
}

module.exports = schema
