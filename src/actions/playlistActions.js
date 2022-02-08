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
    FETCH_PLAYLISTS,
    LOAD_PLAYLIST,
    UNLOAD_PLAYLIST,
    REPLACE_PLAYLIST,
    NEW_ALERT,
    DELETE_PLAYLIST,
    CLOSE_MODAL,
    PLAYLIST_STEP,
} from './types'
import {
    addToPlaylistReducer,
    removeFromPlaylistReducer,
    moveInPlaylistReducer,
    removePlacesFromPlaylist,
    addPlacesToPlaylist
} from "../util"
import { dicsiDb } from '../api'
import { handleError } from '../util'
import history from '../history'

const patchPlaylist = async (dispatch, getState, localResult) => {
    try {
        const res = await dicsiDb.patch(`/playlists/${getState().playlist.loaded}/`, {
            songs: addPlacesToPlaylist(localResult.list)
        }, { headers: {'Authorization': `Token ${getState().auth.dicsiToken}` }})
        dispatch({ type: REPLACE_PLAYLIST, payload: { ...localResult, list: removePlacesFromPlaylist(res.data.songs) }})
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const addToPlaylist = id => async (dispatch, getState) => {
    if (getState().playlist.list.includes(id)) {
        dispatch({ type: NEW_ALERT, payload: {msg: 'Ez a dal már fent van a lejátszási listán', type: 'error'}})
    } else {
        if (!getState().playlist.loaded) {
            dispatch({ type: ADD_TO_PLAYLIST, payload: id })
        } else {
            const localResult = addToPlaylistReducer(getState().playlist, id)
            await patchPlaylist(dispatch, getState, localResult)
        }
    }
}

export const removeFromPlaylist = id => async (dispatch, getState) => {
    if (!getState().playlist.loaded) {
        dispatch({ type: REMOVE_FROM_PLAYLIST, payload: id })
    } else {
        const localResult = removeFromPlaylistReducer(getState().playlist, id)
        await patchPlaylist(dispatch, getState, localResult)
    }
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

export const playlistStep = (idx) => {
    return { type: PLAYLIST_STEP, payload: idx }
}

export const startPlaylist = (state) => {
    history.push(`/zenesz/songs/${state.list[state.currentIndex]}`)
    return {type: START_PLAYLIST}
}
export const stopPlaylist = () => {
    return {type: STOP_PLAYLIST}
}

export const clearPlaylist = (id) => async (dispatch, getState) => {
    if (!getState().playlist.loaded && !id) {
        dispatch({type: CLEAR_PLAYLIST})
        dispatch({type: CLOSE_MODAL})
    } else {
        try {
            await dicsiDb.delete(`/playlists/${id}/`,
                { headers: {'Authorization': `Token ${getState().auth.dicsiToken}` }})
            if (id === getState().playlist.loaded) {
                dispatch({type: CLEAR_PLAYLIST})
            }
            dispatch({type: DELETE_PLAYLIST, payload: id})
            dispatch({type: CLOSE_MODAL})
        } catch(err)  {
            handleError(err, dispatch)
        }
    } 
}

export const toggleVisibility = () => {
    return { type: TOGGLE_VISIBILITY }
}

export const moveInPlaylist = (index, up) => async (dispatch, getState) => {
    if (!getState().playlist.loaded) {
        dispatch({ type: MOVE_IN_PLAYLIST, payload: {index, up} })
    } else {
        const localResult = moveInPlaylistReducer(getState().playlist, up, index)
        await patchPlaylist(dispatch, getState, localResult)
    }
}

export const savePlaylist = formData => async (dispatch, getState) => {
    try {
        const response = await dicsiDb.post('/playlists/', {
            name: formData.name,
            songs: addPlacesToPlaylist(getState().playlist.list)
        }, { headers: {'Authorization': `Token ${getState().auth.dicsiToken}` }})
            dispatch({type: CLOSE_MODAL})
            dispatch({type: SAVE_PLAYLIST, payload: {...response.data, songs: removePlacesFromPlaylist(response.data.songs)}})
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const fetchPlaylists = () => async dispatch => {
    try {
        const response = await dicsiDb.get('/playlists/?format=json')
        dispatch({type: FETCH_PLAYLISTS, payload: response.data.map(pl => ({...pl, songs: removePlacesFromPlaylist(pl.songs)}))})
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const loadPlaylist = (id, modifiable) => async dispatch => {
    try {
        const response = await dicsiDb.get(`/playlists/${id}?format=json`)
        dispatch({type: LOAD_PLAYLIST, payload: {list: {...response.data, songs: removePlacesFromPlaylist(response.data.songs)}, modifiable}})
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const unloadPlaylist = () => {
    return {type: UNLOAD_PLAYLIST}
}