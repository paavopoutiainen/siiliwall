/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Draggable } from 'react-beautiful-dnd'
import Divider from '@material-ui/core/Divider'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneHeader from './SwimlaneHeader'
import SwimlaneColumnList from './SwimlaneColumnList'
import SwimlaneHeaderRow from './SwimlaneHeaderRow'

import ProgressBarComponent from './ProgressBarComponent'
import AddSubtaskDialog from '../subtask/AddSubtaskDialog'
import TaskEditDialog from '../task/EditTaskDialog'

const Swimlane = ({
    task, index, showAll, boardId,
}) => {
    const classes = swimlaneStyles()
    const [show, setShow] = useState(false)
    const [addDialogStatus, setAddDialogStatus] = useState(false)
    const [editTaskDialogStatus, setEditTaskDialogStatus] = useState(false)
    const toggleEditTaskDialog = () => {
        setEditTaskDialogStatus(!editTaskDialogStatus)
    }

    // Calculate the percentage for progressBar
    const percentageForProgressBar = ((task.swimlaneColumns
        .findIndex((swimlaneColumn) => swimlaneColumn.id === task.column.id) + 1) / task.swimlaneColumns.length) * 100

    const toggleAddDialog = (e) => {
        e.stopPropagation()
        setAddDialogStatus(!addDialogStatus)
    }

    useEffect(() => {
        if (showAll === null) return
        setShow(showAll)
    }, [showAll])

    const handleShowClick = (e) => {
        e.stopPropagation()
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
                    classes={{ root: classes.swimlane }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid item><ProgressBarComponent percentage={percentageForProgressBar} /></Grid>
                    <SwimlaneHeaderRow
                        taskId={task.id}
                        boardId={boardId}
                        columnId={task?.column?.id}
                        prettyId={task.prettyId}
                        title={task.title}
                        numberOfSubtasks={numberOfSubtasks}
                        handleShowClick={handleShowClick}
                    />
                    {show
                        && (
                            <Grid item classes={{ root: classes.test }}>
                                <Divider />
                                <SwimlaneColumnList swimlaneColumns={task.swimlaneColumns} taskId={task.id} />
                            </Grid>
                        )}
                    <AddSubtaskDialog
                        addDialogStatus={addDialogStatus}
                        toggleAddDialog={toggleAddDialog}
                        columnId={task?.column?.id}
                        taskId={task.id}
                        boardId={boardId}
                    />
                    <TaskEditDialog
                        dialogStatus={editTaskDialogStatus}
                        toggleDialog={toggleEditTaskDialog}
                        editId={task.id}
                        task={task}
                    />
                </Grid>

            )}
        </Draggable>

    )
}
export default Swimlane
