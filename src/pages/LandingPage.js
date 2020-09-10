import React, { useEffect, useState} from "react"
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import NewBoardForm from '../components/NewBoardForm'
import { useQuery } from '@apollo/client'
import { GET_ALL_BOARDS } from '../graphql/Queries'
import { useGradientBtnStyles } from '@mui-treasury/styles/button/gradient'
import '../styles.css'

const LandingPage = () => {
    const { loading, error, data } = useQuery(GET_ALL_BOARDS)
    const [open, setOpen ] = useState(false)

  
    function handleClickOpen () {
        setOpen(true)
    }
    const styles = useGradientBtnStyles()
    const boardButton = {
        minWidth: 200,
        background: 'linear-gradient(to right, #FFC371, #FF5F6D)'
    }

    if (loading) return <p>Loading boards...</p>
    if (error) return `Error: ${error.message}`

    return (
        <Grid 
            container
            direction="column"
            alignItems="center"
            justify="center"
            className="landingPage"
            spacing={7}
        >
            { open && 
                <NewBoardForm setOpen={setOpen} open={open}/>
            }
            <Grid item className="landingPage__title" >
                <h1>Welcome!</h1>
            </Grid>
            <Grid item>
                <Button onClick={handleClickOpen}>
                    <Link className="landingPage__addButton">Add Board</Link>
                </Button>
            </Grid>
            <Grid item className="landingPage__boardList" >
                <Grid 
                    container
                    direction="column" 
                    alignItems="center"
                    className="boardList"
                    spacing={2}
                >
                    {data.allBoards.map(({id, name}) => {
                        return (
                            <Grid item className="boardList__button">
                                <Button fullWidth={true} className="gradientButton">
                                    <Link to={`/boards/${id}`} className="boardList__button__link">{name}</Link>
                                </Button>
                            </Grid>
                        ) 
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}
export default LandingPage