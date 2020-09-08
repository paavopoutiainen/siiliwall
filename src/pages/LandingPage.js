import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ALL_BOARDS } from '../graphql/Queries'
import '../styles.css';

const LandingPage = () => {
    const { loading, error, data } = useQuery(GET_ALL_BOARDS)

    if (loading) return <p>Loading boards...</p>
    if (error) return `Error: ${error.message}`

    return (
        <div className="landingPage">
            <div className="landingPage__title">
                <h1>Welcome!</h1>
            </div>
            <div className="landingPage__boardList">
                {data.allBoards.map(({ id, name }) => {
                    return (
                        <div className="landingPage__boardList__boardButton">
                            <a href="#" className="btn btn--white">
                                <Link to={`/boards/${id}`}>{name}</Link>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default LandingPage