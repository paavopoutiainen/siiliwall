import React from "react"
import Column from './Column'

const ColumnList = ({columns, columnOrder}) => {
    const newColumnOrder = columnOrder.map((id) => {
        return columns.find((column) => column.id === id)
    })
  
    return (
        <>
            {newColumnOrder.map(column => {
                return (
                    <Column column={column}/>
                ) 
            })}
        </>
    );
};

export default ColumnList;