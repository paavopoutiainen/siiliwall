import React from "react"
import { Grid } from '@material-ui/core'
import Board from '../components/Board'
import { boardPageStyles } from '../styles/styles'
import '../styles.css'

const BoardPage = ({ id }) => {
    const classes = boardPageStyles()

    return (
        <Grid
            container
            direction="column"
            classes={{ root: classes.root }}
        >
            <Board id={id} />
        </Grid>
    )
}
export default BoardPage
