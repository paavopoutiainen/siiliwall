import React from 'react'
import Task from './task/Task'
import Subtask from './subtask/Subtask'

const TicketList = ({
    tasks, subtasks, ticketOrder, columnId,
}) => {
    const ticketsInOrder = ticketOrder.map((obj) => {
        if (obj.type === 'task') {
            const foundTask = tasks.find((task) => task.id === obj.ticketId)

            return { ...foundTask, type: 'task' }
        } else if (obj.type === 'subtask') {
            const foundSubtask = subtasks.find((subtask) => subtask.id === obj.ticketId)
            return { ...foundSubtask, type: 'subtask' }
        }
    })
    return (
        <>
            {ticketsInOrder.map((ticket, index) => {
                if (ticket.type === 'task') {
                    return <Task key={ticket.id} index={index} task={ticket} columnId={columnId} />
                } else if (ticket.type === 'subtask') {
                    return <Subtask key={ticket.id} index={index} subtask={ticket} columnId={columnId} />
                }
            })}
        </>
    )
}

export default TicketList
