const {
    initializeDb,
    afterTests,
    boardsInTheDb,
    initialBoards,
    columnsOfBoardInTheDb,
    columnsInTheDb,
    tasksOfColumnInTheDb,
    testCall,
    tasksInTheDb,
    taskById,
    getTaskOrderOfColumn,
} = require('./utils')

describe('With initial test data in the database, queries', () => {
    // Reinitialize the database before each test in this describe block
    beforeEach(() => initializeDb())

    test('Boards are returned as JSON', async () => {
        const response = await testCall('{ allBoards { id name } }')
        const contentType = response.headers['content-type']
        expect(contentType).toEqual('application/json; charset=utf-8')
    })

    test('allBoards query returns all the boards in the database', async () => {
        const response = await testCall('{ allBoards { id name columnOrder } }')

        const { allBoards } = response.body.data

        const boardsInTheDatabase = await boardsInTheDb()
        expect(allBoards).toHaveLength(boardsInTheDatabase.length)
    })

    test('allBoards query returns an array of boards inside the JSON', async () => {
        const response = await testCall('{ allBoards { id name columnOrder } }')

        const contentType = response.headers['content-type']
        expect(contentType).toEqual('application/json; charset=utf-8')
        const { allBoards } = response.body.data
        expect(Array.isArray([allBoards])).toBe(true)
    })
    test('boardById query returns one board with the given id', async () => {
        const response = await testCall('{ boardById(id: "0f154e01-f8ba-49c8-b2dc-e374d28f7f83") { id name } }')

        const board = response.body.data.boardById
        expect(board.id).toBe('0f154e01-f8ba-49c8-b2dc-e374d28f7f83')
    })

    test('task is returned as JSON', async () => {
        const response = await testCall('{ taskById(id: "e12d6ed1-c275-4047-8f3c-b50050bada6d") { id } }')

        const contentType = response.headers['content-type']
        expect(contentType).toEqual('application/json; charset=utf-8')
    })

    test('taskById query returns one task with the given id of 7b29f130-fc89-4f16-b0ef-71a06e09110c', async () => {
        const response = await testCall('{ taskById(id: "7b29f130-fc89-4f16-b0ef-71a06e09110c") { id } }')

        const task = response.body.data.taskById
        expect(task.id).toBe('7b29f130-fc89-4f16-b0ef-71a06e09110c')
    })
    // This is possibly outdated
    test('subtasks array of task can be accessed in the response of taskById query', async () => {
        const response = await testCall('{ taskById(id: "7b29f130-fc89-4f16-b0ef-71a06e09110c") { id title subtasks { id } } }')

        const task = response.body.data.taskById
        expect(Array.isArray([task.subtasks])).toBe(true)
    })
})

