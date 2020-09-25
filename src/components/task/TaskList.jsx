import React from 'react'
import Task from './Task'

const TaskList = ({ tasks, taskOrder, columnId }) => {
    const newTaskOrderObject = taskOrder.map((id) => tasks.find((task) => task.id === id))
    return (
        <>
            {newTaskOrderObject.map((task, index) => (
                <Task key={task.id} index={index} task={task} columnId={columnId} />
            ))}
        </>
    )
}
export default TaskList
