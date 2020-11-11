import { useQuery } from '@apollo/client'
import { PROJECT_BY_ID } from '../projectQueries'

const useProjectById = (id) => {
    const {
        loading, error, data,
    } = useQuery(PROJECT_BY_ID, {
        variables: {
            taskId: id,
        },
    })
    return { data, error, loading }
}

export default useProjectById
