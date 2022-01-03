import { db } from '../api'
import history from '../history'
import { handleError } from '../util'
import { LOGIN, LOGOUT } from './types'

export const login = ({ username, password }) => async dispatch => {
    try {
        const response = await db.post('/api-token-auth/', { username, password })
        dispatch({ type: LOGIN, payload: response.data.token })
        history.goBack()
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const logout = () => {
    return { type: LOGOUT }
}