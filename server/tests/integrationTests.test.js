const { app, closeHttpServer } = require("../src/index.js")
const request = require('supertest')(app);
const db = require("../models/index.js")
const dummyData = require("../dummyData")

describe("With initial test data in the database, queries", () => {
  beforeAll(async () => {
    return await db.sequelize.sync({force: true}).then(() => {
      dummyData.boards.forEach(board => {
        db.Board.create(board)
      })
      dummyData.columns.forEach(column => {
        db.Column.create(column)
      })
      dummyData.tasks.forEach(task => {
        db.Task.create(task)
      })
      dummyData.subtasks.forEach(subtask => {
        db.Subtask.create(subtask)
      })
    })
  })

  test("Boards are returned as JSON", async () => {
      await request
        .post("/graphql")
        .send({ query: "{ allBoards { id name } }" })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
  })

  test("allBoards query returns three boards in an array", async () => {
      const response = await request
        .post("/graphql")
        .send({ query: "{ allBoards { id name columnOrder } }" })
        .expect('Content-Type', /application\/json/)

      const allBoards = response.body.data.allBoards
      expect(allBoards).toHaveLength(3)
  })

  test("boardById query returns one board with the given id", async () => {
    const response = await request
      .post("/graphql")
      .send({ query: '{ boardById(id: "1") { id name } }' })

    const board = response.body.data.boardById
    expect(board.id).toBe("1")  
  })
})

afterAll(async () => {
  closeHttpServer()
  await db.sequelize.drop()
  return await db.sequelize.close()
})

