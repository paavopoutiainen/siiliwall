const dataSources = require('../../datasources')

const schema = {

    Subtask: {
        // task(root) {
        task() {
            return dataSources.boardService.get
        },
    },
}

module.exports = schema
