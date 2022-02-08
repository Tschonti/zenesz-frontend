import { NEW_ALERT, REMOVE_ALERT } from './actions/types'


const setTimeoutToRemoveAlert = (dispatch) => {
    setTimeout(() => dispatch({type: REMOVE_ALERT}), 5000)
}

export const handleError = (err, dispatch) => {
    if (!err.response) {
        dispatch({type: NEW_ALERT, payload: {msg: 'Valami baj van', type: 'error'}})
        console.error(err)
    } else if (err.response.status === 401 || err.response.status === 403) {
        dispatch({type: NEW_ALERT, payload: {msg: 'Nem vagy bejelentkezve', type: 'error'}})
    } else if (err.response.status === 400) {
        dispatch({type: NEW_ALERT, payload: {msg: 'Hibás felhasználónév vagy jelszó', type: 'error'}})
    } else {
        dispatch({type: NEW_ALERT, payload: {msg: `${err.response.status}: ${err.response.statusText}`, type: 'error'}})
        console.error(err.response)
    }
    setTimeoutToRemoveAlert(dispatch)
}

export const sortSongs = (songs, field) => {
    songs.sort((fEl, sEl) => {
        if (fEl[field] < sEl[field]) {
            return -1
        } else if (fEl[field] > sEl[field]) {
            return 1
        } return 0
    })
}

export const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index && value
}

export const addToPlaylistReducer = (playlist, newSongId) => {
    return { ...playlist, list: [ ...playlist.list, newSongId]}
}

export const removeFromPlaylistReducer = (playlist, idToRemove) => {
    const remIdx = playlist.list.indexOf(idToRemove)
    if (remIdx === -1) {
        return playlist
    }
    let curIdx = playlist.currentIndex
    if ((remIdx < curIdx || remIdx === playlist.list.length - 1) && curIdx > 0) {
        curIdx -= 1
    }
    const clonedState = [...playlist.list]
    clonedState.splice(remIdx, 1)
    return { ...playlist, list: clonedState, currentIndex: curIdx }
}

export const moveInPlaylistReducer = (playlist, up, index) => {
    if ((index === 0 && up) || (index === playlist.list.length - 1 && !up)) {
        return playlist
    }
    const otherIndex = up ? index - 1 : index + 1
    const clonedState = {...playlist}
    const temp = clonedState.list[otherIndex]
    clonedState.list[otherIndex] = clonedState.list[index]
    clonedState.list[index] = temp
    let diff = 0
    if (playlist.currentIndex === index) {
        diff = up ? -1 : 1
    } else if (playlist.currentIndex === otherIndex) {
        diff = up ? 1 : -1
    }
    clonedState.currentIndex += diff
    return clonedState
}

export const addPlacesToPlaylist = (playlist) => {
    return playlist.map((song, idx) => ({song: song, place: idx}))
}

export const removePlacesFromPlaylist = (playlist) => {
    return playlist.sort((a, b) => a.place - b.place).map(song => song.song)
}