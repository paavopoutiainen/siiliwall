const dataSources = require('../../datasources')

const schema = {
    Query: {
        allUsers() {
            return dataSources.boardService.getUsers()
        },
        userById(root, args) {
            return dataSources.boardService.getUserById(args.id)
        },
    },
}

module.exports = schema
