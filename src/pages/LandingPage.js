import React, { useState }  from "react"
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import NewBoardForm from '../components/NewBoardForm'
import { useQuery } from '@apollo/client'
import { GET_ALL_BOARDS } from '../graphql/Queries'
import { landingPageStyles } from '../styles/styles'
import '../styles.css'


const LandingPage = () => {
    const { loading, error, data } = useQuery(GET_ALL_BOARDS)
    const [open, setOpen ] = useState(false)
    const classes = landingPageStyles()
  
    function handleClickOpen () {
        setOpen(true)
    }

    if (loading) return <p>Loading boards...</p>
    if (error) return `Error: ${error.message}`
    
    return (
        <Grid 
            container
            direction="column"
            alignItems="center"
            justify="center"
            classes={{root: classes.root}}
            spacing={7}
        >
            { open && 
                <NewBoardForm setOpen={setOpen} open={open}/>
            }
            <Grid item classes={{root: classes.title}} >
                <h1>Welcome!</h1>
            </Grid>
            <Grid item>
                <Link className="addButton__link">
                    <Button onClick={handleClickOpen} classes={{root: classes.addBoardButton}}>
                        Add Board
                    </Button>
                </Link>
            </Grid>
            <Grid item >
                <Grid 
                    container
                    direction="column" 
                    alignItems="center"
                    className="boardList"
                    spacing={2}
                >
                    {data.allBoards.map(({id, name}) => {
                        return (
                            <Grid item classes={{root: classes.boardButtonGrid}}>
                                <Link to={`/boards/${id}`} className="boardList__button__link" >
                                    <Button fullWidth={true} classes={{root: classes.boardButton}}>
                                        {name}
                                    </Button>
                                </Link>
                            </Grid>
                        ) 
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}
export default LandingPage