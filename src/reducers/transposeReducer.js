import { TRANSPOSE_SONG } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch(action.type) {
        case TRANSPOSE_SONG:
            return { ...state, [action.payload.songId]: action.payload.offset }
        default:
            return state
    }
}
