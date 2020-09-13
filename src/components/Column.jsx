import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Grid, TextField, Button } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'
import TaskList from './TaskList'
import { ADD_TASK } from '../graphql/mutations'

const Column = ({ column }) => {
    const [addTask] = useMutation(ADD_TASK)
    const classes = boardPageStyles()
    const { tasks } = column
    const taskOrderArray = column.taskOrder
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
        >
            <Grid item container>
                <Grid item classes={{ root: classes.columnTitle }}><h1>{column.name}</h1></Grid>
            </Grid>

            <Grid item container>
                <TaskList tasks={tasks} taskOrder={taskOrderArray} />
            </Grid>
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
