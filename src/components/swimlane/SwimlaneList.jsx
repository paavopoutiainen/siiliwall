import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import Swimlane from './Swimlane'

const SwimlaneList = ({ }) => {
    const classes = swimlaneStyles()

    /*Tähän komponenttiin tarvitaan siis boardin:
        - kolumnit
        - taskit + subtaskit tietoineen
        - swimlaneColumn listat
    */
    /* Passataan Swimlane komponentille*/
    return (
        <Grid container direction="column" spacing={2}>
            <Swimlane

            />
        </Grid>
    )
}
export default SwimlaneList