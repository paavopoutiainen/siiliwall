import React from 'react'
import {
    Grid, FormControlLabel, Switch,
} from '@material-ui/core'
import { headerStyles } from '../styles/styles'
import Hedgehog from './Hedgehog'

const Header = (props) => {
    const {
        boardName, boardPrettyId, switchView, projectName, landing,
    } = props
    const classes = headerStyles()

    return (
        <Grid
            container
            item
            direction="row"
            classes={{ root: classes.header }}
            id="boardHeader"
            alignItems="center"
        >
            {boardName && (
                <>
                    <Grid item container direction="row" alignItems="center" classes={{ root: classes.boardHeaderLeft }} spacing={2}>
                        <Grid item>
                            <Hedgehog />
                        </Grid>
                        <Grid item container classes={{ root: classes.headerTitle }} direction="column">
                            <Grid item classes={{ root: classes.headerPrettyId }}>
                                {boardPrettyId}
                            </Grid>
                            <Grid item>
                                <h1>{boardName}</h1>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item container classes={{ root: classes.boardHeaderRight }} justify="flex-end">
                        <Grid>
                            <FormControlLabel
                                control={<Switch onChange={switchView} />}
                                label=""
                                labelPlacement="end"
                            />
                        </Grid>
                    </Grid>
                </>
            )}
            {projectName && (
                <div />
            )}
            {landing && (
                <div />
            )}

        </Grid>

    )
}

export default Header
