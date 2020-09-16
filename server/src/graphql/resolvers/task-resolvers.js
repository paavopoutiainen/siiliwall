const dataSources = require('../../datasources')

const schema = {
    Query: {
        taskById(root, args) {
            return dataSources.boardService.getTaskById(args.id)
        },
    },

    Mutation: {
        addTaskForColumn(root, { columnId, title }) {
            return dataSources.boardService.addTaskForColumn(columnId, title)
        },
        deleteTaskById(root, { id }) {
            return dataSources.boardService.deleteTaskById(id)
        },
    },

    Task: {
        column(root) {
            return dataSources.boardService.getColumnById(root.columnId)
        },
        subtasks(root) {
            return dataSources.boardService.getSubtasksByTaskId(root.id)
        },
        subtaskOrder(root) {
            return dataSources.boardService.getSubtaskOrderOfTask(root.id)
        },
    },
}

module.exports = schema
