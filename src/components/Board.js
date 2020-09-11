import React from "react"
import { Grid } from '@material-ui/core'
import { GET_BOARD_BY_ID } from '../graphql/Queries'
import { useQuery } from '@apollo/client'
import { boardPageStyles } from '../styles/styles'
import ColumnList from '../components/ColumnList'
import '../styles.css'

const Board = ({ id }) => {
    const { loading, error, data } = useQuery(GET_BOARD_BY_ID, {
        variables: {
            boardId: id
        }
    })
    const classes = boardPageStyles()

    
    if (loading) return <h1>Loading board..</h1>
    if (error) return `Error: ${error.message}`

    const board = data.boardById
  
    const columnOrderArray = board.columnOrder
    const columns = board.columns

    return (
      <Grid
        container
        direction="column"
        classes={{root: classes.root}}
      >
        <Grid container direction="row" justify="center">
            <Grid item classes={{root: classes.title}}>
                <h1>{board.name}</h1>
            </Grid>
        </Grid>
        <Grid container direction="row">
            <ColumnList columns={columns} columnOrder={columnOrderArray} />
        </Grid>
      </Grid>
    )
}
export default Board