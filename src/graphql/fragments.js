/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const TASKORDER_AND_TASKS = gql`
    fragment taskOrderAndTasks on Column {
        taskOrder
        tasks
    }
`

export const TASKORDER = gql`
    fragment taskOrder on Column {
        taskOrder
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
