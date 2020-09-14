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

    function handleChange(event) {
        setTitle(event.target.value)
    }

    async function handleSave(event) {
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
            <TextField
                margin="dense"
                name="title"
                label="Name"
                type="text"
                fullWidth
                onChange={(event) => handleChange(event)}
            />
            <Button onClick={handleSave} color="primary">
                Add
            </Button>
        </Grid>
    )
}

export default Column
