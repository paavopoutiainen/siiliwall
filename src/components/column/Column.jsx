/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Grid, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { boardPageStyles } from '../../styles/styles'
import TicketList from '../TicketList'
import DropdownColumn from './DropdownColumn'
import AddTaskDialog from '../task/AddTaskDialog'
import RenameColumn from './RenameColumn'

const Column = ({ column, index }) => {
    const classes = boardPageStyles()
    const {
        tasks, ticketOrder, subtasks, board,
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
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    spacing={2}
                >
                    <Grid classes={{ root: classes.columnHeader }} item container direction='row' justify='space-between' {...provided.dragHandleProps}>
                        <Grid item>
                            <RenameColumn editId={column.id} column={column} />
                        </Grid>
                        <Grid item container direction='row' alignItems='center' classes={{ root: classes.columnButtons }} style={{ width: 25 }}>
                            <Grid item>
                                <Button classes={{ root: classes.columnButton }} className="addTaskButton" >
                                    <AddIcon className="addTaskButton" />

                                </Button>
                            </Grid>
                            <Grid item>
                                <DropdownColumn columnId={column.id} boardId={column.board.id} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Droppable droppableId={column.id} type="task">
                        {(provided) => (
                            <Grid
                                item
                                container
                                classes={{ root: classes.ticketList }}

                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <TicketList
                                    tasks={tasks}
                                    subtasks={subtasks}
                                    ticketOrder={ticketOrder}
                                    columnId={column.id}
                                    boardId={board.id}
                                />
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                </Grid>
            )}
        </Draggable>
    )
}
export default Column
