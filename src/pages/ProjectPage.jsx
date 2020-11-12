import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useBoardsByProjectId from '../graphql/project/hooks/useBoardsByProjectId'
import useProjectById from '../graphql/project/hooks/useProjectById'
import NewBoardForm from '../components/board/NewBoardForm'
import NewUserForm from '../components/user/NewUserForm'
import { projectPageStyles } from '../styles/styles'
import '../styles.css'
import useSubscriptions from '../graphql/useSubscriptions'

const ProjectPage = ({ eventId }) => {
    const projectId = '9da1b35f-181a-4397-a5a5-47abced10a66'
    //const queryResult = useBoardsByProjectId(projectId)
    const queryResult = useProjectById(projectId)
    const [open, setOpen] = useState(false)
    const [openUserForm, setUserFormOpen] = useState(false)
    const classes = projectPageStyles()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickOpenUser = () => {
        setUserFormOpen(true)
    }

    useSubscriptions(projectId, eventId)

    if (queryResult.loading) return null
    const boardsInOrder = queryResult.data.projectById.boards.slice().sort((a, b) => a.orderNumber - b.orderNumber)

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            classes={{ root: classes.root }}
            spacing={7}
        >
            {open && <NewBoardForm setOpen={setOpen} open={open} projectId={projectId} />}
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
                    <Button onClick={handleClickOpenUser} classes={{ root: classes.addNewButton }}>
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
    )
}
export default ProjectPage
