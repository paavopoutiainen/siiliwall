import React, { useState } from 'react'
import EditText from 'react-editext'
import useEditColumn from '../../graphql/column/hooks/useEditColumn'

const RenameColumn = ({ editId, column }) => {
    const [editColumn] = useEditColumn()
    const [name] = useState(column?.name)

    const handleSave = (newName) => {
        editColumn({
            variables: {
                columnId: editId,
                columnName: newName,
            },
        })
    }

    return (
        <EditText
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
    )
}

export default RenameColumn
