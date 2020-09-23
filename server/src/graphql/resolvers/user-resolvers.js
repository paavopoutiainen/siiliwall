const dataSources = require('../../datasources')

const schema = {
    Query: {
        allUsers() {
            return dataSources.boardService.getUsers()
        },
    },
}

module.exports = schema