describe('mutations', () => {
    // Reinitialize the database before each test in this describe block
    beforeEach(() => initializeDb())

    test('addBoard mutation responds with JSON', async () => {
        const response = await testCall('{ mutation addBoard(name: "newBoard") { id } }')
        const contentType = response.headers['content-type']
        expect(contentType).toEqual('application/json; charset=utf-8')
    })

    test('board can be added using addBoard mutation', async () => {
        await testCall('mutation{ addBoard(name: "newBoard") { id } }')

        const boardsAtEnd = await boardsInTheDb()
        expect(initialBoards.length + 1).toEqual(boardsAtEnd.length)
    })

    test('addColumnForBoard mutation responds with JSON', async () => {
        const response = await testCall('{ mutation addBoard(name: "newBoard") { id } }')
        const contentType = response.headers['content-type']
        expect(contentType).toEqual('application/json; charset=utf-8')
    })

    test('column can be added for certain board by using addColumnForBoard mutation', async () => {
        const columnsAtStart = await columnsOfBoardInTheDb('d3553f65-7ed4-4f43-9847-c14e4539eb5e')
        await testCall('mutation{ addColumnForBoard(boardId: "d3553f65-7ed4-4f43-9847-c14e4539eb5e", columnName: "newColumn") { id } }')

        const columnsAtEnd = await columnsOfBoardInTheDb('d3553f65-7ed4-4f43-9847-c14e4539eb5e')
        expect(columnsAtStart.length + 1).toEqual(columnsAtEnd.length)
    })

    test('deleteColumnById mutation responds with JSON', async () => {
        const response = await testCall('mutation { deleteColumnById(id: "b23f9b7f-ab9f-4219-9604-2178751ce948") }')
        const contentType = response.headers['content-type']
        expect(contentType).toEqual('application/json; charset=utf-8')
    })

    test('deleteColumnById mutation deletes one column from the database', async () => {
        const columnsAtStart = await columnsInTheDb()
        await testCall('mutation{ deleteColumnById(id: "b23f9b7f-ab9f-4219-9604-2178751ce948") }')

        const columnsAtEnd = await columnsInTheDb()

        expect(columnsAtStart.length - 1).toEqual(columnsAtEnd.length)
    })

    test('deleteColumnById mutation deletes column with the correct id from the database', async () => {
        await testCall('mutation{ deleteColumnById(id: "b23f9b7f-ab9f-4219-9604-2178751ce948") }')

        const columnsAtEnd = await columnsInTheDb()
        const stillExists = columnsAtEnd.some((column) => column.id === 'b23f9b7f-ab9f-4219-9604-2178751ce948')

        expect(stillExists).toBe(false)
    })

    test('addTaskForColumn mutation responds with JSON', async () => {
        const response = await testCall('mutation { addTaskForColumn(boardId: "83fa4f89-8ea1-4d1c-9fee-321daa941485", title: "Test task", size: 7, ownerId: "6baba4dd-1ff4-4185-b8ff-1b735bc56576", memberIds: ["6baba4dd-1ff4-4185-b8ff-1b735bc56576"], description: "DescriptionTest", columnId: "28d0ce05-b1e1-4c21-9c8a-87ba1b2a0527") { id } }')
        const contentType = response.headers['content-type']
        expect(contentType).toEqual('application/json; charset=utf-8')
    })

    test('task can be added for certain column by using addTaskForColumn mutation', async () => {
        const tasksAtStart = await tasksOfColumnInTheDb('28d0ce05-b1e1-4c21-9c8a-87ba1b2a0527')
        await testCall('mutation { addTaskForColumn(boardId: "83fa4f89-8ea1-4d1c-9fee-321daa941485", title: "Test task", size: 7, ownerId: "6baba4dd-1ff4-4185-b8ff-1b735bc56576", memberIds: ["6baba4dd-1ff4-4185-b8ff-1b735bc56576"], description: "DescriptionTest", columnId: "28d0ce05-b1e1-4c21-9c8a-87ba1b2a0527") { id } }')

        const tasksAtEnd = await tasksOfColumnInTheDb('28d0ce05-b1e1-4c21-9c8a-87ba1b2a0527')
        expect(tasksAtStart.length + 1).toEqual(tasksAtEnd.length)
    })

    test('task can be deleted by using deleteTaskById mutation', async () => {
        const tasksAtStart = await tasksInTheDb()
        await testCall('mutation {deleteTaskById(id: "7b29f130-fc89-4f16-b0ef-71a06e09110c")}')

        const tasksAtEnd = await tasksInTheDb()
        expect(tasksAtEnd.length).toEqual(tasksAtStart.length - 1)
    })

    test('deleteTaskById deletes the correct task', async () => {
        const tasksAtStart = await tasksInTheDb()
        const id = tasksAtStart[0]
        await testCall(`mutation {deleteTaskById(id: "${id}")}`)

        const tasksAtEnd = await tasksInTheDb()
        const stillExists = tasksAtEnd.some((task) => task.id === id)
        expect(stillExists).toBe(false)
    })
})

afterAll(() => afterTests())
