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
    REPLACE_PLAYLIST_IN_LIST,
    NEW_ALERT,
    DELETE_PLAYLIST,
    CLOSE_MODAL,
    PLAYLIST_STEP,
    RECOVER_STATE
} from './types'
import {
    addToPlaylistReducer,
    removeFromPlaylistReducer,
    removeFromPlaylistReducerNoIndex,
    moveInPlaylistReducer,
    moveInPlaylistReducerNoIndex,
    removePlacesFromPlaylist,
    addPlacesToPlaylist,
    BASE_URL
} from "../util"
import { dicsiDb } from '../api'
import { handleError } from '../util'
import history from '../history'

const patchPlaylist = async (dispatch, getState, localResult, playlistId) => {
    try {
        const res = await dicsiDb.patch(`/playlists/${playlistId}/`, {
            songs: addPlacesToPlaylist(localResult.songs)
        }, { headers: {'Authorization': `Token ${getState().auth.dicsiToken}` }})
        if (getState().playlist.loaded === playlistId) {
            dispatch({ type: REPLACE_PLAYLIST, payload: { ...localResult, songs: removePlacesFromPlaylist(res.data.songs) }})
        } else {
            dispatch({ type: REPLACE_PLAYLIST_IN_LIST, payload: {loaded: playlistId, songs: removePlacesFromPlaylist(res.data.songs) }})
        }
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const addToPlaylist = id => async (dispatch, getState) => {
    if (getState().playlist.songs.includes(id)) {
        dispatch({ type: NEW_ALERT, payload: {msg: 'Ez a dal már fent van a lejátszási listán', type: 'error'}})
    } else {
        if (!getState().playlist.loaded) {
            dispatch({ type: ADD_TO_PLAYLIST, payload: id })
        } else {
            const localResult = addToPlaylistReducer(getState().playlist, id)
            await patchPlaylist(dispatch, getState, localResult, getState().playlist.loaded)
        }
    }
}

export const removeFromPlaylist = (songId, playlistId) => async (dispatch, getState) => {
    if (!getState().playlist.loaded && !playlistId) {
        dispatch({ type: REMOVE_FROM_PLAYLIST, payload: songId })
    } else {
        let localResult = ''
        if (getState().playlist.loaded === playlistId) {
            localResult = removeFromPlaylistReducer(getState().playlist, songId)
        } else {
            const playlistToRemoveFrom = getState().playlistList.list.find(pl => pl.id === playlistId)
            localResult = removeFromPlaylistReducerNoIndex(playlistToRemoveFrom, songId)
        }
        await patchPlaylist(dispatch, getState, localResult, playlistId)
    }
}

export const playlistNext = (next, state) => {
    if (!state.active) {
        return
    }
    if (next) {
        if (state.currentIndex === state.songs.length - 1) {
            history.push(`${BASE_URL}/songs/${state.songs[0]}`)
            return { type: PLAYLIST_NEXT, payload: 0 }
        } else {
            history.push(`${BASE_URL}/songs/${state.songs[state.currentIndex + 1]}`)
            return { type: PLAYLIST_NEXT, payload: state.currentIndex + 1 }
        }
    } else {
        if (state.currentIndex < 1) {
            history.push(`${BASE_URL}/songs/${state.songs[state.songs.length - 1]}`)
            return { type: PLAYLIST_NEXT, payload: state.songs.length - 1 }
        } else {
            history.push(`${BASE_URL}/songs/${state.songs[state.currentIndex - 1]}`)
            return { type: PLAYLIST_NEXT, payload: state.currentIndex - 1 }
        }
    }
}

export const playlistStep = (idx) => {
    return { type: PLAYLIST_STEP, payload: idx }
}

export const startPlaylist = (state) => {
    history.push(`${BASE_URL}/songs/${state.songs[state.currentIndex]}`)
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

export const moveInPlaylist = (index, up, playlistId) => async (dispatch, getState) => {
    if (!getState().playlist.loaded && !playlistId) {
        dispatch({ type: MOVE_IN_PLAYLIST, payload: {index, up} })
    } else {
        let localResult = ''
        if (getState().playlist.loaded === playlistId) {
            localResult = moveInPlaylistReducer(getState().playlist, up, index)
        } else {
            const playlistToMoveIn = getState().playlistList.list.find(pl => pl.id === playlistId)
            localResult = moveInPlaylistReducerNoIndex(playlistToMoveIn, up, index)
        }
        await patchPlaylist(dispatch, getState, localResult, playlistId)
    }
}

export const savePlaylist = formData => async (dispatch, getState) => {
    try {
        const response = await dicsiDb.post('/playlists/', {
            name: formData.name,
            songs: addPlacesToPlaylist(getState().playlist.songs)
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

export const recoverState = () => {
    return { type: RECOVER_STATE }
}
