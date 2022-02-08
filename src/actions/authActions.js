import { db, dicsiDb } from '../api'
import history from '../history'
import { handleError } from '../util'
import { LOGIN, LOGOUT } from './types'
import { Cookies } from 'react-cookie'

const cookieOptions = {
    path: '/zenesz',
    maxAge: 12*31*24*60*60
}

export const login = ({ username, password }) => async dispatch => {
    try {
        const zeneszResponse = await db.post('/api-token-auth/', { username, password })
        const dicsiResponse = await dicsiDb.post('/api-token-auth/', { username, password })
        dispatch({ type: LOGIN, payload: {dicsi: dicsiResponse.data.token, zenesz: zeneszResponse.data.token }})
        const cookieManager = new Cookies()
        cookieManager.set('dicsiToken', dicsiResponse.data.token, cookieOptions)
        cookieManager.set('zeneszToken', zeneszResponse.data.token, cookieOptions)
        history.goBack()
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const loginFromCookie = (dicsiToken, zeneszToken) => {
    return { type: LOGIN, payload: {dicsi: dicsiToken, zenesz: zeneszToken } }
}

export const logout = () => {
    const cookieManager = new Cookies()
    cookieManager.remove('dicsiToken', cookieOptions)
    cookieManager.remove('zeneszToken', cookieOptions)
    return { type: LOGOUT }
}