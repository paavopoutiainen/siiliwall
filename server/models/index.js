const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const dummyData = require('../dummyData')

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/../config/config.json`)[env]
const db = {}

let sequelize
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

const initializeDb = async () => {
    try {
        await db.sequelize.sync({ force: true })
        await Promise.all(
            dummyData.boards.map(async (board) => {
                const resolved = await db.Board.create(board)
                return resolved
            }),
        )
        await Promise.all(
            dummyData.columns.map(async (column) => {
                const resolved = await db.Column.create(column)
                return resolved
            }),
        )
        await Promise.all(
            dummyData.tasks.map(async (task) => {
                const resolved = await db.Task.create(task)
                return resolved
            }),
        )
        await Promise.all(
            dummyData.subtasks.map(async (subtask) => {
                const resolved = await db.Subtask.create(subtask)
                return resolved
            }),
        )
    } catch (e) {
        console.log(e)
    }
}

if (env === 'development') {
    initializeDb()
}

module.exports = db
