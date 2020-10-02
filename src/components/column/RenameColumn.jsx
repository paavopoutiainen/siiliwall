import React, { useState } from 'react'
import { Grid, TextField, Button, ClickAwayListener } from '@material-ui/core'
import useEditColumn from '../../graphql/column/hooks/useEditColumn'

const RenameColumn = ({ editId, column, toggleEdit }) => {
    const [editColumn] = useEditColumn()
    const [name, setName] = useState(column?.name)

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleSave = (event) => {
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
        <ClickAwayListener
            onClickAway={toggleEdit}
            mouseEvent="onMouseDown"
        >
            <Grid item>
                <TextField
                    defaultValue={column.name}
                    label="Name"
                    onChange={handleChange}
                    autoFocus
                    auto
                />
                <Button onClick={handleSave}>Save</Button>
            </Grid>
        </ClickAwayListener>
    )
}

export default RenameColumn
