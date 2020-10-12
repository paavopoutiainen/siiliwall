import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import Column from './Column'
import { boardPageStyles } from '../../styles/styles'
import useAddColumn from '../../graphql/column/hooks/useAddColumn'

const ColumnList = ({ columns, columnOrder, boardId }) => {
    const classes = boardPageStyles()
    const [columnName, setColumnName] = useState('')
    const [addColumn] = useAddColumn(boardId)

    const handleChange = (event) => {
        setColumnName(event.target.value)
    }

    const handleSave = () => {
        addColumn({
            variables: {
                boardId,
                columnName,
            },
        })
        setColumnName('')
    }

    const newColumnOrder = columnOrder.map((id) => columns.find((column) => column.id === id))
    return (
        <Grid container direction="row" spacing={3} classes={{ root: classes.columnRow }}>
            {newColumnOrder.map((column, index) => (
                <Grid item key={column.id}>
                    <Column column={column} index={index} />
                </Grid>
            ))}
            <Grid item classes={{ root: classes.addColumn }}>
                <TextField
                    margin="dense"
                    name="title"
                    label="Name"
                    type="text"
                    value={columnName}
                    fullWidth
                    onChange={handleChange}
                    id="inputColumnName"
                />
                <Button
                    disabled={!columnName.length}
                    color="primary"
                    onClick={handleSave}
                    id="addColumnButton"
                >
                    Add
                </Button>
            </Grid>
        </Grid>
    )
}
export default ColumnList
