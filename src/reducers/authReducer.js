import { LOGIN, LOGOUT } from "../actions/types"

const defaultState = {
    signedIn: false,
    dicsiToken: null,
    zeneszToken: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    switch(action.type) {
        case LOGIN:
            return { signedIn: true, dicsiToken: action.payload.dicsi, zeneszToken: action.payload.zenesz }
        case LOGOUT:
            return defaultState
        default:
            return state
    }
}