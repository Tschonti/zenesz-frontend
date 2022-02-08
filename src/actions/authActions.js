import { db, dicsiDb } from '../api'
import history from '../history'
import { handleError } from '../util'
import { LOGIN, LOGOUT } from './types'

export const login = ({ username, password }) => async dispatch => {
    try {
        const zeneszResponse = await db.post('/api-token-auth/', { username, password })
        const dicsiResponse = await dicsiDb.post('/api-token-auth/', { username, password })
        dispatch({ type: LOGIN, payload: {dicsi: dicsiResponse.data.token, zenesz: zeneszResponse.data.token }})
        history.goBack()
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const logout = () => {
    return { type: LOGOUT }
}