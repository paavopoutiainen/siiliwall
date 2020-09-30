/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../../styles/styles'

const Subtask = ({ index, subtask, columnId }) => {
    const classes = boardPageStyles()
    const { name } = subtask
    const titleLimit = 27
    const add3Dots = (titleParam, titleLimitParam) => {
        let checkedTitle = titleParam
        const dots = '...'
        if (titleParam.length > titleLimit) {
            checkedTitle = name.substring(0, titleLimitParam) + dots
        }
        return checkedTitle
    }
    return (
        <Draggable draggableId={subtask.id} index={index}>
            {(provided) => (
                <Grid
                    item
                    container
                    direction="column"
                    classes={{ root: classes.subtask }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justify="space-between"
                        classes={{ root: classes.taskInner }}
                    >
                        <Grid item>
                            <h3>{add3Dots(name, titleLimit)}</h3>

                        </Grid>

                    </Grid>
                </Grid>
            )}
        </Draggable>
    )
}

export default Subtask
