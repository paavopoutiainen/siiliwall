import React from 'react'
import { Grid } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useApolloClient } from '@apollo/client'
import SwimlaneViewHeader from './SwimlaneViewHeader'
import SwimlaneList from './SwimlaneList'
import { onDragEndSwimlane } from '../../utils/onDragEndSwimlane'
import useMoveSwimlane from '../../graphql/swimlane/hooks/useMoveSwimlane'
import useMoveTicketInColumn from '../../graphql/ticket/hooks/useMoveTicketInColumn'
import useMoveTicketFromColumn from '../../graphql/ticket/hooks/useMoveTicketFromColumn'

const SwimlaneView = ({ board }) => {
    // Modifying data's form to match the needs of swimlane components
    // Basically we want to each task to contain its subtasks
    // and have them divided by columns they exist at
    // These units are called swimlaneColumns
    const [moveSwimlane] = useMoveSwimlane()
    const [moveTicketInColumn] = useMoveTicketInColumn()
    const [moveTicketFromColumn] = useMoveTicketFromColumn()
    const client = useApolloClient()
    const { columns } = board
    let tasks = []
    let subtasks = []
    columns.forEach((column) => {
        tasks = tasks.concat(column.tasks)
    })
    columns.forEach((column) => {
        subtasks = subtasks.concat(column.subtasks)
    })
    const columnsInOrder = board.columnOrder.map((id) => columns.find((column) => column.id === id))
    const columnsForSwimlaneViewHeader = columnsInOrder.map((column) => ({ id: column.id, name: column.name }))

    // This object is passed to swimlaneList
    const tasksForSwimlaneList = tasks.map((task) => {
        const swimlaneColumns = columnsInOrder.map((column) => {
            // figure out task's subtasks in certain column
            const subtasksOfTaskInColumn = subtasks.filter((subtask) => {
                if (subtask.task?.id === task.id && subtask.column.id === column.id) {
                    return subtask
                }
            })
            // Figure out the subtask order of task's subtasks in certain column
            // Loop through the ticketOrder of the column and pick up the ticketOrder objects
            // belonging to the subtasks of the task
            const subtaskOrder = column.ticketOrder.filter((obj) => subtasksOfTaskInColumn.map((subtask) => subtask.id).includes(obj.ticketId))
            // Add the real order index for subtask
            const subtasksInColumnFinal = subtasksOfTaskInColumn.map((subtask) => {
                const index = column.ticketOrder.findIndex((obj) => obj.ticketId === subtask.id)
                return { ...subtask, index }
            })

            return {
                name: column.name, id: column.id, subtasks: subtasksInColumnFinal, subtaskOrder,
            }
        })
        return { ...task, swimlaneColumns }
    })

    // console.log(tasksForSwimlaneList, columnsForSwimlaneViewHeader)

    return (
        <DragDropContext onDragEnd={(result) => onDragEndSwimlane(result, moveTicketInColumn, moveTicketFromColumn, moveSwimlane, columns, client, board.id)}>
            <Grid container direction="column" spacing={5}>
                <Grid item><SwimlaneViewHeader columns={columnsForSwimlaneViewHeader} /></Grid>
                <Droppable droppableId={board.id} direction="vertical" type="swimlane">
                    {(provided) => (
                        <Grid item {...provided.droppableProps} ref={provided.innerRef}>
                            <SwimlaneList tasks={tasksForSwimlaneList} />
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </Grid>
        </DragDropContext>
    )
}
export default SwimlaneView
