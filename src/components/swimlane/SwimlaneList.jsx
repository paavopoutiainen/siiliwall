import React from 'react'
import { Grid } from '@material-ui/core'
import Swimlane from './Swimlane'

const SwimlaneList = ({ tasks }) => (
    <Grid container direction="column" spacing={4}>
        {tasks.map((task, index) => <Grid item key={task.id}><Swimlane task={task} /></Grid>)}
    </Grid>
)
export default SwimlaneList
