import { 
    ADD_TO_PLAYLIST,
    REMOVE_FROM_PLAYLIST,
    PLAYLIST_NEXT,
    START_PLAYLIST,
    STOP_PLAYLIST,
    CLEAR_PLAYLIST,
    TOGGLE_VISIBILITY,
    MOVE_IN_PLAYLIST,
    SAVE_PLAYLIST,
    LOAD_PLAYLIST,
    UNLOAD_PLAYLIST,
    REPLACE_PLAYLIST,
    PLAYLIST_STEP
} from "../actions/types"
import {
    addToPlaylistReducer,
    removeFromPlaylistReducer,
    moveInPlaylistReducer
} from "../util"

const defaultState = {
    list: [],
    currentIndex: 0,
    active: false,
    visible: false,
    loaded: undefined,
    loadedName: '',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    switch(action.type) {
        case ADD_TO_PLAYLIST:
            return addToPlaylistReducer(state, action.payload)
        case REMOVE_FROM_PLAYLIST:
            return removeFromPlaylistReducer(state, action.payload)
        case PLAYLIST_NEXT:
            return { ...state, currentIndex: action.payload }
        case START_PLAYLIST:
            return { ...state, active: true}
        case STOP_PLAYLIST:
            return { ...state, active: false}
        case CLEAR_PLAYLIST:
            return { ...defaultState, visible: state.visible }
        case TOGGLE_VISIBILITY:
            return { ...state, visible: !state.visible}
        case MOVE_IN_PLAYLIST:
            return moveInPlaylistReducer(state, action.payload.up, action.payload.index)
        case SAVE_PLAYLIST:
            return {...state, list: action.payload.songs, loaded: action.payload.id, loadedName: action.payload.name}
        case LOAD_PLAYLIST:
            return {
                list: action.payload.list.songs,
                currentIndex: 0,
                active: false,
                visible: true,
                loaded: action.payload.modifiable ? action.payload.list.id : undefined,
                loadedName: action.payload.modifiable ? action.payload.list.name : '',
            }
        case UNLOAD_PLAYLIST:
            return { ...defaultState, visible: true }
        case REPLACE_PLAYLIST:
            return action.payload
        case PLAYLIST_STEP:
            return { ...state, currentIndex: action.payload }
        default:
            return state
    }
}