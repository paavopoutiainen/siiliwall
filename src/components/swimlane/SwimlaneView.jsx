import React from 'react'
import { Grid } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import SwimlaneViewHeader from './SwimlaneViewHeader'
import SwimlaneList from './SwimlaneList'
import { onDragEndSwimlane } from '../../utils/onDragEndSwimlane'

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
    const columnsForSwimlaneViewHeader = columns.map((column) => ({ id: column.id, name: column.name }))
    // This object is passed to swimlaneList
    const tasksForSwimlaneList = tasks.map((task) => {
        const swimlaneColumns = columns.map((column) => {
            const subtasksOfTask = subtasks.filter((subtask) => subtask.task.id === task.id)

            const subtasksInColumn = subtasksOfTask.filter((subtask) => subtask.column.id === column.id)
            const subtaskOrder = subtasksInColumn.map((subtask) => {
                const found = column.ticketOrder.find((obj) => obj.ticketId === subtask.id)
                if (found) {
                    return found
                }
            })
            // Add the real order index for subtask
            const subtasksInColumnFinal = subtasksInColumn.map((subtask) => {
                const index = column.ticketOrder.findIndex((obj) => obj.ticketId === subtask.id)
                return { ...subtask, index }
            })

            return {
                name: column.name, id: column.id, subtasks: subtasksInColumnFinal, subtaskOrder,
            }
        })
        return { ...task, swimlaneColumns }
    })
    console.log(tasksForSwimlaneList, columnsForSwimlaneViewHeader)

    return (
        <DragDropContext onDragEnd={(result) => onDragEndSwimlane}>
            <Grid container direction="column" spacing={3}>
                <Grid item><SwimlaneViewHeader columns={columnsForSwimlaneViewHeader} columnOrder={board.columnOrder} /></Grid>
                <Droppable droppableId={board.id} direction="vertical" type="swimlane">
                    {(provided) => (
                        <Grid item {...provided.droppableProps} ref={provided.innerRef}>
                            <SwimlaneList tasks={tasksForSwimlaneList} />
                        </Grid>
                    )}
                </Droppable>
            </Grid>
        </DragDropContext>
    )
}
export default SwimlaneView
