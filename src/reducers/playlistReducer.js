import { ADD_TO_PLAYLIST,
    REMOVE_FROM_PLAYLIST,
    PLAYLIST_NEXT,
    START_PLAYLIST,
    STOP_PLAYLIST,
    CLEAR_PLAYLIST,
    TOGGLE_VISIBILITY,
    MOVE_IN_PLAYLIST } from "../actions/types"

const defaultState = {
    list: [],
    currentIndex: 0,
    active: false,
    visible: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    switch(action.type) {
        case ADD_TO_PLAYLIST:
            return {...state, list: [...state.list, action.payload]}
        case REMOVE_FROM_PLAYLIST:
            const remIdx = state.list.indexOf(action.payload)
            if (remIdx === -1) {
                return state
            }
            let curIdx = state.currentIndex
            if ((remIdx < curIdx || remIdx === state.list.length - 1) && curIdx > 0) {
                curIdx -= 1
            }
            const clonedState = [...state.list]
            clonedState.splice(remIdx, 1)
            return { ...state, list: clonedState, currentIndex: curIdx }
        case PLAYLIST_NEXT:
            return { ...state, currentIndex: action.payload }
        case START_PLAYLIST:
            return { ...state, active: true}
        case STOP_PLAYLIST:
            return { ...state, active: false}
        case CLEAR_PLAYLIST:
            return { ...state, list: [], currentIndex: 0, active: false }
        case TOGGLE_VISIBILITY:
            return { ...state, visible: !state.visible}
        case MOVE_IN_PLAYLIST:
            if ((action.payload.index === 0 && action.payload.up) || (action.payload.index === state.list.length - 1 && !action.payload.up)) {
                return state
            }
            const otherIndex = action.payload.up ? action.payload.index - 1 : action.payload.index + 1
            const anotherClonedState = {...state}
            const temp = anotherClonedState.list[otherIndex]
            anotherClonedState.list[otherIndex] = anotherClonedState.list[action.payload.index]
            anotherClonedState.list[action.payload.index] = temp
            let diff = 0
            if (state.currentIndex === action.payload.index) {
                diff = action.payload.up ? -1 : 1
            } else if (state.currentIndex === otherIndex) {
                diff = action.payload.up ? 1 : -1
            }
            anotherClonedState.currentIndex += diff
            return anotherClonedState
        default:
            return state
    }
}