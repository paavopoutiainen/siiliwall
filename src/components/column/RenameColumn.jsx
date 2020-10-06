import React, { useState } from 'react'
import EditText from 'react-editext'
import useEditColumn from '../../graphql/column/hooks/useEditColumn'
import styles from '../../styles.css'

const RenameColumn = ({ editId, column }) => {
    const [editColumn] = useEditColumn()
    const [name] = useState(column?.name)

    const handleSave = () => {
        editColumn({
            variables: {
                columnId: editId,
                columnName: name,
            },
        })
    }

    return (
        <EditText
            className={styles.editButton}
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
