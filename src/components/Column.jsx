import React from 'react'
import { Grid } from '@material-ui/core'
import { Droppable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../styles/styles'
import TaskList from './TaskList'

const Column = ({ column }) => {
    const classes = boardPageStyles()
    const { tasks, taskOrder } = column

    return (
        <Grid
            item
            container
            direction="column"
            classes={{ root: classes.column }}
            alignItems="center"
        >
            <Grid item container>
                <Grid item classes={{ root: classes.columnTitle }}><h1>{column.name}</h1></Grid>
            </Grid>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <Grid item container {...provided.droppableProps} ref={provided.innerRef}>
                        <TaskList tasks={tasks} taskOrder={taskOrder} />
                        {provided.placeholder}
                    </Grid>
                )}

            </Droppable>

        </Grid>
    )
}

export default Column
