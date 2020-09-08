import React from "react";
import { GET_BOARD_BY_ID } from '../graphql/Queries'
import { useQuery } from '@apollo/client'
import '../styles.css';

const BoardFromDb = ({ id }) => {
    const { loading, error, data } = useQuery(GET_BOARD_BY_ID, {
        variables: {
            boardId: id
        }
    })

    if (loading) return <p>Loading board..</p>
    if (error) return `Error: ${error.message}`

    const board = data.boardById

    return (
      <div className='boardPage'>
          <div className="boardPage__title">
                <h1>{board.name}</h1>
            </div>
      </div>
    )
  }
export default BoardFromDb