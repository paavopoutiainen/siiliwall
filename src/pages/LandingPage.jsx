import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import NewBoardForm from '../components/NewBoardForm'
import { GET_ALL_BOARDS } from '../graphql/queries'
import { landingPageStyles } from '../styles/styles'
import '../styles.css'

const LandingPage = () => {
    const { loading, error, data } = useQuery(GET_ALL_BOARDS)
    const [open, setOpen] = useState(false)
    const classes = landingPageStyles()

    function handleClickOpen() {
        setOpen(true)
    }

    if (loading) return <p>Loading boards...</p>
    if (error) return `Error: ${error.message}`

    return (
        <div style={{ padding: 30 }}>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                classes={{ root: classes.root }}
                spacing={7}
            >
                { open
                && <NewBoardForm setOpen={setOpen} open={open} />}
                <Grid item classes={{ root: classes.title }}>
                    <h1>Welcome!</h1>
                </Grid>
                <Grid item>
                    <Button onClick={handleClickOpen} classes={{ root: classes.addBoardButton }}>
                        Add Board
                    </Button>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        className="boardList"
                        spacing={2}
                    >
                        {data.allBoards.map(({ id, name }) => (
                            <Grid item classes={{ root: classes.boardButtonGrid }} key={id}>
                                <Link to={`/boards/${id}`} className="boardList__button__link">
                                    <Button fullWidth classes={{ root: classes.boardButton }}>
                                        {name}
                                    </Button>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>

    )
}
export default LandingPage
