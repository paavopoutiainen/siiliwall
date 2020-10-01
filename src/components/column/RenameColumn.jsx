import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import useEditColumn from '../../graphql/column/hooks/useEditColumn'

const RenameColumn = ({ editId, column, toggleEdit }) => {
    const [editColumn] = useEditColumn()
    const [name, setName] = useState(column?.name)

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleSave = (event) => {
        console.log(name)
        event.preventDefault()
        editColumn({
            variables: {
                columnId: editId,
                columnName: name,
            },
        })
        toggleEdit()
    }

    return (
        <Grid item>
            <TextField
                label={column.name}
                autoFocus
                onChange={handleChange}
            />
            <Button onClick={handleSave}>Save</Button>
        </Grid>
    )
}

export default RenameColumn
