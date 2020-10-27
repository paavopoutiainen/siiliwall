import React from 'react'
import { Grid } from '@material-ui/core'
import Swimlane from './Swimlane'

const SwimlaneList = ({ tasksInOrder, showAll, boardId }) => (
    <Grid
        container
        direction="column"
        spacing={4}
    >
        {tasksInOrder.map((task, index) => <Grid item key={task.id} index={index}><Swimlane tasksInOrder={tasksInOrder} task={task} index={index} showAll={showAll} boardId={boardId} /></Grid>)}
    </Grid>
)
export default SwimlaneList
