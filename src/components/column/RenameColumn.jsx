import React, { useState } from 'react'
import EditText from 'react-editext'
import { Grid } from '@material-ui/core'
import useEditColumn from '../../graphql/column/hooks/useEditColumn'
import { boardPageStyles } from '../../styles/styles'

const RenameColumn = ({ editId, column }) => {
    const [editColumn] = useEditColumn()
    const [name] = useState(column?.name)
    const classes = boardPageStyles()

    const handleSave = (newName) => {
        editColumn({
            variables: {
                columnId: editId,
                columnName: newName,
            },
        })
    }

    return (
        <Grid item classes={{ root: classes.columnName }}>
            <EditText
                showButtonsOnHover
                submitOnEnter
                cancelOnEscape
                editOnViewClick
                cancelOnUnfocus
                type="text"
                value={name}
                onSave={handleSave}
                validationMessage="Name has to have 1 or more characters"
                validation={(val) => val.length > 0}
            />
        </Grid>
    )
}

export default RenameColumn
