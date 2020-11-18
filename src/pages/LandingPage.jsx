import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useAllBoards from '../graphql/board/hooks/useAllBoards'
import NewBoardForm from '../components/board/NewBoardForm'
import NewUserForm from '../components/user/NewUserForm'
import { landingPageStyles } from '../styles/styles'
import '../styles.css'

const LandingPage = () => {
    const { data, loading } = useAllBoards()
    const [open, setOpen] = useState(false)
    const [openUserForm, setUserFormOpen] = useState(false)
    const classes = landingPageStyles()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickOpenUser = () => {
        setUserFormOpen(true)
    }

    if (loading) return null
    const boardsInOrder = data.allBoards.slice().sort((a, b) => a.orderNumber - b.orderNumber)

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
                {open && <NewBoardForm setOpen={setOpen} open={open} />}
                {openUserForm && <NewUserForm setOpen={setUserFormOpen} open={openUserForm} />}
                <Grid item classes={{ root: classes.title }}>
                    <h1 id="landingTitle">Welcome!</h1>
                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    justify="center"
                    spacing={3}
                >
                    <Grid item>
                        <Button onClick={handleClickOpen} classes={{ root: classes.addNewButton }} id="addButton">
                            Add Board
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={handleClickOpenUser}
                            classes={{ root: classes.addNewButton }}
                        >
                            Add User
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    alignItems="center"
                    spacing={2}
                >
                    {boardsInOrder.map(({ id, name }) => (
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
        </div>
    )
}
export default LandingPage
