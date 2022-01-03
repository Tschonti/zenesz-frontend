import { LOGIN, LOGOUT } from "../actions/types"

const defaultState = {
    signedIn: false,
    token: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    switch(action.type) {
        case LOGIN:
            return { signedIn: true, token: action.payload}
        case LOGOUT:
            return defaultState
        default:
            return state
    }
}