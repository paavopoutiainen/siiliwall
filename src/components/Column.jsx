import React from 'react'
import { Grid } from '@material-ui/core'
import { Droppable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../styles/styles'
import TaskList from './TaskList'

const Column = ({ column }) => {
    const classes = boardPageStyles()

    return (
        <Grid
            container
            item
            direction="column"
            classes={{ root: classes.column }}
            alignItems="center"
        >
            <Grid item container classes={{ root: classes.title }}>
                <h1>{column.name}</h1>
            </Grid>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <Grid item container {...provided.droppableProps} ref={provided.innerRef}>
                        <TaskList tasks={column.tasks} taskOrder={column.taskOrder} />
                        {provided.placeholder}
                    </Grid>
                )}

            </Droppable>

        </Grid>
    )
}

export default Column
