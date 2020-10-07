import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneColumn = ({ swimlaneColumn }) => {
    const classes = swimlaneStyles()
    // swimlaneColumnin sisälle täytyy saada kyseisen palasen ticketOrder
    console.log('here', swimlaneColumn)
    return (
        <Grid container />
    )
}
export default SwimlaneColumn
