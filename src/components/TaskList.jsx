import React from 'react'
import Task from './Task'

const TaskList = ({ tasks, taskOrder }) => {
    const newTaskOrder = taskOrder.map((id) => tasks.find((task) => task.id === id))

    return (
        <>
            {newTaskOrder.map((task) => (
                <Task task={task} key={taskOrder} />
            ))}
        </>
    )
}

export default TaskList
