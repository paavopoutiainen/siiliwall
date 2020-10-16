/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../../styles/styles'
import DropdownTask from './DropdownTask'
import TaskEditDialog from './EditTaskDialog'

const Task = ({
    task, index, columnId, boardId,
}) => {
    const classes = boardPageStyles()
    const { title, members } = task
    const titleLimit = 25
    const descrLimit = 20
    const [dialogStatus, setDialogStatus] = useState(false)
    const toggleDialog = () => setDialogStatus(!dialogStatus)
    const dots = '...'
    const add3Dots = () => {
        let checkedTitle = title
        if (title.length > titleLimit) {
            checkedTitle = title.substring(0, titleLimit) + dots
        }
        return checkedTitle
    }
    const descrDots = (description) => {
        let retVal = description
        if (description.length > descrLimit) {
            retVal = description.substring(0, descrLimit) + dots
        }
        return retVal
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
                    spacing={1}
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                        classes={{ root: classes.taskInner }}
                    >
                        <Grid item>
                            <h3>{add3Dots(title)}</h3>
                        </Grid>
                        <Grid item>
                            <DropdownTask
                                taskId={task.id}
                                columnId={columnId}
                                handleEdit={toggleDialog}
                                boardId={boardId}
                            />
                        </Grid>
                    </Grid>
                    <Grid item direction="column" container>
                        <Grid item>
                            {task.owner ? (
                                <p>
                                    owner:&nbsp;
                                    {task.owner.userName}
                                </p>
                            ) : null}
                        </Grid>
                        <Grid item>
                            {task.size ? (
                                <p>
                                    size:&nbsp;
                                    {task.size}
                                </p>
                            ) : null}
                        </Grid>
                        <Grid item>
                            {task.members.length !== 0 ? (
                                // this part renders commas after name only if formatting is like below
                                <p>
                                    {`members:  ${members.map((user) => ` ${user.userName}`)}`}
                                </p>
                            ) : null}
                        </Grid>
                        <Grid item>
                            {task.description ? (
                                <p>
                                    description:&nbsp;
                                    {descrDots(task.description)}
                                </p>
                            ) : null}
                        </Grid>
                    </Grid>

                    <TaskEditDialog
                        dialogStatus={dialogStatus}
                        toggleDialog={toggleDialog}
                        editId={task.id}
                        task={task}
                    />
                </Grid>

            )}
        </Draggable>
    )
}
export default Task
