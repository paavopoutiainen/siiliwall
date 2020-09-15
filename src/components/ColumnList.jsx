import React from 'react'
import Column from './Column'

const ColumnList = ({ columns, columnOrder }) => {
    const newColumnOrder = columnOrder.map((id) => columns.find((column) => column.id === id))
    return (
        <>
            {newColumnOrder.map((column) => (
                <Column column={column} key={column.id} />
            ))}
        </>
    )
}

export default ColumnList
