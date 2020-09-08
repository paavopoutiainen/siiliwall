import React, { useEffect, useState} from "react";
import { useQuery } from '@apollo/client'
import { GET_ALL_BOARDS } from '../graphql/Queries'
import '../styles.css';

const LandingPage = () => {
    const { loading, error, data } = useQuery(GET_ALL_BOARDS)

    if (loading) return <p>Loading boards...</p>
    if (error) return <p>Error</p>

    return (
        <div className="landingPage">
            <div className="landingPage__title">
                <h1>Welcome!</h1>
            </div>
            <div className="landingPage__boardList">
                {data.allBoards.map(({ id, name }) => {
                   return <div className="landingPage__boardList__boardButton"><a href={`/boards/${id}`} id={id} className="btn btn--white">{name}</a></div>
                })}
            </div>
        </div>
    )
}
export default LandingPage