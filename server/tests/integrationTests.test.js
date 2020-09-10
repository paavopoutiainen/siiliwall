const { app, closeHttpServer } = require("../src/index.js")
const request = require('supertest')(app);
const db = require("../models/index.js")
const dummyData = require("../dummyData")

describe("With initial test data in the database", () => {
  beforeEach(async () => {
    await db.sequelize.drop().then(() => db.sequelize.sync())
      .then(() => {
        dummyData.boards.forEach((board) => {
          db.Board.create(board)
        })
        dummyData.columns.forEach((column) => {
          db.Column.create(column)
        })
        dummyData.tasks.forEach((task) => {
          db.Task.create(task)
        })
        dummyData.subtasks.forEach((subtask) => {
          db.Subtask.create(subtask)
        })
    })
  })

  test("allBoards query returns three boards", async () => {
    const response = await request
      .post("/graphql")
      .send({ query: "{ allBoards{id name} }" })
      
    expect(response.body.data.allBoards).toEqual([{"id": "1", "name": "board1"}, {"id": "2", "name": "board2"}, {"id": "3", "name": "board3"}])
  })

})



afterAll(async () => {
  closeHttpServer()
  await db.sequelize.drop()
  await db.sequelize.close()
})

