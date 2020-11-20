import {
    useQuery,
} from '@apollo/client'
import { BOARDS_BY_PROJECT_ID } from '../../project/projectQueries'

const useBoardsByProjectId = (id) => {
    const { loading, error, data } = useQuery(BOARDS_BY_PROJECT_ID, {
        variables: { projectId: id }
    })
    return { loading, error, data }
}
export default useBoardsByProjectId
