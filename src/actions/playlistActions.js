import { ADD_TO_PLAYLIST,
    REMOVE_FROM_PLAYLIST,
    PLAYLIST_NEXT,
    START_PLAYLIST,
    STOP_PLAYLIST,
     CLEAR_PLAYLIST,
     TOGGLE_VISIBILITY,
     MOVE_IN_PLAYLIST } from './types'
import history from '../history'

export const addToPlaylist = id => {
    return { type: ADD_TO_PLAYLIST, payload: id }
}

export const removeFromPlaylist = id => {
    return { type: REMOVE_FROM_PLAYLIST, payload: id }
}

export const playlistNext = (next, state) => {
    if (!state.active) {
        return
    }
    if (next) {
        if (state.currentIndex === state.list.length - 1) {
            history.push(`/zenesz/songs/${state.list[0]}`)
            return { type: PLAYLIST_NEXT, payload: 0 }
        } else {
            history.push(`/zenesz/songs/${state.list[state.currentIndex + 1]}`)
            return { type: PLAYLIST_NEXT, payload: state.currentIndex + 1 }
        }
    } else {
        if (state.currentIndex < 1) {
            history.push(`/zenesz/songs/${state.list[state.list.length - 1]}`)
            return { type: PLAYLIST_NEXT, payload: state.list.length - 1 }
        } else {
            history.push(`/zenesz/songs/${state.list[state.currentIndex - 1]}`)
            return { type: PLAYLIST_NEXT, payload: state.currentIndex - 1 }
        }
    }
}

export const startPlaylist = (state) => {
    history.push(`/zenesz/songs/${state.list[state.currentIndex]}`)
    return {type: START_PLAYLIST}
}
export const stopPlaylist = () => {
    return {type: STOP_PLAYLIST}
}

export const clearPlaylist = () => {
    return {type: CLEAR_PLAYLIST}
}

export const toggleVisibility = () => {
    return { type: TOGGLE_VISIBILITY }
}

export const moveInPlaylist = (index, up) => {
    return { type: MOVE_IN_PLAYLIST, payload: {index, up}}
}