const supertest = require('supertest')
const { app } = require('../src/index.js')
const {
    initializeDb, afterTests, boardsInTheDb, initialBoards, columnsOfBoardInTheDb,
} = require('./utils')

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

    test('allBoards query returns all the boards in the database', async () => {
        const response = await request
            .post('/graphql')
            .send({ query: '{ allBoards { id name columnOrder } }' })
            .expect('Content-Type', /application\/json/)

        const { allBoards } = response.body.data

        const boardsInTheDatabase = await boardsInTheDb()
        expect(allBoards).toHaveLength(boardsInTheDatabase.length)
    })

    test('allBoards query returns an array of boards inside the JSON', async () => {
        const response = await request
            .post('/graphql')
            .send({ query: '{ allBoards { id name columnOrder } }' })
            .expect('Content-Type', /application\/json/)

        const { allBoards } = response.body.data
        expect(Array.isArray([allBoards])).toBe(true)
    })

    test('boardById query returns one board with the given id', async () => {
        const response = await request
            .post('/graphql')
            .send({ query: '{ boardById(id: "1") { id name } }' })

        const board = response.body.data.boardById
        expect(board.id).toBe('1')
    })

    test('task is returned as JSON', async () => {
        await request
            .post('/graphql')
            .send({ query: '{ taskById(id: "2") { id } }' })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('taskById query returns one task with the given id of 3', async () => {
        const response = await request
            .post('/graphql')
            .send({ query: '{ taskById(id: "3") { id } }' })

        const task = response.body.data.taskById
        expect(task.id).toBe('3')
    })

    test('subtasks array of task can be accessed in the response of taskById query', async () => {
        const response = await request
            .post('/graphql')
            .send({ query: '{ taskById(id: "3") { id title subtasks { id } } }' })

        const task = response.body.data.taskById
        expect(Array.isArray([task.subtasks])).toBe(true)
    })
})

describe('mutations', () => {
    /*
    Reinitialize the database before each test in this describe block
    */
    beforeEach(() => initializeDb())

    test('addBoard mutation responds with JSON', async () => {
        await request
            .post('/graphql')
            .send({ query: '{ mutation addBoard(name: "newBoard") { id } }' })
            .expect('Content-Type', /application\/json/)
    })

    test('board can be added using addBoard mutation', async () => {
        await request
            .post('/graphql')
            .send({ query: 'mutation{ addBoard(name: "newBoard") { id } }' })

        const boardsAtEnd = await boardsInTheDb()
        expect(initialBoards.length + 1).toEqual(boardsAtEnd.length)
    })

    test('addColumnForBoard mutation responds with JSON', async () => {
        await request
            .post('/graphql')
            .send({ query: '{ mutation addBoard(name: "newBoard") { id } }' })
            .expect('Content-Type', /application\/json/)
    })

    test('column can be added for certain board by using addColumnForBoard mutation', async () => {
        const columnsAtStart = await columnsOfBoardInTheDb(2)
        await request
            .post('/graphql')
            .send({ query: 'mutation{ addColumnForBoard(boardId: "2", columnName: "newColumn") { id } }' })

        const columnsAtEnd = await columnsOfBoardInTheDb(2)
        expect(columnsAtStart.length + 1).toEqual(columnsAtEnd.length)
    })
})

afterAll(() => afterTests())
