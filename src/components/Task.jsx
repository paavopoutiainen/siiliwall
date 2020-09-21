/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../styles/styles'
import DropdownTask from './DropdownTask'

const Task = ({ task, index, columnId }) => {
    const classes = boardPageStyles()
    const { title } = task
    const titleLimit = 27

    const add3Dots = (titleParam, titleLimitParam) => {
        let checkedTitle = titleParam
        const dots = '...'
        if (titleParam.length > titleLimit) {
            checkedTitle = title.substring(0, titleLimitParam) + dots
        }
        return checkedTitle
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Grid
                    item
                    container
                    direction="column"
                    classes={{ root: classes.task }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <Grid item classes={{ root: classes.taskTitle }}><h1>{add3Dots(title, titleLimit)}</h1></Grid>
                        <Grid item><DropdownTask taskId={task.id} columnId={columnId} /></Grid>
                    </Grid>
                </Grid>
            )}
        </Draggable>
    )
}
export default Task
