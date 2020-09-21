/* eslint-disable max-len */
import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Grid, Button } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'
import TaskList from './TaskList'
import DropdownColumn from './DropdownColumn'
import TaskDialog from './TaskDialog'

const Column = ({ column }) => {
    const classes = boardPageStyles()
    const { tasks, taskOrder } = column
    const [dialogStatus, setDialogStatus] = useState(false)

    const toggleDialog = () => setDialogStatus(!dialogStatus)

    return (
        <Grid
            item
            container
            direction="column"
            classes={{ root: classes.column }}
            alignItems="center"
        >
            <Grid item container direction="row" justify="space-between">
                <Grid item classes={{ root: classes.columnTitle }}><h1>{column.name}</h1></Grid>
                <Grid item><DropdownColumn columnId={column.id} boardId={column.board.id} /></Grid>
            </Grid>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Grid item container {...provided.droppableProps} ref={provided.innerRef}>
                        <TaskList tasks={tasks} taskOrder={taskOrder} columnId={column.id} />
                        {provided.placeholder}
                    </Grid>
                )}

            </Droppable>
            <Grid item container>
                <TaskDialog dialogStatus={dialogStatus} toggleDialog={toggleDialog} column={column} />
                <Button
                    onClick={toggleDialog}
                    color="primary"
                >
                    Add task
                </Button>
            </Grid>
        </Grid>
    )
}
export default Column
