import React, { useState, useEffect } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useMutation } from '@apollo/client'
import { Grid, TextField, Button } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'
import TaskList from './TaskList'
import { ADD_TASK } from '../graphql/mutations'
import DropdownColumn from './DropdownColumn'

const Column = ({ column }) => {
    const [addTask] = useMutation(ADD_TASK)
    const classes = boardPageStyles()
    const { tasks, taskOrder } = column
    const [title, setTitle] = useState('')
    const isEnabled = title.length > 0

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleSave = (event) => {
        event.preventDefault()
        addTask({
            variables: {
                columnId: column.id,
                title,
            },
        })
        setTitle('')
    }

    return (
        <Grid
            item
            container
            direction="column"
            classes={{ root: classes.column }}
            alignItems="center"
        >
            <Grid item container direction="row" justify="space-between">
                <Grid item classes={{ root: classes.columnTitle }}><h1>{column.name}</h1></Grid>
                <Grid item><DropdownColumn columnId={column.id} boardId={column.board.id} /></Grid>
            </Grid>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Grid item container {...provided.droppableProps} ref={provided.innerRef}>
                        <TaskList tasks={tasks} taskOrder={taskOrder} columnId={column.id} />
                        {provided.placeholder}
                    </Grid>
                )}

            </Droppable>
            <Grid item container>
                <TextField
                    autoComplete="off"
                    margin="dense"
                    name="title"
                    label="Name"
                    type="text"
                    value={title}
                    fullWidth
                    onChange={handleChange}
                />
                <Button disabled={!isEnabled} onClick={handleSave} color="primary">
                    Add
                </Button>
            </Grid>
        </Grid>
    )
}
export default Column