const dataSources = require('../../datasources')

const schema = {
    Query: {
        projectById(root, args) {
            return dataSources.boardService.getProjectById(args.id)
        },
        boardsByProjectId(root, args) {
            return dataSources.boardService.getBoardsByProjectId(args.id)
        },
    },
    Project: {
        boards(root) {
            return dataSources.boardService.getBoardsByProjectId(root.id)
        }
    }
}
module.exports = schema