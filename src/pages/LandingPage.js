import React, { useEffect, useState} from "react";
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ALL_BOARDS } from '../graphql/Queries'
import '../styles.css';
const LandingPage = () => {
    const { loading, error, data } = useQuery(GET_ALL_BOARDS)

    if (loading) return <p>Loading boards...</p>
    if (error) return `Error: ${error.message}`

    return (
        /*<div className="landingPage">
            <div className="landingPage__title">
                <h1>Welcome!</h1>
            </div>
            <div className="landingPage__add">
                <a href="#" className="btn btn--white">Add Board</a>
            </div>
            <div className="landingPage__boardList">
                {data.allBoards.map(({ id, name }) => {
                    return (
                        <div className="landingPage__boardList__boardButton">
                            <a href="#" className="btn btn--gray">
                                <Link to={`/boards/${id}`}>{name}</Link>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>*/
        <Grid 
            container
            direction="column"
            alignItems="center"
            className="landingPage"
            spacing={5}
        >
            <Grid item className="landingPage__title" >
                <h1>Welcome!</h1>
            </Grid>
            <Grid item className="landingPage__addButton">
                <a href="#">Add Board</a>
            </Grid>
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
                            <a href="#" className="btn btn--gray">
                                <Link to={`/boards/${id}`}>{name}</Link>
                            </a>
                        </Grid>
                    ) 
                })}
            </Grid>
        </Grid>
    )
}
export default LandingPage