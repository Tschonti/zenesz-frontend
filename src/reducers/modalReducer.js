import { CLOSE_MODAL, OPEN_MODAL } from "../actions/types";

const defaultState = { open: false, id: undefined }

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    switch(action.type) {
        case OPEN_MODAL:
            return { open: true, id: action.payload }
        case CLOSE_MODAL:
            return defaultState
        default:
            return state
    }
}