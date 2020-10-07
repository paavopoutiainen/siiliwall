import React from 'react'

const SwimlaneView = ({ board }) => {
    // Modifying data's form to match the needs of swimlane components
    // Basically we want to each task to contain its subtasks
    // and have them divided by columns they exist at
    // These units are called swimlaneColumns
    console.log('board', board)
    const { columns } = board
    let tasks = []
    let subtasks = []

    columns.forEach((column) => {
        tasks = tasks.concat(column.tasks)
    })
    columns.forEach((column) => {
        subtasks = subtasks.concat(column.subtasks)
    })
    // This object and board.columnOrder are passed to swimlaneViewHeader
    const columnsForSwimlaneViewHeader = columns.map((column) => ({ id: column.id, name: column.name }))
    // This object is passed to swimlaneList
    const tasksForSwimlaneList = tasks.map((task) => {
        const swimlaneColumns = columns.map((column) => {
            const subtasksOfTask = subtasks.filter((subtask) => subtask.task.id === task.id)
            const subtasksInColumn = subtasksOfTask.filter((subtask) => subtask.column.id === column.id)
            return { name: column.name, id: column.id, subtasks: subtasksInColumn }
        })
        return { ...task, swimlaneColumns }
    })
    console.log(tasksForSwimlaneList, columnsForSwimlaneViewHeader)

    return <div />
}

export default SwimlaneView
