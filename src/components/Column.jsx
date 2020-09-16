import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useMutation } from '@apollo/client'
import { Grid, TextField, Button } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'
import TaskList from './TaskList'
import { ADD_TASK } from '../graphql/mutations'

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
            <Grid item container>
                <Grid item classes={{ root: classes.columnTitle }}><h1>{column.name}</h1></Grid>
            </Grid>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <Grid item container {...provided.droppableProps} ref={provided.innerRef}>
                        <TaskList tasks={tasks} taskOrder={taskOrder} />
                        {provided.placeholder}
                    </Grid>
                )}

            </Droppable>
            <Grid item container>
                <TextField
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
