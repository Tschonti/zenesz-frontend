import { FETCH_PLAYLISTS, REPLACE_PLAYLIST, DELETE_PLAYLIST, DELETE_SONG, SAVE_PLAYLIST } from "../actions/types"

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {list: [], loaded: false }, action) => {
    switch(action.type) {
        case FETCH_PLAYLISTS:
            return { list: action.payload, loaded: true }
        case REPLACE_PLAYLIST:
            const listOfIds = state.list.map(pl => pl.id)
            const idx = listOfIds.indexOf(action.payload.loaded)
            if (idx === -1) {
                return state
            }
            const clonedState = {...state}
            clonedState.list[idx].songs = action.payload.list
            return clonedState
        case DELETE_PLAYLIST:
            return { ...state, list: state.list.filter(pl => pl.id !== action.payload) }
        case DELETE_SONG:
            return { ...state, list: state.list.map(pl => ({...pl, songs: pl.songs.filter(songId => songId !== action.payload)}))}
        case SAVE_PLAYLIST:
            return { ...state, list: [...state.list, action.payload]}
        default:
            return state
    }
}