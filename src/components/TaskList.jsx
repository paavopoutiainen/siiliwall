import React from 'react'
import Task from './Task'

const TaskList = ({ tasks, taskOrder }) => {
    const newTaskOrder = taskOrder.map((id) => tasks.find((task) => task.id === id))

    return (
        <>
            {newTaskOrder.map((task, index) => (
                <Task key={task.id} index={index} task={task} />
            ))}
        </>
    )
}

export default TaskList
