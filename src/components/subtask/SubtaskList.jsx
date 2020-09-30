import React from 'react'
import Subtask from './Subtask'

const SubtaskList = ({ subtasks, subtaskOrder, columnId }) => {
    const subTasksInOrder = subtaskOrder.map((id) => subtasks.find((subtask) => subtask.id === id))
    return (
        <>
            {subTasksInOrder.map((subtask, index) => <Subtask key={subtask.id} index={index} subtask={subtask} columnId={columnId} />)}
        </>
    )
}
export default SubtaskList
