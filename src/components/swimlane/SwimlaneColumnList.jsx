import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneColumn from './SwimlaneColumn'

const SwimlaneColumnList = ({ swimlaneColumns }) => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="row" spacing={2} >
            {swimlaneColumns.map((colObj, index) =>
                <Grid item key={index}><SwimlaneColumn swimlaneColumn={colObj} /></Grid>
            )}
        </Grid>
    )
}
export default SwimlaneColumnList