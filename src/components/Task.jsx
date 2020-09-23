/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../styles/styles'
import DropdownTask from './DropdownTask'
import TaskEditDialog from './TaskEditDialog'

const Task = ({ task, index, columnId }) => {
    const classes = boardPageStyles()
    const { title } = task
    const titleLimit = 27
    const [dialogStatus, setDialogStatus] = useState(false)
    const toggleDialog = () => setDialogStatus(!dialogStatus)
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
                        <Grid item classes={{ root: classes.taskTitle }}>
                            <h1>{add3Dots(title, titleLimit)}</h1>
                            {task.owner ? (
                                <h3>
                                    owner:
                                    {' '}
                                    {task.owner}
                                </h3>
                            ) : null}
                            {task.size ? (
                                <h3>
                                    diff:
                                    {' '}
                                    {task.size}
                                </h3>
                            ) : null}
                        </Grid>
                        <Grid item>
                            <DropdownTask
                                taskId={task.id}
                                columnId={columnId}
                                handleEdit={toggleDialog}
                            />
                            <TaskEditDialog
                                dialogStatus={dialogStatus}
                                toggleDialog={toggleDialog}
                                editId={task.id}
                                task={task}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Draggable>
    )
}
export default Task
