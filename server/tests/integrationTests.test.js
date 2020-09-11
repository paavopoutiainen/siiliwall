const supertest = require('supertest')
const { app } = require('../src/index.js')
const { initializeDb, afterTests } = require('./utils')

const request = supertest(app)

describe('With initial test data in the database, queries', () => {
    /*
    Reinitialize the database before each test in this describe block
  */
    beforeEach(() => initializeDb())

    test('Boards are returned as JSON', async () => {
        await request
            .post('/graphql')
            .send({ query: '{ allBoards { id name } }' })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('allBoards query returns three boards in an array', async () => {
        const response = await request
            .post('/graphql')
            .send({ query: '{ allBoards { id name columnOrder } }' })
            .expect('Content-Type', /application\/json/)

        const { allBoards } = response.body.data
        expect(allBoards).toHaveLength(3)
    })

    test('boardById query returns one board with the given id', async () => {
        const response = await request
            .post('/graphql')
            .send({ query: '{ boardById(id: "1") { id name } }' })

        const board = response.body.data.boardById
        expect(board.id).toBe('1')
    })
})

afterAll(() => afterTests())
