const { DataSource } = require("apollo-datasource");

class BoardService extends DataSource {
  constructor() {
      super();
  }

  initialize() {}

  getBoards() {
    return Promise.resolve(boards)
  }

  getBoardById(boardId) {
    console.log(boardId)
    let test = boards.find(board => board.id === boardId)
    console.log(test)
    return Promise.resolve(
      boards.find(board => board.id === boardId)
    )
  }

  getBoardColumns(boardId) { 
    return Promise.resolve(
      columns.filter(column => column.boardId === boardId)
    )
  }

  getColumnBoard(columnId) {
    const column = findColumn(columnId)
    const listOfBoards = boards.find(board => board.id === column.boardId)
    return Promise.resolve(listOfBoards)
  }

  getColumnById(columnId) {
    const column = findColumn(columnId)
    return Promise.resolve(column)
  }

  getTasksByColumnId(columnId) {
    let listOfTasks = tasks.filter(task => task.columnId === columnId)
    return Promise.resolve(listOfTasks)
  }

  getSubtasksByTaskId(taskId) {
    const listOfSubtasks = subtasks.filter(subtask => subtask.taskId === taskId)
    return Promise.resolve(listOfSubtasks)
  }
}

//helpers
function findColumn(columnId) {
  return columns.find(column => column.id === columnId)
}

module.exports.BoardService = BoardService

//dummy data
let boards = [
  {
    id: "board1",
    name: "board1"
  },
  {
    id: "board2",
    name: "board2"
  },
  {
    id: "board3",
    name: "board3"
  }
]

let columns = [
  {
    id: "column1",
    name: "column1",
    boardId: "board1"
  },
  {
    id: "column2",
    name: "column2",
    boardId: "board1"
  },
  {
    id: "column3",
    name: "column3",
    boardId: "board2"
  },
  {
    id: "column4",
    name: "column4",
    boardId: "board2"
  },
  {
    id: "column5",
    name: "column5",
    boardId: "board3"
  },
  {
    id: "column6",
    name: "column6",
    boardId: "board3"
  }
]

let tasks = [
  {
    id: "task1",
    title: "task1",
    content: "task1",
    columnId: "column1",
    columnOrderNumber: 2
  },
  {
    id: "task2",
    title: "task2",
    content: "task2",
    columnId: "column1",
    columnOrderNumber: 1
  },
  {
    id: "task3",
    title: "task3",
    content: "task3",
    columnId: "column2",
    columnOrderNumber: 1
  },
  {
    id: "task4",
    title: "task4",
    content: "task4",
    columnId: "column3",
    columnOrderNumber: 3
  },
  {
    id: "task5",
    title: "task5",
    content: "task5",
    column: "column3",
    columnOrderNumber: 1
  },
  {
    id: "task6",
    title: "task6",
    content: "task6",
    columnId: "column3",
    columnOrderNumber: 2
  }
]

let subtasks = [
  {
    id: "subtask1",
    name: "subtask1",
    done: true,
    taskId: "task2",
    orderNumber: 2
  },
  {
    id: "subtask2",
    name: "subtask2",
    done: false,
    taskId: "task1",
    orderNumber: 2
  },
  {
    id: "subtask3",
    name: "subtask3",
    done: true,
    taskId: "task2",
    orderNumber: 1
  },
  
]