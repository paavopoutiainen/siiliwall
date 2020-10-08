import React from 'react'
import { Grid } from '@material-ui/core'
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
        <Grid container direction="column" spacing={2}>
            {ticketsInOrder.map((ticket, index) => {
                let component
                if (ticket.type === 'task') {
                    component = (
                        <Grid item>
                            <Task key={ticket.id} index={index} task={ticket} columnId={columnId} />
                        </Grid>
                    )
                } else if (ticket.type === 'subtask') {
                    component = (
                        <Grid item>
                            <Subtask key={ticket.id} index={index} subtask={ticket} columnId={columnId} />
                        </Grid>
                    )
                }
                return component
            })}
        </Grid>
    )
}

export default TicketList
