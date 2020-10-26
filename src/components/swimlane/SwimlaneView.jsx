/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React from 'react'
import { Grid } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useApolloClient } from '@apollo/client'
import SwimlaneViewHeader from './SwimlaneViewHeader'
import SwimlaneList from './SwimlaneList'
import { onDragEndSwimlane } from '../../utils/onDragEndSwimlane'
import useMoveTicketInColumn from '../../graphql/ticket/hooks/useMoveTicketInColumn'
import useMoveTicketFromColumn from '../../graphql/ticket/hooks/useMoveTicketFromColumn'
import usePrioritizeTask from '../../graphql/task/hooks/usePrioritizeTask'

const SwimlaneView = ({ board }) => {
    // Modifying data's form to match the needs of swimlane components
    // Basically we want to each task to contain its subtasks
    // and have them divided by columns they exist at
    // These units are called swimlaneColumns
    const [moveTicketInColumn] = useMoveTicketInColumn()
    const [moveTicketFromColumn] = useMoveTicketFromColumn()
    const [prioritizeTask] = usePrioritizeTask()
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

    // This object is passed to swimlaneList

    const columnsForSwimlaneViewHeader = columnsInOrder.map((column) => ({ id: column.id, name: column.name }))

    const columnsInReversedOrder = Array.from(columnsInOrder).reverse()
    let reversedTicketOrder = []
    columnsInReversedOrder.map((column) => {
        reversedTicketOrder = reversedTicketOrder.concat(column.ticketOrder)
    })
    const tasksInReversedOrder = reversedTicketOrder.filter((obj) => obj.type === 'task').map((obj) => tasks.find((task) => task.id === obj.ticketId))

    const tasksInOrder = tasksInReversedOrder.map((task, index) => {
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
                const realOrderIndex = column.ticketOrder.findIndex((obj) => obj.ticketId === subtask.id)
                return { ...subtask, index: realOrderIndex }
            })

            return {
                name: column.name, id: column.id, subtasks: subtasksInColumnFinal, subtaskOrder,
            }
        })
        return { ...task, swimlaneColumns, indexInNormalFlow: index }
    })

    // new logic for ordering swimlanes, taking into account the prioritized tasks
    const prioritizedTasks = tasksInOrder.filter((task) => task.prioritized)
    const unPrioritizedTasks = tasksInOrder.filter((task) => !task.prioritized)
    const finalArray = Array.from(unPrioritizedTasks)

    prioritizedTasks.sort((a, b) => a.swimlaneOrderNumber - b.swimlaneOrderNumber).map((task) => {
        finalArray.splice(task.swimlaneOrderNumber, 0, task)
    })

    const finalTasks = Array.from(finalArray)

    return (
        <DragDropContext onDragEnd={(result) => onDragEndSwimlane(result, moveTicketInColumn, moveTicketFromColumn, prioritizeTask, columns, client, finalTasks, board.id)}>
            <Grid container direction="column" spacing={5}>
                <Grid item><SwimlaneViewHeader columns={columnsForSwimlaneViewHeader} /></Grid>
                <Droppable droppableId={board.id} direction="vertical" type="swimlane">
                    {(provided) => (
                        <Grid item {...provided.droppableProps} ref={provided.innerRef}>
                            <SwimlaneList tasksInOrder={finalTasks} />
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </Grid>
        </DragDropContext>
    )
}
export default SwimlaneView
