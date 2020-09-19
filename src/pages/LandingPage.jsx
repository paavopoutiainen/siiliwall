import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useAllBoards from '../graphql/board/hooks/useAllBoards'

import NewBoardForm from '../components/NewBoardForm'
import { landingPageStyles } from '../styles/styles'
import '../styles.css'

const LandingPage = () => {
    const { data, loading } = useAllBoards()
    const [open, setOpen] = useState(false)
    const classes = landingPageStyles()

    function handleClickOpen() {
        setOpen(true)
    }

    if (loading) return null

    return (
        <div className="container">
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                classes={{ root: classes.root }}
                spacing={7}
            >
                {open
                    && <NewBoardForm setOpen={setOpen} open={open} />}
                <Grid item classes={{ root: classes.title }}>
                    <h1 id="landingTitle" >Welcome!</h1>
                </Grid>
                <Grid item >
                    <Button onClick={handleClickOpen} classes={{ root: classes.addBoardButton }} id="addButton">
                        Add Board
                    </Button>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    alignItems="center"
                    spacing={2}
                >
                    {data.allBoards.map(({ id, name }) => (
                        <Grid item classes={{ root: classes.boardButtonGrid }} key={id} className="boardButton">
                            <Link to={`/boards/${id}`} className="boardList__button__link">
                                <Button fullWidth classes={{ root: classes.boardButton }}>
                                    {name}
                                </Button>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}
export default LandingPage
