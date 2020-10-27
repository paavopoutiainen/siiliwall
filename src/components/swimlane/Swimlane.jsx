/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneHeader from './SwimlaneHeader'
import SwimlaneColumnList from './SwimlaneColumnList'
import AddSubtaskDialog from '../subtask/AddSubtaskDialog'

const Swimlane = ({
    task, index, showAll, boardId,
}) => {
    const classes = swimlaneStyles()
    const [show, setShow] = useState(false)
    const [addDialogStatus, setAddDialogStatus] = useState(false)

    const toggleAddDialog = () => {
        setAddDialogStatus(!addDialogStatus)
    }

    useEffect(() => {
        if (showAll === null) return
        setShow(showAll)
    }, [showAll])

    const handleShowClick = () => {
        setShow(!show)
    }

    const numberOfSubtasks = task.swimlaneColumns
        .reduce((acc, cur) => parseInt(acc + cur.subtasks.length, 10), 0)
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    classes={{ root: classes.swimlane }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid item><SwimlaneHeader taskName={task.title} /></Grid>
                    <Grid item container direction="row" alignItems="center" spacing={1}>
                        <Grid item>
                            <Button size="small" variant="outlined" onClick={() => handleShowClick()}>{show ? 'hide' : 'show'}</Button>
                        </Grid>
                        {show && (
                            <Grid item>
                                <Button size="small" variant="outlined" onClick={() => toggleAddDialog()}>add subtask</Button>
                            </Grid>
                        )}
                        <Grid item>{`${numberOfSubtasks} subtasks`}</Grid>
                    </Grid>
                    {show
                    && (
                        <Grid item>
                            <SwimlaneColumnList swimlaneColumns={task.swimlaneColumns} taskId={task.id} />
                        </Grid>
                    )}
                    <AddSubtaskDialog
                        addDialogStatus={addDialogStatus}
                        toggleAddDialog={toggleAddDialog}
                        columnId={task.column.id}
                        taskId={task.id}
                        boardId={boardId}
                    />
                </Grid>

            )}
        </Draggable>

    )
}
export default Swimlane
