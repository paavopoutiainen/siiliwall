const { BoardService } = require('./BoardService')
const db = require('../../models')

const dataSources = {
    boardService: new BoardService({ db }),
}

module.exports = dataSources
