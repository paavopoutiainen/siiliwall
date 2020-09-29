/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Grid, Button } from '@material-ui/core'
import { boardPageStyles } from '../../styles/styles'
import TaskList from '../task/TaskList'
import SubtaskList from '../subtask/SubtaskList'
import DropdownColumn from './DropdownColumn'
import AddTaskDialog from '../task/AddTaskDialog'

const Column = ({ column, index }) => {
    const classes = boardPageStyles()
    const {
        tasks, taskOrder, subtasks, subtaskOrder,
    } = column
    const [dialogStatus, setDialogStatus] = useState(false)

    const toggleDialog = () => setDialogStatus(!dialogStatus)

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Grid
                    item
                    container
                    direction="column"
                    classes={{ root: classes.column }}
                    alignItems="center"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Grid item container direction="row" justify="space-between" {...provided.dragHandleProps}>
                        <Grid item>
                            <h2>{column.name}</h2>
                        </Grid>
                        <Grid item>
                            <DropdownColumn columnId={column.id} boardId={column.board.id} />
                        </Grid>
                    </Grid>
                    <Droppable droppableId={column.id} type="task">
                        {(provided) => (
                            <Grid
                                item
                                container
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <TaskList
                                    tasks={tasks}
                                    taskOrder={taskOrder}
                                    columnId={column.id}
                                />
                                {provided.placeholder}
                            </Grid>
                        )}

                    </Droppable>
                    <Droppable droppableId={`subtask${column.id}`} type="subtask">
                        {(provided) => (
                            <Grid
                                item
                                container
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <SubtaskList
                                    subtasks={subtasks}
                                    subtaskOrder={subtaskOrder}
                                    columnId={column.id}
                                />
                                {provided.placeholder}
                            </Grid>
                        )}

                    </Droppable>
                    <Grid item container>
                        <AddTaskDialog
                            dialogStatus={dialogStatus}
                            toggleDialog={toggleDialog}
                            column={column}
                        />
                        <Button
                            onClick={toggleDialog}
                            color="primary"
                        >
                            Add task
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Draggable>
    )
}
export default Column
