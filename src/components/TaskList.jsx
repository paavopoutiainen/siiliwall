import React from 'react'
import Task from './Task'

const TaskList = ({ tasks, taskOrder }) => {
    const newTaskOrder = taskOrder.map((id) => tasks.find((task) => task.id === id))

    return (
        <>
            {newTaskOrder.map((task) => (
                <Task task={task} key={task.id} />
            ))}
        </>
    )
}

export default TaskList
