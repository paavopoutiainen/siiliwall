import React from 'react'
import { Grid } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { GET_BOARD_BY_ID } from '../graphql/queries'
import { boardPageStyles } from '../styles/styles'
import '../styles.css'

const BoardPage = ({ id }) => {
    const { loading, error, data } = useQuery(GET_BOARD_BY_ID, {
        variables: {
            boardId: id,
        },
    })
    const classes = boardPageStyles()

    if (loading) return <p>Loading board..</p>
    if (error) return `Error: ${error.message}`

    const board = data.boardById

    const columnOrderArray = board.columnOrder
    const { columns } = board

    const newColumnArray = columnOrderArray.map((id) => columns.find((column) => column.id === id))

    return (
        <Grid
            container
            direction="column"
            classes={{ root: classes.root }}
        >
            <Grid container direction="row" justify="center">
                <Grid item classes={{ root: classes.title }}>
                    <h1>{board.name}</h1>
                </Grid>
            </Grid>
            <Grid container direction="row">
                {newColumnArray.map(({ name }) => (
                    <Grid item key={name}>
                        <h3>{name}</h3>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
export default BoardPage
