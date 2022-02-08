import { combineReducers } from 'redux'
import { reducer as formReducer } from "redux-form"

import songsReducer from './songsReducer'
import alertReducer from './alertReducer'
import playlistReducer from './playlistReducer'
import playlistListReducer from './playlistListReducer'
import searchListReducer from './searchListReducer'
import authReducer from './authReducer'
import modalReducer from './modalReducer'

export default combineReducers({
    songs: songsReducer,
    searchList: searchListReducer,
    alert: alertReducer,
    form: formReducer,
    playlist: playlistReducer,
    modal: modalReducer,
    auth: authReducer,
    playlistList: playlistListReducer,
})