import { NEW_ALERT, REMOVE_ALERT } from './types'

export const newAlert = (msg, type) => {
    return {type: NEW_ALERT, payload: {msg, type}}
}

export const removeAlert = () => {
    return {type: REMOVE_ALERT}
}
