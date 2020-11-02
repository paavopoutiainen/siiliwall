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
}

module.exports = schema
