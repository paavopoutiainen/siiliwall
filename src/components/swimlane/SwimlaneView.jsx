import React from 'react'
import { Grid } from '@material-ui/core'
import SwimlaneViewHeader from './SwimlaneViewHeader'
import SwimlaneList from './SwimlaneList'

const SwimlaneView = ({ board }) => {
    // Modifying data's form to match the needs of swimlane components
    // Basically we want to each task to contain its subtasks
    // and have them divided by columns they exist at
    // These units are called swimlaneColumns
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
            const subtasksTicketOrder = column.ticketOrder.filter((ticketOrderObj) => ticketOrderObj.type === 'subtask')
            const subtasksOfTask = subtasks.filter((subtask) => subtask.task.id === task.id)
            const subtasksInColumn = subtasksOfTask.filter((subtask) => subtask.column.id === column.id)

            return { name: column.name, id: column.id, subtasks: subtasksInColumn, subtaskOrder: subtasksTicketOrder }
        })
        return { ...task, swimlaneColumns }
    })
    console.log(tasksForSwimlaneList, columnsForSwimlaneViewHeader)
    return (
        <Grid container direction="column" spacing={1}>
            <Grid item><SwimlaneViewHeader columns={columnsForSwimlaneViewHeader} columnOrder={board.columnOrder} /></Grid>
            <Grid item><SwimlaneList tasks={tasksForSwimlaneList} /></Grid>
        </Grid>
    )
}
export default SwimlaneView
