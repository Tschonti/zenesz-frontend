import {
    FETCH_SONGS,
    FETCH_SONG,
    CREATE_SONG,
    EDIT_SONG,
    DELETE_SONG,
    REMOVE_FROM_PLAYLIST,
    UPDATE_WITH_ID,
    UPDATE_WITH_WRONG_ID,
    UPDATE_WITH_TERM,
    CANCEL_SEARCH,
    CLOSE_MODAL} from './types'
import { db } from '../api'
import history from '../history'
import { BASE_URL, handleError } from '../util'

export const fetchSongs = () => async dispatch => {
    try {
        const response = await db.get('/songs/?format=json')
        dispatch({type: FETCH_SONGS, payload: response.data})
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const fetchSong = id => async dispatch => {
    try {
        const response = await db.get(`/songs/${id}/?format=json`)
        dispatch({type: FETCH_SONG, payload: response.data})
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const findId = (id) => async dispatch => {
    try {
        const response = await db.get(`/songs/${id}/?format=json`)
        dispatch({type: UPDATE_WITH_ID, payload: response.data})
    } catch (err) {
        if (err.response) {
            if (err.response.status === 404) {
                dispatch({type: UPDATE_WITH_WRONG_ID})
            } else {
                handleError(err, dispatch)
            }
        } else {
            handleError(err, dispatch)
        }
    }
}

export const searchSongs = (term, lyricsToo, color) => async dispatch => {
    try {
        if (term === '' && color === '') {
            dispatch({type: CANCEL_SEARCH})
        } else {
            if (term === '') {
                term = '---noval---'
            }
            const colorSearch = color ? color + '/' : ''
            const inTitle = await db.get(`/search-title/${term}/${colorSearch}`)
            if (lyricsToo) {
                const inLyrics = await db.get(`/search-lyrics/${term}/${colorSearch}`)
                dispatch({type: UPDATE_WITH_TERM, payload: [...inTitle.data, ...inLyrics.data]})
            } else {
                dispatch({type: UPDATE_WITH_TERM, payload: inTitle.data})
            }
        }

    } catch (err) {
        handleError(err, dispatch)
    }
}

export const cancelSearch = () => {
    return { type: CANCEL_SEARCH}
}

export const createSong = formData => async (dispatch, getState) => {
    try {
        const color = formData.color ? formData.color.slice(1) : ''
        const response = await db.post('/songs/', {
            id: parseInt(formData.id),
            title: formData.title,
            lyrics: formData.lyrics.split('\n\n').join('###'),
            desc: formData.desc || '',
            color: color,
        }, { headers: {'Authorization': `Token ${getState().auth.zeneszToken}` }})
        dispatch({type: CREATE_SONG, payload: response.data})
        history.push(`${BASE_URL}/songs/${formData.id}`)
    } catch (err) {
        console.log(err.response)
        handleError(err, dispatch)
    }

}

export const editSong = (id, formData) => async (dispatch, getState) => {
    try {
        const response = await db.patch(`/songs/${id}/`, {
            title: formData.title,
            lyrics: formData.lyrics.split('\n\n').join('###'),
            desc: formData.desc || '',
            color: formData.color.slice(1)
        }, { headers: {'Authorization': `Token ${getState().auth.zeneszToken}` }})
        dispatch({type: EDIT_SONG, payload: response.data})
        history.push(`${BASE_URL}/songs/${id}`)
    } catch (err) {
        handleError(err, dispatch)
    }
}

export const deleteSong = (id) => async (dispatch, getState) => {
    try {
        await db.delete(`/songs/${id}/`,
            { headers: {'Authorization': `Token ${getState().auth.zeneszToken}` }})
        if (getState().playlist.songs.includes(id)) {
            dispatch({ type: REMOVE_FROM_PLAYLIST, payload: id })
        }
        dispatch({type: DELETE_SONG, payload: id})
        dispatch({type: CLOSE_MODAL})
        history.push(BASE_URL)
    } catch(err) {
        handleError(err, dispatch)
    }
}