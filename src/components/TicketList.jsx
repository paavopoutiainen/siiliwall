import React from 'react'
import Task from './task/Task'
import Subtask from './subtask/Subtask'

const TicketList = ({
    tasks, subtasks, ticketOrder, columnId,
}) => {
    const ticketsInOrder = ticketOrder.map((obj) => {
        let foundTicket
        if (obj.type === 'task') {
            foundTicket = tasks.find((task) => task.id === obj.ticketId)
            foundTicket = { ...foundTicket, type: 'task' }
        } else if (obj.type === 'subtask') {
            foundTicket = subtasks.find((subtask) => subtask.id === obj.ticketId)
            foundTicket = { ...foundTicket, type: 'subtask' }
        }
        return foundTicket
    })
    return (
        <>
            {ticketsInOrder.map((ticket, index) => {
                let component
                if (ticket.type === 'task') {
                    component = <Task key={ticket.id} index={index} task={ticket} columnId={columnId} />
                } else if (ticket.type === 'subtask') {
                    component = <Subtask key={ticket.id} index={index} subtask={ticket} columnId={columnId} />
                }
                return component
            })}
        </>
    )
}

export default TicketList
