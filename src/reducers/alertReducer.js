import { NEW_ALERT, REMOVE_ALERT } from "../actions/types"

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch(action.type) {
        case NEW_ALERT:
            return action.payload
        case REMOVE_ALERT:
            return {}
        default:
            return state
    }
}