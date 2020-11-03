const dataSources = require('../../datasources')

const schema = {
    Query: {
        storyById(root, args) {
            return dataSources.boardService.getStoryById(args.id)
        },
    },

    Mutation: {
        addStoryForColumn(root, {
            boardId, columnId, title, size, ownerId, membersIds, description,
        }) {
            return dataSources.boardService
                .addStoryForColumn(boardId, columnId, title, size, ownerId, membersIds, description)
        },
    },

    Story: {
        column(root) {
            return dataSources.boardService.getColumnById(root.columnId)
        },
        owner(root) {
            if (!root.ownerId) {
                return null
            }
            return dataSources.boardService.getOwnerById(root.ownerId)
        },
        members(root) {
            return dataSources.boardService.getMembersByStoryId(root.id)
        },
        board(root) {
            return dataSources.boardService.getBoardById(root.boardId)
        },
    },
}

module.exports = schema
