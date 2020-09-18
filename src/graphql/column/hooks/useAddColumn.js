import { useMutation } from '@apollo/client'
import { ADD_COLUMN } from '../columnQueries'
import { BOARD_BY_ID } from '../../board/boardQueries'
import { COLUMNORDER_AND_COLUMNS } from '../../fragments'

const useAddColumn = (id) => {
    const retVal = useMutation(ADD_COLUMN, {
        update: async (cache, response) => {
            const cached = cache.readQuery({ query: BOARD_BY_ID, variables: { boardId: id } })
            const { columns, columnOrder } = cached.boardById
            const newColumns = columns.concat(response.data.addColumnForBoard)
            const newColumnOrder = columnOrder.concat(response.data.addColumnForBoard.id)

            cache.writeFragment({
                id: `Board:${id}`,
                fragment: COLUMNORDER_AND_COLUMNS,
                data: {
                    columnOrder: newColumnOrder,
                    columns: newColumns,
                },
            })
        },
    })
    return retVal
}

export default useAddColumn
