/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const TICKETORDER_AND_TASKS = gql`
    fragment ticketOrderAndTasks on Column {
        ticketOrder
        tasks {
            id
        }
    }
`
export const TICKETORDER_AND_TASKS_WITH_SUBTASKS = gql`
    fragment ticketOrderAndSubtasks on Column {
        ticketOrder
        tasks {
            id
            subtasks {
                id
            }
        } 
    }
`
export const TICKETORDER_AND_SUBTASKS = gql`
    fragment ticketOrderAndSubtasks on Column {
        ticketOrder
        subtasks {
            id
        }
    }
`

export const TICKETORDER_AND_TICKETS = gql`
    fragment ticketOrderAndTickets on Column {
        ticketOrder
        tasks {
            id
        } 
        subtasks {
            id
        }
    }
`

export const TICKETORDER = gql`
    fragment ticketOrder on Column {
        ticketOrder
    }
`

export const SUBTASKS = gql`
    fragment subtasks on Column {
        subtasks {
            id
        }
    }
`

export const PRIORITIZED_AND_SWIMLANEORDERNUMBER = gql`
    fragment prioritizedAndSwimlaneOrderNumber on Task {
        prioritized
        swimlaneOrderNumber
    }
`

export const COLUMNORDER = gql`
    fragment columnOrder on Board {
        columnOrder
}
`

export const COLUMNORDER_AND_COLUMNS = gql`
    fragment columnOrderAndColumns on Board {
        columnOrder
        columns
}
`

export const SUBTASKS_COLUMN = gql`
    fragment column on Subtask {
        column {
            id
        }
    }
`

export const BOARDS_COLUMNS_AND_COLUMNORDER = gql`
    fragment columns on Board {
        columnOrder
        columns {
            id
            name
        }
    }
`
