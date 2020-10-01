/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Grid, Button } from '@material-ui/core'
import { boardPageStyles } from '../../styles/styles'
import TicketList from '../TicketList'
import DropdownColumn from './DropdownColumn'
import AddTaskDialog from '../task/AddTaskDialog'

const Column = ({ column, index }) => {
    const classes = boardPageStyles()
    const {
        tasks, ticketOrder, subtasks,
    } = column
    const [dialogStatus, setDialogStatus] = useState(false)

    const toggleDialog = () => setDialogStatus(!dialogStatus)
    console.log('ticketOrder in Column:', ticketOrder)
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
                                <TicketList
                                    tasks={tasks}
                                    subtasks={subtasks}
                                    ticketOrder={ticketOrder}
                                    columnId={column.id}
                                />
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                    <Grid item container direction="column">
                        <Grid item>
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
                </Grid>
            )}
        </Draggable>
    )
}
export default Column