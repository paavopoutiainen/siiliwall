import React from 'react'
import { Grid } from '@material-ui/core'
import Board from '../components/board/Board'
import { boardPageStyles } from '../styles/styles'

const BoardPage = ({ id }) => {
    const classes = boardPageStyles()

    return (
        <Grid
            container
            direction="column"
            classes={{ root: classes.root }}
            id="boardElement"
        >
            <Board id={id} />
        </Grid>
    )
}
export default BoardPage
