// dummy data
const boards = [
    {
        name: 'board1',
    },
    {
        name: 'board2',
    },
    {
        name: 'board3',
    },
]

const columns = [
    {
        name: 'column1',
        boardId: 1,
        orderNumber: 1,
    },
    {
        name: 'column2',
        boardId: 1,
        orderNumber: 2,
    },
    {
        name: 'column3',
        boardId: 2,
        orderNumber: 2,
    },
    {
        name: 'column4',
        boardId: 2,
        orderNumber: 1,
    },
    {
        name: 'column5',
        boardId: 3,
        orderNumber: 1,
    },
    {
        name: 'column6',
        boardId: 3,
        orderNumber: 2,
    },
]

const tasks = [
    {
        title: 'task1',
        content: 'task1',
        columnId: 1,
        columnOrderNumber: 2,
    },
    {
        title: 'task2',
        content: 'task2',
        columnId: 1,
        columnOrderNumber: 1,
    },
    {
        title: 'task3',
        content: 'task3',
        columnId: 2,
        columnOrderNumber: 1,
    },
    {
        title: 'task4',
        content: 'task4',
        columnId: 3,
        columnOrderNumber: 2,
    },
    {
        title: 'task5',
        content: 'task5',
        columnId: 3,
        columnOrderNumber: 3,
    },
    {
        title: 'task6',
        content: 'task6',
        columnId: 3,
        columnOrderNumber: 1,
    },
]

const subtasks = [
    {
        name: 'subtask1',
        done: true,
        taskId: 2,
        orderNumber: 2,
    },
    {
        name: 'subtask2',
        done: false,
        taskId: 1,
        orderNumber: 2,
    },
    {
        name: 'subtask3',
        done: true,
        taskId: 2,
        orderNumber: 1,
    },

]

module.exports = {
    boards, columns, tasks, subtasks,
}
