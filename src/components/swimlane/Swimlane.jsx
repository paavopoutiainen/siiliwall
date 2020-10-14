import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneHeader from './SwimlaneHeader'
import SwimlaneColumnList from './SwimlaneColumnList'
import { Draggable } from 'react-beautiful-dnd'

const Swimlane = ({ task, index }) => {
    const classes = swimlaneStyles()
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Grid
                    container
                    direction="column"
                    spacing={3}
                    classes={{ root: classes.swimlane }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid item><SwimlaneHeader taskName={task.title} /></Grid>
                    <Grid item><SwimlaneColumnList swimlaneColumns={task.swimlaneColumns} taskId={task.id} /></Grid>
                </Grid>
            )}
        </Draggable>

    )
}
export default Swimlane
