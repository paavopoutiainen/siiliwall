import React, { useState, useEffect } from 'react'
import {
    Grid, FormControlLabel, Switch,
} from '@material-ui/core'
import Board from '../components/board/Board'
import SwimlaneView from '../components/swimlane/SwimlaneView'
import { boardPageStyles } from '../styles/styles'
import useBoardById from '../graphql/board/hooks/useBoardById'
import useTaskMutated from '../graphql/task/hooks/useTaskMutated'
import useTaskRemoved from '../graphql/task/hooks/useTaskRemoved'
import { addNewTask, removeTaskFromCache } from '../cacheService/cacheUpdates'

const BoardPage = ({ id }) => {
    const classes = boardPageStyles()
    const [view, toggleView] = useState('kanban')
    const queryResult = useBoardById(id)
    const { data, loading } = useTaskMutated(id)
    const taskRemoved = useTaskRemoved(id)

    useEffect(() => {
        if (!data) return
        if (data.taskMutated.mutationType === 'CREATED') {
            addNewTask(data.taskMutated.node)
        }
    }, [data])

    useEffect(() => {
        if (!taskRemoved.data) return
        const { taskId, columnId, boardId } = taskRemoved.data.taskRemoved.removeInfo
        removeTaskFromCache(taskId, columnId, boardId)
    }, [taskRemoved.data])

    if (queryResult.loading) return null

    const board = queryResult.data.boardById
    const switchView = () => {
        toggleView(view === 'kanban' ? 'swimlane' : 'kanban')
    }

    return (
        <Grid
            container
            direction="row"
            classes={{ root: classes.root }}
            id="boardElement"
            spacing={3}
        >
            <Grid container item direction="column" justify="space-between" classes={{ root: classes.boardHeader }} id="boardHeader">
                <Grid item>
                    <h1>{board.name}</h1>
                </Grid>
                <Grid item classes={{ root: classes.switchView }}>
                    <FormControlLabel
                        control={<Switch onChange={switchView} />}
                        label="Show swimlanes"
                        labelPlacement="end"
                    />
                </Grid>
            </Grid>

            <Grid item classes={{ root: classes.boardView }}>
                {view === 'kanban' ? <Board board={board} /> : <SwimlaneView board={board} />}
            </Grid>
        </Grid>
    )
}
export default BoardPage
