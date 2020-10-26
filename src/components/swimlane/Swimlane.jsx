/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneHeader from './SwimlaneHeader'
import SwimlaneColumnList from './SwimlaneColumnList'

const Swimlane = ({ task, index }) => {
    const classes = swimlaneStyles()
    const [show, setShow] = useState(false)

    const handleShowClick = () => {
        setShow(!show)
    }

    const numberOfSubtasks = task.swimlaneColumns
        .reduce((acc, cur) => parseInt(acc + cur.subtasks.length, 10), 0)
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    classes={{ root: classes.swimlane }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid item><SwimlaneHeader taskName={task.title} /></Grid>
                    <Grid item container direction="row" alignItems="center" spacing={1}>
                        <Grid item>
                            <Button size="small" variant="outlined" onClick={() => handleShowClick()}>{show ? 'hide' : 'show'}</Button>
                        </Grid>
                        <Grid item>{`${numberOfSubtasks} subtasks`}</Grid>
                    </Grid>
                    {show
                    && (
                        <Grid item>
                            <SwimlaneColumnList swimlaneColumns={task.swimlaneColumns} taskId={task.id} />
                        </Grid>
                    )}

                </Grid>
            )}
        </Draggable>

    )
}
export default Swimlane
